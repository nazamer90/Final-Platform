@echo off
REM EISHRO Platform - Production Build Script
REM تشغيل محلي لبناء المشروع للإنتاج

setlocal enabledelayedexpansion

echo =====================================================
echo    EISHRO Platform - Production Build
echo =====================================================
echo.

set NODE_ENV=production
set VITE_NODE_ENV=production

echo Step 1: Installing Frontend Dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed
    exit /b 1
)

echo.
echo Step 2: Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed
    cd ..
    exit /b 1
)
cd ..

echo.
echo Step 3: Building Frontend...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Frontend build failed
    exit /b 1
)

echo.
echo Step 4: Checking TypeScript in Backend...
cd backend
call npm run typecheck
if %errorlevel% neq 0 (
    echo WARNING: TypeScript check failed but continuing
)
cd ..

echo.
echo =====================================================
echo    Build Complete!
echo =====================================================
echo.
echo Output Files:
echo - Frontend: dist/
echo - Backend: backend/src/
echo.
echo Next Steps:
echo 1. Review .env.production file
echo 2. Create ZIP file of the entire project
echo 3. Upload to CPanel public_html
echo 4. Extract and configure in CPanel
echo 5. Run: npm install -g pm2
echo 6. Run: pm2 start ecosystem.config.js --env production
echo.
echo =====================================================

pause
