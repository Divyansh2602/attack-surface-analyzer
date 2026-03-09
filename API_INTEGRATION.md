# CivicShield AI - API Integration Guide

Complete documentation for frontend-backend API integration.

## Overview

The frontend communicates with the FastAPI backend using:
- **Protocol**: HTTP/REST
- **Authentication**: JWT Bearer tokens
- **Content-Type**: application/json
- **Base URL**: `http://localhost:8000` (configurable via `NEXT_PUBLIC_API_URL`)

## Setup

### 1. Backend Requirements

Ensure your FastAPI backend has CORS enabled:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",      # Development
        "http://localhost:3001",      # Alternative port
        "https://yourdomain.com",     # Production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 2. Frontend Configuration

Set the API URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, update to your deployed backend URL.

## API Endpoints

### Authentication

#### Register
```http
POST /register
Content-Type: application/json

{
  "username": "newuser",
  "password": "securepassword123"
}
```

**Response (201)**:
```json
{
  "message": "User registered successfully"
}
```

**Implementation**:
```typescript
import { authAPI } from '@/lib/api'

await authAPI.register('newuser', 'securepassword123')
```

#### Login
```http
POST /login
Content-Type: application/json

{
  "username": "user",
  "password": "password123"
}
```

**Response (200)**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Implementation**:
```typescript
const response = await authAPI.login('user', 'password123')
const { access_token } = response.data
// Token is automatically stored in cookies and attached to future requests
```

### Dashboard

#### Get Dashboard Data
```http
GET /dashboard
Authorization: Bearer <access_token>
```

**Response (200)**:
```json
{
  "total_scans": 42,
  "total_vulns": 157,
  "critical_risk": 5,
  "high_risk": 18,
  "medium_risk": 134,
  "risk_score": 67,
  "risk_label": "HIGH",
  "trend_labels": ["2026-03-03", "2026-03-04", ...],
  "trend_counts": [5, 8, 12, ...],
  "vuln_list": [
    {
      "risk": "high",
      "type": "SQL Injection",
      "url": "https://example.com/api/users",
      "param": "id"
    }
  ]
}
```

**Implementation**:
```typescript
import { dashboardAPI } from '@/lib/api'

const data = await dashboardAPI.getDashboard()
```

### Scan Management

#### Start Scan
```http
POST /scan
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "target": "https://example.com"
}
```

**Response (200)**:
```json
{
  "scan_id": 123,
  "status": "queued"
}
```

**Implementation**:
```typescript
const response = await scanAPI.startScan('https://example.com')
const scanId = response.data.scan_id
```

#### Get Scan Status
```http
GET /scan/{scan_id}
Authorization: Bearer <access_token>
```

**Response (200) - Running**:
```json
{
  "scan_id": 123,
  "status": "running",
  "error": null
}
```

**Response (200) - Completed**:
```json
{
  "scan_id": 123,
  "status": "completed",
  "result": {
    "target": "https://example.com",
    "findings": [
      {
        "risk": "high",
        "vuln": "SQL Injection",
        "url": "https://example.com/api/users",
        "param": "id",
        "payload": "1' OR '1'='1",
        "evidence": "Database error in response"
      }
    ]
  },
  "error": null
}
```

**Implementation**:
```typescript
const status = await scanAPI.getScanStatus(123)
console.log(status.data.status) // 'completed'
console.log(status.data.result)  // Full scan results
```

#### Get Scans List
```http
GET /scans
Authorization: Bearer <access_token>
```

**Response (200)**:
```json
[
  {
    "id": 123,
    "target_url": "https://example.com",
    "status": "completed",
    "created_at": "2026-03-09T10:30:00"
  }
]
```

**Implementation**:
```typescript
const scans = await scanAPI.getScans()
```

### Phishing Detection

#### Check URL
```http
POST /phishing/check?url=https://example.com
Authorization: Bearer <access_token>
```

**Response (200)**:
```json
{
  "is_phishing": false,
  "confidence": 0.95,
  "reasons": [
    "Domain has valid SSL certificate",
    "Domain age is 5+ years",
    "Domain matches major brand"
  ]
}
```

