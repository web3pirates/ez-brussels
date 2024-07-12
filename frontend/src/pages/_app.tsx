import "@/styles/style.scss";
import { SharedStateProvider } from "@/utils/store";
import { wagmiConfig } from "@/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlausibleProvider from "next-plausible";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="example.com" trackOutboundLinks>
      <SharedStateProvider>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </WagmiProvider>
      </SharedStateProvider>
    </PlausibleProvider>
  );
}
