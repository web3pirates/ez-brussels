import { Button } from "../components/atoms";
import AaveDataComponent from "@/components/AaveDataComponent";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { OpportunityComponent } from "@/components/TestOpportunityComponent";
import { CustomContainer, Layout } from "@/components/atoms";
import fetch from "cross-fetch";
import Head from "next/head";
import Image from "next/image";
import { useMemo, useState } from "react";
// Importing an arrow icon from react-icons library
import { useAsyncMemo } from "use-async-memo";
import { useAccount } from "wagmi";

export const supplyFundsButtonStyle =
  "inline-block text-gray-900 bg-gradient-to-r from-cyan-200 to-blue-200 border border-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm min-w-24 py-2.5 font-bold text-center no-underline cursor-pointer transition-colors duration-300 ease-in-out whitespace-nowrap";

const tokenDivStyle =
  "flex flex-col md:flex-row justify-between items-start md:items-center w-full p-4 pl-6 md:pl-4 rounded-lg shadow-md border border-gray-200 mb-3 h-[5.313rem]";

const blockscoutBaseUrl = `https://base.blockscout.com/api/v2/`;

interface RawToken {
  token: {
    address: string;
    decimals: number;
    exchange_rate: number;
    icon_url: string;
    name: string;
    symbol: string;
  };
  value: bigint;
}

interface RawEth {
  coin_balance: bigint;
  exchange_rate: number;
}

interface Token {
  exchange_rate: number;
  balance: number;
}

const USDCContractAddress =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913".toLowerCase();

const USDTContractAddress =
  "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2".toLowerCase();

const WETHcontractAddress =
  "0x4200000000000000000000000000000000000006".toLowerCase();

