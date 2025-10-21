import React from 'react';

// A reusable card for displaying individual statistics
interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  showSpinner?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, subtitleColor, showSpinner }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200/80 relative">
    {showSpinner && <div className="absolute top-6 right-6 w-5 h-5 rounded-full border-2 border-gray-200 opacity-80"></div>}
    <p className="text-md text-gray-500">{title}</p>
    <p className="text-4xl font-bold text-gray-900 my-2">{value}</p>
    <p className={`text-sm font-semibold ${subtitleColor}`}>{subtitle}</p>
  </div>
);

const AnimatedBarChart: React.FC = () => {
    const bars = [
        { height: '60%', delay: '0s' },
        { height: '80%', delay: '0.1s' },
        { height: '50%', delay: '0.2s' },
        { height: '90%', delay: '0.3s' },
        { height: '70%', delay: '0.4s' },
        { height: '40%', delay: '0.5s' },
        { height: '85%', delay: '0.6s' },
        { height: '65%', delay: '0.7s' },
    ];

    return (
        <div className="h-40 flex items-end justify-between bg-white rounded-2xl p-4 border border-gray-200/80 mb-6">
            {bars.map((bar, index) => (
                <div 
                    key={index} 
                    className="w-8 bg-brand-blue rounded-t-md" 
                    style={{ 
                        height: bar.height, 
                        animation: `pulse-bar 1.5s infinite alternate`,
                        animationDelay: bar.delay
                    }}
                ></div>
            ))}
        </div>
    );
};


export const LenderVolume: React.FC = () => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-200/80 w-full h-full">
            <AnimatedBarChart />

            <div className="flex flex-col gap-6">
                <StatCard title="Total Lenders" value="482" subtitle="+12 this week" subtitleColor="text-green-500" showSpinner={true} />
                <StatCard title="Average Loan Size" value="$1,850" subtitle="Stable" subtitleColor="text-blue-500" showSpinner={true} />
                <StatCard title="30-Day Volume" value="$480K" subtitle="+5.2%" subtitleColor="text-green-500" />
            </div>
        </div>
    );
};