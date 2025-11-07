import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
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
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const navigate = useNavigate();

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

  useEffect(() => {
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

  const handleDeleteEntry = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteDoc(doc(db, 'waitlist', id));
        setWaitlist(waitlist.filter(entry => entry.id !== id));
        alert('Entry deleted successfully!');
      } catch (error) {
        console.error('Error deleting entry: ', error);
        alert('Failed to delete entry.');
      }
    }
  };

  const handleSendBroadcast = async () => {
    if (!broadcastSubject || !broadcastMessage) {
      alert('Please enter a subject and message for the broadcast.');
      return;
    }

    if (window.confirm('Are you sure you want to send this email to all users on the waitlist?')) {
      try {
        const emails = waitlist.map(user => user.email);
        const response = await fetch('/broadcast-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emails,
            subject: broadcastSubject,
            htmlContent: broadcastMessage,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message || 'Broadcast email sent successfully!');
          setBroadcastSubject('');
          setBroadcastMessage('');
        } else {
          alert(data.message || 'Failed to send broadcast email. Please try again.');
        }
      } catch (error) {
        console.error('Error sending broadcast email: ', error);
        alert('Something went wrong. Please try again.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Email Template Management</h2>
        <button
          onClick={() => navigate('/admin/email-template')}
          className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Edit Welcome Email Template
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Broadcast Email to All Users</h2>
        <input
          type="text"
          placeholder="Subject"
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          value={broadcastSubject}
          onChange={e => setBroadcastSubject(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded-md h-64 font-mono text-sm"
          value={broadcastMessage}
          onChange={(e) => setBroadcastMessage(e.target.value)}
        ></textarea>
        <button
          onClick={handleSendBroadcast}
          className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Send Broadcast
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Waitlist Submissions</h2>
        <ul>
          {waitlist.map(entry => (
            <li key={entry.id} className="border-b p-2 flex justify-between items-center">
              <span>{entry.email} - {new Date(entry.timestamp?.toDate()).toLocaleString()}</span>
              <button
                onClick={() => handleDeleteEntry(entry.id)}
                className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