export default function TestTx() {
  const { isConnected, address } = useAccount();
  const [showList, setShowList] = useState(false);
  const [selectedToken, setSelectedToken] = useState(-1);

  const defaultEthBalance: Token = {
    exchange_rate: 3152,
    balance: 0,
  };
  const defaultUsdBalance: Token = {
    exchange_rate: 1,
    balance: 0,
  };

  const ethBalance: Token = useAsyncMemo(
    async () => {
      if (!isConnected || !address) return defaultEthBalance;
      const url = `${blockscoutBaseUrl}/addresses/${address}`;

      try {
        const response = await fetch(url);
        if (!response.ok) return defaultEthBalance;

        const data: RawEth | undefined = await response.json();
        if (!data) return defaultEthBalance;

        const balance = parseFloat(
          (Number(data.coin_balance) / 10 ** 18).toFixed(8)
        );

        const result: Token = { exchange_rate: data.exchange_rate, balance };
        return result;
      } catch (error) {
        console.error("Error fetching eth balance:", error);
        return defaultEthBalance;
      }
    },
    [address, isConnected],
    defaultEthBalance
  );

  const wethBalance: Token = useAsyncMemo(
    async () => {
      if (!isConnected || !address) return defaultEthBalance;
      const url = `${blockscoutBaseUrl}/addresses/${address}/token-balances`;

      try {
        const response = await fetch(url);
        if (!response.ok) return defaultEthBalance;

        const data: RawToken[] | undefined = await response.json();
        if (!data) return defaultEthBalance;

        const wethToken = data.find((tokenData) => {
          const tokenAddress = tokenData.token.address.toLowerCase();
          return tokenAddress === WETHcontractAddress;
        });

        if (!wethToken) return defaultEthBalance;

        const { decimals, exchange_rate } = wethToken.token;
        const balance = parseFloat(
          (Number(wethToken.value) / 10 ** decimals).toFixed(2)
        );

        return {
          exchange_rate,
          balance,
        };
      } catch (error) {
        console.error("Error fetching usdt balance:", error);
        return defaultEthBalance;
      }
    },
    [address, isConnected],
    defaultEthBalance
  );

  const usdcBalance: Token = useAsyncMemo(
    async () => {
      if (!isConnected || !address) return defaultUsdBalance;
      const url = `${blockscoutBaseUrl}/addresses/${address}/token-balances`;

      try {
        const response = await fetch(url);
        if (!response.ok) return defaultUsdBalance;

        const data: RawToken[] | undefined = await response.json();
        if (!data) return defaultUsdBalance;

        const usdcToken = data.find((tokenData) => {
          const tokenAddress = tokenData.token.address.toLowerCase();
          return tokenAddress === USDCContractAddress;
        });

        if (!usdcToken) return defaultUsdBalance;

        const { decimals, exchange_rate } = usdcToken.token;
        const balance = parseFloat(
          (Number(usdcToken.value) / 10 ** decimals).toFixed(2)
        );

        return {
          exchange_rate,
          balance,
        };
      } catch (error) {
        console.error("Error fetching usdc balance:", error);
        return defaultUsdBalance;
      }
    },
    [address, isConnected],
    defaultUsdBalance
  );

  const usdtBalance: Token = useAsyncMemo(
    async () => {
      if (!isConnected || !address) return defaultUsdBalance;
      const url = `${blockscoutBaseUrl}/addresses/${address}/token-balances`;

      try {
        const response = await fetch(url);
        if (!response.ok) return defaultUsdBalance;

        const data: RawToken[] | undefined = await response.json();
        if (!data) return defaultUsdBalance;

        const usdtToken = data.find((tokenData) => {
          const tokenAddress = tokenData.token.address.toLowerCase();
          return tokenAddress === USDTContractAddress;
        });

        if (!usdtToken) return defaultUsdBalance;

        const { decimals, exchange_rate } = usdtToken.token;
        const balance = parseFloat(
          (Number(usdtToken.value) / 10 ** decimals).toFixed(2)
        );

        return {
          exchange_rate,
          balance,
        };
      } catch (error) {
        console.error("Error fetching usdt balance:", error);
        return defaultUsdBalance;
      }
    },
    [address, isConnected],
    defaultUsdBalance
  );

  const tokens = useMemo(() => {
    return [
      {
        name: "ETH",
        amount: ethBalance.balance,
        value: parseFloat(
          Number(ethBalance.balance * ethBalance.exchange_rate).toFixed(2)
        ),
        logoUrl: "https://erc20-token-logos.s3.eu-west-1.amazonaws.com/ETH.png",
      },
      {
        name: "WETH",
        amount: wethBalance.balance,
        value: parseFloat(
          Number(wethBalance.balance * wethBalance.exchange_rate).toFixed(2)
        ),
        logoUrl:
          "https://erc20-token-logos.s3.eu-west-1.amazonaws.com/WETH.png",
      },
      {
        name: "USDC",
        amount: usdcBalance.balance,
        value: parseFloat(
          Number(usdcBalance.balance * usdcBalance.exchange_rate).toFixed(2)
        ),
        logoUrl:
          "https://erc20-token-logos.s3.eu-west-1.amazonaws.com/USDC.png",
      },
      {
        name: "USDT",
        amount: usdtBalance.balance,
        value: parseFloat(
          Number(usdtBalance.balance * usdtBalance.exchange_rate).toFixed(2)
        ),
        logoUrl:
          "https://erc20-token-logos.s3.eu-west-1.amazonaws.com/USDT.png",
      },
    ];
  }, [ethBalance, usdcBalance, usdtBalance, wethBalance]);

  const totalUsd = useMemo(() => {
    const tot = tokens.reduce((acc, token) => acc + token.value, 0);
    return tot.toFixed(2);
  }, [tokens]);

  const restartPage = () => {
    setShowList(false);
    setSelectedToken(-1);
  };

  return (
    <>
      <Head>
        <title>EEZY</title>
        <meta name="description" content="EEZY Web3" />
      </Head>

      <Layout>
        <Nav customFunction={restartPage} />
        <CustomContainer as="main">
          <div className="w-full">
            <div className="flex justify-between items-center mt-5">
              <OpportunityComponent opportunity={{ chain: "8453" }} />
            </div>
          </div>
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}
