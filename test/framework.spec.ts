import { expect } from "chai";
import 'mocha';
import { BankBalance } from "../src/bankBalance";
import { BankAccount } from "../src/bankAccount";
import { BankManager } from "../src/bankManager";

describe('Test Framework', () => {
    /**
     * POSITIVE TEST CASES:
     * - It should be able to make account for Bank Manager
     * - It should be able for Bank Manager to login using correct username and password
     * - It should be able to make a new account for First Bank Account
     * - It should be able to withdraw money from a bank account
     * - It should not be able to withdraw with a negative balance
     * - It should be able to transfer Money from one bank account to another
     * - It should be able for Bank Manager to view the overall Bank Balance
     */

    //Test Setup:
    let bankBalanceInstance = new BankBalance(1000000);
    let bankManagerInstance: BankManager;
    let bankAccount1Instance: BankAccount;
    let bankAccount2Instance: BankAccount;
    let bankAccounts: Array<BankAccount> = new Array<BankAccount>();

    const BANK_ACCOUNT_DATA = [
        { 
            bankAccount: "Bank Account 1", 
            firstName: "BankAccountFirst", 
            lastName: "BankAccountLast", 
            amount: 1000, 
            expectedBankBalance: 1001000,
            preWithdrawBalance: 1000,
            postWithdrawBalance: 500,
        },
        { 
            bankAccount: "Bank Account 2", 
            firstName: "BankAccountSecond", 
            lastName: "BankAccountSecond", 
            amount: 500, 
            expectedBankBalance: 1001500,
            preWithdrawBalance: 500,
            postWithdrawBalance: 0,
        },
    ];

    it('should be able to make an account for Bank Manager', () => {
        // account for Bank Manager is made
        bankManagerInstance = new BankManager(
            'bankManager@email.com',
            'testing@123',
            bankBalanceInstance
        );
        
        // expects that isLoggedIn property is set to true
        expect(bankManagerInstance.isLoggedIn).true;
    });

    it('should be able for Bank Manager to login using correct username and password', () => {
        //logs out and checks if isLoggedIn property is false
        bankManagerInstance.logOut();
        expect(bankManagerInstance.isLoggedIn).false;

        //logs in again and checks if isLoggedIn property is true
        bankManagerInstance.login('bankManager@email.com', 'testing@123');
        expect(bankManagerInstance.isLoggedIn).true
    });

    BANK_ACCOUNT_DATA.forEach(element => {
        it(`should be able to make a new account for ${element.bankAccount}`, () => {
            // makes a bank account
            let tempBankAccount = new BankAccount(
                element.firstName,
                element.lastName,
                element.amount,
                bankBalanceInstance
            );
            
            //expects that balance is entered with the amount data provided
            expect(bankBalanceInstance.checkCurrentBalance(true)).equals(element.expectedBankBalance);
            //expects that tempBankAccount instance is not null
            expect(tempBankAccount).not.null;
            bankAccounts.push(tempBankAccount);
        });
    });

    for (let iterator = 0; iterator < BANK_ACCOUNT_DATA.length; iterator++) {
        it(`should be able to withdraw money from ${BANK_ACCOUNT_DATA[iterator].bankAccount}`, () => {
            //expects that current balance is not yet subtracted
            expect(bankAccounts[iterator].checkCurrentBalance(true))
                .equal(BANK_ACCOUNT_DATA[iterator].preWithdrawBalance);
            //withdraws money worth 500
            bankAccounts[iterator].withdrawMoney(500);
            //expects that current balance has changed after withdrawing
            expect(bankAccounts[iterator].checkCurrentBalance(true))
                .equal(BANK_ACCOUNT_DATA[iterator].postWithdrawBalance);
        });
    }

    it('should not be able to withdraw with a negative balance', () => {
        //assigns instances of bankAccounts array to respective variable (for organisation)
        bankAccount1Instance = bankAccounts[0];
        bankAccount2Instance = bankAccounts[1];

        //checks that bank 2 balance is 0
        expect(bankAccount2Instance.checkCurrentBalance(true)).equal(0);
        //tries to withdraw from bank account 2 since its balance is zero.
        expect(() => bankAccount2Instance.withdrawMoney(500)).to.throw();

    });

    it('should be able to transfer money from one bank account to another', () => {
        //transfers money from bank account 1 to bank account 2
        bankAccount1Instance.transferMoney(
            bankAccount1Instance, 
            bankAccount2Instance, 
            500, 
            bankAccount1Instance.isNegativeBalance(500)
        );
        
        //expects that bank account 1 has been subtracted
        expect(bankAccount1Instance.checkCurrentBalance(true)).equal(0);
        //expects that bank account 2 has been added with the transfer money
        expect(bankAccount2Instance.checkCurrentBalance(true)).equal(500);
    });

    it('should be able for Bank Manager to view overall Bank Balance', () => {
        //Bank Manager logs in and retrieves the overall Bank Balance
        bankManagerInstance.login('bankManager@email.com', 'testing@123');
        expect(bankManagerInstance.checkCurrentBalance()).equal(1000500);
    });
})