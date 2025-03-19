"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import PhoneFrame from '@/components/layout/PhoneFrame';
import { Wallet, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'wallet'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In een echte app zou je hier authenticatie logica hebben
    if (email && password) {
      setStep('wallet');
    }
  };

  // De inhoud van de app die hetzelfde is ongeacht of het in een frame zit of niet
  const pageContent = (
    <div className="h-full flex flex-col">
      {/* Login Header */}
      <div className="h-[35%] bg-gradient-to-br from-[#5046e4] to-[#3f37b3] flex flex-col justify-center items-center p-5 text-white">
        <div className="text-5xl font-extrabold tracking-tight mb-4">rebanc</div>
        <div className="text-base opacity-90">Blockchain bankieren voor iedereen</div>
      </div>
      
      {/* Login Content */}
      <div className="flex-grow p-6 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-2 text-center">Welkom bij Rebanc</h1>
        
        {step === 'email' ? (
          <>
            <p className="text-[#6b7280] mb-6 text-center">Log in om te beginnen</p>
            
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#5046e4] focus:border-[#5046e4]"
                    placeholder="jouw@email.nl"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Wachtwoord
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#5046e4] focus:border-[#5046e4]"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-5 bg-[#5046e4] text-white rounded-md font-semibold"
                >
                  Inloggen
                </button>
              </div>
            </form>
            
            <div className="mt-4 text-sm text-center">
              <a href="#" className="text-[#5046e4] hover:underline">
                Wachtwoord vergeten?
              </a>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Nog geen account?{' '}
                <a href="#" className="text-[#5046e4] font-medium hover:underline">
                  Registreren
                </a>
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="text-[#6b7280] mb-8 text-center">Verbind je wallet om te beginnen</p>
            
            <div className="space-y-4">
              <button className="w-full flex items-center p-4 rounded-md border border-[#e5e7eb] hover:border-[#5046e4] hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-md bg-[#f3f4f6] flex items-center justify-center mr-4 flex-shrink-0">
                  <Wallet className="text-[#5046e4]" size={24} />
                </div>
                <div className="flex-grow">
                  <div className="font-semibold">MetaMask</div>
                  <div className="text-xs text-[#6b7280]">Connect met je MetaMask wallet</div>
                </div>
              </button>
              
              <button className="w-full flex items-center p-4 rounded-md border border-[#e5e7eb] hover:border-[#5046e4] hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-md bg-[#f3f4f6] flex items-center justify-center mr-4 flex-shrink-0">
                  <Wallet className="text-[#5046e4]" size={24} />
                </div>
                <div className="flex-grow">
                  <div className="font-semibold">WalletConnect</div>
                  <div className="text-xs text-[#6b7280]">Connect via WalletConnect</div>
                </div>
              </button>
            </div>
            
            <div className="mt-6">
              <Link href="/dashboard">
                <button className="w-full py-3 px-5 bg-[#5046e4] text-white rounded-md font-semibold">
                  Verbinden
                </button>
              </Link>
            </div>
            
            <div className="mt-4 text-center">
              <button 
                onClick={() => setStep('email')} 
                className="text-sm text-[#5046e4] hover:underline"
              >
                Terug naar login
              </button>
            </div>
          </>
        )}
        
        <div className="text-center mt-8 text-sm text-[#6b7280]">
          Powered by Safe & Monerium
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] md:py-8 md:px-4">
      <PhoneFrame>
        {pageContent}
      </PhoneFrame>
    </div>
  );
}
