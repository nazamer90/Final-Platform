---
description: Repository Information Overview
alwaysApply: true
---

# Eishro Platform - Repository Information

## Summary

**Eishro Platform** is a comprehensive, full-stack e-commerce platform built for Libyan merchants. It features a modern React frontend, Express.js backend, and integrates with multiple payment gateways. The platform supports multi-store management, advanced product administration, dynamic advertising, and detailed analytics.

## Repository Structure

This is a **monorepo** containing integrated frontend and backend systems:

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js + TypeScript + Sequelize ORM
- **Database**: MySQL/MariaDB
- **Configuration Files**: Environment variables, Docker, Deployment configs

### Main Components

- **`/src`**: Frontend React application (components, pages, utilities)
- **`/backend`**: Node.js/Express backend API
- **`/data`**: Static data files (banks, payment methods, transport data)
- **`/Docs`**: Comprehensive documentation
- **`/.github`**: GitHub workflows and configurations
- **`/.devcontainer`**: Development container setup

## Language & Runtime

**Frontend:**
- **Language**: TypeScript 5.8+
- **Runtime**: Node.js 16+
- **Framework**: React 19
- **Build Tool**: Vite 6

**Backend:**
- **Language**: TypeScript 5.9+
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **ORM**: Sequelize 6.37

## Dependencies

### Frontend - Main Dependencies
- **UI Framework**: React 19.2, React Router
- **UI Components**: Shadcn/ui (Radix UI), Tailwind CSS 4
- **Forms**: React Hook Form, Zod validation
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Maps**: Leaflet, React Leaflet
- **HTTP**: Fetch API, Node Fetch
- **AI/OpenAI**: OpenAI SDK
- **Cloud**: AWS S3 SDK
- **Utilities**: Date-fns, CLSX, Lucide React

### Backend - Main Dependencies
- **Web Server**: Express 4.18
- **Authentication**: jsonwebtoken, bcryptjs
- **Database**: Sequelize 6, MySQL2, postgres, sqlite3
- **Cache**: Redis
- **Security**: Helmet, CORS, xss, csurf
- **Rate Limiting**: express-rate-limit
- **Validation**: Joi
- **Logging**: Winston
- **File Upload**: Multer
- **Utilities**: UUID, dotenv, module-alias

### Development Dependencies
- **Testing**: Jest, ts-jest, Cypress
- **Testing**: Supertest, @types/jest
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Process Management**: nodemon
- **Node Tools**: ts-node

## Build & Installation

### Frontend Setup
```bash
npm install
npm run dev          # Start development server (port 5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Setup
```bash
cd backend
npm install
npm run dev          # Start dev server with nodemon (port 5000)
npm run build        # Compile TypeScript to dist/
npm start            # Run compiled code
npm run typecheck    # Type check without emitting
```

### Combined Development
```bash
npm run dev          # Starts both frontend and backend concurrently
```

## Docker

**Dockerfile Location**: `backend/Dockerfile`

**Configuration**:
- **Base Image**: node:18-alpine (multi-stage build)
- **Build Stage**: Compiles TypeScript source
- **Runtime Stage**: Minimal production image
- **Exposed Ports**: 8000, 8080
- **Health Check**: HTTP endpoint validation every 10 seconds
- **Entry Point**: `node start.js`

**Environment Variables in Container**:
- `NODE_ENV=production`
- `PORT=8000`
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- Database dialect configurable via `DB_DIALECT`

## Testing

### Framework
**Backend**: Jest with TypeScript support (`ts-jest`)

**Frontend**: Cypress for E2E testing (config: `backend/cypress.config.ts`)

### Configuration

**Backend Jest** (`backend/jest.config.js`):
- Test environment: Node.js
- Test patterns: `**/*.test.ts`, `**/__tests__/**/*.ts`
- Coverage threshold: 70% branches, 75% functions/lines/statements
- Module mapping for path aliases (@config, @models, etc.)
- Setup file: `tests/setup.ts`

### Test Files

Test files located in:
- **Backend**: `backend/tests/`, `backend/src/**/*.test.ts`
- **Frontend E2E**: `backend/cypress/`

### Running Tests

```bash
# Backend
npm run test              # Run all tests with coverage
npm run test:watch       # Watch mode
npm run test:unit        # Unit tests only
npm run test:integration # Integration tests only

# Frontend E2E
npm run test:e2e         # Run Cypress tests
npm run test:e2e:open    # Open Cypress UI
```

## Main Files & Configuration

### Backend Entry Points
- **Main**: `backend/src/index.ts` (Express app initialization)
- **Application Setup**: `backend/src/app.ts` (middleware & route configuration)
- **Production Loader**: `backend/loader.js` (module aliases)
- **Health Check**: `backend/healthcheck.js`
- **Startup Script**: `backend/start.js`

### Database Models
Located in `backend/src/models/`:
- User, UserAddress, UserLoyaltyAccount
- Store, StoreUser, StoreSlider, StoreAd, StoreFeature, StoreSubscription
- Product, ProductImage, Category
- Order, OrderItem, ManualOrder
- Payment, Coupon, LoyaltyTransaction, LoyaltyRedemption
- AbandonedCart, UnavailableNotification, SubscriptionPlan

### Key Configuration Files
- **Environment**: `.env.example`, `backend/src/config/environment.ts`
- **Database**: `backend/src/config/database.ts`
- **Business Templates**: `backend/src/config/businessTemplates.ts`
- **Security**: `backend/src/config/security.ts`
- **TypeScript**: `backend/tsconfig.json`, `tsconfig.json` (frontend)

## Project Organization

### Backend Structure
```
backend/src/
├── config/          - Database, security, environment config
├── controllers/     - Route handlers (auth, orders, products, etc.)
├── models/          - Sequelize ORM models
├── routes/          - API route definitions
├── middleware/      - Auth, validation, error handling
├── services/        - Business logic (loyalty, marketing, recommendations)
├── validators/      - Joi validation schemas
├── security/        - Audit scanning & security utilities
├── utils/           - Helpers (JWT, passwords, logging)
├── migrations/      - Database migrations
├── types/           - TypeScript interfaces
└── database/        - Backup, migrations, seed scripts
```

### Frontend Structure
```
src/
├── components/      - Reusable React components
├── pages/          - Route pages
├── utils/          - Utilities & API services
├── styles/         - CSS files
└── App.tsx         - Root component
```

## Deployment Support

**Platforms Configured**:
- Railway (`backend/railway.json`)
- Koyeb (Multi-region serverless)
- Vercel (Frontend via CI/CD)
- Render
- Fly.io (`backend/fly.toml`)

**Environment**: Database connection pooling, async logging, production-grade error handling

## Key Features

- **Multi-Store Management**: Merchants can manage multiple stores
- **Advanced Inventory**: Stock tracking with alerts and notifications
- **Payment Integration**: Moamalat payment gateway support
- **Loyalty Program**: Reward system with redemption
- **Marketing Campaigns**: Coupon management and discount tracking
- **AI Recommendations**: Product suggestions with integrated OpenAI
- **Advanced Search**: Fuzzy search with smart filtering
- **Security**: JWT authentication, role-based access control (RBAC), encrypted storage
- **Analytics Dashboard**: Sales, customer, and financial insights
