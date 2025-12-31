# Script para importar el workflow de VirtuAds a n8n local
# Asegúrate de tener n8n instalado globalmente (npm install n8n -g)

$workflowPath = "C:\Users\wilfr\OneDrive\Documentos\GitHub\virtuads-ui\n8n_virtuads_workflow.json"

if (Test-Path $workflowPath) {
    Write-Host "Importando workflow a n8n..." -ForegroundColor Green
    try {
        # Intentar importar vía CLI
        n8n import:workflow --file $workflowPath
        Write-Host "¡Workflow importado con éxito!" -ForegroundColor Cyan
        Write-Host "Ahora puedes verlo en http://localhost:5678"
    } catch {
        Write-Host "Error al importar. Asegúrate de que n8n no esté corriendo o usa la interfaz web para importar el JSON manualmente." -ForegroundColor Red
    }
} else {
    Write-Host "Archivo de workflow no encontrado en $workflowPath" -ForegroundColor Red
}
