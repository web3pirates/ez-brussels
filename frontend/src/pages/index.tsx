import { Button } from "../components/atoms";
import AaveDataComponent from "@/components/AaveDataComponent";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { NavigationMenu } from "@/components/NavigationMenu";
import { CustomContainer, Layout } from "@/components/atoms";
import fetch from "cross-fetch";
import Head from "next/head";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useAsyncMemo } from "use-async-memo";
import { useAccount } from "wagmi";

export const supplyFundsButtonStyle =
  "inline-block text-gray-900 bg-gradient-to-r from-cyan-200 to-blue-200 border border-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm min-w-24 py-2.5 font-bold text-center no-underline cursor-pointer transition-colors duration-300 ease-in-out whitespace-nowrap";

const tokenDivStyle =
  "flex flex-col md:flex-row justify-between items-start md:items-center w-full p-4 pl-6 md:pl-4 rounded-lg shadow-md border border-gray-200 mb-3 h-[5.313rem]";

export const blockscoutBaseUrl = `https://base.blockscout.com/api/v2/`;

export interface RawToken {
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

export default function Home() {
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
  }, [ethBalance, usdcBalance, usdtBalance]);

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
            <NavigationMenu />

            <div className="grid grid-cols-12 gap-4">
              <div className="w-full col-span-6">
                <div className="mb-8">
                  <div className="flex flex-col gap-8 px-2 pt-5 pb-2">
                    <p className="text-2xl">
                      {totalUsd && (
                        <>
                          Balance $
                          <span className="font-bold">
                            {parseFloat(totalUsd).toFixed(2)}
                          </span>
                        </>
                      )}
                    </p>
                    <p className="text-lg font-semibold">Assets to supply</p>
                  </div>
                  <div className="w-full">
                    {tokens.map((token, index) => (
                      <div
                        key={index}
                        className={`${tokenDivStyle} ${
                          index === selectedToken ? "bg-yellow-100" : "bg-white"
                        }`}
                      >
                        <div className="flex flex-row gap-4 items-center">
                          <Image
                            src={token.logoUrl}
                            alt={`${token.name} logo`}
                            width={35}
                            height={35}
                            className="rounded-full"
                          />
                          <p className="text-md font-semibold">
                            {token.amount} {token.name} (${token.value})
                          </p>
                        </div>

                        {selectedToken !== index && (
                          <button
                            onClick={() => {
                              setShowList(true);
                              setSelectedToken(index);
                            }}
                            type="button"
                            className={supplyFundsButtonStyle}
                          >
                            <div className="flex gap-2 p-1 items-center justify-center">
                              Select <FaArrowRight className="button-icon" />
                            </div>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {showList && (
                <div className="w-full col-span-6 mt-[3.75rem]">
                  <p className="flex justify-center w-full gap-2 font-extrabold text-2xl md:text-3xl mb-4"></p>
                  <p className="text-lg p-2 font-semibold">
                    Opportunities for {tokens[selectedToken].name}
                  </p>

                  <AaveDataComponent
                    symbol={tokens[selectedToken].name}
                    amount={tokens[selectedToken].amount}
                  />
                </div>
              )}

              {!showList && (
                <div className="w-full col-span-6 mt-[5.3125rem]">
                  <p className="flex justify-center w-full gap-2 pt-4 mt-1 font-extrabold text-2xl md:text-3xl mb-4"></p>

                  <div
                    className={`justify-between items-start md:items-center w-full p-4 pl-6 md:pl-4 rounded-lg shadow-md border border-gray-200 mb-3 bg-white`}
                  >
                    <p className="text-lg p-2 font-semibold">
                      Select a token and start earning
                    </p>
                    <p className="p-2">
                      <span className="font-semibold">EEZY</span> allows you to{" "}
                      <span className="font-semibold">
                        manage your assets across different chains seamlessly
                      </span>{" "}
                      from a single Base Smart Wallet without the hassle of
                      switching chains or bridging funds.
                    </p>
                    <p className="p-2">
                      <span className="font-semibold">EEZY</span> provides you
                      with{" "}
                      <span className="font-semibold">
                        the best opportunities
                      </span>{" "}
                      to earn interest on your assets across different chains.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}
