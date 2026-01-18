import { MockSheetsReader } from '../infrastructure/mock/mock-sheets-adapter';
import { InMemoryAprendizRepository, InMemoryApoyoRepository, InMemoryCasoRepository, InMemoryEnvioRepository } from '../infrastructure/mock/in-memory-repositories';
import { ProcesarPostulacion } from '../application/use-cases/procesar-postulacion';

async function main() {
  const sheets = new MockSheetsReader();
  const aprendizRepo = new InMemoryAprendizRepository();
  const apoyoRepo = new InMemoryApoyoRepository();
  const casoRepo = new InMemoryCasoRepository();
  const envioRepo = new InMemoryEnvioRepository();

  const usecase = new ProcesarPostulacion(sheets, aprendizRepo, apoyoRepo, casoRepo, envioRepo);

  const result = await usecase.execute('mock-spreadsheet-id');
  console.log('Resultado import:', result);

  // Mostrar estado de repositorios simples
  const pendientes = await casoRepo.listPending();
  console.log('Casos pendientes (count):', pendientes.length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
