// SPDX-License-Identifier: MIT

pragma solidity ^0.8.22;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { OApp, MessagingFee, Origin } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OApp.sol";
import { MessagingReceipt } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OAppSender.sol";
import { IOFT, SendParam, MessagingFee, MessagingReceipt, OFTReceipt } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/interfaces/IOFT.sol";
import { OptionsBuilder } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/libs/OptionsBuilder.sol";
import { OFTComposeMsgCodec } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/libs/OFTComposeMsgCodec.sol";
import { IStargate } from "./IStargate.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IPool } from "@aave/core-v3/contracts/interfaces/IPool.sol";
import { ILayerZeroComposer } from "@layerzerolabs/lz-evm-protocol-v2/contracts/interfaces/ILayerZeroComposer.sol";

contract BridgeReceiver is ILayerZeroComposer {
    IPool immutable aavePool;
    event MessageArrived(bytes composeMessage);

    constructor(address _aavePool) {
        aavePool = IPool(_aavePool);
    }

    function prepareTakeTaxi(
        address _stargate,
        uint32 _dstEid,
        uint256 _amount,
        address _receiver,
        bytes memory _composeMsg
    ) external view returns (uint256 valueToSend, SendParam memory sendParam, MessagingFee memory messagingFee) {
        IStargate stargate = IStargate(_stargate);
        bytes memory extraOptions = _composeMsg.length > 0
            ? OptionsBuilder.addExecutorLzComposeOption(OptionsBuilder.newOptions(), 0, 200_000, 0) // compose gas limit
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

    function lzCompose(
        address _from,
        bytes32 _guid,
        bytes calldata _message,
        address _executor,
        bytes calldata _extraData
    ) external payable override {
        bytes memory _composeMessage = OFTComposeMsgCodec.composeMsg(_message);
        emit MessageArrived(_composeMessage);

        (address _receiver, address _oftOnDestination, bool depositOnAave) = abi.decode(
            _composeMessage,
            (address, address, bool)
        );

        if (depositOnAave) {
            uint256 amountLD = IERC20(_oftOnDestination).balanceOf(address(this));
            IERC20(_oftOnDestination).approve(address(aavePool), amountLD);
            try aavePool.deposit(_oftOnDestination, amountLD, _receiver, 0) {} catch {
                IERC20(_oftOnDestination).transfer(_receiver, amountLD);
            }
        }
    }

    function testWithdraw(address _token, uint256 _amount) external {
        IERC20(_token).transfer(msg.sender, _amount);
    }

    function testWithdrawNative(uint256 _amount) external {
        payable(msg.sender).transfer(_amount);
    }
}
