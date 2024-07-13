import { useState, useEffect } from "react";

interface Reserve {
  id: string;
  symbol: string;
  chain: number | string | null;
  chainName?: string;
  liquidityRate: string;
  isActive: boolean;
  variableBorrowRate: string;
  stableBorrowRate: string;
}

const useAaveData = (symbol: string) => {
  const [reserves, setReserves] = useState<Reserve[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAaveData = async () => {
      const url = "https://aave-api-v2.aave.com/data/markets-data";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const filteredReserves = data.reserves.filter(
          (reserve: Reserve) =>
            reserve.symbol === symbol &&
            reserve.isActive &&
            reserve.liquidityRate !== "0" &&
            (reserve.id.startsWith("137") ||
              reserve.id.startsWith("42161") ||
              reserve.id.startsWith("8453") ||
              reserve.id.startsWith("10") ||
              reserve.id.startsWith("100") ||
              reserve.id.startsWith("1") ||
              reserve.id.startsWith("43114") ||
              reserve.id.startsWith("56") ||
              reserve.id.startsWith("250"))
        );

        filteredReserves.forEach((reserve: Reserve) => {
          if (reserve.id.startsWith("137")) {
            reserve.chain = 137;
            reserve.chainName = "Polygon";
          } else if (reserve.id.startsWith("42161")) {
            reserve.chain = 42161;
            reserve.chainName = "Arbitrum";
          } else if (reserve.id.startsWith("8453")) {
            reserve.chain = 8453;
            reserve.chainName = "Base";
          } else if (reserve.id.startsWith("10")) {
            reserve.chain = 10;
            reserve.chainName = "Optimism";
          } else if (reserve.id.startsWith("1")) {
            reserve.chain = 1;
            reserve.chainName = "Ethereum";
          } else if (reserve.id.startsWith("43114")) {
            reserve.chain = 43114;
            reserve.chainName = "Avalanche";
          } else if (reserve.id.startsWith("56")) {
            reserve.chain = 56;
            reserve.chainName = "BSC";
          } else if (reserve.id.startsWith("250")) {
            reserve.chain = 250;
            reserve.chainName = "Fantom";
          }
        });
        setReserves(filteredReserves);
      } catch (error) {
        setError("Error fetching data from Aave API: " + error);
      }
    };

    fetchAaveData();
  }, [symbol]);

  return { reserves, error };
};

export default useAaveData;
