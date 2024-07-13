import { blockscoutBaseUrl } from ".";
import { Nav } from "@/components/Nav";
import { CustomContainer, Layout } from "@/components/atoms";
import { useRouter } from "next/router";
import { useAsyncMemo } from "use-async-memo";
import { useAccount } from "wagmi";

export default function Transactions() {
  const { address } = useAccount();
  const router = useRouter();
  const transactions = useAsyncMemo(async () => {
    const url = `${blockscoutBaseUrl}/addresses/${address}/internal-transactions`;

    try {
      const response = await fetch(url);
      if (!response.ok) return [];

      const data = await response.json();
      console.log("Fetched transactions:", data);

      return data.items.filter(
        (tx: any, index: number, self: any) =>
          index ===
          self.findIndex((t: any) => t.transaction_hash === tx.transaction_hash)
      );
    } catch (error) {
      console.error("Error fetching eth balance:", error);
    }
  }, [address]);

  return (
    <Layout>
      <Nav customFunction={() => router.push("/")} />
      <CustomContainer
        as="main"
        className={`items-start w-full p-4 pl-6 md:pl-4 rounded-lg shadow-md border border-gray-200 mb-3 bg-white`}
      >
        <h1>Transactions</h1>
        <div className="grid grid-cols-5 gap-x-5">
          {transactions?.map((tx: any) => (
            <>
              <a
                className="col-span-3"
                href={`https://base.blockscout.com/tx/${tx.transaction_hash}`}
              >
                {tx.transaction_hash}
              </a>
              <div>{new Date(tx.timestamp).toLocaleString()}</div>
              <a href={`https://layerzeroscan.com/tx/${tx.transaction_hash}`}>
                See on ZeroExplorer
              </a>
            </>
          ))}
        </div>
      </CustomContainer>
    </Layout>
  );
}
