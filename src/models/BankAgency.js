import Bank from "./Bank";

export default class BankAgency{
    constructor() {

        this.id = null;
        this.name = '';
        this.code = '';
        this.bank = new Bank();
    }
}