import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { FeatureDisplay, CreateAndEarnCard } from './FeatureDisplay';
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
          padding="py-8 md:py-10"
        >
          <BorrowerVolume />
        </FeatureDisplay>

        <FeatureDisplay
          title="Lender Volume"
          description="Track lending activity and platform growth in real-time."
          padding="py-8 md:py-10"
        >
          <LenderVolume />
        </FeatureDisplay>
        
        <FeatureDisplay
          title="Create and earn"
          description={
            <>
              Get paid when people engage with your content.<sup>1</sup>
            </>
          }
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