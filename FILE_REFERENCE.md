# CivicShield AI Frontend - Complete File Reference

Complete directory structure and file descriptions.

## 📁 Full Project Tree

```
attack-surface-analyzer/
│
├── 📄 Configuration Files
│   ├── package.json                 # Dependencies & scripts
│   ├── tsconfig.json                # TypeScript configuration
│   ├── tailwind.config.ts           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   ├── next.config.js               # Next.js configuration
│   ├── .env.example                 # Environment variables template
│   ├── .env.local.example           # Local environment template
│   ├── .gitignore                   # Git ignore rules
│   ├── Dockerfile                   # Docker containerization
│   └── docker-compose.yml           # Docker orchestration
│
├── 📚 Documentation (8 files)
│   ├── README.md                    # Main project README
│   ├── QUICK_START.md               # 5-minute quick start ⭐
│   ├── FRONTEND_README.md           # Complete frontend docs
│   ├── IMPLEMENTATION_SUMMARY.md    # Project overview
│   ├── API_INTEGRATION.md           # API reference guide
│   ├── FEATURES.md                  # Feature documentation
│   ├── DEPLOYMENT.md                # Deployment guide
│   ├── DOCUMENTATION_INDEX.md       # Documentation navigation
│   ├── BUILD_SUMMARY.md             # Build completion summary
│   └── FILE_REFERENCE.md            # This file
│
├── 📦 Next.js App Directory (app/)
│   │
│   ├── 🔐 Authentication Routes (app/(auth)/)
│   │   ├── login/
│   │   │   └── page.tsx             # Login page
│   │   └── register/
│   │       └── page.tsx             # Registration page
│   │
│   ├── 🛡️ Protected Routes (app/(protected)/)
│   │   ├── layout.tsx               # Protected layout wrapper
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Main dashboard
│   │   ├── scans/
│   │   │   └── page.tsx             # Scan management
│   │   ├── vulnerabilities/
│   │   │   └── page.tsx             # Vulnerability tracking
│   │   └── phishing/
│   │       └── page.tsx             # Phishing detection
│   │
│   ├── 🔌 API Routes (app/api/)
│   │   └── dashboard/
│   │       └── route.ts             # Dashboard API proxy
│   │
│   ├── 🎨 Styling & Layout
│   │   ├── globals.css              # Global styles & design tokens
│   │   └── layout.tsx               # Root layout
│   │
│   └── 🏠 Pages
│       └── page.tsx                 # Home page (redirects)
│
├── 🧩 Components (components/)
│   ├── button.tsx                   # Button component
│   ├── header.tsx                   # Header component
│   └── sidebar.tsx                  # Sidebar navigation
│
├── 📚 Libraries (lib/)
│   ├── store.ts                     # Zustand auth store
│   ├── api.ts                       # Axios API client
│   └── utils.ts                     # Utility functions
│
├── 📦 Static Assets (public/)
│   └── (placeholder for images, icons, etc.)
│
└── 📁 Node Modules
    └── node_modules/                # Dependencies (created by npm install)
```

---

## 📋 File Descriptions

### Configuration Files

#### `package.json` (34 lines)
- Project metadata and dependencies
- npm scripts (dev, build, start, lint)
- All required packages with versions
- **Key packages**:
  - next, react, react-dom
  - typescript, tailwindcss
  - axios, zustand
  - recharts, date-fns

