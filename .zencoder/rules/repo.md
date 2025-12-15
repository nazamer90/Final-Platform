---
description: Repository Information Overview
alwaysApply: true
---

# EISHRO E-Commerce Platform - Repository Information

## Summary
EISHRO is a full-stack e-commerce platform designed for Libyan merchants. It's a monorepo containing a React frontend (Vite), Node.js/Express backend (TypeScript), and deployment configurations for Vercel and Docker.

## Repository Structure

**Root Level:**
- `./` - Frontend source (React + Vite)
- `./backend/` - Backend API (Express + TypeScript)
- `./DATA_FILES/` - Sample data and test assets
- `./data/` - Configuration data (banks, transport, payment)
- `./docs/` - Documentation
- `.zencoder/` - Project rules and configuration

## Main Components

1. **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Shadcn/ui
2. **Backend**: Express.js + TypeScript + Sequelize ORM (MySQL/PostgreSQL)
3. **Deployment**: Vercel (serverless), Docker, Railway, Render support
4. **API Features**: Product management, Orders, Payments (Moamalat), Authentication (JWT), Admin dashboard

---

## Frontend Configuration

**Package Manager**: npm  
**Entry Point**: `src/main.tsx` (Vite app)  
**Language**: TypeScript 5.8  
**Build System**: Vite 6.3.5  
**Key Dependencies**:
- React 19, React Router, Framer Motion
- Tailwind CSS 4.1, Shadcn/ui (Radix UI)
- Recharts (analytics), React Leaflet (maps)
- Form validation: React Hook Form + Zod

**Build & Scripts**:
```bash
npm run dev                # Frontend dev server
npm run build              # Vite production build
npm run lint               # ESLint
npm run dev:backend        # Backend dev server
```

**Environment Files**:
- `.env.example` - Template
- `.env.production` - Production config (includes `VITE_API_URL=/api`)

---

## Backend Configuration

**Package Manager**: npm  
**Language**: TypeScript 5.9  
**Entry Point**: `src/index.ts` (conditional startup)  
**Runtime**: Node.js ≥18.0.0  
**Framework**: Express 4.18.2  
**ORM**: Sequelize 6.37.7  

**Database Support**:
- MySQL 5.7+ (default local)
- PostgreSQL (auto-detected via `DATABASE_URL` env var)
- SQLite (fallback)

**Key Dependencies**:
- Authentication: JWT, bcryptjs
- Validation: Joi schemas
- Logging: Winston (console + file)
- Security: Helmet, express-rate-limit, CORS, CSURF
- Payments: Moamalat integration
- **Database Driver**: `pg` ^8.16.3 (PostgreSQL)

**Build & Scripts**:
```bash
npm run build              # tsc + tsc-alias (resolves path aliases)
npm run dev                # nodemon + ts-node
npm run typecheck          # TypeScript validation
npm run lint               # ESLint
npm test                   # Jest with coverage
npm run db:migrate         # Run database migrations
npm run db:seed            # Populate sample data
```

**Build Configuration**:
- TypeScript target: ES2020
- Path aliases: `@config/`, `@models/`, `@controllers/`, `@services/`, `@middleware/`, `@routes/`, `@validators/`, `@utils/`, `@migrations/`, `@database/`, `@security/`, `@shared-types/`
- Build output: `./dist/`
- Alias resolution: `tsc-alias` required (compiles aliases to actual paths)

---

## Serverless Configuration (Vercel)

**Frontend**: `vercel.json` - SPA routing, API rewrites to backend domain  
**Backend**: `backend/vercel.json`
- **Root Directory**: `backend`
- **Build**: `npm run vercel-build` (runs tsc + tsc-alias)
- **Handler**: `api/index.js` (exports Express app)
- **Environment Variables**: `NODE_ENV=production`, `VERCEL=true`, `SKIP_DB_INIT=true`
- **Includes**: `dist/**/*`

---

## Docker

**Frontend**: No Dockerfile (Vercel deployment)  
**Backend**: `backend/Dockerfile`
- **Base Image**: `node:18-alpine`
- **Multi-stage**: Builder stage (compile) + Runtime stage (production)
- **Setup**: Creates `logs/` and `database/` directories
- **Exposed Ports**: 8000, 8080
- **Health Check**: HTTP GET `/health` on port 8000
- **Entry**: `node start.js` (uses `start.js` script)

---

## Testing

**Framework**: Jest  
**Config**: `backend/jest.config.js`
- **Environment**: Node.js
- **Preset**: ts-jest (TypeScript support)
- **Test Paths**: `src/**/__tests__/**`, `src/**/*.{spec,test}.ts`
- **Coverage Thresholds**: 70% branches, 75% functions/lines/statements
- **Setup**: `tests/setup.ts`

**Run Tests**:
```bash
npm test                   # Full suite with coverage
npm run test:watch        # Watch mode
npm run test:unit         # Unit tests only
npm run test:integration  # Integration tests
npm run test:e2e          # E2E with Cypress
```

---

## API Entry Points

- **Frontend API**: `http://localhost:5173` (dev), Vercel domain (prod)
- **Backend API**: `http://localhost:5000` (dev), Vercel domain (prod)
- **Health Check**: `GET /health` or `GET /` (returns 200)
- **Example Endpoints**:
  - `GET /api/ads/store/:storeName` - Fetch store advertisements
  - `POST /api/auth/login`, `POST /api/auth/register`
  - `GET/POST /api/products`, `/api/orders`, `/api/payments`

---

## Vercel Deployment Notes

- **Package-lock.json**: Required in `backend/` for dependency consistency
- **Environment Detection**: Code checks `process.env.VERCEL` to disable local-only features (file logging, server startup)
- **Key Issues Resolved**:
  - TypeScript path aliases require `tsc-alias` (runtime import fails without it)
  - Logger conditionally disables file transport on Vercel (filesystem ephemeral)
  - Database dialect auto-switches to Postgres when `DATABASE_URL` detected
  - pg driver must be in `backend/package.json` dependencies (Vercel installs from backend folder only)

---

## Version Constraints

- **Node.js**: ≥18.0.0
- **npm**: ≥8.0.0
- **React**: 19.x
- **TypeScript**: 5.8–5.9
- **Express**: 4.18+
- **Sequelize**: 6.37+
