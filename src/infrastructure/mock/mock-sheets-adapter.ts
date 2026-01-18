import { GoogleSheetsReader, SheetRow } from '../../application/ports/external/google-sheets-reader';

/**
 * MockSheetsReader: adaptador de pruebas que implementa el puerto GoogleSheetsReader
 * Devuelve `SheetRow[]` sin aplicar ninguna lógica de negocio.
 */
export class MockSheetsReader implements GoogleSheetsReader {
  constructor(private readonly rows?: SheetRow[]) {}

  async fetchRows(_spreadsheetId: string, _range?: string): Promise<SheetRow[]> {
    if (this.rows) return this.rows;

    // Ejemplo de filas mixtas: objetos con claves y arrays por posición
    const sample: SheetRow[] = [
      { documento: '100200300', tipo_apoyo: 'SOSTENIMIENTO', nombre: 'Ana Pérez', correo: 'ana@example.com' },
      ['200300400', 'TRANSPORTE', 'Juan Gómez', 'juan@example.com'],
      { numero_documento: '300400500', apoyo: 'ALIMENTACION', nombres: 'Luisa Martinez', email: 'luisa@example.com' },
      // duplicado (mismo documento + mismo tipo que primera fila) -> debe ser saltado por dedupe
      { documento: '100200300', tipo_apoyo: 'SOSTENIMIENTO', nombre: 'Ana Pérez', correo: 'ana@example.com' },
    ];

    return sample;
  }
}
