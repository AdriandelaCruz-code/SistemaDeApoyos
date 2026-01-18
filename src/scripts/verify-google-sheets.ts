import { GoogleSheetsAdapter } from '../infrastructure/google/sheets-adapter';
import { config } from '../config';

async function main() {
  const spreadsheetId = process.env.SHEETS_SPREADSHEET_ID || '';
  const range = process.env.SHEETS_RANGE || 'Sheet1!A1:Z1000';

  if (!spreadsheetId) {
    console.error('Set SHEETS_SPREADSHEET_ID env var to a real spreadsheet id.');
    process.exit(1);
  }

  const adapter = new GoogleSheetsAdapter(config.google.credentialsPath || undefined);

  try {
    const rows = await adapter.fetchRows(spreadsheetId, range);
    console.log('Fetched rows count:', rows.length);
    console.log('Sample rows (first 10):', JSON.stringify(rows.slice(0, 10), null, 2));
    process.exit(0);
  } catch (err: any) {
    console.error('Failed to fetch rows from Google Sheets:', err.message || err);
    // Print stack for debugging
    if (err.stack) console.error(err.stack);
    process.exit(2);
  }
}

main();
