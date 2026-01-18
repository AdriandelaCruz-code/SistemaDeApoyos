import { UniqueEntityID } from '../value-objects/id';

export type TipoApoyo = 'SOSTENIMIENTO' | 'TRANSPORTE' | 'ALIMENTACION' | string;

export class Apoyo {
  constructor(
    public readonly id: UniqueEntityID,
    public readonly tipo: TipoApoyo,
    public monto?: number,
    public periodo?: string,
    public notas?: string,
  ) {}
}
