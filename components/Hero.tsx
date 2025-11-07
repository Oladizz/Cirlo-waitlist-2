import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../firebase'; // Adjust the import path as needed
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

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
const GridRow: React.FC<{ items: { type: 'text' | 'image'; value: string }[]; direction: 'left' | 'right' | 'up' | 'down' }> = ({ items, direction }) => {
  const repeatedItems = [...items, ...items]; // Duplicate for seamless animation
  let animationClass = '';
  switch (direction) {
    case 'left':
      animationClass = 'animate-scroll-left';
      break;
    case 'right':
      animationClass = 'animate-scroll-right';
      break;
    case 'up':
      animationClass = 'animate-scroll-up';
      break;
    case 'down':
      animationClass = 'animate-scroll-down';
      break;
  }

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
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setLoading(true);

    try {
      // 1. Check for duplicate email in Firebase
      const q = query(collection(db, 'waitlist'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error('This email is already on the waitlist. Please use a different email or contact support if you believe this is an error.');
        setLoading(false);
        return;
      }

      // 2. Add to Firebase
      await addDoc(collection(db, 'waitlist'), {
        email: email,
        timestamp: serverTimestamp(),
      });

      // 3. Call backend to send email
      const response = await fetch('/send-waitlist-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientEmail: email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Successfully joined the waitlist and email sent!');
        setEmail('');
      } else {
        toast.error(data.message || 'Failed to send email. Please try again.');
      }

    } catch (error) {
      console.error('Error joining waitlist or sending email: ', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-0 pb-20 md:pb-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollingGrid />

        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl leading-tight font-extrabold tracking-tight text-gray-900">
            The Social Way to Borrow and Lend Crypto
          </h1>
          
          <p className="mt-6 text-4xl md:text-5xl text-gray-600 max-w-3xl mx-auto">
            Earn. borrow. Lend. All in your circle.
          </p>

          <div className="mt-10 max-w-md md:mt-12 mx-auto">
            <div className="rounded-md w-full">
              <form onSubmit={handleSubmit} className="sm:flex">
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  required
                  className="w-full px-5 py-3 border border-gray-300 bg-white rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0 bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Joining...' : 'Join the waitlist'}
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