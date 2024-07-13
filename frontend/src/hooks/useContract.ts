import { BridgeReceiverAbi } from "@/abi/BridgeReceiver";
import { oappAbi } from "@/abi/OApp";
import { stargateAbi } from "@/abi/Stargate";
import { chainData } from "@/utils/chainData";
import { wagmiConfig } from "@/wagmi";
import { readContract, writeContract } from "@wagmi/core";
import { erc20Abi } from "viem";
import { encodeAbiParameters } from "viem";
import { useAccount } from "wagmi";
import { useWriteContracts } from "wagmi/experimental";

export const useContract = () => {
  const { address } = useAccount();
  const { writeContracts } = useWriteContracts();

  async function externalDepositOnAave(
    fromChainId: 8453,
    toChainId: number,
    tokenAmount: bigint
  ) {
    const fromData = chainData[fromChainId];
    const toData = chainData[toChainId];
    const msgData = encodeAbiParameters(
      [
        { name: "_receiver", type: "address" },
        { name: "_oftOnDestination", type: "address" },
        { name: "depositOnAave", type: "bool" },
      ],
      [toData.OApp, toData.USDC, true]
    );
    const [valueToSend, sendParam, messFee] = await readContract(wagmiConfig, {
      abi: BridgeReceiverAbi,
      address: fromData.BridgeReceiver,
      functionName: "prepareTakeTaxi",
      chainId: fromChainId,
      args: [
        fromData.Stargate,
        toData.eid,
        tokenAmount,
        toData.BridgeReceiver,
        msgData,
      ],
    });

    try {
      const allowance = await readContract(wagmiConfig, {
        abi: erc20Abi,
        address: fromData.USDC,
        functionName: "allowance",
        chainId: fromChainId,
        args: [address!, fromData.Stargate],
      });

      writeContracts({
        contracts: [
          {
            abi: erc20Abi,
            address: fromData.USDC,
            functionName: "approve",
            args: [fromData.Stargate, tokenAmount],
          },
          {
            abi: stargateAbi,
            address: fromData.Stargate,
            functionName: "sendToken",
            // @ts-ignore
            value: valueToSend,
            args: [sendParam, messFee, address!],
          },
        ],
        chainId: fromChainId,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function transferDeposit(fromChainId: number, toChainId: number) {
    const baseData = chainData[8453];
    const fromData = chainData[fromChainId];
    const toData = chainData[toChainId];

    const composeMsg = encodeAbiParameters(
      [
        { name: "_receiver", type: "address" },
        { name: "_oftOnDestination", type: "address" },
        { name: "depositOnAave", type: "bool" },
      ],
      [toData.OApp, toData.USDC, toChainId !== 8453]
    );
    const payload = encodeAbiParameters(
      [
        { name: "stargate", type: "address" },
        { name: "eid", type: "uint32" },
        { name: "receiver", type: "address" },
        { name: "aToken", type: "address" },
        { name: "composeMsg", type: "bytes" },
      ],
      [
        fromData.Stargate,
        toData.eid,
        toData.BridgeReceiver,
        fromData.aUSDC,
        composeMsg,
      ]
    );

    const { nativeFee, lzTokenFee } = await readContract(wagmiConfig, {
      abi: oappAbi,
      address: baseData.OApp,
      functionName: "quote",
      chainId: 8453,
      args: [fromData.eid, payload, false],
    });
    console.log(nativeFee, lzTokenFee);

    try {
      await writeContract(wagmiConfig, {
        abi: oappAbi,
        address: baseData.OApp,
        functionName: "send",
        chainId: 8453,
        value: nativeFee,
        args: [fromData.eid, payload],
      });
    } catch (e) {
      console.log(e);
    }
  }

  return {
    externalDepositOnAave,
    transferDeposit,
  };
};
