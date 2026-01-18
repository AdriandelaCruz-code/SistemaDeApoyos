import { Aprendiz } from '../../src/domain/entities/aprendiz';
import { UniqueEntityID } from '../../src/domain/value-objects/id';
import { Documento } from '../../src/domain/entities/documento';
import { DomainValidationError } from '../../src/domain/errors/domain-validation-error';

describe('Aprendiz entity state transitions and invariants', () => {
  const id = new UniqueEntityID('uuid-1');
  const documento = new Documento('CC', '100200300');

  test('default state is SIN_REVISION', () => {
    const a = new Aprendiz(id, 'Test', documento);
    expect(a.estado).toBe('SIN_REVISION');
  });

  test('markAsAdjudicado transitions state to ADJUDICADO', () => {
    const a = new Aprendiz(id, 'Test', documento);
    a.markAsAdjudicado();
    expect(a.estado).toBe('ADJUDICADO');
  });

  test('markAsCancelado transitions to CANCELADO', () => {
    const a = new Aprendiz(id, 'Test', documento);
    a.markAsCancelado();
    expect(a.estado).toBe('CANCELADO');
  });

  test('cannot adjudicate a canceled aprendiz', () => {
    const a = new Aprendiz(id, 'Test', documento);
    a.markAsCancelado();
    expect(() => a.markAsAdjudicado()).toThrow(DomainValidationError);
  });

  test('updateNombre enforces non-empty', () => {
    const a = new Aprendiz(id, 'Test', documento);
    expect(() => a.updateNombre('')).toThrow(DomainValidationError);
  });
});
