import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp, ArrowRight, Sparkles, Code, Terminal, Rocket, BarChart3 } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0f9ff 0%, #fef3f2 50%, #fef3c7 100%)' }}>
      {/* Colorful Mesh Background */}
      <div className="fixed inset-0 opacity-40" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.3) 0%, transparent 50%)' }}></div>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-60 blur-3xl -translate-x-1/2 -translate-y-1/2" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}></div>
      <div className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full opacity-60 blur-3xl translate-x-1/2" style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)' }}></div>
      <div className="absolute bottom-0 left-1/3 w-[800px] h-[800px] rounded-full opacity-60 blur-3xl translate-y-1/2" style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }}></div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur-2xl bg-white/60 border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)', boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                TraceIQ
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                How it works
              </a>
              <Link 
                to="/login" 
                className="px-6 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 font-medium transition-all"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border-2 border-white shadow-lg mb-8"
              style={{ background: 'linear-gradient(90deg, #dbeafe 0%, #fae8ff 50%, #fed7aa 100%)' }}
            >
              <Sparkles className="w-5 h-5" style={{ color: '#3b82f6' }} />
              <span className="text-sm font-bold" style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AI-powered error tracking
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-7xl sm:text-8xl lg:text-9xl font-black mb-8 tracking-tight leading-[0.95]"
            >style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Debug faster.
              </span>
              <br />
              <span className="text-gray-900">
                Ship smarter.
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto font-medium"
            >
              Stop wasting hours debugging. TraceIQ analyzes your errors with AI and 
              tells you exactly what's wrong <span className="text-primary-600 font-bold">in plain English.</span>
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link
                to="/login"
                className="group relative px-10 py-5 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center space-x-3"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)', boxShadow: '0 0 40px rgba(59, 130, 246, 0.7), 0 0 80px rgba(236, 72, 153, 0.4)' }}
              >
                <span>Get started free</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </Link>
              <a
                href="#how-it-works"
                className="px-10 py-5 bg-white/80 backdrop-blur-xl text-gray-900 rounded-2xl font-bold text-lg border-2 border-gray-200 hover:border-primary-300 hover:bg-white transition-all duration-300 hover:scale-105 shadow-soft-lg"
              >
                See how it works
              </a>
            </motion.div>
          </div>

          {/* Floating Code Preview with Vibrant Colors */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-24 max-w-6xl mx-auto"
          >
            <div className="relative">
              {/* Colorful Glow Effects */}opacity-40 blur-3xl rounded-3xl" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)' }}
              <div className="absolute -inset-4 bg-gradient-primary opacity-30 blur-3xl rounded-3xl"></div>
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotateX: [0, 2, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Terminal Header */}
                <div className="px-8 py-5 flex items-center space-x-3 border-b border-gray-700" style={{ background: 'linear-gradient(90deg, #1f2937 0%, #111827 50%, #000000 100%)' }}>
                  <div className="flex space-x-2.5">
                    <div className="w-4 h-4 rounded-full" style={{ background: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)', boxShadow: '0 0 20px rgba(248, 113, 113, 0.8)' }}></div>
                    <div className="w-4 h-4 rounded-full" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)' }}></div>
                    <div className="w-4 h-4 rounded-full" style={{ background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)', boxShadow: '0 0 20px rgba(52, 211, 153, 0.8)' }}></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400 font-mono text-sm">Error Console</span>
                  </div>
                </div>

                {/* Error Card */}
                <div className="p-10 bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex items-start space-x-6">
                    {/* Icon with gradient */}
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)', boxShadow: '0 0 30px rgba(220, 38, 38, 0.7)' }}
                    >
                      <div className="text-4xl">⚠️</div>
                    </motion.div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">TypeError: Cannot read property 'id'</h3>
                        <div className="flex items-center space-x-3">
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">
                            ERROR
                          </span>
                          <p className="text-sm text-gray-500 font-mono">src/api/users.js:42</p>
                        </div>
                      </div>
                      
                      {/* AI Explanation with Gradient */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="relative group"
                      >
                        {/* Gradient border effect */}rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-500" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)' }}></div>
                        
                        <div className="relative bg-white rounded-2xl p-6 border-2 border-transparent">
                          <div className="flex items-start space-x-3">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="w-6 h-6 flex-shrink-0" style={{ color: '#3b82f6' }} />
                            </motion.div>
                            <div className="flex-1">
                              <p className="text-base font-bold mb-2" style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                ✨ AI Explanation
                              </p>
                              <p className="text-gray-700 leading-relaxed">
                                The user object is <span className="font-bold" style={{ color: '#3b82f6' }}>undefined</span> when accessing user.id. 
                                This happens because the API response doesn't include user data when the session expires. 
                                Add a <span className="font-bold" style={{ color: '#8b5cf6' }}lude user data when the session expires. 
                                Add a <span className="font-bold text-accent-600">null check</span> before accessing properties.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section with Vibrant Colors */}
      <section id="features" className="relative py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-black text-gray-900 mb-6">
              Everything you need to
              <br />style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                fix bugs faster
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features wrapped in a beautiful, intuitive interface
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Insights",
                description: "Get instant explanations in plain English with actionable solutions",
                gradient: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)",
                bgGradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                shadow: "0 0 40px rgba(59, 130, 246, 0.6)",
                iconColor: "#ffffff"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Search millions of logs in milliseconds with smart filtering",
                gradient: "linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)",
                bgGradient: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)",
                shadow: "0 0 40px rgba(249, 115, 22, 0.6)",
                iconColor: "#ffffff"
              },
              {
                icon: TrendingUp,
                title: "Track Patterns",
                description: "Detect recurring issues and track error trends over time",
                gradient: "linear-gradient(135deg, #e879f9 0%, #d946ef 50%, #c026d3 100%)",
                bgGradient: "linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%)",
                shadow: "0 0 40px rgba(217, 70, 239, 0.6)",
                iconColor: "#ffffff"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-60 blur-xl transition duration-500" style={{ background: feature.gradient }}></div>
                
                <div className="relative rounded-3xl p-10 border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer" style={{ background: feature.bgGradient }}>
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500" style={{ background: feature.gradient, boxShadow: feature.shadow }}>
                    <feature.icon className="w-10 h-10" style={{ color: feature.iconColor }} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-black text-gray-900 mb-6">
              Simple. Powerful.
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Effective.
              </span>
            </h2>
            <p className="text-xl text-gray-600">Get started in three easy steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {[
              { step: "1", title: "Connect Your App", desc: "Integrate with a single line of code", gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", icon: Code, shadow: "0 0 40px rgba(59, 130, 246, 0.7)" },
              { step: "2", title: "AI Analyzes", desc: "Our AI processes and categorizes errors", gradient: "linear-gradient(135deg, #d946ef 0%, #c026d3 100%)", icon: Sparkles, shadow: "0 0 40px rgba(217, 70, 239, 0.7)" },
              { step: "3", title: "Get Insights", desc: "View clear explanations and solutions", gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", icon: Rocket, shadow: "0 0 40px rgba(249, 115, 22, 0.7)" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  className="relative w-24 h-24 text-white rounded-3xl flex items-center justify-center text-3xl font-black mx-auto mb-8"
                  style={{ background: item.gradient, boxShadow: item.shadow }}
                >
                  <item.icon className="w-12 h-12" strokeWidth={2.5} />
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg font-black text-gray-900 shadow-lg border-2 border-gray-100">
                    {item.step}
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)' }}></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <h2 className="text-6xl sm:text-7xl font-black text-gray-900 mb-8 leading-tight">
            Ready to stop debugging and
            <br />
            <span style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              start building?
            </span>
          </h2>
          <p className="text-2xl text-gray-600 mb-12 font-medium">
            Join developers who save hours every week with TraceIQ
          </p>
          <Link
            to="/login"
            className="inline-flex items-center space-x-3 px-12 py-6 text-white rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)', boxShadow: '0 0 60px rgba(59, 130, 246, 0.8), 0 0 100px rgba(236, 72, 153, 0.5)' }}
          >
            <span>Get started free</span>
            <ArrowRight className="w-7 h-7" strokeWidth={3} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative bg-white border-t border-gray-200 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)', boxShadow: '0 0 25px rgba(59, 130, 246, 0.6)' }}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">TraceIQ</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                AI-powered error tracking for modern teams
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#features" className="hover:text-primary-600 transition-colors font-medium">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-primary-600 transition-colors font-medium">How it works</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="mailto:contact@traceiq.com" className="hover:text-primary-600 transition-colors font-medium">Contact</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors font-medium">Privacy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gradient-primary text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Code className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600 font-medium">
              © 2026 TraceIQ. Built with ❤️ for developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
