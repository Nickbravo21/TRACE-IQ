import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects, getLogs, explainLog, createProject } from '../services/api';
import { Sparkles, Search, Plus, AlertCircle, TrendingUp, Zap, ChevronDown, Loader2, X } from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [expandedLog, setExpandedLog] = useState(null);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 50,
    hasMore: true
  });

  const userId = localStorage.getItem('traceiq_user_id') || 'Anonymous';

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadLogs();
    }
  }, [selectedProject, searchQuery]);

  const loadProjects = async () => {
    try {
      const projectData = await getProjects();
      setProjects(projectData);
      if (projectData.length > 0 && !selectedProject) {
        setSelectedProject(projectData[0]);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const loadLogs = async (offset = 0, append = false) => {
    if (!selectedProject) return;
    
    setLoading(true);
    try {
      const params = {
        project_id: selectedProject.id,
        limit: pagination.limit,
        offset: offset,
        ...(searchQuery && { q: searchQuery })
      };
      
      const logData = await getLogs(params);
      
      if (append) {
        setLogs(prev => [...prev, ...logData]);
      } else {
        setLogs(logData);
      }
      
      setPagination(prev => ({
        ...prev,
        offset: offset + logData.length,
        hasMore: logData.length === pagination.limit
      }));
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExplainLog = async (logId) => {
    try {
      const explanation = await explainLog(logId);
      setLogs(prevLogs =>
        prevLogs.map(log =>
          log.id === logId
            ? { ...log, explanation: explanation.explanation, explanationCached: explanation.cached }
            : log
        )
      );
    } catch (error) {
      console.error('Error explaining log:', error);
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    try {
      const userId = localStorage.getItem('traceiq_user_id') || 'anonymous';
      const newProject = await createProject({
        user_id: userId,
        name: newProjectName.trim()
      });
      
      setProjects(prev => [...prev, newProject]);
      setSelectedProject(newProject);
      setNewProjectName('');
      setShowCreateProject(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('traceiq_user_id');
    window.location.href = '/';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TraceIQ
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {userId.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {userId}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track and resolve errors with AI-powered insights</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-soft-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Projects</h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowCreateProject(true)}
                className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center hover:bg-primary-100 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>
            
            {projects.length > 0 ? (
              <div className="space-y-2">
                {projects.map(project => (
                  <motion.button
                    key={project.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedProject(project)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      selectedProject?.id === project.id
                        ? 'bg-gradient-primary text-white shadow-glow'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {project.name}
                  </motion.button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No projects yet</p>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 hover:shadow-soft-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Errors</h3>
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{logs.length}</p>
            <p className="text-sm text-gray-500 mt-1">In current view</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-soft-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">AI Insights</h3>
              <div className="w-10 h-10 bg-gradient-soft rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {logs.filter(log => log.explanation).length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Errors explained</p>
          </motion.div>
        </div>

        {/* Search */}
        {selectedProject && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-4 border border-gray-100 mb-6"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search errors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </motion.div>
        )}

        {/* Logs List */}
        {selectedProject && (
          <div className="space-y-4">
            <AnimatePresence>
              {loading && logs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl p-12 text-center border border-gray-100"
                >
                  <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading errors...</p>
                </motion.div>
              ) : logs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-12 text-center border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No errors found</h3>
                  <p className="text-gray-600">
                    {searchQuery ? `No errors match "${searchQuery}"` : 'Start tracking errors to see them here'}
                  </p>
                </motion.div>
              ) : (
                logs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-soft-lg transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="px-2 py-1 text-xs font-medium rounded bg-red-50 text-red-700">
                              ERROR
                            </span>
                            <span className="text-sm text-gray-500">{formatDate(log.occurred_at)}</span>
                          </div>
                          <h3 className="text-base font-semibold text-gray-900 mb-2 truncate">
                            {log.message}
                          </h3>
                          {log.url && (
                            <p className="text-sm text-gray-600 truncate">{log.url}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExplainLog(log.id);
                            }}
                            disabled={!!log.explanation}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${
                              log.explanation
                                ? 'bg-green-50 text-green-700 cursor-default'
                                : 'bg-gradient-primary text-white shadow-glow hover:shadow-glow-lg'
                            }`}
                          >
                            {log.explanation ? (
                              <span className="flex items-center space-x-1">
                                <Sparkles className="w-4 h-4" />
                                <span>Explained</span>
                              </span>
                            ) : (
                              'Explain with AI'
                            )}
                          </motion.button>
                          <motion.div
                            animate={{ rotate: expandedLog === log.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedLog === log.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-100 bg-gradient-soft p-6 space-y-4"
                        >
                          {log.explanation && (
                            <div className="bg-white rounded-xl p-4 border border-primary-100">
                              <div className="flex items-start space-x-2">
                                <Sparkles className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-primary-900 mb-2">AI Explanation</h4>
                                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {log.explanation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {log.stack_trace && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Stack Trace</h4>
                              <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto">
                                {log.stack_trace}
                              </pre>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {pagination.hasMore && !loading && logs.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => loadLogs(pagination.offset, true)}
                  className="px-6 py-3 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 hover:border-gray-300 hover:shadow-soft transition-all"
                >
                  Load more
                </motion.button>
              </motion.div>
            )}
          </div>
        )}

        {/* No Project State */}
        {!selectedProject && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-12 text-center border border-gray-100"
          >
            <div className="w-16 h-16 bg-gradient-soft rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to TraceIQ</h2>
            <p className="text-gray-600 mb-6">Create your first project to start tracking errors</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateProject(true)}
              className="px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all"
            >
              Create Your First Project
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Create Project Modal */}
      <AnimatePresence>
        {showCreateProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={() => setShowCreateProject(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-soft-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Create New Project</h3>
                <button
                  onClick={() => setShowCreateProject(false)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="mb-6">
                <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="My Awesome App"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateProject(false)}
                  className="flex-1 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateProject}
                  className="flex-1 px-4 py-2 bg-gradient-primary text-white rounded-xl font-medium hover:shadow-glow transition-all"
                >
                  Create
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
