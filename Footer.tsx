import React from 'react';

const TwitterIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
);

const DiscordIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.317 4.3698C18.7915 3.74831 17.1858 3.28424 15.5248 3.01055C15.423 3.28424 15.2834 3.63427 15.1816 3.90796C13.1615 3.55793 11.2178 3.55793 9.27407 3.90796C9.13449 3.63427 8.99491 3.28424 8.89311 3.01055C7.23214 3.28424 5.62643 3.74831 4.10091 4.3698C0.495283 8.28313 -0.210212 11.9688 0.0535812 15.58C1.71455 16.9483 3.65825 17.7525 5.70834 18.2395C5.97213 17.7525 6.23593 17.1888 6.42332 16.6251C5.74619 16.3514 5.10686 15.9645 4.54401 15.5037C4.69267 15.4274 4.80352 15.3511 4.91438 15.2748C8.83783 17.4026 13.5937 17.4026 17.5171 15.2748C17.628 15.3511 17.7388 15.4274 17.8875 15.5037C17.3246 15.9645 16.6853 16.3514 16.0082 16.6251C16.1956 17.1888 16.4594 17.7525 16.7232 18.2395C18.7733 17.7525 20.717 16.9483 22.378 15.58C22.6806 11.6951 21.8987 8.01097 20.317 4.3698ZM8.02013 13.0113C7.02636 13.0113 6.20658 12.1158 6.20658 11.0259C6.20658 9.93603 7.02636 9.04052 8.02013 9.04052C9.01391 9.04052 9.83368 9.93603 9.83368 11.0259C9.83368 12.1158 9.01391 13.0113 8.02013 13.0113ZM14.4034 13.0113C13.4096 13.0113 12.5898 12.1158 12.5898 11.0259C12.5898 9.93603 13.4096 9.04052 14.4034 9.04052C15.3972 9.04052 16.217 9.93603 16.217 11.0259C16.217 12.1158 15.3972 13.0113 14.4034 13.0113Z"/>
    </svg>
);


export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <img src="https://i.postimg.cc/mkG3YBb9/Logo-COLORED.png" alt="Cirlo Logo" className="h-10 w-auto" />
          <p className="text-center text-gray-500">
            Built on Base
          </p>
          <div className="flex justify-center space-x-6 pt-4">
            <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
              <span className="sr-only">Twitter</span>
              <TwitterIcon />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <LinkedInIcon />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
              <span className="sr-only">Discord</span>
              <DiscordIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};