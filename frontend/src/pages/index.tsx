import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { OpportunityComponent } from '@/components/OpportunityComponent';
import { CustomContainer, Layout } from '@/components/atoms';
import Head from 'next/head';
import { useState } from 'react';

export const supplyFundsButtonStyle =
  'inline-block text-gray-900 bg-gradient-to-r from-cyan-200 to-blue-200 border border-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm min-w-20 py-2.5 font-bold text-center no-underline cursor-pointer transition-colors duration-300 ease-in-out whitespace-nowrap';

export default function Home() {
  const [showList, setShowList] = useState(false);
  const [selectedToken, setSelectedToken] = useState(-1);

  return (
    <>
      <Head>
        <title>EEZY</title>
        <meta name="description" content="Revolutionizing cool apps." />
      </Head>

      <Layout>
        <Nav />
        <CustomContainer as="main">
          <div className="w-full">
            <div className="grid grid-cols-12 gap-4">
              <div className="w-full col-span-6">
                <div className="mb-8">
                  <p className="flex justify-center w-full gap-2 pt-4 font-extrabold text-2xl md:text-3xl mb-4"></p>

                  <p className="text-lg p-2 font-semibold">Assets to supply</p>

                  <div className="w-full">
                    {tokens.map((token, index) => (
                      // <li
                      //   key={index}
                      //   className="flex items-center justify-between p-2 border-b border-gray-200"
                      // >
                      //   <p className="text-md mt-4 font-semibold">
                      //     {token.name} ({token.amount})
                      //   </p>

                      //   <button
                      //     onClick={() => {
                      //       setShowList(true);
                      //       setSelectedToken(index);
                      //     }}
                      //     type="button"
                      //     className={supplyFundsButtonStyle}
                      //   >
                      //     {'Select ->'}
                      //   </button>
                      // </li>
                      <div
                        key={index}
                        className={`flex flex-col md:flex-row justify-between items-start md:items-center w-full p-4 pl-6 md:pl-4 rounded-lg shadow-md border border-gray-200 mb-3
                        ${index === selectedToken ? 'bg-yellow-100' : 'bg-white'}
                          `}
                      >
                        <p className="text-md mt-4 font-semibold">
                          {token.name} ({token.amount})
                        </p>

                        <button
                          onClick={() => {
                            setShowList(true);
                            setSelectedToken(index);
                          }}
                          type="button"
                          className={supplyFundsButtonStyle}
                        >
                          {'Select ->'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {showList && (
                <div className="w-full col-span-6">
                  <p className="flex justify-center w-full gap-2 pt-4 font-extrabold text-2xl md:text-3xl mb-4"></p>
                  <p className="text-lg p-2 font-semibold">
                    Opportunities for {tokens[selectedToken].name}
                  </p>

                  <div className="mb-8">
                    {opportunities[selectedToken]
                      .sort((a, b) => b.apy - a.apy)
                      .map((opportunity, index) => (
                        <div
                          key={index}
                          className={`flex flex-col md:flex-row justify-between items-start md:items-center w-full p-4 pl-6 md:pl-4 rounded-lg shadow-md border border-gray-200 mb-3
                          bg-white`}
                        >
                          <div className="flex gap-5 mb-4 md:mb-0 items-start">
                            <OpportunityComponent opportunity={opportunity} />
                            <p className="text-md mt-3 font-semibold">{opportunity.name}</p>
                          </div>
                          <div className="flex gap-5 items-start md:items-center">
                            <p className="text-sm font-semibold">APY: {opportunity.apy}%</p>
                            <button
                              onClick={() => {
                                console.log('Supply funds');
                              }}
                              type="button"
                              className={supplyFundsButtonStyle}
                            >
                              Supply
                            </button>
                          </div>
                        </div>
                      ))}
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

const opportunities = [
  [
    {
      name: 'Base',
      chain: 'base',
      apy: 2.5,
    },
    {
      name: 'Optimism',
      chain: 'optimism',
      apy: 2.5,
    },
    {
      name: 'Ethereum',
      chain: 'eth',
      apy: 2.5,
    },
    {
      name: 'Arbitrum',
      chain: 'arbitrum',
      apy: 3.5,
    },
    {
      name: 'Polygon',
      chain: 'polygon',
      apy: 4.5,
    },
  ],
  [
    {
      name: 'Base',
      chain: 'base',
      apy: 2.5,
    },
    {
      name: 'Optimism',
      chain: 'optimism',
      apy: 2.5,
    },
    {
      name: 'Polygon',
      chain: 'polygon',
      apy: 4.5,
    },
  ],
];

const tokens = [
  {
    name: 'ETH',
    amount: 0.2,
  },
  {
    name: 'USDC',
    amount: 1000,
  },
];
