import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface WaitlistEntry {
  id: string;
  email: string;
  timestamp: any;
}

export const AdminPage: React.FC = () => {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'waitlist'));
        const waitlistData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as WaitlistEntry[];
        setWaitlist(waitlistData);
      } catch (error) {
        console.error("Error fetching waitlist: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWaitlist();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Waitlist Submissions</h1>
      <ul>
        {waitlist.map(entry => (
          <li key={entry.id} className="border-b p-2">
            {entry.email} - {new Date(entry.timestamp?.toDate()).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
