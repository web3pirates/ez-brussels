import { useState } from 'react';

interface Opportunity {
  chain: string;
  // Add other properties here
}

export const OpportunityComponent = ({ opportunity }: { opportunity: Opportunity }) => {
  const [imageExists, setImageExists] = useState(true);

  return (
    <div>
      {imageExists ? (
        <img
          src={`/images/${opportunity.chain}.png`}
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
