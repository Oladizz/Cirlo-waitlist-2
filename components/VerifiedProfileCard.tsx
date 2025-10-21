import React from 'react';

const VerifiedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

export const VerifiedProfileCard: React.FC = () => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-200/80 w-full shadow-lg shadow-gray-200/50">
            <div className="flex items-center space-x-6">
                <img
                    src="https://picsum.photos/seed/profile/100/100"
                    alt="User profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white ring-2 ring-gray-200"
                />
                <div>
                    <div className="flex items-center space-x-2">
                        <h3 className="text-2xl font-bold text-gray-900">Alex Johnson</h3>
                        <VerifiedIcon />
                    </div>
                    <p className="text-gray-500">@alexj</p>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 text-center">
                <div>
                    <p className="text-3xl font-bold text-gray-900">24</p>
                    <p className="text-md text-gray-500">Loans Completed</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-gray-900">100%</p>
                    <p className="text-md text-gray-500">On-time Repayments</p>
                </div>
            </div>

            <div className="mt-8">
                <button className="w-full bg-brand-blue text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors">
                    View Profile
                </button>
            </div>
        </div>
    );
};
