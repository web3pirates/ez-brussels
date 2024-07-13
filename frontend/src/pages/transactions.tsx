import { blockscoutBaseUrl } from ".";
import { Nav } from "@/components/Nav";
import { NavigationMenu } from "@/components/NavigationMenu";
import { CustomContainer, Layout } from "@/components/atoms";
import { useRouter } from "next/router";
import { useAsyncMemo } from "use-async-memo";
import { useAccount } from "wagmi";

export const RowElement = ({ children }: { children: any }) => (
  <div
    className={`flex flex-col md:flex-row justify-between items-start md:items-center w-full p-4 pl-6 md:pl-4 rounded-lg shadow-md border border-gray-200 mb-3
                bg-white`}
  >
    {children}
  </div>
);

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
      <CustomContainer as="main">
        <div className="w-full">
          <NavigationMenu />
          {/* {transactions?.map((tx: any) => (
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
            ))} */}
          <div className="mt-4">
            {transactions ? (
              <div className="mb-8">
                <div className="flex flex-col gap-8 px-2 pt-5 pb-2">
                  <p className="text-2xl">
                    <div className="flex gap-2">
                      Transactions
                      <span className="font-bold">{transactions.length}</span>
                    </div>
                  </p>
                </div>
              </div>
            ) : (
              "Loading..."
            )}

            {transactions
              ? transactions.map((tx: any) => (
                  <RowElement key={tx.transaction_hash}>
                    <a
                      className="col-span-3"
                      href={`https://base.blockscout.com/tx/${tx.transaction_hash}`}
                    >
                      {tx.transaction_hash}
                    </a>
                    <div>{new Date(tx.timestamp).toLocaleString()}</div>
                    <a
                      href={`https://layerzeroscan.com/tx/${tx.transaction_hash}`}
                    >
                      See on ZeroExplorer
                    </a>
                  </RowElement>
                ))
              : "Loading..."}
          </div>
        </div>
      </CustomContainer>
    </Layout>
  );
}
