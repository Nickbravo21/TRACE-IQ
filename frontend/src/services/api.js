import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add user ID if available
api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('traceiq_user_id');
  if (userId && config.params) {
    config.params.user_id = userId;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Project API functions
export const getProjects = async (userId) => {
  const currentUserId = userId || localStorage.getItem('traceiq_user_id');
  const response = await api.get('/projects', {
    params: currentUserId ? { user_id: currentUserId } : {}
  });
  return response.data;
};

export const createProject = async (projectData) => {
  const userId = localStorage.getItem('traceiq_user_id');
  const response = await api.post('/projects', {
    ...projectData,
    user_id: userId || 'anonymous'
  });
  return response.data;
};

export const getProject = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
};

export const updateProject = async (projectId, updateData) => {
  const response = await api.put(`/projects/${projectId}`, updateData);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await api.delete(`/projects/${projectId}`);
  return response.data;
};

// Log API functions
export const getLogs = async (params = {}) => {
  const response = await api.get('/logs', { params });
  return response.data;
};

export const createLog = async (logData) => {
  const response = await api.post('/logs', {
    ...logData,
    occurred_at: logData.occurred_at || new Date().toISOString()
  });
  return response.data;
};

export const getLog = async (logId) => {
  const response = await api.get(`/logs/${logId}`);
  return response.data;
};

export const deleteLog = async (logId) => {
  const response = await api.delete(`/logs/${logId}`);
  return response.data;
};

export const explainLog = async (logId) => {
  const response = await api.post(`/logs/${logId}/explain`);
  return response.data;
};

export const getProjectLogStats = async (projectId) => {
  const response = await api.get(`/logs/project/${projectId}/stats`);
  return response.data;
};

// Utility function to test API connection
export const healthCheck = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw new Error(`Backend connection failed: ${error.message}`);
  }
};

// TraceIQ client SDK for integration
export class TraceIQClient {
  constructor(projectId, apiUrl = 'http://127.0.0.1:8000') {
    this.projectId = projectId;
    this.apiUrl = apiUrl;
    this.api = axios.create({
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async logError(error, context = {}) {
    const errorData = {
      project_id: this.projectId,
      message: error.message || String(error),
      stack_trace: error.stack || 'No stack trace available',
      url: context.url || window.location.href,
      user_agent: context.userAgent || navigator.userAgent,
      occurred_at: new Date().toISOString(),
    };

    try {
      const response = await this.api.post('/logs', errorData);
      return response.data;
    } catch (err) {
      console.error('Failed to log error to TraceIQ:', err);
      // Fail silently in production - don't break the app if logging fails
    }
  }

  // Auto-capture unhandled errors
  enableAutoCapture() {
    // Capture unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError(event.error || new Error(event.message), {
        url: event.filename,
        line: event.lineno,
        column: event.colno
      });
    });

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError(
        event.reason instanceof Error ? event.reason : new Error(String(event.reason))
      );
    });
  }
}

// Export default API instance
export default api;