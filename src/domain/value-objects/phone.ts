export class Phone {
  public readonly value: string;

  constructor(value: string) {
    if (!value) throw new Error('Phone required');
    const v = String(value).trim();
    // Accepts digits, spaces, dashes, parentheses and leading +. Basic E.164-ish check
    const re = /^\+?[0-9\s\-()]{6,25}$/;
    if (!re.test(v)) throw new Error('Invalid phone format');
    this.value = v;
  }
}