**Implementation**:
```typescript
const result = await phishingAPI.checkPhishing('https://example.com')
console.log(result.data.is_phishing)  // boolean
console.log(result.data.confidence)   // 0.0 - 1.0
console.log(result.data.reasons)      // string[]
```

### Report Generation

#### Generate PDF Report
```http
GET /report/{scan_id}
Authorization: Bearer <access_token>
```

**Response (200)**:
- Returns binary PDF file
- Header: `Content-Type: application/pdf`

**Implementation**:
```typescript
const response = await scanAPI.generateReport(123)
// Response is already a Blob, create download link
const url = window.URL.createObjectURL(new Blob([response.data]))
const link = document.createElement('a')
link.href = url
link.setAttribute('download', `report_123.pdf`)
document.body.appendChild(link)
link.click()
link.parentNode?.removeChild(link)
```

## Error Handling

### Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Process response data |
| 201 | Created | Process response data |
| 400 | Bad Request | Validate input |
| 401 | Unauthorized | Redirect to login |
| 404 | Not Found | Show error message |
| 500 | Server Error | Show error message |

### Error Response Format

```json
{
  "detail": "Invalid URL format"
}
```

### Axios Interceptor (Auto-handles)

```typescript
// In lib/api.ts
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## Authentication Flow

### Token Lifecycle

1. **Registration/Login**: User sends credentials
   ```typescript
   const response = await authAPI.login(username, password)
   const token = response.data.access_token
   ```

2. **Token Storage**: Automatically stored in httpOnly cookie
   ```typescript
   Cookies.set('auth_token', token, { expires: 7 })
   ```

3. **Token Attachment**: Automatically added to all requests
   ```typescript
   // In api.ts interceptor
   config.headers.Authorization = `Bearer ${token}`
   ```

4. **Token Expiration**: 401 response triggers logout redirect

## CORS Configuration

### Development
```python
allow_origins=[
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
]
```

### Production
```python
allow_origins=[
    "https://yourdomain.com",
    "https://www.yourdomain.com",
]
```

## Testing API Endpoints

### Using cURL

```bash
# Login
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"pass"}'

# Get Dashboard (with token)
curl -X GET http://localhost:8000/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"

# Start Scan
curl -X POST http://localhost:8000/scan \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"target":"https://example.com"}'
```

### Using Frontend Code

```typescript
// In any page/component
import { authAPI, scanAPI, dashboardAPI } from '@/lib/api'

// These automatically handle authorization
await authAPI.login('user', 'pass')
const dashboard = await dashboardAPI.getDashboard()
const scan = await scanAPI.startScan('https://example.com')
```

## Debugging

### Enable Network Logging

Add to `lib/api.ts`:
```typescript
api.interceptors.request.use((config) => {
  console.log('[API Request]', config.method?.toUpperCase(), config.url)
  return config
})

api.interceptors.response.use(
  (response) => {
    console.log('[API Response]', response.status, response.data)
    return response
  },
  (error) => {
    console.error('[API Error]', error.response?.status, error.response?.data)
    return Promise.reject(error)
  }
)
```

### Common Issues

**CORS Error**: Backend missing CORS middleware
- Solution: Add CORSMiddleware to FastAPI

**401 Unauthorized**: Token is invalid/expired
- Solution: Log out and log back in

**Network Timeout**: Backend not responding
- Solution: Check if backend is running on correct port

**Cannot GET /api/dashboard**: Route doesn't exist
- Solution: Check API_URL environment variable

## Performance Optimization

### Request Deduplication

The frontend uses Axios which can be configured with request deduplication:

```typescript
// In lib/api.ts
const axiosRetry = require('axios-retry')
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
})
```

### Response Caching

Use Zustand for caching:

```typescript
const useDashboardStore = create((set) => ({
  data: null,
  cachedAt: null,
  
  setData: (data) => set({
    data,
    cachedAt: Date.now()
  }),
}))
```

### Polling Optimization

Use `setInterval` with cleanup:

```typescript
useEffect(() => {
  const poll = setInterval(fetchData, 30000) // 30 seconds
  return () => clearInterval(poll) // Cleanup
}, [])
```

---

For questions about the API, check the main backend README or FastAPI documentation.
