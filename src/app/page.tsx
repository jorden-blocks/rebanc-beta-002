'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@/components/wallet/ConnectButton';
import { useAccount } from 'wagmi';
import PhoneFrame from '@/components/layout/PhoneFrame';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWalletStep, setShowWalletStep] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [hasManuallyConnected, setHasManuallyConnected] = useState(false);
  
  // Eenvoudige email/wachtwoord validatie
  const handleEmailStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setShowWalletStep(true);
    }
  };

  // Wallet connect handler
  const handleWalletConnected = () => {
    setHasManuallyConnected(true);
  };
  
  // Wanneer wallet is verbonden EN gebruiker heeft doorgang gekozen, doorsturen naar dashboard
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/dashboard');
    }
  }, [shouldRedirect, router]);
  
  return (
    <PhoneFrame>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-8 pb-16 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-2">rebanc</h1>
          <p className="text-lg">Blockchain bankieren voor iedereen</p>
        </div>
        
        {/* Content */}
        <div className="flex-1 bg-gray-50 -mt-8 rounded-t-3xl p-6">
          <div className="max-w-sm mx-auto pt-4">
            <h2 className="text-2xl font-semibold mb-6">
              {showWalletStep ? 'Verbind je wallet' : 'Welkom bij Rebanc'}
            </h2>
            
            {!showWalletStep ? (
              // Stap 1: Email/wachtwoord
              <form onSubmit={handleEmailStep} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Wachtwoord
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                >
                  Volgende
                </button>
              </form>
            ) : (
              // Stap 2: Wallet connectie
              <div className="space-y-6">
                {/* Wallet status */}
                {isConnected && address ? (
                  <div className="bg-green-50 p-4 rounded-md border border-green-200 mb-6">
                    <div className="flex items-start">
                      <div className="bg-green-400 rounded-full p-1 mr-3 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-green-800 font-medium">Wallet verbonden</p>
                        <p className="text-green-700 text-sm mt-1">{address.slice(0, 8)}...{address.slice(-6)}</p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => setShouldRedirect(true)}
                      className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    >
                      Doorgaan naar Dashboard
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-4">
                      Verbind je wallet om te beginnen
                    </p>
                    
                    <div className="space-y-4">
                      {/* MetaMask optie */}
                      <div className="flex items-center p-3 border border-gray-200 rounded-md">
                        <div className="w-8 h-8 flex items-center justify-center mr-3">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="12" fill="#EEEFFB" />
                            <path d="M7 10L12 5L17 10L12 15L7 10Z" fill="#6366F1" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">MetaMask</h3>
                          <p className="text-xs text-gray-500">Connect met je MetaMask wallet</p>
                        </div>
                      </div>
                      
                      {/* WalletConnect optie */}
                      <div className="flex items-center p-3 border border-gray-200 rounded-md">
                        <div className="w-8 h-8 flex items-center justify-center mr-3">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="12" fill="#EEEFFB" />
                            <path d="M7 10L12 5L17 10L12 15L7 10Z" fill="#6366F1" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">WalletConnect</h3>
                          <p className="text-xs text-gray-500">Connect via WalletConnect</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                <ConnectButton onWalletConnected={handleWalletConnected} />
                
                <p className="text-xs text-gray-500 text-center pt-4">
                  Powered by Safe & Monerium
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
