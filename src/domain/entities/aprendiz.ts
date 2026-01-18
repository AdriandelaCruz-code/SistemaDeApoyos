import { UniqueEntityID } from '../value-objects/id';
import { Documento } from './documento';
import { Email } from '../value-objects/email';

export class Aprendiz {
  constructor(
    public readonly id: UniqueEntityID,
    public nombre: string,
    public documento: Documento,
    public correo?: Email,
    public metadata?: Record<string, unknown>,
  ) {}
}
