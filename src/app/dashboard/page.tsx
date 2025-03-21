'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneFrame from '@/components/layout/PhoneFrame';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/Button';
import { getUserSafes } from '@/lib/safe';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [userSafes, setUserSafes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Als niet ingelogd, doorsturen naar login
  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  // Laad de safes van de gebruiker
  useEffect(() => {
    const loadSafes = async () => {
      if (address) {
        try {
          setIsLoading(true);
          const safes = await getUserSafes(address);
          setUserSafes(safes);
        } catch (error) {
          console.error('Fout bij het laden van safes:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadSafes();
  }, [address]);

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full">
        {/* Header met wallet adres */}
        <div className="bg-indigo-600 text-white p-6 flex flex-col items-start">
          <div className="flex justify-between w-full items-center mb-2">
            <h1 className="text-xl font-bold">Dashboard</h1>
            {address && (
              <div className="bg-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                <span className="mr-1">🔑</span>
                {address.slice(0, 6)}...{address.slice(-4)}
              </div>
            )}
          </div>
          <p className="text-lg">Welkom bij Rebanc</p>
        </div>

        {/* Content */}
        <div className="flex-1 bg-gray-50 p-6 overflow-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Je Safe Wallets</h2>
            
            {isLoading ? (
              <div className="flex justify-center p-6">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : userSafes.length > 0 ? (
              <div className="space-y-3">
                {userSafes.map(safe => (
                  <div key={safe.address} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Safe Wallet</h3>
                        <p className="text-xs text-gray-500 font-mono">{safe.address.slice(0, 10)}...{safe.address.slice(-8)}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push(`/safe/${safe.address}`)}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button 
                  onClick={() => router.push('/safe/create')}
                  variant="outline"
                  className="w-full mt-4"
                >
                  + Nog een Safe aanmaken
                </Button>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-center">
                <p className="text-gray-600 mb-3">Je hebt nog geen Safe Wallet aangemaakt</p>
                <Button 
                  onClick={() => router.push('/safe/create')}
                  className="w-full"
                >
                  Maak je eerste Safe aan
                </Button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Laatste Transacties</h2>
            <p className="text-gray-600 text-center">Geen transacties gevonden</p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 p-3">
          <div className="flex justify-around">
            <button className="p-1 flex flex-col items-center text-indigo-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs">Home</span>
            </button>
            <button className="p-1 flex flex-col items-center text-gray-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span className="text-xs">Transacties</span>
            </button>
            <button className="p-1 flex flex-col items-center text-gray-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs">Assets</span>
            </button>
            <button className="p-1 flex flex-col items-center text-gray-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs">Instellingen</span>
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
