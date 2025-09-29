import React, { useState, useEffect } from 'react';
import { getProjects, getLogs, explainLog, createProject } from '../services/api';
import LogTable from '../components/LogTable';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 50,
    hasMore: true
  });

  // Load projects on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  // Load logs when project is selected
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
      // Update the log with explanation
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

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
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
      
      // Add the new project to the list and select it
      setProjects(prev => [...prev, newProject]);
      setSelectedProject(newProject);
      setNewProjectName('');
      setShowCreateProject(false);
      
      console.log('Project created successfully:', newProject);
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TraceIQ Dashboard</h1>
          <p className="text-gray-600">Monitor and analyze your application errors</p>
        </div>

        {/* Project Selector */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex-1">
              <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Project
              </label>
              <select
                id="project-select"
                value={selectedProject?.id || ''}
                onChange={handleProjectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={projects.length === 0}
              >
                {projects.length === 0 ? (
                  <option value="">No projects available</option>
                ) : (
                  projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            
            <div>
              <button
                onClick={() => setShowCreateProject(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                + New Project
              </button>
            </div>
            
            {selectedProject && (
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Logs
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search error messages or stack traces..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Create Project Modal */}
        {showCreateProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Project</h3>
              <div className="mb-4">
                <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowCreateProject(false);
                    setNewProjectName('');
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        {selectedProject && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {selectedProject.name} - Error Logs
            </h2>
            <p className="text-gray-600">
              Showing {logs.length} logs
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Logs Table */}
        {selectedProject && (
          <LogTable
            logs={logs}
            loading={loading}
            onExplainLog={handleExplainLog}
            onLoadMore={handleLoadMore}
            hasMore={pagination.hasMore}
          />
        )}

        {/* No Project Selected */}
        {!selectedProject && projects.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Projects Found</h2>
            <p className="text-gray-600 mb-6">Create a project first to start tracking errors</p>
            <button 
              onClick={() => setShowCreateProject(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;