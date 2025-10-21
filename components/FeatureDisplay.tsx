import React from 'react';

interface FeatureDisplayProps {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
  padding?: string;
}

export const FeatureDisplay: React.FC<FeatureDisplayProps> = ({ title, description, children, padding = 'py-16 md:py-20' }) => {
  return (
    <section className={`${padding} bg-gray-50`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <div className="w-full">
            {children}
          </div>
          <div className="text-left mt-10">
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
