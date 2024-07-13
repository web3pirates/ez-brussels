import { http, createConfig } from "wagmi";
import { baseSepolia, base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({ appName: "Create Wagmi", preference: "smartWalletOnly" }),
  ],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
