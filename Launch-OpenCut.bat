@echo off
title OpenCut - 2026 AI Video Editor Launcher
cls
echo =======================================================
echo          OPENCUT - 2026 AI VIDEO EDITOR
echo   Filmora FX + Remotion WebCodecs Engine + Trend AI
echo =======================================================
echo.

cd /d "%~dp0"

echo [1/4] Running Chain Reaction (typecheck + tests + build)...
call node "tools\chain-reaction.mjs"
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Chain reaction failed - starting dev server anyway...
) else (
    echo [SUCCESS] Typecheck, tests and build all green!
)
echo.

cd /d "%~dp0\apps\web"

echo [2/4] Starting OpenCut Dev Server on http://localhost:5173...
start "" cmd /c "timeout /t 2 >nul & start http://localhost:5173"

call npx.cmd vite dev --port 5173

pause
