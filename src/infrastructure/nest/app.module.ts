import { Module } from '@nestjs/common';
import { config } from '../../config';
import { GoogleSheetsAdapter } from '../google/sheets-adapter';
import { MockSheetsReader } from '../mock/mock-sheets-adapter';
import { InMemoryAprendizRepository, InMemoryApoyoRepository, InMemoryCasoRepository, InMemoryEnvioRepository } from '../mock/in-memory-repositories';
import { SHEETS_READER, PROCESAR_POSTULACION } from '../../application/ports/external/tokens';
import { ProcesarPostulacion } from '../../application/use-cases/procesar-postulacion';

@Module({
  providers: [
    // Sheets reader provider: elige Mock o Real según config.env
    {
      provide: SHEETS_READER,
      useFactory: () => {
        if (config.env === 'production') {
          return new GoogleSheetsAdapter(config.google.credentialsPath);
        }
        return new MockSheetsReader();
      },
    },

    // Repositorios en memoria (temporal)
    { provide: InMemoryAprendizRepository, useClass: InMemoryAprendizRepository },
    { provide: InMemoryApoyoRepository, useClass: InMemoryApoyoRepository },
    { provide: InMemoryCasoRepository, useClass: InMemoryCasoRepository },
    { provide: InMemoryEnvioRepository, useClass: InMemoryEnvioRepository },

    // Proveedor que construye la instancia del caso de uso enlazando puertos
    {
      provide: PROCESAR_POSTULACION,
      useFactory: (
        sheetsReader: any,
        aprendizRepo: InMemoryAprendizRepository,
        apoyoRepo: InMemoryApoyoRepository,
        casoRepo: InMemoryCasoRepository,
        envioRepo: InMemoryEnvioRepository,
      ) => {
        return new ProcesarPostulacion(sheetsReader, aprendizRepo, apoyoRepo, casoRepo, envioRepo);
      },
      inject: [SHEETS_READER, InMemoryAprendizRepository, InMemoryApoyoRepository, InMemoryCasoRepository, InMemoryEnvioRepository],
    },
  ],
  exports: [PROCESAR_POSTULACION, SHEETS_READER],
})
export class AppModule {}
