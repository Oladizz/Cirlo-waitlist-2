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
  const [emailTemplateContent, setEmailTemplateContent] = useState('');
  const [editingEmailTemplate, setEditingEmailTemplate] = useState(false);
  const [emailTemplateLoading, setEmailTemplateLoading] = useState(true);
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

  const fetchEmailTemplate = async () => {
    try {
      const docRef = doc(db, 'settings', 'emailTemplate');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEmailTemplateContent(docSnap.data().content);
      } else {
        // Set a default template if none exists
        setEmailTemplateContent(`
          <p>Hello {{name}},</p>
          <p>Thank you for joining our waitlist! We are very excited to have you.</p>
          <p>We'll notify you as soon as we have more updates or when our service is ready.</p>
          <p>In the meantime, feel free to visit our website:</p>
          <p><a href="https://www.example.com" class="button">Visit Our Website</a></p>
          <p>Best regards,</p>
          <p>The Cirlo Team</p>
        `);
      }
    } catch (error) {
      console.error("Error fetching email template: ", error);
    } finally {
      setEmailTemplateLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlist();
    fetchEmailTemplate();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleSaveEmailTemplate = async () => {
    setEmailTemplateLoading(true);
    try {
      await updateDoc(doc(db, 'settings', 'emailTemplate'), {
        content: emailTemplateContent,
      });
      setEditingEmailTemplate(false);
      alert('Email template saved successfully!');
    } catch (error) {
      console.error('Error saving email template: ', error);
      alert('Failed to save email template.');
    } finally {
      setEmailTemplateLoading(false);
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

  if (loading || emailTemplateLoading) {
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
        {editingEmailTemplate ? (
          <div>
            <textarea
              className="w-full p-2 border rounded-md h-64 font-mono text-sm"
              value={emailTemplateContent}
              onChange={(e) => setEmailTemplateContent(e.target.value)}
            ></textarea>
            <button
              onClick={handleSaveEmailTemplate}
              className="mt-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 mr-2"
              disabled={emailTemplateLoading}
            >
              {emailTemplateLoading ? 'Saving...' : 'Save Template'}
            </button>
            <button
              onClick={() => setEditingEmailTemplate(false)}
              className="mt-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <div
              className="w-full p-2 border rounded-md bg-gray-50 h-64 overflow-auto font-mono text-sm"
              dangerouslySetInnerHTML={{ __html: emailTemplateContent }}
            ></div>
            <button
              onClick={() => setEditingEmailTemplate(true)}
              className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Edit Template
            </button>
          </div>
        )}
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
