# CivicShield AI Frontend - Features Guide

Comprehensive overview of all frontend features and how to use them.

## 🔐 Authentication System

### User Registration
**Path**: `/register`

Features:
- Username validation
- Password confirmation matching
- Password strength requirements (minimum 6 characters)
- Automatic login after successful registration
- Error handling and user feedback

**Usage**:
1. Click "Create one" on login page
2. Enter desired username
3. Enter password (6+ characters)
4. Confirm password
5. Click "Create account"

### User Login
**Path**: `/login`

Features:
- Session persistence (7-day cookie)
- "Remember me" functionality
- Secure JWT token handling
- Automatic redirect to dashboard
- Error messages for invalid credentials

**Usage**:
1. Go to `/login`
2. Enter username and password
3. Click "Sign in"
4. Redirected to dashboard if successful

## 📊 Executive Dashboard

**Path**: `/dashboard` (Default landing page)

### Risk Score Card
Displays the overall cyber risk score with:
- **Large Circular Display**: Shows risk score 0-100
- **Risk Labels**: CRITICAL, HIGH, MEDIUM, LOW
- **Color Coding**: Red (critical), Orange (high), Yellow (medium), Green (low)
- **Weighted Calculation**:
  - Critical vulnerabilities: ×10 weight
  - High vulnerabilities: ×6 weight
  - Medium vulnerabilities: ×3 weight

### Vulnerability Metrics
Shows breakdown by severity:
- Critical count (red badge)
- High count (orange badge)
- Medium count (yellow badge)
- Total vulnerability count

### Key Metrics
- Total scans executed
- Total vulnerabilities found
- Latest scan data

### 7-Day Scan Trend Chart
- Line chart showing daily scan activity
- Displays past 7 days automatically
- Helps identify scanning patterns
- Shows scan volume trends

### Risk Distribution Pie Chart
- Visual breakdown of vulnerability severity
- Color-coded segments (red, orange, yellow)
- Helps prioritize remediation

### Latest Vulnerabilities Table
- 10 most recent vulnerabilities
- Columns: Risk, Type, URL, Parameter
- Click "View All" to see complete list
- Color-coded risk badges

### Auto-Refresh
- Dashboard auto-refreshes every 30 seconds
- Manual refresh supported
- Real-time data updates

## 🔍 Vulnerability Scans

**Path**: `/scans`

### Start New Scan
Launch vulnerability scans against target URLs:

