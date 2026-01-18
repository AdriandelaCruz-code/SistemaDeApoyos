import { UniqueEntityID } from '../value-objects/id';

export type OrigenEnvio = 'GOOGLE_FORMS' | 'MANUAL' | string;

export class Envio {
  constructor(
    public readonly id: UniqueEntityID,
    public readonly origen: OrigenEnvio,
    public readonly raw: unknown,
    public readonly recibidoEn: Date = new Date(),
  ) {}
}
