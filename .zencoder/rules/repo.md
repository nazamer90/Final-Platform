---
description: Repository Information Overview
alwaysApply: true
---

# Eishro Platform - Repository Information

## Summary

**Eishro Platform** is a full-stack e-commerce platform designed for Libyan merchants. It features a modern React frontend with TypeScript, a scalable Express.js backend, and integrated payment processing. Currently transitioning to Vercel serverless deployment after addressing architectural constraints.

## Repository Structure

```
Eishro-Platform_V7/
├── backend/                    # Express.js + TypeScript API server
│   ├── src/                   # TypeScript source code
│   │   ├── controllers/       # Request handlers
│   │   ├── models/            # Sequelize ORM models
│   │   ├── routes/            # API route definitions
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Auth, validation, security
│   │   ├── config/            # Database config
│   │   ├── app.ts             # Express app setup
│   │   └── index.ts           # Server entry point
│   ├── api/                   # Vercel serverless entrypoint
│   │   └── index.js           # Wrapped Express app for serverless
│   ├── dist/                  # Compiled JavaScript output
│   ├── Dockerfile             # Docker build for Node 18
│   ├── vercel.json            # Vercel serverless config
│   ├── package.json           # Backend dependencies
│   └── tsconfig.json          # TypeScript configuration
├── src/                       # React + TypeScript frontend
│   ├── components/            # Reusable React components
│   ├── pages/                 # Application pages/views
│   ├── App.tsx                # Root component
│   └── main.tsx               # Frontend entry point
├── data/                      # Static data (banks, payments, transport)
├── package.json               # Frontend dependencies
├── vercel.json                # Frontend deployment config
├── .env.production            # Production environment variables
└── Docs/                      # Comprehensive documentation
```

## Language & Runtime

**Frontend:**
- **Language**: TypeScript 5.8
- **Runtime**: Node.js 16+ (npm 8+)
- **Framework**: React 19.2, Vite 6.3
- **Build Tool**: Vite with TypeScript compilation

**Backend:**
- **Language**: TypeScript 5.9
- **Runtime**: Node.js 18 (specified in Dockerfile and recommended)
- **Engine Requirements**: Node >= 14.0.0
- **Framework**: Express.js 4.18
- **ORM**: Sequelize 6.37

## Dependencies

**Backend - Main Dependencies:**
- `express` (4.18.2) - Web framework
- `sequelize` (6.37.7) - MySQL ORM
- `mysql2` (3.15.3) - MySQL driver
- `jsonwebtoken` (9.0.2) - JWT authentication
- `bcryptjs` (3.0.3) - Password hashing
- `cors` (2.8.5) - CORS handling
- `helmet` (7.1.0) - Security headers
- `express-rate-limit` (7.1.5) - Rate limiting
- `serverless-http` (3.2.0) - **NEW**: Vercel serverless wrapper
- `tsconfig-paths` (4.2.0) - TypeScript path aliases at runtime
- `winston` (3.18.3) - Logging
- `redis` (4.6.11) - Caching (optional)

**Backend - Dev Dependencies:**
- `typescript` (5.9.3)
- `ts-node` (10.9.2)
- `nodemon` (3.0.2)
- `jest` (29.7.0)
- `cypress` (13.6.1)
- `eslint` (8.54.0)

**Frontend - Key Dependencies:**
- `react` (19.2.0), `react-dom` (19.2.0)
- `vite` (6.3.5)
- `typescript` (5.8.3)
- `@radix-ui/*` - Accessible UI components
- `tailwindcss` (4.1.7) - Styling
- `framer-motion` (12.23.22) - Animations
- `react-hook-form` (7.56.4) - Form management
- `zod` (3.25.20) - Schema validation
- `axios` or `fetch` - HTTP client
- `recharts` (2.15.3) - Chart library

## Build & Installation

