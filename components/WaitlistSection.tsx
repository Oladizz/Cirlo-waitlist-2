import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { db } from '../firebase'; // Adjust the import path as needed
import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState('');

  useEffect(() => {
    const fetchEmailTemplate = async () => {
      try {
        const docRef = doc(db, 'settings', 'emailTemplate');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEmailTemplate(docSnap.data().content);
        } else {
          // Fallback to a default template if not found in Firestore
          setEmailTemplate(`
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
        toast.error("Failed to load email template.");
      }
    };
    fetchEmailTemplate();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    if (!email) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setMessage('');

    try {
      console.log("Attempting to add document for email:", email);

      // Check for duplicate email
      const q = query(collection(db, 'waitlist'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error('This email is already on the waitlist. Please use a different email or contact support if you believe this is an error.');
        setLoading(false);
        return;
      }

      await addDoc(collection(db, 'waitlist'), {
        email: email,
        timestamp: serverTimestamp(),
      });
      setMessage(`Thank you for joining the waitlist, ${email}!`);
      toast.success('Successfully joined the waitlist!');
      setEmail('');
      console.log("Document added successfully.");

      // Call backend to send email
      const response = await fetch('/send-waitlist-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientEmail: email, htmlContent: emailTemplate }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Failed to send email. Please try again.');
      }

    } catch (error) {
      console.error('FIREBASE_ERROR: ', error);
      setMessage('Something went wrong. Please try again.');
      toast.error('Failed to join the waitlist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">Get on the Waitlist.</h2>
          <p className="text-xl md:text-2xl text-gray-600 mt-4">
            The new experience is coming to all Cirlo users soon.
          </p>
          <div className="mt-10 max-w-md md:mt-12 mx-auto">
            <div className="rounded-md w-full">
              <form onSubmit={handleSubmit} className="sm:flex">
                <input
                  type="email"
                  name="email"
                  id="email-footer"
                  required
                  className="w-full px-5 py-3 border border-gray-300 bg-white rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0 bg-gray-900 text-white font-bold py-3 px-6 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Joining...' : 'Join the waitlist'}
                </button>
              </form>
            </div>
          </div>
          {message && (
            <p className="mt-4 text-lg text-gray-600">{message}</p>
          )}
          <p className="mt-4 text-lg text-gray-500">
            Sign up to receive product updates.
          </p>
        </div>
      </div>
    </section>
  );
};