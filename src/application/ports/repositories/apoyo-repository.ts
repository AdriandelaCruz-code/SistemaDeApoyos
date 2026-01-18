import { Apoyo, TipoApoyo } from '../../../domain/entities/apoyo';
import { Documento } from '../../../domain/entities/documento';

export interface ApoyoRepository {
  save(apoyo: Apoyo, aprendizDocumento: Documento): Promise<Apoyo>;
  findById(id: string): Promise<Apoyo | null>;
  existsByDocumentoAndTipo(documento: Documento, tipo: TipoApoyo): Promise<boolean>;
}
