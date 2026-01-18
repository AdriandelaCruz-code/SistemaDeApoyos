import { Caso } from '../../../domain/entities/caso';

export interface CasoRepository {
  save(caso: Caso): Promise<Caso>;
  findById(id: string): Promise<Caso | null>;
  listPending(): Promise<Caso[]>;
}
