# SistemaDeApoyos

## Integración Google Sheets (verificación técnica)

Esta sección documenta cómo validar el adaptador real `GoogleSheetsAdapter` contra una hoja de Google Sheets real sin modificar el dominio ni los casos de uso.

Requisitos previos:
- Node.js 18+
- Tener un Service Account con acceso de solo lectura a la hoja de cálculo.

Pasos rápidos:

1. Crear una Service Account en Google Cloud Console y descargar las credenciales JSON (NO subir este archivo al repositorio).
2. Compartir la hoja de cálculo con el email del service account (lectura).
3. Exportar variable de entorno con la ruta al JSON:

PowerShell:
```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\service-account.json"
```

Linux/macOS:
```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

4. Definir `SHEETS_SPREADSHEET_ID` (ID del spreadsheet) y `SHEETS_RANGE` opcionalmente. Ejemplo:

PowerShell:
```powershell
$env:SHEETS_SPREADSHEET_ID="your-spreadsheet-id"
$env:SHEETS_RANGE="Sheet1!A1:Z1000"
npx ts-node src/scripts/verify-google-sheets.ts
```

5. Comportamientos a probar manualmente:
- Credenciales inválidas → el script debe fallar con un error de autenticación.
- Hoja inexistente (spreadsheetId erróneo) → el script debe fallar indicando que no encontró la hoja.
- Hoja no compartida con el SA → el script debe fallar por permisos insuficientes.
- Hojas con header: verificar que el adapter devuelve `SheetRow[]` mapeado como objetos por header.

Scopes mínimos recomendados:
- `https://www.googleapis.com/auth/spreadsheets.readonly`
- Si necesita leer archivos anexos en Drive: `https://www.googleapis.com/auth/drive.readonly` (opcional)

Notas:
- Este proceso no modifica el dominio ni los casos de uso.
- No deje las credenciales en el repo. Use variables de entorno o un secret manager.
# SistemaDeApoyos