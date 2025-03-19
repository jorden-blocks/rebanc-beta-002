"use client";

import React, { useEffect } from 'react';
import PhoneFrame from '@/components/layout/PhoneFrame';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { ArrowUp, RefreshCw, Plus } from 'lucide-react';

export default function DashboardPage() {
  // Effect om de scroll physics te verbeteren
  useEffect(() => {
    // Zet de body overflow terug naar auto om scrollen toe te staan
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    document.body.style.height = 'auto';
    return () => {
      // Cleanup is niet nodig in dit geval
    };
  }, []);

  // De inhoud van de app die hetzelfde is ongeacht of het in een frame zit of niet
  const pageContent = (
    <>
      {/* Expanded Header met rekening houden van safe area */}
      <div 
        className="bg-gradient-to-br from-[#5046e4] to-[#3f37b3] text-white p-4 pb-6 page-transition-in z-10 relative" 
        style={{ paddingTop: 'calc(0.5rem + var(--safe-area-inset-top))' }}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="text-2xl font-bold tracking-tight">rebanc</div>
          <button className="p-2 rounded-md hover:bg-white/10 no-highlight">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
        
        <p className="text-sm font-medium opacity-90">Goedemiddag, Alex</p>
        <div className="mb-2">
          <h2 className="text-4xl font-bold">€ 16,482.39</h2>
          <p className="flex items-center text-[#00cc88] text-sm">
            <ArrowUp size={16} className="mr-1" />
            2.4% (€ 389.21) vandaag
          </p>
        </div>
        
        <div className="flex justify-around mt-4">
          <button className="bg-white/15 p-3 rounded-md w-[70px] flex flex-col items-center no-highlight">
            <ArrowUp size={24} className="mb-2" />
            <span className="text-xs font-medium">Verzenden</span>
          </button>
          
          <button className="bg-white/15 p-3 rounded-md w-[70px] flex flex-col items-center no-highlight">
            <RefreshCw size={24} className="mb-2" />
            <span className="text-xs font-medium">Ontvangen</span>
          </button>
          
          <button className="bg-white/15 p-3 rounded-md w-[70px] flex flex-col items-center no-highlight">
            <Plus size={24} className="mb-2" />
            <span className="text-xs font-medium">Kopen</span>
          </button>
        </div>
      </div>
      
      {/* Main Content - Fix toegepast om scrollen mogelijk te maken */}
      <div className="pb-20 relative z-0 bg-[#f3f4f6]">
        <div className="p-4">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Mijn Assets</h2>
              <a href="#" className="text-[#5046e4] text-sm font-medium no-highlight">Bekijk alles</a>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#f7931a] text-white flex items-center justify-center mr-2">₿</div>
                  <div>Bitcoin</div>
                </div>
                <div className="font-semibold">€ 4,260.32</div>
                <div className="text-sm text-gray-500 mt-1">0.15 BTC</div>
                <div className="h-10 mt-2 relative">
                  {/* Placeholder voor chart */}
                  <div className="w-full h-full bg-gradient-to-r from-[#5046e4]/5 to-[#5046e4]/20 rounded"></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#ffd700] text-white flex items-center justify-center mr-2">
                    <span className="font-bold">Au</span>
                  </div>
                  <div>Goud</div>
                </div>
                <div className="font-semibold">€ 3,875.00</div>
                <div className="text-sm text-gray-500 mt-1">70 gram</div>
                <div className="h-10 mt-2 relative">
                  {/* Placeholder voor chart */}
                  <div className="w-full h-full bg-gradient-to-r from-[#ffd700]/5 to-[#ffd700]/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* IBAN Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">IBAN Rekening</h2>
              <a href="#" className="text-[#5046e4] text-sm font-medium no-highlight">Details</a>
            </div>
            
            <div className="bg-white rounded-md shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#5046e4] text-white rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold">€</span>
                    </div>
                    <div>
                      <div className="font-semibold">rebanc IBAN</div>
                      <div className="text-sm text-gray-500">NL91 RBNC 0123 4567 89</div>
                    </div>
                  </div>
                  <div className="font-bold">€ 5,240.80</div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 bg-[#5046e4] text-white py-2 px-4 rounded-md font-semibold flex items-center justify-center no-highlight">
                    Betalen
                  </button>
                  <button className="flex-1 bg-white text-[#5046e4] border-2 border-[#5046e4] py-2 px-4 rounded-md font-semibold no-highlight">
                    Geschiedenis
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Extra content voor scrollen */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Investeringen</h2>
              <a href="#" className="text-[#5046e4] text-sm font-medium no-highlight">Meer opties</a>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm mb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#00cc88]/10 text-[#00cc88] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">AAVE Spaarrekening</div>
                    <div className="text-[#00cc88] text-xs">5.2% jaarlijkse rente</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">€ 2,500.00</div>
                  <div className="text-gray-500 text-xs">+€10.83 afgelopen maand</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm mb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#f6993f]/10 text-[#f6993f] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Koffie Boeren Crowdfund</div>
                    <div className="text-[#f6993f] text-xs">8.5% jaarlijks rendement</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">€ 750.00</div>
                  <div className="text-gray-500 text-xs">Looptijd: 18 maanden</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ruimte voor onder de navigatiebar */}
          <div className="h-20"></div>
        </div>
      </div>
      
      <BottomNavigation />
    </>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] md:py-8 md:px-4">
      <PhoneFrame>
        {pageContent}
      </PhoneFrame>
    </div>
  );
}
