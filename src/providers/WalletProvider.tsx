import React, { ReactNode } from 'react';
import { ReownProvider } from '@reown/appkit';
import { WagmiConfig } from 'wagmi';
import { wagmiAdapter, config, projectId } from '@/config/wallet';

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <WagmiConfig config={config}>
      <ReownProvider adapter={wagmiAdapter} projectId={projectId}>
        {children}
      </ReownProvider>
    </WagmiConfig>
  );
}