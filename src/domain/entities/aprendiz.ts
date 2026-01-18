import { UniqueEntityID } from '../value-objects/id';
import { Documento } from './documento';
import { Email } from '../value-objects/email';
import { Phone } from '../value-objects/phone';
import { BankAccount } from '../value-objects/bank-account';
import { DomainValidationError } from '../errors/domain-validation-error';

export type EstadoAprendiz = 'SIN_REVISION' | 'ADJUDICADO' | 'CANCELADO';

export class Aprendiz {
  public estado: EstadoAprendiz;

  constructor(
    public readonly id: UniqueEntityID,
    public nombre: string,
    public documento: Documento,
    public correo?: Email,
    public telefono?: Phone,
    public cuentaBancaria?: BankAccount,
    public metadata?: Record<string, unknown>,
    estado?: EstadoAprendiz,
  ) {
    this.estado = estado ?? 'SIN_REVISION';
  }

  updateNombre(nombre: string) {
    if (!nombre || String(nombre).trim() === '') throw new DomainValidationError('Nombre requerido');
    this.nombre = String(nombre).trim();
  }

  updateContacto({ correo, telefono }: { correo?: string; telefono?: string }) {
    if (correo) {
      this.correo = new Email(correo);
    }
    if (telefono) {
      this.telefono = new Phone(telefono);
    }
  }

  setBankAccount(accountNumber: string, bankCode?: string) {
    const acc = new BankAccount(accountNumber, bankCode);
    if (!acc.isProbablyValid()) throw new DomainValidationError('Cuenta bancaria inválida');
    this.cuentaBancaria = acc;
  }

  markAsAdjudicado() {
    if (this.estado === 'CANCELADO') throw new DomainValidationError('No se puede adjudicar un aprendiz cancelado');
    this.estado = 'ADJUDICADO';
  }

  markAsCancelado() {
    this.estado = 'CANCELADO';
  }

  markAsSinRevision() {
    this.estado = 'SIN_REVISION';
  }
}
