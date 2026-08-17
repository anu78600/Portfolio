# Restart the production server cleanly.
#
# `pkill` does not work in this environment. When it silently fails you end up
# with two Next servers: the stale one keeps port 3000 and serves an old file
# manifest, so the stylesheet 404s and the browser renders raw unstyled HTML.
# It looks like the site is broken. It is not — it is two servers.
#
#   powershell -ExecutionPolicy Bypass -File scripts/serve.ps1
param([int]$Port = 3000)

Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
  Where-Object { $_.CommandLine -match 'next' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Seconds 2

$alive = (Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
  Where-Object { $_.CommandLine -match 'next' }).Count
if ($alive -gt 0) { Write-Error "$alive next process(es) survived the kill"; exit 1 }

npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "build failed - not starting"; exit 1 }

Start-Process -FilePath "cmd.exe" -ArgumentList "/c npx next start -p $Port > NUL 2>&1" -WindowStyle Hidden

# Poll, do not guess. A fixed sleep is a race: on a cold start `next start` can
# take well over 9s, and the script then reported "no stylesheet referenced" —
# a confusing way to say "the server was not up yet".
$html = $null
foreach ($i in 1..40) {
  Start-Sleep -Seconds 1
  try { $html = (Invoke-WebRequest "http://localhost:$Port/" -UseBasicParsing -TimeoutSec 5).Content; break } catch { }
}
if (-not $html) { Write-Error "server did not answer on $Port within 40s"; exit 1 }
$css = ([regex]'/_next/static/chunks/[^"]*\.css').Match($html).Value
if (-not $css) { Write-Error "no stylesheet referenced"; exit 1 }
$code = try { (Invoke-WebRequest "http://localhost:$Port$css" -UseBasicParsing).StatusCode } catch { $_.Exception.Response.StatusCode.value__ }
if ($code -ne 200) { Write-Error "stylesheet $css returned $code - stale server"; exit 1 }

# Headless Chrome for the harness. PROJECT-MEMORY documented that `npm run
# verify` needs a browser on 9222 but never how to get one, so every session
# rediscovered it — and the failure mode is an ECONNREFUSED stack trace that
# looks like a broken harness rather than a missing dependency.
$cdpUp = $false
try { Invoke-WebRequest "http://127.0.0.1:9222/json/version" -UseBasicParsing -TimeoutSec 2 | Out-Null; $cdpUp = $true } catch { }

if (-not $cdpUp) {
  $chrome = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
  ) | Where-Object { Test-Path $_ } | Select-Object -First 1
  if (-not $chrome) { Write-Error "no Chromium browser found - verify needs one on 9222"; exit 1 }

  # A separate profile directory. Without it Chrome hands the arguments to an
  # already-running instance of the user's own browser and exits, and nothing
  # ever listens on 9222.
  $profileDir = Join-Path $env:TEMP "resume-verify-profile"
  Start-Process -FilePath $chrome -WindowStyle Hidden -ArgumentList `
    "--headless=new", "--remote-debugging-port=9222", "--remote-allow-origins=*",
    "--user-data-dir=`"$profileDir`"", "--no-first-run", "--no-default-browser-check",
    "--disable-extensions", "--hide-scrollbars", "--force-device-scale-factor=1"

  foreach ($i in 1..30) {
    Start-Sleep -Seconds 1
    try { Invoke-WebRequest "http://127.0.0.1:9222/json/version" -UseBasicParsing -TimeoutSec 2 | Out-Null; $cdpUp = $true; break } catch { }
  }
  if (-not $cdpUp) { Write-Error "Chrome did not open a debugging port within 30s"; exit 1 }
}

Write-Output "serving on http://localhost:$Port  (stylesheet OK, CDP on 9222)"
