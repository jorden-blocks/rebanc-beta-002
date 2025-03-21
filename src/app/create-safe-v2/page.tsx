'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PhoneFrame from '@/components/layout/PhoneFrame';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/Button';
import { createSafe } from '@/lib/safe-direct';

export default function CreateSafeV2Page() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdSafe, setCreatedSafe] = useState<string | null>(null);
  const [hasCheckedConnection, setHasCheckedConnection] = useState(false);
  
  // Controleer wallet connectie status bij laden van de pagina
  useEffect(() => {
    // Kleine vertraging om wagmi de tijd te geven om de status te bepalen
    const timer = setTimeout(() => {
      console.log("Wallet status check:", { isConnected, address });
      setHasCheckedConnection(true);
      
      if (!isConnected || !address) {
        console.log("Niet verbonden, gebruiker ziet nu connect prompt");
        // Niet meer redirecten, toon in plaats daarvan een connect prompt
      }
    }, 1000); // Langere timeout om wagmi tijd te geven
    
    return () => clearTimeout(timer);
  }, [isConnected, address]);
  
  // Wacht totdat we de connectie status hebben gecontroleerd
  if (!hasCheckedConnection) {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full items-center justify-center bg-gray-50">
          <div className="animate-pulse">
            <p className="text-center">Checking wallet connection...</p>
            <div className="w-8 h-8 mx-auto mt-4 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </PhoneFrame>
    );
  }
  
  // Als niet verbonden, toon connect prompt
  if (!isConnected || !address) {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full">
          <div className="bg-indigo-600 text-white p-6">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="mr-4"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold">Connect Wallet</h1>
            </div>
          </div>
          
          <div className="flex-1 bg-gray-50 p-6 flex flex-col items-center justify-center">
            <div className="bg-white rounded-xl shadow-sm p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-center">Wallet Connectie Nodig</h2>
              <p className="text-gray-600 mb-6 text-center">
                Je moet een wallet verbinden om een Safe te kunnen maken.
              </p>
              
              <Button 
                onClick={() => router.push('/')}
                className="w-full"
              >
                Ga naar Login Pagina
              </Button>
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }
  
  const handleCreateSafe = async () => {
    if (!address) return;
    
    try {
      setIsCreating(true);
      setError(null);
      
      console.log("Start handleCreateSafe met adres:", address);
      
      // Safe aanmaken met nieuwe implementatie
      const safeAddress = await createSafe(address);
      console.log("Safe aangemaakt:", safeAddress);
      setCreatedSafe(safeAddress);
    } catch (err) {
      console.error('Fout bij het aanmaken van de Safe:', err);
      setError(err instanceof Error ? err.message : 'Er is een fout opgetreden bij het aanmaken van de Safe.');
    } finally {
      setIsCreating(false);
    }
  };
  
  return (
    <PhoneFrame>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-6">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Safe Aanmaken (V2)</h1>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 bg-gray-50 p-6 overflow-auto">
          {createdSafe ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Safe Aangemaakt!</h2>
                <p className="text-gray-600">
                  Je Safe is succesvol aangemaakt en klaar voor gebruik.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Safe Adres:</h3>
                <p className="text-sm break-all font-mono bg-gray-100 p-2 rounded">{createdSafe}</p>
              </div>
              
              <Button 
                onClick={() => router.push('/dashboard')}
                className="w-full"
              >
                Ga naar Dashboard
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Nieuwe Safe Wallet (V2)</h2>
              
              <p className="text-gray-600 mb-6">
                Een Safe is je persoonlijke smart contract wallet waarmee je veilig crypto assets kunt beheren. 
                Met deze wallet kun je later ook verbinding maken met een IBAN-rekening.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
                <h3 className="font-medium text-blue-800 mb-2">Voordelen van een Safe:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Volledige controle over je assets</li>
                  <li>• Veilige opslag van crypto en tokens</li>
                  <li>• Eenvoudig beheer via Rebanc app</li>
                  <li>• Integratie met IBAN-rekening (binnenkort)</li>
                </ul>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 text-red-700 text-sm">
                  {error}
                </div>
              )}
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Wallet Adres:</h3>
                <p className="text-sm break-all font-mono bg-gray-100 p-2 rounded">{address}</p>
              </div>
              
              <Button 
                onClick={handleCreateSafe} 
                disabled={isCreating}
                className="w-full"
              >
                {isCreating ? 'Safe wordt aangemaakt...' : 'Safe Aanmaken (V2)'}
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Je wallet ({address.slice(0, 6)}...{address.slice(-4)}) wordt gebruikt als eigenaar van deze Safe.
              </p>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
