import { BankAccount } from "./bankAccount";

export class BankBalance {
    private _balance: number;
    private _allAccountNumbers: Array<string>

    constructor(balance: number) {
        this._balance = balance;
        this._allAccountNumbers = new Array<string>();
    }

    private get balance(): number { return this._balance }
    private set balance(value: number) { this._balance = value }
    private get allAccountNumbers(): Array<string> { return this._allAccountNumbers }
    private set allAccountNumbers(accountNumber: string) {
        this._allAccountNumbers.push(accountNumber);
    }

    checkCurrentBalance(isAuthorised: boolean) {
        if (isAuthorised) return this.balance;
        throw new Error("This user is not authorised");
    }

    setCurrentBalance(isAuthorised: boolean, amount: number) {
        if (!isAuthorised) throw new Error("This user is not authorised");
        this.balance = amount;
    }

    isAccountNumberTaken(accountNumber: string): boolean {
        return this.allAccountNumbers.includes(accountNumber);
    }

    transferMoney(
        fromBankAccount: BankAccount, 
        toBankAccount: BankAccount, 
        amount: number, 
        isNegativeBalance: boolean
    ) {
        if (isNegativeBalance) {
            return [fromBankAccount, toBankAccount];
        }

        fromBankAccount.balance = fromBankAccount.balance - amount;
        toBankAccount.balance = toBankAccount.balance + amount;
        
        return [fromBankAccount, toBankAccount];
    }
}