```bash
# Frontend setup
npm install
npm run dev              # Development server (Vite)
npm run build           # Production build
npm run preview         # Preview production build locally

# Backend setup
cd backend
npm install
npm run build           # TypeScript compilation: tsc
npm run vercel-build    # Vercel build command (alias for build)
npm run dev             # Development with nodemon + ts-node
npm start               # Production start (Node dist/index.js)

# Both (root)
npm run dev             # Concurrent frontend + backend dev
npm run lint            # ESLint check
```

## Docker

**Dockerfile**: `backend/Dockerfile`  
**Base Image**: Node 18-alpine (multi-stage build)  
**Build Stages**:
1. Builder stage: Installs dependencies, compiles TypeScript
2. Runtime stage: Minimal image with only production dependencies

**Exposed Ports**: 8000, 8080  
**Environment Variables** (in container):
- `NODE_ENV=production`
- `PORT=8000`
- `DB_DIALECT=mysql`
- `LOG_LEVEL=info`

**Health Check**: HTTP GET `/health` every 10s, 5s timeout

## Vercel Deployment Configuration

**Backend (`backend/vercel.json`)**:
- Build command: `npm run vercel-build`
- Function: `api/index.js` (Node builder)
- Includes compiled TypeScript in deployment
- Routes all requests to serverless function

**Frontend (`vercel.json`)**:
- Framework: Vite
- Build output: `dist/`
- Rewrites: `/api/*` → backend domain (https://eishro-backend-*.vercel.app)
- SPA fallback: Routes non-API to `index.html`

**Critical Setup**:
- `SKIP_DB_INIT=true` - Environment variable to skip DB sync on cold start
- `VITE_API_URL=/api` - Frontend uses relative API path (same domain)
- `tsconfig-paths` registered at runtime in `api/index.js`

## Testing

**Framework**: Jest (backend), Cypress (e2e)  
**Test Locations**: `backend/tests/`, `backend/cypress/`  
**Test Naming**: `*.test.ts`, `*.spec.ts`

**Run Tests**:
```bash
npm test                  # Full coverage
npm run test:watch       # Watch mode
npm run test:unit        # Unit tests only
npm run test:integration # Integration tests
npm run test:e2e         # E2E with Cypress
npm run test:e2e:open    # E2E with UI
```

## Main Entry Points

**Backend**:
- Production: `backend/dist/index.js` (compiled from `backend/src/index.ts`)
- Serverless: `backend/api/index.js` (wrapper using serverless-http)
- Development: `backend/src/index.ts` (run via ts-node)

**Frontend**:
- Entry: `src/main.tsx`
- Root component: `src/App.tsx`
- Development server: Vite dev server
- Production: SPA in `dist/` folder after build

**Health Check Endpoint**: `GET /health` (both dev and serverless)

## Configuration Files

**Backend**:
- `.env.example` - Environment variable template
- `tsconfig.json` - TypeScript compiler options with path aliases
- `jest.config.js` - Jest test configuration
- `.eslintrc.json` - ESLint rules
- `package.json` - NPM scripts and dependencies

**Frontend**:
- `.env.production` - Production environment variables
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript compilation settings
- `tailwind.config.ts` - Tailwind CSS configuration

## Current Deployment Status

**Issue**: Serverless Function crashes at runtime with `FUNCTION_INVOCATION_FAILED` (500 error)

**Root Cause**: Database initialization taking too long in serverless environment:
- `backend/src/index.ts` runs migrations, schema sync, seeding on startup
- Can exceed 10-60 second Vercel timeout limits
- Mitigated with `SKIP_DB_INIT=true` env variable

**Workaround in Place**:
- Runtime `tsconfig-paths` registration in `api/index.js`
- Fallback error handler returning 500 with error details
- Express wrapped with `serverless-http`

## Key Notes for Development

1. **Path Aliases**: Both frontend and backend use TypeScript `@/*` style imports
2. **Database**: Requires MySQL connection string in `.env`
3. **Payment Gateway**: Moamalat integration for payment processing
4. **Module System**: CommonJS (backend), ES Modules (frontend)
5. **API Prefix**: All API routes use `/api/` prefix
6. **Logging**: Winston-based with file output support
7. **Security**: Helmet, CORS, rate limiting, input validation (Joi)
