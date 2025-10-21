import React from 'react';

const DiamondIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" className="text-gray-200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1.5L22.5 12 12 22.5 1.5 12 12 1.5Z" stroke="#E5E7EB" strokeWidth="1.5" fill="none"/>
    </svg>
);

const LineChartIcon = () => (
    <svg width="80" height="40" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
        <path d="M2 48C14.0435 48 16.3043 14.8696 28.3478 14.8696C40.3913 14.8696 40.3913 26.6087 52.4348 26.6087C64.4783 26.6087 66.7391 2 78.7826 2C90.8261 2 92.5217 14.8696 98 14.8696" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const CreateAndEarnCard: React.FC = () => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200/80 w-full shadow-lg shadow-gray-200/50">
            {/* Weekly Rewards */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-md text-gray-500">Weekly rewards</p>
                    <p className="text-5xl font-bold text-gray-900 mt-1 tracking-tight">$69.54</p>
                </div>
                <DiamondIcon />
            </div>

            {/* All-time Rewards */}
            <div className="mt-6 bg-white p-4 rounded-2xl border border-gray-200/80">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-sm text-gray-500">All-time rewards</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">$1,035.87</p>
                        <p className="text-xs text-gray-400 mt-2">Earnings since 04/20/25</p>
                    </div>
                    <LineChartIcon />
                </div>
            </div>
        </div>
    );
};


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