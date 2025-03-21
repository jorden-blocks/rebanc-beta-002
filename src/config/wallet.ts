import { cookieStorage, createStorage } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { gnosisChiado } from 'viem/chains'; // Gnosis Testnet

// Project ID uit .env
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '';

if (!projectId && typeof window !== 'undefined') {
  console.error('Project ID is niet geconfigureerd in .env.local');
}

// Netwerken configuratie - gebruik Gnosis Chiado testnet als primair netwerk
export const networks = [gnosisChiado];

// Configureer de Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
});

export const config = wagmiAdapter.wagmiConfig;