import useAaveData from '../hooks/useAaveData';
import { ReserveComponent } from './ReserveComponent';
import React from 'react';

// Import the 'Reserve' type from the appropriate module

interface AaveDataComponentProps {
  symbol: string;
}

export const supplyFundsButtonStyle =
  'inline-block text-gray-900 bg-gradient-to-r from-cyan-200 to-blue-200 border border-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm min-w-20 py-2.5 font-bold text-center no-underline cursor-pointer transition-colors duration-300 ease-in-out whitespace-nowrap';

const AaveDataComponent: React.FC<AaveDataComponentProps> = ({ symbol }) => {
  const { reserves, error } = useAaveData(symbol);

  if (error) {
    return <div>{error}</div>;
  }

  if (!reserves) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {reserves
        .sort((a, b) => parseFloat(b.liquidityRate) - parseFloat(a.liquidityRate))
        .map((reserve, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row justify-between items-start md:items-center w-full p-4 pl-6 md:pl-4 rounded-lg shadow-md border border-gray-200 mb-3
                          bg-white`}
          >
            <div className="flex gap-5 mb-4 md:mb-0 items-start">
              <ReserveComponent reserve={reserve} />
              <p className="text-md mt-3 font-semibold">{reserve.chainName}</p>
            </div>
            {/* <p>Asset: {reserve.symbol}</p> */}
            {/* <p>ID: {reserve.id}</p>
            <p>Liquidity Rate (APY): {(parseFloat(reserve.liquidityRate) * 100).toFixed(2)}%</p>
            <p>
              Variable Borrow Rate (APY):{' '}
              {(parseFloat(reserve.variableBorrowRate) * 100).toFixed(2)}%
            </p>
            <p>
              Stable Borrow Rate (APY): {(parseFloat(reserve.stableBorrowRate) * 100).toFixed(2)}%
            </p> */}
            <div className="flex gap-5 items-start md:items-center">
              <p className="text-sm font-semibold">
                APY: {(parseFloat(reserve.liquidityRate) * 100).toFixed(2)}%
              </p>
              <button
                onClick={() => {
                  console.log('Supply funds');
                }}
                type="button"
                className={supplyFundsButtonStyle}
              >
                <div className="p-1 text-center">Supply</div>
              </button>
            </div>{' '}
          </div>
        ))}
    </div>
  );
};

export default AaveDataComponent;
