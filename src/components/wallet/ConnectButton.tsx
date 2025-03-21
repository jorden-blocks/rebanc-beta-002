'use client'

import { appKit } from '@/context'
import { useAccount, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/Button'
import { useEffect } from 'react'

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  // Debug logging
  useEffect(() => {
    console.log("ConnectButton - isConnected:", isConnected);
    console.log("ConnectButton - address:", address);
  }, [isConnected, address]);

  const handleConnect = () => {
    console.log("Connect button clicked");
    appKit.open();
  }

  if (isConnected && address) {
    return (
      <Button 
        onClick={() => disconnect()} 
        variant="outline" 
        className="w-full"
      >
        {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    )
  }

  return (
    <Button onClick={handleConnect} className="w-full">
      Verbind Wallet
    </Button>
  )
}
