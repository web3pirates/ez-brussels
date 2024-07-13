import { Button } from "./atoms";
import { BridgeReceiverAbi } from "@/abi/BridgeReceiver";
import { oappAbi } from "@/abi/OApp";
import { stargateAbi } from "@/abi/Stargate";
import { useContract } from "@/hooks/useContract";
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
  const { externalDepositOnAave, transferDeposit } = useContract();

  const [imageExists, setImageExists] = useState(true);

  return (
    <div className="flex gap-2">
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
      <Button onClick={() => transferDeposit(42161, 8453)}>Transfer</Button>
    </div>
  );
};