#### `tsconfig.json` (24 lines)
- TypeScript compiler options
- Strict mode enabled
- Path aliases configured (@/*)
- JSX preservation for Next.js

#### `tailwind.config.ts` (39 lines)
- Tailwind CSS configuration
- Design token colors
- Border radius settings
- Content paths configured

#### `postcss.config.js` (7 lines)
- PostCSS configuration
- Tailwind and Autoprefixer plugins

#### `next.config.js` (7 lines)
- Next.js framework configuration
- React Strict Mode enabled

#### `.env.example` (3 lines)
- Public API URL configuration template

#### `.env.local.example` (22 lines)
- Detailed environment configuration example
- Comments for each variable

#### `.gitignore` (40 lines)
- Git ignore rules
- Node modules, .next, .env files
- Python cache (__pycache__)
- IDE files (.vscode, .idea)

#### `Dockerfile` (55 lines)
- Multi-stage build for optimization
- Node.js 18 Alpine Linux base
- Production dependencies only
- Health check included
- Non-root user for security

#### `docker-compose.yml` (45 lines)
- Frontend service configuration
- Backend service dependency
- Network and volume setup
- Health checks configured

---

### Authentication Pages

#### `app/(auth)/login/page.tsx` (117 lines)
**Purpose**: User login page

**Features**:
- Username/password form
- Error message display
- Loading state
- Redirect on success
- Link to registration

**Key Variables**:
- `username`, `password`, `error`, `loading`

**API Used**:
- `authAPI.login()`

#### `app/(auth)/register/page.tsx` (143 lines)
**Purpose**: User registration page

**Features**:
- Username/password/confirm password form
- Password validation
- Error handling
- Auto-login after registration
- Link to login

**Key Variables**:
- `username`, `password`, `confirmPassword`, `error`, `loading`

**API Used**:
- `authAPI.register()`, `authAPI.login()`

---

### Protected Pages

#### `app/(protected)/layout.tsx` (49 lines)
**Purpose**: Wrapper for authenticated pages

**Features**:
- Auth check on load
- Redirect to login if unauthorized
- Sidebar and header components
- Main content area

**State Management**:
- `useAuthStore` for auth state

#### `app/(protected)/dashboard/page.tsx` (291 lines)
**Purpose**: Executive security dashboard

**Components**:
- Risk score display
- Vulnerability metrics
- 7-day trend chart
- Risk distribution pie chart
- Latest vulnerabilities table

**Charts Used**:
- LineChart (Recharts) for trend
- PieChart (Recharts) for distribution

**Auto-refresh**: Every 30 seconds

#### `app/(protected)/scans/page.tsx` (180 lines)
**Purpose**: Vulnerability scan management

**Features**:
- Start new scans
- Monitor scan progress
- View scan history
- Download PDF reports
- Real-time status polling

**API Used**:
- `scanAPI.startScan()`
- `scanAPI.getScanStatus()`
- `scanAPI.generateReport()`

#### `app/(protected)/vulnerabilities/page.tsx` (190 lines)
**Purpose**: Vulnerability tracking and analysis

**Features**:
- Complete vulnerability list
- Filter by risk level
- Detailed vulnerability view
- Payload and evidence display

**Filters**:
- All, Critical, High, Medium, Low

#### `app/(protected)/phishing/page.tsx` (167 lines)
**Purpose**: Phishing detection tool

**Features**:
- URL phishing analysis
- Confidence score display
- Detection reasons
- Check history

**API Used**:
- `phishingAPI.checkPhishing()`

---

### Components

#### `components/button.tsx` (47 lines)
**Purpose**: Reusable button component

**Features**:
- Multiple variants (default, secondary, destructive, outline, ghost)
- Multiple sizes (default, sm, lg, icon)
- Full accessibility support
- forwardRef for DOM access

**Variants**:
```typescript
variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'
size: 'default' | 'sm' | 'lg' | 'icon'
```

#### `components/header.tsx` (41 lines)
**Purpose**: Top navigation header

**Features**:
- User profile display
- Logout button
- Page title and description
- Responsive layout

**Imports**:
- Uses `useAuthStore` and `useRouter`

#### `components/sidebar.tsx` (61 lines)
**Purpose**: Navigation sidebar

**Features**:
- Logo and branding
- Navigation items
- Current page highlighting
- Responsive sidebar

**Navigation Items**:
- Dashboard, Scans, Vulnerabilities, Phishing Check

---

### Library Files

#### `lib/store.ts` (38 lines)
**Purpose**: Zustand authentication state management

**State Structure**:
```typescript
{
  token: string | null
  username: string | null
  isAuthenticated: boolean
  setAuth(token, username)
  clearAuth()
  loadFromStorage()
}
```

**Features**:
- JWT token storage in cookies
- Username in localStorage
- Persistent storage on page reload

#### `lib/api.ts` (63 lines)
**Purpose**: Axios API client with interceptors

**Interceptors**:
- Request: Attach JWT token
- Response: Auto-logout on 401

**API Methods**:
```typescript
authAPI.register()
authAPI.login()
scanAPI.startScan()
scanAPI.getScanStatus()
scanAPI.generateReport()
phishingAPI.checkPhishing()
dashboardAPI.getDashboard()
```

#### `lib/utils.ts` (7 lines)
**Purpose**: Utility functions

**Functions**:
- `cn()` - Tailwind class merger

---

### Global Styles

#### `app/globals.css` (56 lines)
**Purpose**: Global styles and design tokens

**CSS Custom Properties**:
- Colors (primary, secondary, destructive, etc.)
- Background and foreground colors
- Border radius
- Light/dark mode support

**Design Tokens**:
- 12 main color tokens
- Fully customizable
- HSL format for easy manipulation

---

### API Routes

#### `app/api/dashboard/route.ts` (37 lines)
**Purpose**: Server-side API proxy for dashboard

**Endpoint**:
- `GET /api/dashboard`

**Features**:
- Fetches dashboard data from backend
- Handles authorization headers
- Error handling

---

### Root Files

#### `app/layout.tsx` (23 lines)
**Purpose**: Root layout for entire application

**Features**:
- HTML head configuration
- Metadata (title, description)
- Children rendering
- Body styling

#### `app/page.tsx` (6 lines)
**Purpose**: Home page

**Behavior**:
- Redirects to `/dashboard`

---

## 📊 File Statistics

### By Category

| Category | Count | Lines |
|----------|-------|-------|
| Configuration | 10 | ~200 |
| Documentation | 10 | ~2,000 |
| Pages | 6 | ~900 |
| Components | 3 | ~150 |
| Libraries | 3 | ~100 |
| Styles | 1 | ~50 |
| **TOTAL** | **33** | **~3,400** |

### By Type

| Type | Count |
|------|-------|
| TypeScript/TSX | 15 |
| Markdown | 10 |
| JavaScript/JSON | 5 |
| YAML | 1 |
| CSS | 1 |
| Docker | 2 |

---

## 🎯 File Dependencies

### Pages → Components
```
dashboard/page.tsx
    ↓
    Header, Sidebar
    
scans/page.tsx
    ↓
    Header, Sidebar, Button
    
vulnerabilities/page.tsx
    ↓
    Header, Sidebar, Button
    
phishing/page.tsx
    ↓
    Header, Sidebar, Button
```

### All Pages → Libraries
```
All pages
    ↓
    useAuthStore (lib/store.ts)
    scanAPI, authAPI, phishingAPI (lib/api.ts)
    cn() (lib/utils.ts)
```

### Pages → Styles
```
All pages
    ↓
    app/globals.css (design tokens)
```

---

## 🔄 File Import Flow

```
Root (layout.tsx)
    ↓
globals.css (tokens)
    ↓
Protected Layout ((protected)/layout.tsx)
    ↓
Header & Sidebar
    ↓
Pages
    ↓
Components & API (lib/)
```

---

## 📝 Essential Files to Edit

### For Customization

1. **Colors**: `app/globals.css`
   - Edit `:root` CSS variables

2. **Navigation**: `components/sidebar.tsx`
   - Edit `navItems` array

3. **API URL**: `.env.local`
   - Set `NEXT_PUBLIC_API_URL`

4. **Pages**: `app/(protected)/*.tsx`
   - Add new functionality

5. **Components**: `components/*.tsx`
   - Reuse and modify

---

## 🚀 File Organization Best Practices

- ✅ App router structure in `app/`
- ✅ Components grouped in `components/`
- ✅ Utilities grouped in `lib/`
- ✅ Pages in route folders
- ✅ Styles in global and component level
- ✅ Configuration files in root

---

## 📂 Adding New Features

### New Page
```
app/(protected)/newpage/
    └── page.tsx
```

### New Component
```
components/new-component.tsx
```

### New Utility
```
lib/new-utility.ts
```

### New API Method
Add to `lib/api.ts`:
```typescript
export const newAPI = {
  method: (params) => api.get('/endpoint', { params }),
}
```

---

## 🔍 File Search Guide

### Find by Feature
- **Authentication**: `app/(auth)/`
- **Dashboard**: `app/(protected)/dashboard/`
- **Scans**: `app/(protected)/scans/`
- **Vulnerabilities**: `app/(protected)/vulnerabilities/`
- **Phishing**: `app/(protected)/phishing/`

### Find by Type
- **Pages**: `app/` (all .tsx files)
- **Components**: `components/`
- **Utilities**: `lib/`
- **Styles**: `app/globals.css`
- **Config**: Root directory

### Find by Purpose
- **API Client**: `lib/api.ts`
- **State**: `lib/store.ts`
- **Auth Check**: `app/(protected)/layout.tsx`
- **Navigation**: `components/sidebar.tsx`
- **UI**: `components/`

---

## 📋 Important Files Checklist

Essential files that must exist:

- ✅ `package.json` - Dependencies
- ✅ `tsconfig.json` - TypeScript config
- ✅ `next.config.js` - Next.js config
- ✅ `app/layout.tsx` - Root layout
- ✅ `app/globals.css` - Global styles
- ✅ `.env.local` - Environment vars
- ✅ `lib/store.ts` - Auth state
- ✅ `lib/api.ts` - API client

---

## 🔧 Configuration Files Purpose

| File | Purpose | When to Edit |
|------|---------|-------------|
| `package.json` | Dependencies | Add new packages |
| `tsconfig.json` | TypeScript | Rarely needed |
| `tailwind.config.ts` | Tailwind | Add fonts/colors |
| `next.config.js` | Next.js | Add middleware |
| `.env.local` | Environment | API URL, secrets |
| `.gitignore` | Git | Rarely needed |
| `Dockerfile` | Docker | Advanced changes |

---

## 📚 Documentation File Purposes

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation |
| `QUICK_START.md` | 5-minute setup |
| `FRONTEND_README.md` | Complete frontend guide |
| `IMPLEMENTATION_SUMMARY.md` | Project overview |
| `API_INTEGRATION.md` | API reference |
| `FEATURES.md` | Feature documentation |
| `DEPLOYMENT.md` | Deployment guide |
| `DOCUMENTATION_INDEX.md` | Doc navigation |
| `BUILD_SUMMARY.md` | Build completion |
| `FILE_REFERENCE.md` | This file |

---

## 🎯 Quick File Locations

```
Want to...                          Look in...
------------------------------------------
Change colors                       app/globals.css
Add a page                          app/(protected)/
Add a component                     components/
Add an API method                   lib/api.ts
Change auth state                   lib/store.ts
Change navigation                   components/sidebar.tsx
Edit a page                         app/(protected)/*.tsx
Understand the API                  lib/api.ts
Set environment variables           .env.local
Deploy to Docker                    Dockerfile
```

---

**Last Updated**: 2026-03-09

**Total Files**: 33

**Total Lines**: ~3,400

**Fully Documented**: ✅ Yes
