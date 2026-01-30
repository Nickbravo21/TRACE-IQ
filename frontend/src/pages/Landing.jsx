import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { Sparkles, Zap, TrendingUp, ArrowRight, Terminal, Code } from 'lucide-react';

const Landing = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const errorText = "TypeError: Cannot read property 'id' of undefined";

  useEffect(() => {
    // Typing animation
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= errorText.length) {
        setTypedText(errorText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowExplanation(true), 300);
      }
    }, 50);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background-main">
      {/* Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-background-main/80 border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">TraceIQ</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-text-secondary hover:text-text-primary font-medium transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-text-secondary hover:text-text-primary font-medium transition-colors">
                How it works
              </a>
              <Link 
                to="/login" 
                className="text-text-secondary hover:text-text-primary font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-soft mb-6"
          >
            <Sparkles className="w-4 h-4 text-brand" />
            <span className="text-sm font-semibold text-brand">AI-powered error tracking</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-text-primary mb-6 tracking-tight leading-none"
          >
            Debug faster.
            <br />
            <span className="text-5xl sm:text-6xl lg:text-7xl font-bold">Ship smarter.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto font-normal"
            style={{ lineHeight: '1.7' }}
          >
            Stop wasting hours debugging. TraceIQ analyzes your errors with AI and tells you exactly what's wrong in plain English.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/login"
              className="group px-8 py-3.5 bg-brand text-white rounded-lg font-semibold shadow-brand hover:bg-brand-hover hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Get started free
            </Link>
            <a
              href="#how-it-works"
              className="group flex items-center space-x-2 text-brand font-semibold"
            >
              <span>See how it works</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Error Console Card */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-card overflow-hidden"
            style={{ padding: '2rem', background: '#FFFFFF' }}
          >
            {/* Terminal Header */}
            <div className="bg-gray-900 -mx-8 -mt-8 px-6 py-3 flex items-center space-x-2 mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-status-error"></div>
                <div className="w-3 h-3 rounded-full bg-status-warning"></div>
                <div className="w-3 h-3 rounded-full bg-status-success"></div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Terminal className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 font-mono text-sm">Error Console</span>
              </div>
            </div>

            {/* Error Content */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div 
                  className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center"
                  style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
                >
                  <span className="text-2xl">⚠️</span>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-1 font-mono">
                      {typedText}
                      {typedText.length < errorText.length && showCursor && (
                        <span className="inline-block w-0.5 h-5 bg-brand ml-1 animate-blink"></span>
                      )}
                    </h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="px-2 py-0.5 bg-red-100 text-status-error rounded text-xs font-semibold">
                        ERROR
                      </span>
                      <p className="text-sm text-text-muted font-mono">src/api/users.js:42</p>
                    </div>
                  </div>
                  
                  {/* AI Explanation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={showExplanation ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4 }}
                    className="bg-brand-soft rounded-lg p-4 border border-brand/10"
                  >
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-brand mb-1">AI Explanation</p>
                        <p className="text-sm text-text-secondary leading-relaxed" style={{ lineHeight: '1.6' }}>
                          The user object is <span className="font-semibold text-text-primary">undefined</span> when accessing user.id. 
                          This happens because the API response doesn't include user data when the session expires. 
                          Add a <span className="font-semibold text-brand">null check</span> before accessing properties.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spacing instead of divider */}
      <div className="h-20"></div>

      {/* Features Section */}
      <section id="features" className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-text-secondary">
              Powerful features. Simple interface.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Plain English",
                description: "Instant explanations. No jargon. Just solutions.",
                delay: 0,
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Search millions of logs in milliseconds.",
                delay: 0.1,
              },
              {
                icon: TrendingUp,
                title: "Track Patterns",
                description: "Detect recurring issues before they escalate.",
                delay: 0.2,
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-soft flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-brand" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed" style={{ lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacing */}
      <div className="h-20"></div>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              Simple. Powerful.
            </h2>
            <p className="text-lg text-text-secondary">Get started in three steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { 
                step: "1", 
                title: "Connect", 
                desc: "One line of code",
                icon: Code
              },
              { 
                step: "2", 
                title: "AI Analyzes", 
                desc: "Instant categorization",
                icon: Sparkles
              },
              { 
                step: "3", 
                title: "Get Insights", 
                desc: "Clear explanations",
                icon: TrendingUp
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-16 h-16 bg-brand text-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-brand"
                >
                  <item.icon className="w-8 h-8" strokeWidth={2} />
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-text-primary rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {item.step}
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacing */}
      <div className="h-20"></div>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-white rounded-2xl p-12 shadow-card"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            Ready to stop debugging?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Join developers who save hours every week
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-3.5 bg-brand text-white rounded-lg font-semibold shadow-brand hover:bg-brand-hover hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Get started free
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200/50 py-12 px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-text-primary">TraceIQ</span>
              </div>
              <p className="text-text-secondary text-sm">
                AI-powered error tracking
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-text-primary mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#features" className="hover:text-brand transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-brand transition-colors">How it works</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-text-primary mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="mailto:contact@traceiq.com" className="hover:text-brand transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Privacy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-text-primary mb-3">Connect</h4>
              <a 
                href="#" 
                className="inline-flex w-10 h-10 rounded-lg bg-brand-soft text-brand items-center justify-center hover:bg-brand hover:text-white transition-all duration-300"
              >
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200/50 pt-6 text-center">
            <p className="text-text-muted text-sm">
              © 2026 TraceIQ. Built for developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
