import React from 'react';

const CirloLogo = () => (
  <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-xl p-2">
    <img src="https://i.postimg.cc/V64Vsm3z/Logo-COLORED-IN-WHITE.png" alt="Cirlo Logo" className="h-8 w-auto" />
  </div>
);

export const Header: React.FC = () => {
  return (
    <div className="fixed top-4 left-4 z-50">
      <CirloLogo />
    </div>
  );
};