import React from 'react';

const CirloLogo = () => (
  <div className="bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-xl p-2">
    <img src="https://i.postimg.cc/X71G34TL/Logo-Mark-BLACK.png" alt="Cirlo Logo" className="h-5 w-auto" />
  </div>
);

export const Header: React.FC = () => {
  return (
    <div className="fixed top-4 left-4 z-50">
      <CirloLogo />
    </div>
  );
};