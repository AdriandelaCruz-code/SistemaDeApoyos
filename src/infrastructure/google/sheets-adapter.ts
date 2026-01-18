import { google } from 'googleapis';
import { GoogleSheetsReader, SheetRow } from '../../application/ports/external/google-sheets-reader';
import { config } from '../../config';

/**
 * GoogleSheetsAdapter: adapta la API de Google Sheets al puerto `GoogleSheetsReader`.
 * - Solo se encarga de autenticarse y devolver `SheetRow[]`.
 * - No aplica ninguna lógica de negocio ni validaciones.
 */
export class GoogleSheetsAdapter implements GoogleSheetsReader {
  private sheetsClient: ReturnType<typeof google.sheets> | null = null;

  constructor(private readonly credentialsPath?: string) {}

  private async client() {
    if (this.sheetsClient) return this.sheetsClient;

    const keyFile = this.credentialsPath || process.env.GOOGLE_APPLICATION_CREDENTIALS || config.google.credentialsPath;
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFile || undefined,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    await auth.getClient();
    this.sheetsClient = google.sheets({ version: 'v4', auth });
    return this.sheetsClient;
  }

  async fetchRows(spreadsheetId: string, range = 'Sheet1'): Promise<SheetRow[]> {
    const sheets = await this.client();
    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    const values: string[][] = (res.data.values as string[][]) || [];

    if (values.length === 0) return [];

    // Detectar si la primera fila es header (todas las celdas no vacías)
    const header = values[0];
    const hasHeader = header.every((cell) => cell !== undefined && cell !== null && String(cell).trim() !== '');

    if (hasHeader) {
      // Mapear filas a objetos usando header
      const rows: SheetRow[] = values.slice(1).map((row) => {
        const obj: Record<string, any> = {};
        header.forEach((h, i) => {
          obj[String(h).trim()] = row[i] ?? '';
        });
        return obj;
      });
      return rows;
    }

    // Si no hay header, devolver arrays tal cual
    return values as any[];
  }
}
