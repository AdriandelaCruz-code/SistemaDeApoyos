import { randomUUID } from 'crypto';
import { GoogleSheetsReader, SheetRow } from '../ports/external/google-sheets-reader';
import { AprendizRepository } from '../ports/repositories/aprendiz-repository';
import { ApoyoRepository } from '../ports/repositories/apoyo-repository';
import { CasoRepository } from '../ports/repositories/caso-repository';
import { EnvioRepository } from '../ports/repositories/envio-repository';
import { Documento } from '../../domain/entities/documento';
import { UniqueEntityID } from '../../domain/value-objects/id';
import { Email } from '../../domain/value-objects/email';
import { Aprendiz } from '../../domain/entities/aprendiz';
import { Apoyo } from '../../domain/entities/apoyo';
import { Caso } from '../../domain/entities/caso';
import { Envio } from '../../domain/entities/envio';

type Row = SheetRow;

export class ProcesarPostulacion {
  constructor(
    private readonly sheetsReader: GoogleSheetsReader,
    private readonly aprendizRepo: AprendizRepository,
    private readonly apoyoRepo: ApoyoRepository,
    private readonly casoRepo: CasoRepository,
    private readonly envioRepo: EnvioRepository,
  ) {}

  /**
   * Ejecuta la importación de postulaciones desde Google Sheets.
   * - Lee filas desde Sheets
   * - Para cada fila crea/reusa Aprendiz, Apoyo, Caso y guarda Envio
   * - Evita duplicados por (documento + tipoApoyo)
   */
  async execute(spreadsheetId: string, range?: string): Promise<{ processed: number; skipped: number }> {
    const rows = await this.sheetsReader.fetchRows(spreadsheetId, range);
    let processed = 0;
    let skipped = 0;

    for (const row of rows) {
      try {
        const documentoStr = this.extractField(row, ['documento', 'document', 'doc', 'numero_documento', 'numero']);
        const tipoApoyo = this.extractField(row, ['tipoApoyo', 'tipo_apoyo', 'apoyo', 'tipo']);
        const nombre = this.extractField(row, ['nombre', 'fullName', 'nombre_aprendiz', 'nombres']);
        const correo = this.extractField(row, ['correo', 'email', 'e-mail', 'mail']);

        if (!documentoStr || !tipoApoyo) {
          skipped++;
          continue;
        }

        const documento = new Documento(String(documentoStr).trim(), String(documentoStr).trim());
        // dedupe: si ya existe apoyo para documento+tipo saltamos
        const exists = await this.apoyoRepo.existsByDocumentoAndTipo(documento, String(tipoApoyo));
        if (exists) {
          skipped++;
          continue;
        }

        // Aprendiz: buscar por documento o crear
        let aprendiz = await this.aprendizRepo.findByDocumento(documento);
        if (!aprendiz) {
          const aprendizId = new UniqueEntityID(randomUUID());
          const correoVo = correo ? new Email(String(correo).trim()) : undefined;
          aprendiz = new Aprendiz(aprendizId, nombre ? String(nombre).trim() : 'NOMBRE_NO_PROVIDED', documento, correoVo, { importedFrom: 'sheets' });
          aprendiz = await this.aprendizRepo.save(aprendiz);
        }

        // Apoyo
        const apoyoId = new UniqueEntityID(randomUUID());
        const apoyo = new Apoyo(apoyoId, String(tipoApoyo).trim());
        await this.apoyoRepo.save(apoyo, documento);

        // Caso
        const casoId = new UniqueEntityID(randomUUID());
        const caso = new Caso(casoId, aprendiz.id.value, [apoyo]);
        await this.casoRepo.save(caso);

        // Envio
        const envioId = new UniqueEntityID(randomUUID());
        const envio = new Envio(envioId, 'GOOGLE_FORMS', row);
        await this.envioRepo.save(envio);

        processed++;
      } catch (err) {
        // Por ahora: saltar fila con error y continuar
        skipped++;
        // ideal: registrar el error en logger
        continue;
      }
    }

    return { processed, skipped };
  }

  private extractField(row: Row, keys: string[]): any {
    if (!row) return undefined;
    if (Array.isArray(row)) {
      // si es array, intentar por posiciones conocidas: documento(0), tipo(1), nombre(2), correo(3)
      const mapIndex: Record<string, number> = { documento: 0, tipoApoyo: 1, nombre: 2, correo: 3 };
      for (const k of keys) {
        if (k in mapIndex) {
          const val = row[mapIndex[k]];
          if (val !== undefined && val !== null && String(val).trim() !== '') return val;
        }
      }
      return undefined;
    }

    // objeto con claves
    for (const k of keys) {
      if (k in row && row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') return row[k];
    }

    // claves similares sin exact match
    const lowerKeys = Object.keys(row).reduce((acc: Record<string, any>, cur) => {
      acc[cur.toLowerCase().replace(/\s+/g, '')] = row[cur];
      return acc;
    }, {} as Record<string, any>);

    for (const k of keys) {
      const lk = k.toLowerCase().replace(/\s+/g, '');
      if (lk in lowerKeys && lowerKeys[lk] !== undefined && lowerKeys[lk] !== null && String(lowerKeys[lk]).trim() !== '') return lowerKeys[lk];
    }

    return undefined;
  }
}
