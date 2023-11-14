"use client"

import { ChakraProvider } from '@chakra-ui/react'

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { hardhat } from 'wagmi/chains';

const { chains, publicClient } = configureChains(
  [hardhat],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'alyra-dev',
  projectId: 'f72debe8724f32506362ef7f21095eea',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
              <ChakraProvider>
                {children}
              </ChakraProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}