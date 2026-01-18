import { Envio } from '../../../domain/entities/envio';

export interface EnvioRepository {
  save(envio: Envio): Promise<Envio>;
  findById(id: string): Promise<Envio | null>;
  listRecent(limit?: number): Promise<Envio[]>;
}
