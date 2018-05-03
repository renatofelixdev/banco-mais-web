import { alterProgressBar, 
    updateNotification, 
    bankStatement,
    selectBankAccount} from '../actions/actionCreator';
import { BANK_STATEMENT, BANK_TRANSFER, BANK_WITHDRAWAL, BANK_DEPOSIT, BANK_ACCOUNT } from '../paths/routes';
import { bankAccountSelect } from '../reducers/bankAccount';

export default class BankOperationApi {

    static listBankStatement(user, bankAccount, startDate, endDate) {
        return dispatch => {

            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({startDate, endDate,
                     account:bankAccount.number,
                      agency:bankAccount.bankAgency.code,
                       bank:bankAccount.bankAgency.bank.code}),
                headers: new Headers({
                    'Authorization': user.tokenAccess.token,
                    'Content-type': 'application/json'
                })
            };

            dispatch(alterProgressBar(true));
            dispatch(bankStatement([]));
            fetch(BANK_STATEMENT, requestInfo)
                .then(response => {
                    if (response.ok) {
                        response.json().then(list => {
                            dispatch(alterProgressBar(false));
                            dispatch(bankStatement(list));
                            console.log(list);
                            return list;
                        });
                    } else {
                        response.json().then(error => {
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,error));
                            //console.log(error);
                            return error;
                        });
                    }
                });
        }
    }

    static bankTransfer(user, bankAccount, value, bank, agency, account){
        return dispatch => {

            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({      value:value,
                                            account:bankAccount.number,
                                            agency:bankAccount.bankAgency.code,
                                            bank:bankAccount.bankAgency.bank.code,
                                            accountTarget:account,
                                            agencyTarget:agency,
                                            bankTarget:bank}),
                headers: new Headers({
                    'Authorization': user.tokenAccess.token,
                    'Content-type': 'application/json'
                })
            };

            console.log(requestInfo);

            dispatch(alterProgressBar(true));

            fetch(BANK_TRANSFER, requestInfo)
                .then(response => {
                    if (response.ok) {
                        response.json().then(success => {
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,success));
                            dispatch(this.getBankAccount(bankAccount.id, user));
                            return success;
                        });
                    } else {
                        response.json().then(error => {
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,error));
                            //console.log(error);
                            return error;
                        });
                    }
                });
        }
    }

    static bankWithdrawal(user, bankAccount, value){
        return dispatch => {

            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({      value:value,
                                            account:bankAccount.number,
                                            agency:bankAccount.bankAgency.code,
                                            bank:bankAccount.bankAgency.bank.code
                                        }),
                headers: new Headers({
                    'Authorization': user.tokenAccess.token,
                    'Content-type': 'application/json'
                })
            };

            dispatch(alterProgressBar(true));

            fetch(BANK_WITHDRAWAL, requestInfo)
                .then(response => {
                    if (response.ok) {
                        response.json().then(success => {
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,success));
                            dispatch(this.getBankAccount(bankAccount.id, user));
                            return success;
                        });
                    } else {
                        response.json().then(error => {
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,error));
                            //console.log(error);
                            return error;
                        });
                    }
                });
        }
    }

    static bankDeposit(user, bankAccount, value){
        return dispatch => {

            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({      value:value,
                                            account:bankAccount.number,
                                            agency:bankAccount.bankAgency.code,
                                            bank:bankAccount.bankAgency.bank.code
                                        }),
                headers: new Headers({
                    'Authorization': user.tokenAccess.token,
                    'Content-type': 'application/json'
                })
            };

            dispatch(alterProgressBar(true));

            fetch(BANK_DEPOSIT, requestInfo)
                .then(response => {
                    if (response.ok) {
                        response.json().then(success => {
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,success));
                            dispatch(this.getBankAccount(bankAccount.id, user));
                            return success;
                        });
                    } else {
                        response.json().then(error => {
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,error));
                            //console.log(error);
                            return error;
                        });
                    }
                });
        }
    }

    static getBankAccount(id, user) {
        return dispatch => {

            const requestInfo = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': user.tokenAccess.token
                })
            };

            dispatch(alterProgressBar(true));

            fetch(BANK_ACCOUNT.replace(":id", id), requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(bankAccount => {
                            console.log(bankAccount);
                            dispatch(alterProgressBar(false));
                            dispatch(selectBankAccount(bankAccount));
                            return bankAccount;
                        });
                    } else {       
                        response.json().then(error=>{
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,error));
                            ////console.log(error);
                        });
                    }
                });
        }
    }
}