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
  <div className="bg-white p-6 rounded-2xl border border-gray-200/80">
    <p className="text-md text-gray-500">{title}</p>
    <p className="text-4xl font-bold text-gray-900 my-2">{value}</p>
    <p className={`text-sm font-semibold ${subtitleColor}`}>{subtitle}</p>
    {showSpinner && <div className="mt-3 w-5 h-5 rounded-full border-2 border-gray-200 opacity-80"></div>}
  </div>
);

export const BorrowerVolume: React.FC = () => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-200/80 w-full h-full">
            <div className="grid grid-cols-2 gap-6">
                <StatCard title="Total Volume" value="$2.44M" subtitle="Live updates" subtitleColor="text-green-500" showSpinner={true} />
                <StatCard title="Active Loans" value="1,244" subtitle="Ongoing transactions" subtitleColor="text-blue-500" showSpinner={true} />
                <StatCard title="Total Users" value="1,845" subtitle="Platform members" subtitleColor="text-purple-500" />
                <StatCard title="Platform Fee" value="$2.40M" subtitle="Total collected" subtitleColor="text-orange-500" />
            </div>
        </div>
    );
};