# CivicShield AI - Frontend

Modern, production-ready Next.js frontend for the CivicShield AI cyber security platform.

## Features

- 🔐 **Authentication System** - Secure login/register with JWT tokens
- 📊 **Executive Dashboard** - Real-time risk scoring, vulnerability metrics, and 7-day trends
- 🔍 **Scan Management** - Launch and monitor vulnerability scans
- ⚠️ **Vulnerability Tracking** - Detailed vulnerability analysis with filtering
- 🎣 **Phishing Detection** - Check URLs for phishing threats with confidence scoring
- 📱 **Responsive Design** - Mobile-first, fully responsive interface
- 🌙 **Dark Theme** - Professional dark theme optimized for security dashboards
- ⚡ **Real-time Updates** - Auto-refresh dashboard and scan status polling

## Tech Stack

- **Framework**: Next.js 16
- **UI Components**: Tailwind CSS with custom design tokens
- **State Management**: Zustand
- **Charts**: Recharts
- **HTTP Client**: Axios with interceptors
- **Authentication**: JWT with httpOnly cookies
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, pnpm, or bun
- Running CivicShield AI backend (FastAPI on port 8000)

### Installation

1. **Clone the repository** (if not already done):
```bash
git clone https://github.com/Divyansh2602/attack-surface-analyzer.git
cd attack-surface-analyzer
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Configure environment variables**:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set the API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. **Start the development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**:
```
http://localhost:3000
```

## Project Structure

```
attack-surface-analyzer/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Login page
│   │   └── register/page.tsx        # Registration page
│   ├── (protected)/
│   │   ├── dashboard/page.tsx       # Main dashboard
│   │   ├── scans/page.tsx           # Scan management
│   │   ├── vulnerabilities/page.tsx # Vulnerability tracking
│   │   ├── phishing/page.tsx        # Phishing detection
│   │   └── layout.tsx               # Protected layout with auth
│   ├── api/
│   │   └── dashboard/route.ts       # API proxy for dashboard
│   ├── globals.css                  # Global styles & design tokens
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Home page (redirects to dashboard)
├── components/
│   ├── button.tsx                   # Button component
│   ├── header.tsx                   # Top header with user info
│   └── sidebar.tsx                  # Navigation sidebar
├── lib/
│   ├── store.ts                     # Zustand auth store
│   ├── api.ts                       # Axios API client with interceptors
│   └── utils.ts                     # Utility functions (cn)
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── tailwind.config.ts               # Tailwind CSS config
├── postcss.config.js                # PostCSS config
├── next.config.js                   # Next.js config
└── .env.example                     # Environment variables template
```

## Key Features Explained

### Authentication Flow

1. User registers or logs in on `/login` or `/register`
2. JWT token is received and stored in httpOnly cookie
3. Token is automatically attached to all API requests via axios interceptor
4. Protected routes redirect unauthenticated users to login
5. Logout clears token and redirects to login page

### Dashboard

The dashboard displays:
- **Risk Score**: Weighted calculation (Critical ×10, High ×6, Medium ×3)
- **Vulnerability Counts**: Total vulnerabilities by severity
- **7-Day Trend**: Line chart showing daily scan activity
- **Risk Distribution**: Pie chart of vulnerability breakdown
- **Latest Vulnerabilities**: Table with 10 most recent findings

Auto-refreshes every 30 seconds via polling.

### Scan Management

Users can:
- Start new vulnerability scans against target URLs
- Monitor scan status in real-time (queued → running → completed)
- Download PDF reports when scans complete
- View scan history with auto-polling for status updates

### Vulnerability Tracking

Features include:
- Filterable vulnerability list by risk level
- Detailed vulnerability view with payload and evidence
- URL and parameter information
- Risk severity badges with color coding

### Phishing Detection

Users can:
- Check URLs for phishing threats
- View confidence scores
- See detection reasons
- Track check history

## API Integration

The frontend communicates with the FastAPI backend via:

```typescript
// Example API calls
await authAPI.login(username, password)
await authAPI.register(username, password)
await scanAPI.startScan(target)
await scanAPI.getScanStatus(scanId)
await phishingAPI.checkPhishing(url)
await dashboardAPI.getDashboard()
```

See `lib/api.ts` for all available endpoints.

## Customization

### Design Tokens

Edit `app/globals.css` to customize colors:
```css
:root {
  --primary: 200 100% 50%;        /* Blue */
  --secondary: 190 85% 45%;       /* Cyan */
  --destructive: 0 84% 60%;       /* Red */
  --background: 10 14% 3%;        /* Dark Gray */
  --foreground: 0 0% 98%;         /* Off White */
  /* ... more tokens ... */
}
```

### Styling

Uses Tailwind CSS with semantic design tokens. All colors are defined as CSS custom properties for easy theme customization.

## Performance

- **Code Splitting**: Pages are automatically code-split
- **Image Optimization**: Uses Next.js Image component
- **API Caching**: Zustand for efficient state management
- **CSS-in-JS**: Minimal runtime overhead with Tailwind

## Security

- **JWT Authentication**: Secure token-based auth
- **httpOnly Cookies**: Tokens not accessible to JavaScript
- **CORS**: Proper CORS configuration for API requests
- **Input Validation**: Client-side validation before API calls
- **XSS Protection**: React/Next.js built-in XSS protection

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Server

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | FastAPI backend URL | Yes |

## Troubleshooting

### CORS Issues
Ensure FastAPI backend has proper CORS headers. Update `main.py`:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 401 Unauthorized
Token may be expired. Log out and log back in via `/login`.

### API Not Responding
Check if FastAPI backend is running on `http://localhost:8000`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

See the main repository LICENSE file.

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new GitHub issue with detailed information
3. Contact the development team

---

**Built with ❤️ using Next.js**
