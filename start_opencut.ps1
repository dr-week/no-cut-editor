$splashPath = Join-Path $PSScriptRoot "splash.html"
$webDir = Join-Path $PSScriptRoot "apps\web"

# 1. Open GUI Splash Screen with Live Health-Check Feedback Loop
Start-Process $splashPath

# 2. Launch Dev Server actively
Set-Location $webDir
bun run dev
