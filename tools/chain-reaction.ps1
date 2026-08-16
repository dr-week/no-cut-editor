<#
.SYNOPSIS
    OpenCut Chain Reaction PowerShell wrapper.
.DESCRIPTION
    Delegates to tools/chain-reaction.mjs (typecheck -> tests -> build).
    Exits non-zero on first failed stage.
#>
param(
    [switch]$SkipTypecheck,
    [switch]$SkipTests,
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir = Split-Path -Parent $ScriptDir

$args = @()
if ($SkipTypecheck) { $args += "--skip-typecheck" }
if ($SkipTests) { $args += "--skip-tests" }
if ($SkipBuild) { $args += "--skip-build" }

& node (Join-Path $ScriptDir "chain-reaction.mjs") @args
exit $LASTEXITCODE
