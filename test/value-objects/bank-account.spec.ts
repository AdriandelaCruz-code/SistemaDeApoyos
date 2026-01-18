import { BankAccount } from '../../src/domain/value-objects/bank-account';

describe('BankAccount VO', () => {
  test('accepts plausible account numbers', () => {
    const a = new BankAccount('1234567890');
    expect(a.accountNumber).toBe('1234567890');
    expect(a.isProbablyValid()).toBe(true);
  });

  test('rejects obviously invalid account numbers', () => {
    expect(() => new BankAccount('')).toThrow();
    expect(() => new BankAccount('!!@@##')).toThrow();
  });
});
