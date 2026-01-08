Write-Host "=== Diagnóstico de Git ===" -ForegroundColor Cyan
Write-Host "Verificando configuración local..."
git config user.name
git config user.email

Write-Host "`nVerificando repositorio remoto..."
git remote -v

Write-Host "`nVerificando estado actual..."
git status

Write-Host "`nIntentando conectar con GitHub (Fetch)..."
try {
    git fetch
    Write-Host "✅ Conexión exitosa. Tienes acceso al repositorio." -ForegroundColor Green
}
catch {
    Write-Host "❌ Error al conectar. Posibles causas:" -ForegroundColor Red
    Write-Host "1. No tienes permisos para este repositorio privado."
    Write-Host "2. Tus credenciales han expirado."
    Write-Host "3. El repositorio no existe."
    Write-Host "`nDetalle del error:"
    $error[0]
}

Write-Host "`n=== Fin del diagnóstico ===" -ForegroundColor Cyan
Write-Host "Presiona Enter para cerrar..."
Read-Host
