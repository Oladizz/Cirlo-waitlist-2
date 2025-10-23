import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface WaitlistEntry {
  id: string;
  email: string;
  timestamp: any;
}

export const AdminPage: React.FC = () => {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Waitlist Submissions</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
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
