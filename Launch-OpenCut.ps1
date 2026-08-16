<#
.SYNOPSIS
    OpenCut Video Editor PowerShell Launcher
.DESCRIPTION
    Runs Vitest automated test suite, boots the Vite dev server, and launches http://localhost:5173.
#>

$host.UI.RawUI.WindowTitle = "OpenCut - 2026 AI Video Editor"
Clear-Host

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "         OPENCUT - 2026 AI VIDEO EDITOR                " -ForegroundColor Yellow
Write-Host "  Filmora FX + Remotion WebCodecs Engine + Trend AI    " -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$WebDir = Join-Path $ScriptDir "apps\web"

Write-Host "[1/4] Running Chain Reaction (typecheck + tests + build)..." -ForegroundColor Magenta
& node (Join-Path $ScriptDir "tools\chain-reaction.mjs")
if ($LASTEXITCODE -eq 0) {
    Write-Host "[SUCCESS] Typecheck, tests and build all green!" -ForegroundColor Green
} else {
    Write-Host "[WARNING] Chain reaction reported failures." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[2/4] Opening browser at http://localhost:5173..." -ForegroundColor Cyan
Start-Process "http://localhost:5173"

Write-Host "[3/4] Starting OpenCut Dev Server on port 5173..." -ForegroundColor Green
Set-Location $WebDir
& npx.cmd vite dev --port 5173
