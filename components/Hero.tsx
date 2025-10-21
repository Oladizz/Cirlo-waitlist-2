import React from 'react';

// A single item in the scrolling grid, can be text or an image
const GridItem: React.FC<{ item: { type: 'text' | 'image'; value: string } }> = ({ item }) => {
  if (item.type === 'image') {
    return (
      <img
        src={item.value}
        alt="In-stream image"
        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl inline-block mx-4 align-middle object-cover"
      />
    );
  }
  return (
    <span className="text-5xl md:text-7xl font-mono tracking-widest text-gray-200 font-bold mx-4 align-middle">
      {item.value}
    </span>
  );
};

// A row in the scrolling grid
const GridRow: React.FC<{ items: { type: 'text' | 'image'; value: string }[]; direction: 'left' | 'right' }> = ({ items, direction }) => {
  const repeatedItems = [...items, ...items]; // Duplicate for seamless animation
  const animationClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';

  return (
    <div className={animationClass}>
      <div className="flex whitespace-nowrap">
        {repeatedItems.map((item, index) => (
          <GridItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};


// The main scrolling grid component
const ScrollingGrid = () => {
    // Using picsum for placeholders to recreate the feel of the user's image
  const row1Items = [
    { type: 'image' as const, value: 'https://picsum.photos/seed/butterfly/100/100' },
    { type: 'text' as const, value: 'EARN' },
    { type: 'text' as const, value: 'LEND' },
    { type: 'text' as const, value: 'BORROW' },
  ];
  const row2Items = [
    { type: 'text' as const, value: 'LEND' },
    { type: 'text' as const, value: 'BORROW' },
    { type: 'image' as const, value: 'https://picsum.photos/seed/person/100/100' },
    { type: 'text' as const, value: 'EARN' },
  ];
   const row3Items = [
    { type: 'text' as const, value: 'BORROW' },
    { type: 'text' as const, value: 'EARN' },
    { type: 'text' as const, value: 'LEND' },
    { type: 'image' as const, value: 'https://picsum.photos/seed/abstract/100/100' },
  ];

  return (
    <div className="mb-12 h-72 md:h-96 relative overflow-hidden flex flex-col justify-around space-y-4">
      <GridRow items={row1Items} direction="left" />
      <GridRow items={row2Items} direction="right" />
      <GridRow items={row3Items} direction="left" />
    </div>
  );
};


export const Hero: React.FC = () => {
  return (
    <section className="pt-0 pb-20 md:pb-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollingGrid />

        <div className="text-left">
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] leading-tight font-extrabold tracking-tight text-gray-900">
            A new social lending.
          </h1>
          
          <p className="mt-6 text-4xl md:text-5xl text-gray-600 max-w-3xl">
            Earn. borrow. Earn. All in your circle.
          </p>

          <div className="mt-10 max-w-md md:mt-12">
            <div className="rounded-md w-full">
              <form className="sm:flex">
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  required
                  className="w-full px-5 py-3 border border-gray-300 bg-white rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue" 
                  placeholder="Enter your email"
                />
                <button 
                  type="submit" 
                  className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0 bg-brand-blue text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Join the waitlist
                </button>
              </form>
            </div>
          </div>
          <p className="mt-4 text-lg text-gray-500">
            By continuing, you agree to our terms and how we collect your information.
          </p>
        </div>
      </div>
    </section>
  );
};