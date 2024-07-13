import { useState } from "react";

interface Reserve {
  id?: string;
  chain: number | null;
  chainName?: string;
  symbol?: string;
  liquidityRate?: string;
  variableBorrowRate?: string;
  stableBorrowRate?: string;
}

export const ReserveComponent = ({ reserve }: { reserve: Reserve }) => {
  const [imageExists, setImageExists] = useState(true);

  return (
    <div>
      {imageExists ? (
        <img
          src={`/images/${reserve.chain}.png`}
          alt=""
          width={45}
          height={45}
          onError={() => setImageExists(false)}
        />
      ) : (
        <div className="w-15 h-15 flex items-center justify-center bg-gray-200"></div>
      )}
    </div>
  );
};
