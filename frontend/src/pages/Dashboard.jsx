import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertTriangle, TrendingUp, Search, LogOut, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [errors, setErrors] = useState([]);
  const [selectedError, setSelectedError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    // Load demo errors
    setErrors([
      {
        id: 1,
        type: 'TypeError',
        message: "Cannot read property 'id' of undefined",
        file: 'src/api/users.js',
        line: 42,
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        severity: 'high',
        count: 15
      },
      {
        id: 2,
        type: 'ReferenceError',
        message: "fetch is not defined",
        file: 'src/services/api.js',
        line: 18,
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        severity: 'medium',
        count: 8
      },
      {
        id: 3,
        type: 'SyntaxError',
        message: "Unexpected token '<'",
        file: 'src/utils/parser.js',
        line: 67,
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        severity: 'low',
        count: 3
      }
    ]);
  }, [navigate]);

  const handleExplainError = async (error) => {
    setSelectedError(error);
    setLoading(true);
    setAiExplanation('');

    // Simulate AI analysis
    setTimeout(() => {
      if (error.type === 'TypeError') {
        setAiExplanation(
          'This error occurs when trying to access a property on an undefined object. ' +
          'The user object is likely undefined at this point in the code. ' +
          'Add a null check before accessing properties: if (user && user.id) { ... }'
        );
      } else if (error.type === 'ReferenceError') {
        setAiExplanation(
          'fetch is not defined in this environment. ' +
          'This typically happens in Node.js environments before version 18. ' +
          'Install and import node-fetch: npm install node-fetch, then import fetch from "node-fetch"'
        );
      } else {
        setAiExplanation(
          'Unexpected token errors usually indicate a syntax issue or incorrect file type being parsed. ' +
          'Check if you\'re trying to parse HTML as JSON. Ensure Content-Type headers are correct.'
        );
      }
      setLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const filteredErrors = errors.filter(error =>
    error.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    error.file.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-main">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">TraceIQ</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Sign out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Dashboard</h1>
          <p className="text-text-secondary">Track and analyze your application errors</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Errors', value: errors.reduce((sum, e) => sum + e.count, 0), icon: AlertTriangle, color: 'text-status-error' },
            { label: 'Active Issues', value: errors.length, icon: TrendingUp, color: 'text-brand' },
            { label: 'Resolved Today', value: 12, icon: Sparkles, color: 'text-status-success' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-muted text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-brand-soft flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" strokeWidth={2} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search errors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-text-primary placeholder:text-text-muted"
            />
          </div>
        </div>

        {/* Error List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredErrors.map((error, index) => (
              <motion.div
                key={error.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
                onClick={() => handleExplainError(error)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      error.severity === 'high' ? 'bg-red-50' :
                      error.severity === 'medium' ? 'bg-yellow-50' :
                      'bg-blue-50'
                    }`}>
                      <AlertTriangle className={`w-5 h-5 ${
                        error.severity === 'high' ? 'text-status-error' :
                        error.severity === 'medium' ? 'text-status-warning' :
                        'text-brand'
                      }`} strokeWidth={2} />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-text-primary mb-1">
                        {error.type}: {error.message}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-text-muted">
                        <span className="font-mono">{error.file}:{error.line}</span>
                        <span>•</span>
                        <span>{new Date(error.timestamp).toLocaleTimeString()}</span>
                        <span>•</span>
                        <span className="font-semibold text-text-secondary">{error.count} occurrences</span>
                      </div>

                      {/* AI Explanation */}
                      {selectedError?.id === error.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-100"
                        >
                          {loading ? (
                            <div className="flex items-center space-x-3">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              >
                                <Sparkles className="w-5 h-5 text-brand" />
                              </motion.div>
                              <span className="text-text-secondary">Analyzing with AI...</span>
                            </div>
                          ) : (
                            <div className="bg-brand-soft rounded-lg p-4 border border-brand/10">
                              <div className="flex items-start space-x-3">
                                <Sparkles className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-bold text-brand mb-1">AI Explanation</p>
                                  <p className="text-sm text-text-secondary leading-relaxed" style={{ lineHeight: '1.6' }}>
                                    {aiExplanation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    error.severity === 'high' ? 'bg-red-100 text-status-error' :
                    error.severity === 'medium' ? 'bg-yellow-100 text-status-warning' :
                    'bg-blue-100 text-brand'
                  }`}>
                    {error.severity}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredErrors.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-brand-soft flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-brand" />
              </div>
              <p className="text-text-secondary">No errors found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
