export class UniqueEntityID {
  constructor(public readonly value: string) {
    if (!value) throw new Error('UniqueEntityID requires a value');
  }
}
