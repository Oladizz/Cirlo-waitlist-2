import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const EmailTemplateEditor: React.FC = () => {
  const [emailTemplateContent, setEmailTemplateContent] = useState('');
  const [emailTemplateLoading, setEmailTemplateLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEmailTemplate = async () => {
    try {
      const docRef = doc(db, 'settings', 'emailTemplate');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEmailTemplateContent(docSnap.data().content);
      } else {
        // Set a default template if none exists
        setEmailTemplateContent(`
          <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're on the Waitlist!</title>
    
    <!-- Load Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Load Inter font from Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* Apply Inter font family */
        body {
            font-family: 'Inter', sans-serif;
        }
        /* Style for the dark background */
        .email-bg {
            background-color: #000000; /* Pure black background */
        }
    </style>
</head>
<body class="email-bg text-gray-300 p-4 sm:p-8">

    <!-- Main Email Container -->
    <div class="max-w-xl mx-auto bg-[#1C1C1C] rounded-lg shadow-xl overflow-hidden">
        
        <!-- === LOGO LINK SECTION === -->
        <div class="p-6 sm:p-8">
            <!-- Replace '#' with your website URL -->
            <a href="#" class="inline-block">
                <!-- Replace the src URL with your logo's URL -->
                <img src="https://i.postimg.cc/bYCQ5vMD/Logo-COLORED.png" alt="Cirlo Logo" class="h-8 w-auto"
                     onerror="this.src='https://i.postimg.cc/jj3K5GXp/p2p-4-digital-platform.jpg'; this.onerror=null;">
            </a>
        </div>
        
        <!-- Image Banner -->
        <div>
            <!-- === PUT YOUR BANNER IMAGE URL HERE === -->
            <!-- Replace the src URL with your banner's URL -->
            <img src="https://i.postimg.cc/jj3K5GXp/p2p-4-digital-platform.jpg" class="w-full h-auto"
                 onerror="this.src='https://placehold.co/600x300/111111/dddddd?text=Cirlo+App+Preview'; this.onerror=null;">
        </div>
        
        <!-- Email Content -->
        <div class="p-6 sm:p-8">
            
            <!-- Headline -->
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
                You're on the wait-list!
            </h2>
            
            <!-- Body Text -->
            <p class="text-base text-gray-300 mb-4 leading-relaxed">
                We can't wait for you to try a new experience that brings together a social way for you to borrow and lend Crypto.
            </p>
            
            <p class="text-base text-gray-300 mb-4 leading-relaxed">
                Keep an eye on the invitation, which we'll send you as soon as it's ready.
            </p>
            
            <p class="text-base text-gray-300 mb-8 leading-relaxed">
                But click on the button and join your friends to earn now.
            </p>

            <!-- Call to Action (CTA) Button -->
            <a href="#" class="block w-full bg-white hover:bg-gray-200 text-black text-lg font-semibold text-center py-4 px-6 rounded-lg transition-colors duration-200">
                Join your circle
            </a>
        </div>

        <!-- Feature List Section -->
        <div class="p-6 sm:p-8 space-y-8">
            
            <!-- Feature 1: Lend and earn -->
            <div class="flex items-start space-x-5">
                <!-- Icon (SVG) -->
                <div class="w-12 h-12 flex-shrink-0">
                    <svg class="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-9l3-3 3 3m-3 12a9 9 0 110-18 9 9 0 010 18z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-9l3-3 3 3m-3 12a9 9 0 110-18 9 9 0 010 18z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6.75 6.75 0 000-13.5" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5.25a6.75 6.75 0 010 13.5" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-xl font-semibold text-white mb-1">Lend and earn</h3>
                    <p class="text-base text-gray-400">Turn your crypto assets into earnings by lending to your circle.</p>
                </div>
            </div>

            <!-- Feature 2: Borrow instantly -->
            <div class="flex items-start space-x-5">
                <!-- Icon (SVG) -->
                <div class="w-12 h-12 flex-shrink-0">
                    <svg class="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-xl font-semibold text-white mb-1">Borrow instantly</h3>
                    <p class="text-base text-gray-400">Get the funds you need in seconds, backed by your social network.</p>
                </div>
            </div>

            <!-- Feature 4: Social lending -->
            <div class="flex items-start space-x-5">
                <!-- Icon (SVG) -->
                <div class="w-12 h-12 flex-shrink-0">
                     <svg class="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 01-9-9 9 9 0 019-9m9 9a9 9 0 01-9 9m-9-9h18" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 009-9 9 9 0 00-9-9m-9 9a9 9 0 009 9" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-xl font-semibold text-white mb-1">Build your circle</h3>
                    <p class="text-base text-gray-400">Connect with friends and build a trusted network for lending and borrowing.</p>
                </div>
            </div>

        </div>
        
        <!-- Footer -->
        <div class="p-6 sm:p-8 border-t border-gray-700 mt-8">
            <!-- Footer Legal Text -->
            <p class="text-xs text-gray-500 mb-6">
                &copy; 2025 Cirlo. All rights reserved. <br>
                This information is for educational purposes only and is not investment advice.
            </p>

            <!-- Footer Links -->
            <div class="flex space-x-4 text-xs text-gray-400 mb-6">
                <a href="#" class="hover:text-white">Cirlo.com</a>
                <a href="#" class="hover:text-white">Get in touch</a>
                <a href="#" class="hover:text-white">Unsubscribe</a>
            </div>

            <!-- Social Media Icons -->
            <div class="flex space-x-5">
                <!-- X (Twitter) -->
                <a href="#" class="text-gray-500 hover:text-gray-300">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.25 2.25h6.588l4.418 5.893L18.244 2.25zM16.908 19.55h1.567L7.02 4.19H5.32l11.588 15.36z"></path>
                    </svg>
                </a>
                <!-- Instagram -->
                <a href="#" class="text-gray-500 hover:text-gray-300">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919 4.919 1.266.058 1.644.07 4.85.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948C23.728 2.69 21.31 1.274 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path>
                    </svg>
                </a>
                <!-- TikTok -->
                <a href="#" class="text-gray-500 hover:text-gray-300">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.18 3.06.28 4.59.7-.01 1.4-.03 2.1-.05.02 1.5.04 3 .05 4.5.7-.02 1.4-.04 2.1-.06.02 1.5.03 3 .05 4.5.7-.02 1.4-.04 2.1-.06.01 1.5.02 3 .04 4.5-.7-.01-1.4-.03-2.1-.05-.01 1.5-.02 3-.04 4.5-.7-.01-1.4-.03-2.1-.05-.02-1.5-.04-3-.05-4.5-.7-.01-1.4-.03-2.1-.05-.02-1.5-.03-3-.05-4.5-.7-.01-1.4-.03-2.1-.05-.01-1.5-.02-3-.04-4.5.7-.01 1.4-.03 2.1-.05.02-1.5.04-3 .05-4.5.7-.01 1.4-.03 2.1-.05.01-1.5.02-3 .04-4.5.01 0 .01 0 .01 0zm-2.01 6.3c-.01 1.4-.02 2.8-.04 4.2-.69-.01-1.39-.03-2.08-.05.02-1.4.04-2.8.05-4.2.7-.01 1.4-.03 2.1-.05zm-2.1-4.2c-.01 1.4-.02 2.8-.04 4.2-.69-.01-1.39-.03-2.08-.05.02-1.4.04-2.8.05-4.2.7-.01 1.4-.03 2.1-.05zm-2.1 4.2c-.01 1.4-.02 2.8-.04 4.2-.69-.01-1.39-.03-2.08-.05.02-1.4.04-2.8.05-4.2.7-.01 1.4-.03 2.1-.05zm-2.1 4.2c-.01 1.4-.02 2.8-.04 4.2-.69-.01-1.39-.03-2.08-.05.02-1.4.04-2.8.05-4.2.7-.01 1.4-.03 2.1-.05zm10.43 2.1c-.7.02-1.4.04-2.1.06-.02-1.5-.03-3-.05-4.5.7-.02 1.4-.04 2.1-.06.02 1.5.03 3 .05 4.5zm-2.1-4.5c-.7.02-1.4.04-2.1.06-.02-1.5-.03-3-.05-4.5.7-.02 1.4-.04 2.1-.06.02 1.5.03 3 .05 4.5z"></path>
                    </svg>
                </a>
            </div>
        </div>
        
    </div>

</body>
</html>
        `);
      }
    } catch (error) {
      console.error("Error fetching email template: ", error);
    } finally {
      setEmailTemplateLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailTemplate();
  }, []);

  const handleSaveEmailTemplate = async () => {
    setEmailTemplateLoading(true);
    try {
      await updateDoc(doc(db, 'settings', 'emailTemplate'), {
        content: emailTemplateContent,
      });
      alert('Email template saved successfully!');
    } catch (error) {
      console.error('Error saving email template: ', error);
      alert('Failed to save email template.');
    } finally {
      setEmailTemplateLoading(false);
    }
  };

  if (emailTemplateLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Email Template</h1>
        <button
          onClick={() => navigate('/admin')}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Back to Admin
        </button>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:order-last">
            <h3 className="text-lg font-bold mb-2">HTML Code Editor</h3>
            <textarea
              className="w-full p-2 border rounded-md h-96 font-mono text-sm"
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
          </div>
          <div className="md:order-first">
            <h3 className="text-lg font-bold mb-2">Live Preview</h3>
            <div
              className="w-full p-2 border rounded-md bg-gray-50 h-96 overflow-auto"
              dangerouslySetInnerHTML={{ __html: emailTemplateContent }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};