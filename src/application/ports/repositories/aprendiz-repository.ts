import { Aprendiz } from '../../../domain/entities/aprendiz';
import { Documento } from '../../../domain/entities/documento';

export interface AprendizRepository {
  save(aprendiz: Aprendiz): Promise<Aprendiz>;
  findById(id: string): Promise<Aprendiz | null>;
  findByDocumento(documento: Documento): Promise<Aprendiz | null>;
}
