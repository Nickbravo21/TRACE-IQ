import React, { useState } from 'react';

const Login = () => {
  const [userId, setUserId] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId.trim()) {
      // Store user ID in localStorage (simple auth for demo)
      localStorage.setItem('traceiq_user_id', userId);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TraceIQ</h1>
          <p className="text-gray-600">AI-powered error tracking for developers</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your user ID (e.g., nick, john, mary)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              For demo purposes, enter any identifier
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="space-y-1 text-xs">
              <li>• Real-time error tracking</li>
              <li>• AI-powered explanations</li>
              <li>• Multi-project support</li>
              <li>• Advanced filtering and search</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;