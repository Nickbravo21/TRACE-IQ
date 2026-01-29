import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!userId.trim()) {
      setError('Please enter a user ID');
      return;
    }
    
    if (userId.trim().length < 2) {
      setError('User ID must be at least 2 characters');
      return;
    }
    
    localStorage.setItem('traceiq_user_id', userId.trim());
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 py-12">
      {/* Back to Home Link */}
      <div className="w-full max-w-md mb-4">
        <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-soft-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to TraceIQ</h1>
          <p className="text-gray-600">Sign in to start tracking errors</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="userId" className="block text-sm font-semibold text-gray-700 mb-2">
              User ID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setError('');
              }}
              placeholder="Enter your username"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                error
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-200 focus:ring-primary-500 focus:border-transparent'
              }`}
              required
            />
            {error ? (
              <p className="text-sm text-red-600 mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </p>
            ) : (
              <p className="text-xs text-gray-500 mt-2">
                Demo mode: enter any username (e.g., nick, sarah, alex)
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-soft"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center mb-4">What you'll get:</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">Real-time tracking</span>
            </div>
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">AI explanations</span>
            </div>
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">Multi-project</span>
            </div>
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">Smart search</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-8 text-sm text-gray-500 text-center max-w-md">
        This is a demo environment. Your data is stored locally and not shared.
      </p>
    </div>
  );
};

export default Login;
