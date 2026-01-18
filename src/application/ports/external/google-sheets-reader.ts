export interface GoogleSheetsReader {
  /**
   * Lee filas desde un spreadsheet.
   * @param spreadsheetId Id del spreadsheet en Google Sheets.
   * @param range rango A1 opcional (ej. 'Sheet1!A1:Z1000')
   * @returns array de filas como objetos (raw) en el orden recibido.
   */
  fetchRows(spreadsheetId: string, range?: string): Promise<unknown[]>;
}
