import React from 'react';

interface FeedItemProps {
    imgSrc: string;
    name: string;
    time: string;
    action: string;
    amount: string;
    currency: string;
}

const FeedItem: React.FC<FeedItemProps> = ({ imgSrc, name, time, action, amount, currency }) => (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl border border-gray-200/80">
        <img src={imgSrc} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <p className="font-bold text-gray-900">{name}</p>
                <p className="text-sm text-gray-400">{time}</p>
            </div>
            <p className="text-gray-600 mt-1">
                {action} <span className="font-bold text-gray-800">{amount} {currency}</span>
            </p>
        </div>
    </div>
);


export const SocialFeed: React.FC = () => {
    const feedItems = [
        {
            imgSrc: 'https://picsum.photos/seed/user1/80/80',
            name: 'Sarah K.',
            time: '2m ago',
            action: 'Just funded a loan for',
            amount: '0.5',
            currency: 'ETH'
        },
        {
            imgSrc: 'https://picsum.photos/seed/user2/80/80',
            name: 'Mike P.',
            time: '15m ago',
            action: 'Is looking to borrow',
            amount: '1,000',
            currency: 'USDC'
        },
        {
            imgSrc: 'https://picsum.photos/seed/user3/80/80',
            name: 'Jenny L.',
            time: '1h ago',
            action: 'Just got her loan for',
            amount: '2,500',
            currency: 'DAI fulfilled!'
        },
    ];

    return (
        <div className="w-full max-w-md space-y-4">
            {feedItems.map((item, index) => (
                <FeedItem key={index} {...item} />
            ))}
        </div>
    );
};
