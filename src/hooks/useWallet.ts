import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { gnosisChiado } from 'viem/chains';
import { useEffect, useState } from 'react';

export function useWallet() {
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { data: balance } = useBalance({
    address,
    chainId: gnosisChiado.id,
    enabled: !!address && isConnected,
  });

  // Switch naar Gnosis Chiado als gebruiker op een ander netwerk zit
  const ensureCorrectNetwork = async () => {
    if (isConnected && chainId !== gnosisChiado.id) {
      try {
        console.log('Gebruiker moet overschakelen naar Gnosis Chiado testnet');
      } catch (err) {
        console.error('Fout bij netwerk wissel:', err);
      }
    }
  };
  
  // Controleer netwerk bij connectie
  useEffect(() => {
    if (isConnected) {
      ensureCorrectNetwork();
    }
  }, [isConnected, chainId]);
  
  return {
    address,
    isConnected,
    chainId,
    balance,
    disconnect,
    isLoading,
    error,
    isCorrectNetwork: chainId === gnosisChiado.id
  };
}