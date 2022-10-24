import { connectorsForWallets, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import type { AppProps } from "next/app";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
                chains={chains}
                modalSize="compact"
                theme={lightTheme({
                    accentColor: "#7b3fe4",
                    accentColorForeground: "white",
                    borderRadius: "large",
                    fontStack: "system",
                    overlayBlur: "small",
                })}
            >
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

const { chains, provider } = configureChains([chain.goerli, chain.hardhat], [publicProvider()]);

const connectors = connectorsForWallets([
    {
        groupName: "Popular",
        wallets: [metaMaskWallet({ chains })],
    },
]);

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

export default MyApp;
