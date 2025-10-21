import React from 'react';

interface FeatureDisplayProps {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
  padding?: string;
  reverseOnDesktop?: boolean;
}

export const FeatureDisplay: React.FC<FeatureDisplayProps> = ({ title, description, children, padding = 'py-16 md:py-20', reverseOnDesktop = false }) => {
  return (
    <section className={`${padding} bg-gray-50`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 lg:gap-24 items-center">
          <div className={`w-full ${reverseOnDesktop ? 'lg:order-last' : ''}`}>
            {children}
          </div>
          <div className="text-left mt-10 lg:mt-0">
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
            <p className="text-xl md:text-2xl text-gray-600 mt-4">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};