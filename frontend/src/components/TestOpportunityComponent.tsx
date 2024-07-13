import { Button } from "./atoms";
import { abi } from "@/abi/OApp";
import { stargateAbi } from "@/abi/Stargate";
import { chainData } from "@/utils/chainData";
import { wagmiConfig } from "@/wagmi";
import { readContract, writeContract } from "@wagmi/core";
import { useState } from "react";
import { erc20Abi } from "viem";
import { encodeAbiParameters } from "viem";
import { useAccount } from "wagmi";

interface Opportunity {
  chain: string;
}

export const OpportunityComponent = ({
  opportunity,
}: {
  opportunity: Opportunity;
}) => {
  const { address } = useAccount();

  const [imageExists, setImageExists] = useState(true);
  async function externalDepositOnAave(
    fromChainId: 8453,
    toChainId: number,
    tokenAmount: bigint
  ) {
    const fromData = chainData[fromChainId];
    const toData = chainData[toChainId];
    const msgData = encodeAbiParameters(
      [
        { name: "_oftOnDestination", type: "address" },
        { name: "depositOnAave", type: "bool" },
      ],
      [toData.USDC, true]
    );
    const [valueToSend, sendParam, messFee] = await readContract(wagmiConfig, {
      abi: abi,
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

      if (allowance < tokenAmount)
        await writeContract(wagmiConfig, {
          abi: erc20Abi,
          address: fromData.USDC,
          functionName: "approve",
          chainId: fromChainId,
          args: [fromData.Stargate, tokenAmount],
        });

      await writeContract(wagmiConfig, {
        abi: stargateAbi,
        address: fromData.Stargate,
        functionName: "sendToken",
        chainId: fromChainId,
        value: valueToSend,
        args: [sendParam, messFee, address!],
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {imageExists ? (
        <img
          src={`/images/${opportunity.chain}.png`}
          alt=""
          width={45}
          height={45}
          onError={() => setImageExists(false)}
        />
      ) : (
        <div className="w-15 h-15 flex items-center justify-center bg-gray-200"></div>
      )}
      <Button onClick={() => externalDepositOnAave(8453, 42161, BigInt(100))}>
        Supply
      </Button>
    </div>
  );
};
