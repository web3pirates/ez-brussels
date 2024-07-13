export const chainData: Record<
  number,
  {
    eid: number;
    BridgeReceiver: `0x${string}`;
    USDC: `0x${string}`;
    aUSDC: `0x${string}`;
    Stargate: `0x${string}`;
  }
> = {
  8453: {
    eid: 30184,
    BridgeReceiver: "0x500b604Ed9cE19342c5d47C2E312276Dba330CBb",
    USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    aUSDC: "0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB",
    Stargate: "0x27a16dc786820B16E5c9028b75B99F6f604b5d26",
  },
  42161: {
    eid: 30110,
    BridgeReceiver: "0xD748b3AAeA10B92c79383814280739c65764eD4F",
    USDC: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
    aUSDC: "0x625E7708f30cA75bfd92586e17077590C60eb4cD",
    Stargate: "0xe8CDF27AcD73a434D661C84887215F7598e7d0d3",
  },
};
