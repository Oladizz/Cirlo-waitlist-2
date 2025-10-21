import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { FeatureDisplay, CreateAndEarnCard } from './FeatureDisplay';
import { BorrowerVolume } from './BorrowerSearch';
import { LenderVolume } from './LenderVolume';
import { Footer } from '../Footer';
import { VerifiedProfileCard } from './VerifiedProfileCard';
import { SocialFeed } from './SocialFeed';

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
            <VerifiedProfileCard />
          </div>
        </FeatureDisplay>

        <FeatureDisplay
          title="Lend anyone anywhere."
          description="it’s the friendliest P2P money market in crypto, built for the next billion users who want financial access without financial anxiety."
        >
          <div className="w-full max-w-md">
            <SocialFeed />
          </div>
        </FeatureDisplay>
        
        <FeatureDisplay
          title="Trust and Transparency."
          description="Monitor your collateral in real-time."
        >
          <div className="w-full max-w-md">
            <CreateAndEarnCard />
          </div>
        </FeatureDisplay>

      </main>
      <Footer />
    </div>
  );
};

export default App;