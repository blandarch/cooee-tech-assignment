import { BankBalance } from "./bankBalance";

export class BankAccount extends BankBalance {
    private _firstName: string;
    private _lastName: string;
    private _accountNumber: string | undefined;
    public bankBalanceInstance: BankBalance

    constructor(firstName: string, lastName: string, balance: number, bankBalance: BankBalance) {
        super(balance)
        this._firstName = firstName;
        this._lastName = lastName;
        this.bankBalanceInstance = bankBalance;
        this._accountNumber = undefined;
        bankBalance.setCurrentBalance(true, bankBalance.checkCurrentBalance(true) + balance);
    }

    //****************FIRST NAME*******************/
    get firstName() { return this._firstName; }
    set firstName(firstName: string) { this._firstName = firstName }

    //****************LAST NAME*******************/
    get lastName() { return this._lastName; }
    set lastName(lastName: string) { this._lastName = lastName }

    //****************FULL NAME*******************/
    get fullName() { return this._firstName + this._lastName; }

    //***************ACCOUNT NUMBER*******************/
    get accountNumber() {
        if (this._accountNumber == undefined) {
            this._accountNumber = BankAccount.generateRandomAlphanumeric(10);
        }
        return this._accountNumber;
    }

    /*******************PRIVATE METHODS*********************/
    private static generateRandomAlphanumeric(length: number): string {
        const CAPITALCHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result: string = '';

        for (let iterator = 0; iterator < length; iterator++) {
            const randomIndex: number = Math.floor(Math.random() * CAPITALCHAR.length);
            result += CAPITALCHAR.charAt(randomIndex);
        }
        
        return result;
    }

    /*******************PUBLIC METHODS*********************/
    withdrawMoney(amountToWithdraw: number) {
        if (this.isNegativeBalance(amountToWithdraw)) {
            throw new Error(
                `Amount to withdraw ${amountToWithdraw} is bigger than your actual bank 
                balance ${this.checkCurrentBalance(true)}`
            );
        }
        this.setCurrentBalance(true, this.checkCurrentBalance(true) - amountToWithdraw);
        this.bankBalanceInstance.setCurrentBalance(
            true, 
            this.bankBalanceInstance.checkCurrentBalance(true) - amountToWithdraw
        );
    }

    isNegativeBalance(amountToSubtract: number) { return amountToSubtract > this.checkCurrentBalance(true) }
}