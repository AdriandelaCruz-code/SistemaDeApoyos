export class Email {
  public readonly value: string;

  constructor(value: string) {
    if (!value) throw new Error('Email required');
    const v = String(value).trim();
    // simple RFC-like email validation (reasonable for domain layer)
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!re.test(v)) throw new Error('Invalid email format');
    this.value = v.toLowerCase();
  }
}
