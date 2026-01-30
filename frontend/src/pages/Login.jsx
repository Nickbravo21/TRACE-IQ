import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo login - just store a user ID
    localStorage.setItem('userId', 'demo-user-123');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background-main flex items-center justify-center p-6">
      {/* Back to home link */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center space-x-2 text-text-secondary hover:text-brand transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back</span>
      </Link>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-card p-10">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-brand flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">TraceIQ</h1>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-text-primary text-center mb-2 mt-6">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-text-secondary text-center mb-8">
            {isLogin ? 'Sign in to your account' : 'Start tracking errors smarter'}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-text-primary placeholder:text-text-muted"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-text-primary placeholder:text-text-muted"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand text-white font-semibold rounded-lg shadow-brand hover:bg-brand-hover hover:shadow-brand-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center mt-6 text-text-secondary">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-brand font-semibold hover:underline transition-all"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
