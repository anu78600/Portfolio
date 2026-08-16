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
Start-Sleep -Seconds 9

# The check that matters: does the page's own stylesheet actually resolve?
$html = (Invoke-WebRequest "http://localhost:$Port/" -UseBasicParsing).Content
$css = ([regex]'/_next/static/chunks/[^"]*\.css').Match($html).Value
if (-not $css) { Write-Error "no stylesheet referenced"; exit 1 }
$code = try { (Invoke-WebRequest "http://localhost:$Port$css" -UseBasicParsing).StatusCode } catch { $_.Exception.Response.StatusCode.value__ }
if ($code -ne 200) { Write-Error "stylesheet $css returned $code - stale server"; exit 1 }

Write-Output "serving on http://localhost:$Port  (stylesheet OK)"
