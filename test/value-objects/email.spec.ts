import { Email } from '../../src/domain/value-objects/email';

describe('Email VO', () => {
  test('accepts valid email and normalizes to lowercase', () => {
    const e = new Email('User@Example.COM');
    expect(e.value).toBe('user@example.com');
  });

  test('rejects invalid email', () => {
    expect(() => new Email('not-an-email')).toThrow();
    expect(() => new Email('')).toThrow();
  });
});
