export class Email {
  constructor(public readonly value: string) {
    if (!value) throw new Error('Email required');
    if (!value.includes('@')) throw new Error('Invalid email format');
  }
}
