# CivicShield AI Frontend - Quick Start Guide

Get the CivicShield AI frontend running in 5 minutes.

## 1. Prerequisites Check

Make sure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ FastAPI backend running on `http://localhost:8000`
- ✅ Git (to clone the repository)

## 2. Install Dependencies

```bash
npm install
```

Takes about 2-3 minutes depending on your internet speed.

## 3. Configure Environment

Create `.env.local` in the project root:

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

## 4. Start Development Server

```bash
npm run dev
```

You should see:
```
> next dev

  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

## 5. Open in Browser

Go to: **http://localhost:3000**

You'll be redirected to the login page.

## 6. Test Login

Create a test account:
1. Click "Create one" on the login page
2. Enter username: `testuser`
3. Enter password: `testpassword123`
4. Click "Create account"

You'll be logged in and see the dashboard!

## 7. Navigate the App

### 📊 Dashboard
- View risk score and vulnerability metrics
- See 7-day scan trend
- Monitor latest vulnerabilities

### 🔍 Scans
- Start new vulnerability scans
- Monitor scan progress
- Download PDF reports

### ⚠️ Vulnerabilities
- View all detected vulnerabilities
- Filter by risk level
- See detailed vulnerability information

### 🎣 Phishing Check
- Check URLs for phishing threats
- View detection confidence
- Track check history

## Troubleshooting

### Port Already in Use
If port 3000 is busy:
```bash
npm run dev -- -p 3001
```

### Backend Not Responding
Make sure FastAPI is running:
```bash
# In another terminal
cd attack-surface-analyzer
python -m uvicorn main:app --reload
```

### Can't Log In
1. Check backend is running
2. Make sure `.env.local` has correct API URL
3. Clear browser cookies and try again

## Next Steps

- 📖 Read [FRONTEND_README.md](./FRONTEND_README.md) for detailed documentation
- 🎨 Customize colors in `app/globals.css`
- 📝 Add more features to `app/(protected)/`
- 🚀 Deploy to Vercel

## Useful Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Check for TypeScript errors
npx tsc --noEmit

# Format code (if prettier is configured)
npm run format
```

## Files to Know

- **Login/Register**: `app/(auth)/login/page.tsx`, `app/(auth)/register/page.tsx`
- **Dashboard**: `app/(protected)/dashboard/page.tsx`
- **Styling**: `app/globals.css` (design tokens)
- **API Calls**: `lib/api.ts` (axios configuration)
- **Auth State**: `lib/store.ts` (Zustand store)

---

**Need help?** Check the [main README](./README.md) or [FRONTEND_README.md](./FRONTEND_README.md)
