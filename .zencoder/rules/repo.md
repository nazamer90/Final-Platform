---
description: Repository Information Overview
alwaysApply: true
---

# Eishro Platform - Repository Information

## Summary

Eishro is a full-stack e-commerce platform for Libyan merchants with multi-store management, inventory control, dynamic advertisements, and integrated payment processing.

## Repository Structure

- **src/** - React TypeScript frontend (Vite + Tailwind)
- **backend/** - Express.js API (TypeScript + PostgreSQL + Sequelize)
- **public/** - Static assets
- **vite.config.ts** - Frontend build configuration

## Language & Runtime

**Frontend**: TypeScript, React 19.2.0, Vite 6.3.5, Node.js 18+  
**Backend**: TypeScript, Express 4.18.2, Node.js 18+, PostgreSQL via Sequelize 6.37.7

## Dependencies

**Frontend**: react, vite, axios, zustand, tailwindcss  
**Backend**: express, sequelize, mysql2, jsonwebtoken, joi, winston, helmet, cors

## Build & Installation

```bash
npm install                    # Install frontend
npm run build                  # Production build
npm run dev:frontend           # Dev server (port 5173)

cd backend
npm install                    # Install backend
npm run start                  # Start server (port 8000)
npm run dev                    # Dev mode with nodemon

# Combined
npm run dev                    # Runs frontend + backend
```

## Docker

**Dockerfile**: `backend/Dockerfile` (Node.js 18-Alpine, multi-stage)  
**Ports**: 8000, 8080  
**Healthcheck**: HTTP `/health` endpoint

## Main Files

- **Frontend Entry**: `src/App.tsx`
- **API Service**: `src/services/api.ts` (smart URL detection)
- **Ads Component**: `src/components/AdsManagementView.tsx`
- **Backend Entry**: `backend/start.js`
- **Vite Config**: `vite.config.ts` (Tailwind + React)

## Testing

**Framework**: Jest (backend), Cypress (integration)  
**Location**: `backend/tests/`, `backend/cypress/`

```bash
npm run test          # Run Jest tests
npm run test:e2e      # Run Cypress tests
```

## Key Environment Variables

**Frontend (.env.production)**:
- `VITE_API_URL` - Backend API URL (https://your-backend.vercel.app/api)
- `VITE_FRONTEND_URL` - Frontend domain

**Backend (.env.production)**:
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` - PostgreSQL
- `FRONTEND_URL` - Frontend domain (must match VITE_FRONTEND_URL for CORS)
- `NODE_ENV=production`

## Smart URL Detection

`src/services/api.ts` implements intelligent API URL selection:
1. Uses `VITE_API_URL` if defined
2. Falls back to `http://localhost:5000/api` for local development
3. Dynamically constructs production URL from current domain if needed