**Features**:
- Input validation (requires http:// or https://)
- Real-time scan progress
- Status tracking: queued → running → completed/failed
- Error handling

**Usage**:
1. Enter target URL (e.g., `https://example.com`)
2. Click "Start Scan"
3. Scan ID is generated and tracked
4. Monitor progress in real-time

### Scan Status Monitoring
Shows for each scan:
- **Scan ID**: Unique identifier
- **Status**: Current state (queued, running, completed, failed)
- **Target**: Original target URL
- **Results**: Number of findings (when completed)
- **Error**: Error message (if failed)

**Status Colors**:
- 🟨 Yellow: Queued
- 🔵 Blue: Running
- 🟢 Green: Completed
- 🔴 Red: Failed

### Scan Polling
- Automatically checks scan status every 2 seconds
- Stops when scan completes or fails
- Updates UI in real-time
- No manual refresh needed

### PDF Report Generation
Download detailed pentesting reports:

**Features**:
- Generated when scan completes
- Contains:
  - Target summary
  - All findings with details
  - Risk breakdown
  - Professional formatting
- Auto-download on click
- Filename: `report_{scan_id}.pdf`

**Usage**:
1. Wait for scan to complete
2. Click "Download Report" button
3. PDF automatically downloads to computer

## ⚠️ Vulnerability Management

**Path**: `/vulnerabilities`

### Vulnerability List
Browse all discovered vulnerabilities with:
- **Risk Level**: Color-coded severity badges
- **Type**: Vulnerability type (SQLi, XSS, etc.)
- **URL**: Affected endpoint
- **Quick View**: Click row to see details

### Risk Level Filter
Filter by severity:
- **All**: Show all vulnerabilities
- **Critical**: Only critical findings
- **High**: High severity issues
- **Medium**: Medium severity issues
- **Low**: Low severity issues

### Detailed Vulnerability View
Click any vulnerability to see:
- **Full Name**: Detailed vulnerability type
- **Risk Badge**: Color-coded severity
- **Scan ID**: Which scan found it
- **URL**: Full affected endpoint
- **Parameter**: Vulnerable parameter (if applicable)
- **Payload**: Test payload that triggered it
- **Evidence**: Response indicating vulnerability

### Vulnerability Details
Each vulnerability shows:
```
Type: SQL Injection
Risk: High
URL: https://example.com/api/users
Parameter: id
Payload: 1' OR '1'='1
Evidence: SQL syntax error in response
```

## 🎣 Phishing Detection

**Path**: `/phishing`

### URL Phishing Check
Analyze URLs for phishing threats:

**Features**:
- URL input validation
- Real-time analysis
- Confidence scoring
- Detection reasons
- Check history tracking

**Usage**:
1. Enter URL to check (must start with http:// or https://)
2. Click "Check URL"
3. View results with confidence score
4. See detection reasons if applicable

### Phishing Results
Each result displays:
- **Status**: Safe (green) or Phishing (red)
- **Confidence**: 0-100% confidence level
- **URL**: The URL that was checked
- **Timestamp**: When it was checked
- **Reasons**: List of detection factors

### Confidence Scoring
- **95-100%**: Very high confidence
- **75-94%**: High confidence
- **50-74%**: Medium confidence
- **Below 50%**: Low confidence / Likely safe

### Detection Reasons
System provides reasons like:
- "Domain has valid SSL certificate"
- "Domain age is 5+ years"
- "Domain matches major brand"
- "Suspicious character substitutions detected"
- "Known phishing pattern detected"

### Check History
View all previous phishing checks:
- Chronologically ordered (newest first)
- Shows URL, result, and confidence
- Useful for tracking potential threats

## 🧭 Navigation

### Sidebar Navigation
Quick access to all features:
- **Dashboard** (📊): Main security dashboard
- **Scans** (🔍): Scan management
- **Vulnerabilities** (⚠️): Vulnerability tracking
- **Phishing Check** (🎣): Phishing detection

**How to use**:
- Click any item to navigate
- Current page is highlighted
- Shows app version and name

### Top Header
User information and logout:
- **User Profile**: Shows logged-in username
- **Logout Button**: Securely log out (clears token)
- **Page Title**: Current page name
- **Page Description**: What the page does

## 🎨 User Interface

### Color Scheme
- **Primary Blue**: Main actions and highlights
- **Cyan**: Secondary actions
- **Dark Background**: Professional dark theme
- **Red**: Critical risks and errors
- **Orange**: High risks
- **Yellow**: Medium risks
- **Green**: Low risks / Safe status

### Responsive Design
- **Desktop**: Full sidebar + main content
- **Tablet**: Optimized layout
- **Mobile**: Stack layout (coming soon)

### Status Indicators
- **Badges**: Risk levels (CRITICAL, HIGH, MEDIUM, LOW)
- **Colors**: Consistent across all pages
- **Icons**: Visual cues (⚠️, ✓, →, etc.)

## ⚡ Real-time Features

### Dashboard Auto-Refresh
- 30-second polling interval
- Automatic updates without manual refresh
- Maintains user context

### Scan Status Polling
- 2-second polling during active scans
- Automatic stop when complete
- Reduces server load with smart polling

### Responsive Updates
- Charts update in real-time
- Vulnerability list refreshes automatically
- No page reloads needed

## 🔒 Security Features

### Authentication
- JWT token-based security
- httpOnly cookie storage
- Automatic token refresh
- Secure logout

### Session Management
- 7-day session persistence
- Automatic logout on token expiration
- Protected routes with auth checks

### CORS Protection
- Credentials-enabled requests
- Same-origin policy enforcement
- Backend CORS headers required

## 📱 Accessibility

### Keyboard Navigation
- Tab through inputs
- Enter to submit forms
- Escape to close modals (future)

### Screen Reader Support
- Semantic HTML elements
- ARIA labels where needed
- Descriptive button text

### Visual Accessibility
- High contrast dark theme
- Clear visual hierarchy
- Color not the only indicator
- Readable font sizes

## 🚀 Performance Features

### Code Splitting
- Pages load only needed code
- Faster initial page load
- Reduced bundle size

### Image Optimization
- Lazy loading images
- Responsive image serving
- Optimized for different screen sizes

### Caching
- Zustand state management
- Reduces redundant API calls
- Browser caching enabled

## 🔧 Developer Features

### TypeScript Support
- Full type safety
- IntelliSense in IDE
- Compile-time error checking

### Error Handling
- User-friendly error messages
- Network error recovery
- Detailed console logs

### API Integration
- Centralized API client
- Automatic auth token handling
- Request/response interceptors

---

## Feature Roadmap

Future planned features:
- [ ] Mobile responsive layout
- [ ] Dark/Light theme toggle
- [ ] Advanced filtering and search
- [ ] Email notifications
- [ ] Scheduled scans
- [ ] Vulnerability remediation suggestions
- [ ] Team collaboration features
- [ ] Detailed analytics and reporting
- [ ] WebSocket real-time updates
- [ ] Export scan results (CSV, JSON)

---

**For setup instructions**, see [QUICK_START.md](./QUICK_START.md)

**For API details**, see [API_INTEGRATION.md](./API_INTEGRATION.md)
