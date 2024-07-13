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

export const supplyFundsButtonStyle =
  "inline-block text-gray-900 bg-gradient-to-r from-cyan-200 to-blue-200 border border-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm min-w-24 py-2.5 font-bold text-center no-underline cursor-pointer transition-colors duration-300 ease-in-out whitespace-nowrap";

export default function Transactions() {
  const { address } = useAccount();
  const router = useRouter();
  const transactions = useAsyncMemo(async () => {
    const url = `${blockscoutBaseUrl}/addresses/${address}/internal-transactions`;

    try {
      const response = await fetch(url);
      if (!response.ok) return [];

      const data = await response.json();

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
                <div className="flex flex-col gap-8 px-2 pt-5">
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
                      <div className="">
                        <div className="font-semibold">Tx hash</div>
                        <div className="text-xs">{tx.transaction_hash}</div>
                      </div>
                    </a>
                    <div className="mt-2 text-sm font-semibold">
                      {/* {new Date(tx.timestamp).toLocaleString()} */}
                      <div>
                        <p className={`text-left font-semibold mr-1`}>
                          {tx.timestamp !== undefined &&
                            new Date(tx.timestamp).toLocaleDateString()}
                        </p>
                        <p
                          className={`text-left text-gray-600 font-semibold
                         mr-1`}
                        >
                          {tx.timestamp !== undefined &&
                            new Date(tx.timestamp)
                              .toLocaleTimeString()
                              .substring(0, 5)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        window.open(
                          `https://layerzeroscan.com/tx/${tx.transaction_hash}`
                        );
                      }}
                      type="button"
                      className={supplyFundsButtonStyle}
                    >
                      <div className="flex gap-2 p-2 items-center justify-center">
                        See on ZeroExplorer
                      </div>
                    </button>
                  </RowElement>
                ))
              : ""}
          </div>
        </div>
      </CustomContainer>
    </Layout>
  );
}
