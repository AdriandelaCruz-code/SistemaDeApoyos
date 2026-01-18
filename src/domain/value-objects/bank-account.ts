export class BankAccount {
  public readonly accountNumber: string;
  public readonly bankCode?: string;

  constructor(accountNumber: string, bankCode?: string) {
    if (!accountNumber) throw new Error('Bank account number required');
    const num = String(accountNumber).replace(/\s+/g, '');
    // Basic numeric length check (IBAN up to 34, local accounts typically shorter)
    if (!/^[0-9A-Za-z]{6,34}$/.test(num)) throw new Error('Invalid bank account format');
    this.accountNumber = num;
    this.bankCode = bankCode;
  }

  // Placeholder for more advanced checks (IBAN checksum etc.)
  isProbablyValid(): boolean {
    return !!this.accountNumber && this.accountNumber.length >= 6 && this.accountNumber.length <= 34;
  }
}
