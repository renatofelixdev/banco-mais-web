import BankAgency from "./BankAgency";
import UserClient from "./UserClient";

export default class BankAccount{
    constructor() {

        this.id = null;
        this.number = '';
        this.balance = '';
        this.bankAccountType = '';
        this.userClient = new UserClient();
        this.bankAgency = new BankAgency();
    }
}