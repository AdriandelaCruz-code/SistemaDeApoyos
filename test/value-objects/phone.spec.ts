import { Phone } from '../../src/domain/value-objects/phone';

describe('Phone VO', () => {
  test('accepts valid phone numbers', () => {
    expect(new Phone('+57 300 1234567').value).toBe('+57 300 1234567');
    expect(new Phone('301-555-1234').value).toBe('301-555-1234');
  });

  test('rejects invalid phones', () => {
    expect(() => new Phone('abc')).toThrow();
    expect(() => new Phone('')).toThrow();
  });
});
