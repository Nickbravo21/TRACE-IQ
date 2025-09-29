# TRACE-IQ

**TraceIQ** is an AI-powered error tracking tool built for developers, indie teams, and small startups. It captures runtime errors from your web applications, displays them in a centralized dashboard, and uses AI to help explain the root cause of each issue — so you can debug faster and ship more confidently.

---

## 🚀 Features

- **Real-time Error Tracking**: Capture frontend and backend errors as they happen
- **AI-Powered Explanations**: Get intelligent insights and solutions using OpenAI
- **Multi-Project Support**: Organize errors by project for better management
- **Advanced Filtering**: Search and filter errors by message, URL, or time
- **Clean Dashboard**: Intuitive React interface with detailed error views
- **REST API**: Complete FastAPI backend with comprehensive endpoints
- **PostgreSQL/SQLite**: Flexible database options for development and production

---

## 📁 Project Structure

```
TRACE-IQ/
├── backend/
│   ├── .env.example            # Environment configuration template
│   ├── requirements.txt        # Python dependencies
│   └── src/
│       ├── main.py            # FastAPI app, CORS, routers
│       ├── config.py          # Settings and environment loading
│       ├── database.py        # SQLModel engine and session management
│       ├── models/
│       │   ├── project_model.py   # Project SQLModel
│       │   └── log_model.py       # Log SQLModel
│       ├── schemas/
│       │   ├── project_schemas.py # Project DTOs
│       │   └── log_schemas.py     # Log DTOs
│       ├── routes/
│       │   ├── projects.py        # Project endpoints
│       │   └── logs.py            # Log endpoints + AI explain
│       └── services/
│           └── ai_service.py      # OpenAI integration with caching
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx                # Router + authentication
│       ├── main.jsx              # React entry point
│       ├── index.css             # Tailwind + custom styles
│       ├── pages/
│       │   ├── Dashboard.jsx     # Main error dashboard
│       │   └── Login.jsx         # Simple authentication
│       ├── components/
│       │   ├── Navbar.jsx        # Navigation bar
│       │   └── LogTable.jsx      # Error logs display
│       └── services/
│           └── api.js            # API client + TraceIQ SDK
└── README.md
```

---

## 🛠 Quick Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and API keys
   ```

5. **Run the server:**
   ```bash
   uvicorn src.main:app --reload --host 127.0.0.1 --port 8000
   ```
   
   Backend will be available at: `http://127.0.0.1:8000`
   
   Interactive API docs: `http://127.0.0.1:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will be available at: `http://localhost:5173`

---

## 🔧 Configuration

### Backend Environment Variables (.env)

```bash
# Database (choose one)
DATABASE_URL=sqlite:///./traceiq.db                                    # Development
DATABASE_URL=postgresql://username:password@localhost:5432/traceiq_db  # Production

# OpenAI (optional - for AI explanations)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Authentication (future feature)
CLERK_SECRET_KEY=clerk_secret_key_here

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables (optional)

Create `frontend/.env.local`:
```bash
VITE_API_URL=http://127.0.0.1:8000
```

---

## 📖 API Usage Examples

### Create a Project

```bash
curl -X POST "http://127.0.0.1:8000/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "nick",
    "name": "My Portfolio Site"
  }'
```

### Log an Error

```bash
curl -X POST "http://127.0.0.1:8000/logs" \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "your-project-uuid-here",
    "message": "Uncaught TypeError: Cannot read property of undefined",
    "stack_trace": "TypeError: Cannot read property...\n  at main.js:42:15",
    "url": "https://myapp.com/dashboard",
    "user_agent": "Mozilla/5.0...",
    "occurred_at": "2025-09-28T23:00:00Z"
  }'
```

### Get AI Explanation

```bash
curl -X POST "http://127.0.0.1:8000/logs/{log_id}/explain"
```

---

## 🔌 Integration SDK

### JavaScript/React Integration

```javascript
import { TraceIQClient } from './services/api.js';

// Initialize client
const traceiq = new TraceIQClient('your-project-id');

// Manual error logging
try {
  // Your code here
} catch (error) {
  await traceiq.logError(error, {
    url: window.location.href,
    userAgent: navigator.userAgent
  });
}

// Auto-capture all errors
traceiq.enableAutoCapture();
```

### Node.js/Express Integration

```javascript
const axios = require('axios');

const logErrorToTraceIQ = async (error, context = {}) => {
  try {
    await axios.post('http://127.0.0.1:8000/logs', {
      project_id: 'your-project-id',
      message: error.message,
      stack_trace: error.stack,
      url: context.url || 'server',
      user_agent: context.userAgent || 'Node.js Server',
      occurred_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('Failed to log to TraceIQ:', err.message);
  }
};

// Express error middleware
app.use((error, req, res, next) => {
  logErrorToTraceIQ(error, {
    url: req.url,
    userAgent: req.get('User-Agent')
  });
  
  res.status(500).json({ error: 'Internal Server Error' });
});
```

---

## 🚀 Features Roadmap

### Current Features ✅
- ✅ Complete FastAPI backend with comprehensive endpoints
- ✅ React frontend with authentication and dashboard
- ✅ AI-powered error explanations (OpenAI integration)
- ✅ Multi-project support
- ✅ Advanced filtering and search
- ✅ SQLite and PostgreSQL support
- ✅ JavaScript SDK for easy integration

### Upcoming Features 🔄
- 🔄 Real-time notifications and alerts
- 🔄 Error analytics and trends
- 🔄 Team collaboration features
- 🔄 Slack/Discord integrations
- 🔄 Advanced authentication (Clerk/Auth0)
- 🔄 Rate limiting and quotas
- 🔄 Error grouping and deduplication

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

- **Documentation**: Check the `/docs` endpoint when running the backend
- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Join our community discussions for questions and ideas

---

**Built with ❤️ for developers who want to ship faster and debug smarter.**

