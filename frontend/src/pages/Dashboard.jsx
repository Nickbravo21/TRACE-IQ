import React, { useState, useEffect } from 'react';
import { getProjects, getLogs, explainLog, createProject } from '../services/api';
import Navbar from '../components/Navbar';

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
      alert('Failed to get AI explanation. Please try again.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPagination(prev => ({ ...prev, offset: 0 }));
  };

  const handleLoadMore = () => {
    if (!loading && pagination.hasMore) {
      loadLogs(pagination.offset, true);
    }
  };

  const handleProjectChange = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setSelectedProject(project);
    setLogs([]);
    setPagination(prev => ({ ...prev, offset: 0 }));
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      alert('Please enter a project name');
      return;
    }

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
      alert('Failed to create project. Please try again.');
    }
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

  const getSeverityColor = (message) => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('critical') || lowerMsg.includes('fatal')) return 'text-red-700 bg-red-50';
    if (lowerMsg.includes('error')) return 'text-red-600 bg-red-50';
    if (lowerMsg.includes('warning')) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track and resolve errors with AI-powered insights</p>
        </div>

        {/* Project Selector & Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Project Card */}
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Current Project</h3>
              <button
                onClick={() => setShowCreateProject(true)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                + New
              </button>
            </div>
            
            {projects.length > 0 ? (
              <div className="space-y-2">
                {projects.map(project => (
                  <button
                    key={project.id}
                    onClick={() => handleProjectChange(project.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedProject?.id === project.id
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {project.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No projects yet</p>
            )}
          </div>

          {/* Stats Cards */}
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Errors</h3>
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{logs.length}</p>
            <p className="text-sm text-gray-500 mt-1">In current view</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">AI Insights</h3>
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {logs.filter(log => log.explanation).length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Errors explained</p>
          </div>
        </div>

        {/* Search Bar */}
        {selectedProject && (
          <div className="bg-white rounded-xl p-4 shadow-soft mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search errors by message or URL..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}

        {/* Logs List */}
        {selectedProject && (
          <div className="space-y-4">
            {loading && logs.length === 0 ? (
              <div className="bg-white rounded-xl p-12 shadow-soft text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <p className="mt-4 text-gray-600">Loading errors...</p>
              </div>
            ) : logs.length === 0 ? (
              <div className="bg-white rounded-xl p-12 shadow-soft text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No errors found</h3>
                <p className="text-gray-600">
                  {searchQuery ? `No errors match "${searchQuery}"` : 'Start tracking errors to see them here'}
                </p>
              </div>
            ) : (
              <>
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-shadow overflow-hidden"
                  >
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${getSeverityColor(log.message)}`}>
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
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExplainLog(log.id);
                            }}
                            disabled={!!log.explanation}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              log.explanation
                                ? 'bg-green-50 text-green-700 cursor-default'
                                : 'bg-primary-600 text-white hover:bg-primary-700'
                            }`}
                          >
                            {log.explanation ? (
                              <span className="flex items-center space-x-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Explained</span>
                              </span>
                            ) : (
                              'Explain with AI'
                            )}
                          </button>
                          <svg
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              expandedLog === log.id ? 'transform rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {expandedLog === log.id && (
                      <div className="border-t border-gray-100 bg-gray-50 p-6 space-y-4">
                        {log.explanation && (
                          <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
                            <div className="flex items-start space-x-2 mb-2">
                              <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              <div className="flex-1">
                                <h4 className="font-semibold text-primary-900 mb-2">AI Explanation</h4>
                                <p className="text-sm text-primary-800 leading-relaxed whitespace-pre-wrap">
                                  {log.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {log.stack_trace && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Stack Trace</h4>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                              {log.stack_trace}
                            </pre>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Timestamp:</span>
                            <p className="text-gray-600">{new Date(log.occurred_at).toLocaleString()}</p>
                          </div>
                          {log.user_agent && (
                            <div>
                              <span className="font-medium text-gray-700">User Agent:</span>
                              <p className="text-gray-600 truncate">{log.user_agent}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {pagination.hasMore && (
                  <div className="text-center py-6">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="bg-white text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-soft disabled:opacity-50"
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* No Project State */}
        {!selectedProject && projects.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-soft text-center">
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to TraceIQ</h2>
            <p className="text-gray-600 mb-6">Create your first project to start tracking errors</p>
            <button 
              onClick={() => setShowCreateProject(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-soft"
            >
              Create Your First Project
            </button>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-soft-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Project</h3>
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">Choose a descriptive name for your project</p>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowCreateProject(false);
                  setNewProjectName('');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
