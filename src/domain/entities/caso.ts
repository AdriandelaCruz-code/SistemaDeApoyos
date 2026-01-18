import { UniqueEntityID } from '../value-objects/id';
import { Apoyo } from './apoyo';

export type EstadoCaso = 'PENDIENTE' | 'PROCESADO' | 'RECHAZADO' | string;

export class Caso {
  constructor(
    public readonly id: UniqueEntityID,
    public readonly aprendizId: string,
    public readonly apoyos: Apoyo[],
    public estado: EstadoCaso = 'PENDIENTE',
    public createdAt: Date = new Date(),
    public updatedAt?: Date,
  ) {}
}
