import React from 'react';

const Navbar = () => {
  const userId = localStorage.getItem('traceiq_user_id') || 'Anonymous';

  const handleLogout = () => {
    localStorage.removeItem('traceiq_user_id');
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">TraceIQ</h1>
            <span className="ml-2 text-sm text-gray-500">Error Tracking</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, <span className="font-medium">{userId}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;