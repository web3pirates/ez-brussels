import { RawToken } from ".";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { NavigationMenu } from "@/components/NavigationMenu";
import { CustomContainer, Layout } from "@/components/atoms";
import { chainData } from "@/utils/chainData";
import fetch from "cross-fetch";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useAsyncMemo } from "use-async-memo";
import { useAccount } from "wagmi";

const blockscoutBaseUrl = `https://base.blockscout.com/api/v2/`;
const blockscoutArbUrl = `https://arbitrum.blockscout.com/api/v2/`;

const baseAUSDCaddress =
  "0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB".toLowerCase();
const baseContractAddress = chainData[8453].OApp.toLowerCase();

const arbAUSDCaddress =
  "0x724dc807b04555b71ed48a6896b6F41593b8C637".toLowerCase();
const arbContractAddress = chainData[42161].OApp.toLowerCase();

const logoBaseUrl = "https://erc20-token-logos.s3.eu-west-1.amazonaws.com/";

export default function Positions() {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  const arb = useAsyncMemo(async () => {
    if (!isConnected || !address) return;
    const url = `${blockscoutArbUrl}/addresses/${arbContractAddress}/token-balances`;

    try {
      const response = await fetch(url);
      if (!response.ok) return;

      const data: RawToken[] | undefined = await response.json();
      if (!data) return;

      const token = data.find((tokenData) => {
        const tokenAddress = tokenData.token.address.toLowerCase();
        return tokenAddress === arbAUSDCaddress;
      });

      if (!token) return;

      const { decimals } = token.token;
      const amount = parseFloat(
        (Number(token.value) / 10 ** decimals).toFixed(4)
      );

      return {
        symbol: token.token.symbol,
        chain: "Arbitrum",
        amount,
        logoUrl: `${logoBaseUrl}USDC.png`,
      };
    } catch (error) {
      console.error("Error fetching positons:", error);
    }
  }, [address, isConnected]);

  const base = useAsyncMemo(async () => {
    if (!isConnected || !address) return;
    const url = `${blockscoutBaseUrl}/addresses/${baseContractAddress}/token-balances`;

    try {
      const response = await fetch(url);
      if (!response.ok) return;

      const data: RawToken[] | undefined = await response.json();
      if (!data) return;

      const token = data.find((tokenData) => {
        const tokenAddress = tokenData.token.address.toLowerCase();
        return tokenAddress === baseAUSDCaddress;
      });

      if (!token) return;

      const { decimals } = token.token;
      const amount = parseFloat(
        (Number(token.value) / 10 ** decimals).toFixed(4)
      );

      return {
        symbol: token.token.symbol,
        chain: "Base",
        amount,
        logoUrl: `${logoBaseUrl}USDC.png`,
      };
    } catch (error) {
      console.error("Error fetching positons:", error);
    }
  }, [address, isConnected]);

  const positions = useMemo(() => {
    if (!arb && !base) return [];
    if (arb && base) return [arb, base];
    if (arb) return [arb];
    return [base];
  }, [arb, base]);

  return (
    <>
      <Head>
        <title>EEZY</title>
        <meta name="description" content="Revolutionizing cool apps." />
      </Head>

      <Layout>
        <Nav customFunction={() => router.push("/")} />
        <CustomContainer as="main">
          <div className="w-full">
            <NavigationMenu />
            <div className="grid grid-cols-12 gap-4">
              <div className="flex col-span-4">
                {/* <p className="text-2xl w-full">My positions</p> */}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-4">
              {/* if positions is defined, map over it and show the list 
              otherwise show "No positions found"
              */}
              {arb ? (
                <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                  <Image
                    src={arb.logoUrl}
                    width={35}
                    height={35}
                    className="rounded-full"
                    alt={`${arb.symbol} logo`}
                  />
                  <p className="text-lg font-semibold mt-2">{arb.symbol}</p>
                  <p>Chain: {arb.chain}</p>
                  <p>Amount: {arb.amount}</p>
                </div>
              ) : (
                <div className="col-span-12">No positions found</div>
              )}
            </div>
          </div>
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}
