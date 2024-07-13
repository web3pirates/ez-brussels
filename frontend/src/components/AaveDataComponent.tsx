import useAaveData from "../hooks/useAaveData";
import { ReserveComponent } from "./ReserveComponent";
import { useContract } from "@/hooks/useContract";
import React, { useState } from "react";

// Import the 'Reserve' type from the appropriate module

interface AaveDataComponentProps {
  symbol: string;
  amount: number;
}

export const supplyFundsButtonStyle =
  "inline-block text-gray-900 bg-gradient-to-r p-2 from-cyan-200 to-blue-200 border border-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm min-w-20 py-2.5 font-bold text-center no-underline cursor-pointer transition-colors duration-300 ease-in-out whitespace-nowrap";

export const noFundsButtonStyle =
  "inline-block text-gray bg-gradient-to-r p-2 from-gray-100 to-gray-200 border border-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm min-w-20 py-2.5 font-bold text-center no-underline cursor-not-allowed transition-colors duration-300 ease-in-out whitespace-nowrap";

const AaveDataComponent: React.FC<AaveDataComponentProps> = ({
  symbol,
  amount,
}) => {
  const { reserves, error } = useAaveData(symbol);

  const isEnabled = amount > 0;

  if (error) {
    return <div>{error}</div>;
  }

  if (!reserves) {
    return <div>Loading...</div>;
  }

  const [showSupplyModal, setShowSupplyModal] = useState(false);
  const [selectedLiquidityRate, setSelectedLiquidityRate] = useState<number>(0);

  return (
    <div>
      {reserves
        .sort(
          (a, b) => parseFloat(b.liquidityRate) - parseFloat(a.liquidityRate)
        )
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
                  setShowSupplyModal(true);
                  setSelectedLiquidityRate(parseFloat(reserve.liquidityRate));
                }}
                type="button"
                className={
                  isEnabled ? supplyFundsButtonStyle : noFundsButtonStyle
                }
                disabled={!isEnabled}
              >
                <div className="flex">
                  <div className="p-1 text-center text-md">
                    {isEnabled ? "Supply" : "No funds"}
                  </div>
                  <div className="text-center text-lg">
                    {isEnabled ? "💰" : "😭"}
                  </div>
                </div>
              </button>
            </div>{" "}
          </div>
        ))}

      {showSupplyModal && (
        <SupplyModal
          symbol={symbol}
          amount={amount}
          liquidityRate={selectedLiquidityRate}
          setShowModal={setShowSupplyModal}
        />
      )}
    </div>
  );
};

const SupplyModal: React.FC<{
  symbol: string;
  amount: number;
  liquidityRate: number;
  setShowModal: (value: boolean) => void;
}> = ({ symbol, amount, liquidityRate, setShowModal }) => {
  const [toBeSupplied, setToBeSupplied] = useState<string>("");
  const { externalDepositOnAave } = useContract();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToBeSupplied(e.target.value);
  };

  return (
    <div>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>

      {/* Modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Supply {symbol}</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              type="number"
              id="toBeSupplied"
              value={toBeSupplied}
              onChange={handleAmountChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={`balance ${amount}`}
            />
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Transaction overview</p>
            <p className="text-gray-600">
              Supply APY:{" "}
              <span className="font-semibold">
                {(liquidityRate * 100).toFixed(2)}%
              </span>
            </p>
            <p className="text-gray-600">
              Collateralization: <span className="font-semibold">Enabled</span>
            </p>
          </div>
          <div className="mt-6 flex flex-row justify-between">
            <button
              className={supplyFundsButtonStyle}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className={supplyFundsButtonStyle}
              onClick={() =>
                externalDepositOnAave(
                  8453,
                  42161,
                  BigInt(Number(toBeSupplied) * 10 ** 6)
                )
              }
            >
              Go!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AaveDataComponent;
