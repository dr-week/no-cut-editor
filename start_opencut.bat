@echo off
setlocal enabledelayedexpansion
title OpenCut Studio 2026
cls

:: 1. Open the animated GUI Splash Screen with Live Health-Check Feedback Loop
start "" "%~dp0splash.html"

:: 2. Launch Dev Server actively with Bun
cd /d "%~dp0apps\web"
bun run dev
