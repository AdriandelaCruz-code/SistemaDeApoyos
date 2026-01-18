export type TipoDocumento = 'CC' | 'TI' | 'CE' | 'PASAPORTE' | string;

export class Documento {
  constructor(
    public readonly tipo: TipoDocumento,
    public readonly numero: string,
  ) {
    if (!numero) throw new Error('Documento.numero requerido');
    if (!tipo) throw new Error('Documento.tipo requerido');
  }

  toString(): string {
    return `${this.tipo}:${this.numero}`;
  }
}
