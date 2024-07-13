// SPDX-License-Identifier: MIT

pragma solidity ^0.8.22;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { OApp, MessagingFee, Origin } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OApp.sol";
import { MessagingReceipt } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OAppSender.sol";
import { IOFT, SendParam, MessagingReceipt, OFTReceipt } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/interfaces/IOFT.sol";
import { OptionsBuilder } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/libs/OptionsBuilder.sol";
import { OFTComposeMsgCodec } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/libs/OFTComposeMsgCodec.sol";
import { IStargate } from "./IStargate.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IPool } from "@aave/core-v3/contracts/interfaces/IPool.sol";

contract MyOApp is OApp {
    using OptionsBuilder for bytes;
    IPool immutable aavePool;
    constructor(address _endpoint, address _delegate, address _aavePool) OApp(_endpoint, _delegate) Ownable(_delegate) {
        aavePool = IPool(_aavePool);
    }

    /**
     * @notice Sends a message from the source chain to a destination chain.
     * @param _dstEid The endpoint ID of the destination chain.
     * @param _payload The message to be sent.
     * @dev Encodes the message as bytes and sends it using the `_lzSend` internal function.
     * @return receipt A `MessagingReceipt` struct containing details of the message sent.
     */
    function send(uint32 _dstEid, bytes memory _payload) external payable returns (MessagingReceipt memory receipt) {
        bytes memory extraOptions = _payload.length > 0
            ? OptionsBuilder.newOptions().addExecutorLzReceiveOption(200_000, 200_000)
            : bytes("");
        receipt = _lzSend(_dstEid, _payload, extraOptions, MessagingFee(msg.value, 0), payable(msg.sender));
    }

    /**
     * @notice Quotes the gas needed to pay for the full omnichain transaction in native gas or ZRO token.
     * @param _dstEid Destination chain's endpoint ID.
     * @param _payload The message.
     * @param _payInLzToken Whether to return fee in ZRO token.
     * @return fee A `MessagingFee` struct containing the calculated gas fee in either the native token or ZRO token.
     */
    function quote(
        uint32 _dstEid,
        bytes memory _payload,
        bool _payInLzToken
    ) public view returns (MessagingFee memory fee) {
        bytes memory extraOptions = _payload.length > 0
            ? OptionsBuilder.newOptions().addExecutorLzReceiveOption(200_000, 200_000)
            : bytes("");
        fee = _quote(_dstEid, _payload, extraOptions, _payInLzToken);
    }

    /**
     * @dev Internal function override to handle incoming messages from another chain.
     * @dev _origin A struct containing information about the message sender.
     * @dev _guid A unique global packet identifier for the message.
     * @param payload The encoded message payload being received.
     *
     * @dev The following params are unused in the current implementation of the OApp.
     * @dev _executor The address of the Executor responsible for processing the message.
     * @dev _extraData Arbitrary data appended by the Executor to the message.
     *
     * Decodes the received payload, withdraws aTokens and transfers them to the receiver.
     */
    function _lzReceive(
        Origin calldata /*_origin*/,
        bytes32 /*_guid*/,
        bytes calldata payload,
        address /*_executor*/,
        bytes calldata /*_extraData*/
    ) internal override {
        (address stargate, uint32 eid, address receiver, address aToken, bytes memory composeMsg) = abi.decode(
            payload,
            (address, uint32, address, address, bytes)
        );
        IERC20 aTokenContract = IERC20(aToken);
        uint256 aAmount = aTokenContract.balanceOf(address(this));
        aTokenContract.approve(address(aavePool), aAmount);
        uint256 amount = aavePool.withdraw(aToken, aAmount, address(this));

        (uint256 valueToSend, SendParam memory sendParam, MessagingFee memory messagingFee) = prepareTakeTaxi(
            stargate,
            eid,
            amount,
            receiver,
            composeMsg
        );
        bridge(stargate, sendParam, messagingFee);
    }

    function prepareTakeTaxi(
        address _stargate,
        uint32 _dstEid,
        uint256 _amount,
        address _receiver,
        bytes memory _composeMsg
    ) public view returns (uint256 valueToSend, SendParam memory sendParam, MessagingFee memory messagingFee) {
        IStargate stargate = IStargate(_stargate);
        bytes memory extraOptions = _composeMsg.length > 0
            ? OptionsBuilder.newOptions().addExecutorLzComposeOption(0, 100_000, 0) // compose gas limit
            : bytes("");

        sendParam = SendParam({
            dstEid: _dstEid,
            to: OFTComposeMsgCodec.addressToBytes32(_receiver),
            amountLD: _amount,
            minAmountLD: _amount,
            extraOptions: extraOptions,
            composeMsg: _composeMsg,
            oftCmd: ""
        });

        (, , OFTReceipt memory receipt) = stargate.quoteOFT(sendParam);
        sendParam.minAmountLD = receipt.amountReceivedLD;

        messagingFee = stargate.quoteSend(sendParam, false);
        valueToSend = messagingFee.nativeFee;

        if (stargate.token() == address(0x0)) {
            valueToSend += sendParam.amountLD;
        }
    }

    function bridge(
        address _stargate,
        SendParam memory sendParam,
        MessagingFee memory messagingFee
    ) public payable returns (MessagingReceipt memory msgReceipt) {
        IStargate stargate = IStargate(_stargate);
        address token = stargate.token();
        if (token != address(0x0)) {
            IERC20 tokenContract = IERC20(token);
            tokenContract.transferFrom(msg.sender, address(this), sendParam.amountLD);
            tokenContract.approve(address(stargate), sendParam.amountLD);
        }

        (msgReceipt, , ) = stargate.sendToken{ value: msg.value }(sendParam, messagingFee, msg.sender);
    }

    function testWithdraw(address _token, uint256 _amount) external onlyOwner {
        IERC20(_token).transfer(msg.sender, _amount);
    }

    function testWithdrawNative(uint256 _amount) external onlyOwner {
        payable(msg.sender).transfer(_amount);
    }
}
