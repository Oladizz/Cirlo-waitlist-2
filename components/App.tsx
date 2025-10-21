import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { FeatureDisplay } from './FeatureDisplay';
import { BorrowerVolume } from './BorrowerSearch';
import { LenderVolume } from './LenderVolume';
import { Footer } from '../Footer';

const App: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 font-sans overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        
        <FeatureDisplay
          title="Borrower Volume"
          description="Track borrower activity and platform growth."
          padding="py-4 md:py-6"
        >
          <BorrowerVolume />
        </FeatureDisplay>

        <FeatureDisplay
          title="Lender Volume"
          description="Track lender activity and platform liquidity."
          padding="py-4 md:py-6"
        >
          <LenderVolume />
        </FeatureDisplay>
        
        <FeatureDisplay
          title="A new social lending."
          description="Withdraw early, repay early, earn or access liquidity anytime."
        >
          <div className="w-full max-w-md">
            <img
              src="https://i.postimg.cc/sxsNN0Q9/IMG-20251021-201612.jpg"
              alt="Stylized representation of a social network for lending"
              className="w-full h-auto object-cover rounded-3xl shadow-lg shadow-gray-200/50"
            />
          </div>
        </FeatureDisplay>

        <FeatureDisplay
          title="Lend anyone anywhere."
          description="it’s the friendliest P2P money market in crypto, built for the next billion users who want financial access without financial anxiety."
        >
          <div className="w-full max-w-md">
            <img
              src="https://i.postimg.cc/prR661hJ/Screenshot-2025-10-21-19-53-58-82.jpg"
              alt="Abstract image representing global connectivity for lending"
              className="w-full h-auto object-cover rounded-3xl shadow-lg shadow-gray-200/50"
            />
          </div>
        </FeatureDisplay>
        
        <FeatureDisplay
          title="Trust and Transparency."
          description="Monitor your collateral in real-time."
        >
          <div className="w-full max-w-md">
            <img
              src="https://i.postimg.cc/QChyyn9Q/Screenshot-2025-10-21-20-41-21-31.jpg"
              alt="An abstract image symbolizing trust and security"
              className="w-full h-auto object-cover rounded-3xl shadow-lg shadow-gray-200/50"
            />
          </div>
        </FeatureDisplay>

      </main>
      <Footer />
    </div>
  );
};

export default App;