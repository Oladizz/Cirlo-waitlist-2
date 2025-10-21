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

// The main feature section component that holds the Borrower Search card
export const FeatureSection: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
                <div className="bg-white p-8 rounded-3xl border border-gray-200/80 w-full max-w-2xl">
                    <h2 className="text-3xl font-bold text-gray-900">Borrower Search</h2>
                    <p className="text-gray-500 mt-1 mb-6">Search for borrowers and view platform statistics.</p>

                    <div className="relative mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by borrower name, address, etc..."
                            className="w-full pl-14 pr-4 py-4 border border-gray-200 bg-white rounded-xl text-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <StatCard title="Total Volume" value="$2.44M" subtitle="Live updates" subtitleColor="text-green-500" showSpinner={true} />
                        <StatCard title="Active Loans" value="1,244" subtitle="Ongoing transactions" subtitleColor="text-blue-500" showSpinner={true} />
                        <StatCard title="Total Users" value="1,845" subtitle="Platform members" subtitleColor="text-purple-500" />
                        <StatCard title="Platform Fee" value="$2.40M" subtitle="Total collected" subtitleColor="text-orange-500" />
                    </div>
                </div>
            </div>
        </section>
    );
};