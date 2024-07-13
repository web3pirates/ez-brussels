import { http, createConfig } from "wagmi";
import { base, arbitrum } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base, arbitrum],
  connectors: [
    coinbaseWallet({ appName: "Create Wagmi", preference: "smartWalletOnly" }),
  ],
  transports: {
    [base.id]: http(),
    [arbitrum.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
