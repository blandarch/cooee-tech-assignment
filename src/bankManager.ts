import { BankBalance } from "./bankBalance";

export class BankManager {
    private _username: string
    private _password: string
    private _isLoggedIn: boolean
    private _isAuthorised = true;

    constructor(username: string, password: string) {
        this._username = username;
        this._password = password;
        this._isLoggedIn = true;
    }

    private get username(): string { return this._username }
    private set username(username: string) { this._username = username }
    private get password(): string { return this._password }
    private set password(password: string) { this._password = password }
    get isLoggedIn(): boolean { return this._isLoggedIn }
    private set isLoggedIn(isLoggedIn: boolean) { this._isLoggedIn = isLoggedIn }
    private get isAuthorised(): boolean { return this._isAuthorised }

    login(username: string, password: string) {
        if (username == this.username && password == this.password) {
            this.isLoggedIn = true;
        } else {
            throw new Error('Wrong Username or password');
        }
    }

    logOut() { this._isLoggedIn = false }

    checkCurrentBalance(bankBalance: BankBalance) {
        if (!this.isLoggedIn) throw Error(`You're not logged in.`)
        return bankBalance.checkCurrentBalance(this.isAuthorised);
    }
}