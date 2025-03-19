import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <>
      {/* Op mobiel: alleen de inhoud tonen */}
      <div className="md:hidden h-full w-full">
        {children}
      </div>
      
      {/* Op tablet/desktop: het frame met de inhoud tonen */}
      <div className="hidden md:block mx-auto w-full max-w-[375px] h-[780px] bg-white rounded-[40px] border-[10px] border-[#121212] overflow-hidden relative shadow-lg">
        {/* Notch */}
        <div className="w-[150px] h-[30px] bg-[#121212] absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-[15px] z-10"></div>
        
        {/* App Container */}
        <div className="h-full flex flex-col relative bg-[#f3f4f6]">
          {children}
        </div>
      </div>
    </>
  );
};

export default PhoneFrame;
