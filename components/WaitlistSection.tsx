import React from 'react';

export const WaitlistSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <div className="text-left">
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">Ready to join?</h2>
            <p className="text-xl md:text-2xl text-gray-600 mt-4">
              Sign up for the waitlist to get early access to Cirlo.
            </p>
            <div className="mt-10 max-w-md md:mt-12">
              <div className="rounded-md w-full">
                <form className="sm:flex">
                  <input
                    type="email"
                    name="email"
                    id="email-footer"
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
              Your information is safe with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};