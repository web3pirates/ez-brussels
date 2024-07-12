import { createClient, http } from 'viem';
import { createConfig } from 'wagmi';
import { arbitrumSepolia, baseSepolia } from 'wagmi/chains';
import { arbitrum } from 'wagmi/chains';
import { base } from 'wagmi/chains';

export const chains = [arbitrum, base];

export const wagmiConfig = createConfig({
  chains: [arbitrum, arbitrumSepolia, base, baseSepolia],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});
