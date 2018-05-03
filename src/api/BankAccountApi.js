import { alterProgressBar, 
    updateNotification,
    listBanksAccounts,
    formBankAccount,
    changeBankToAccount,
    changeBankAgencyToAccount,
    changeBankAccountType,
    listBanksToAccount,
    listBanksAgenciesToAccount,
    listBankAccountTypes,
    selectBankAccount
    } from '../actions/actionCreator';
import { LIST_BANKS_ACCOUNTS, POST_BANK_ACCOUNT, BANK_ACCOUNT, BANK_ACCOUNT_STATUS, LIST_BANKS, LIST_BANKS_AGENCIES_BY_BANK, BANK_ACCOUNT_TYPES, BANK_ACCOUNT_BY_USER_CLIENT } from '../paths/routes';
import { browserHistory } from 'react-router';
import BankAccount from '../models/BankAccount';
import Notification from '../models/Notification';

export default class BankAccountApi {

    static listBanksAccounts(user) {
        return dispatch => {

            const requestInfo = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': user.tokenAccess.token
                })
            };

            dispatch(alterProgressBar(true));

            fetch(LIST_BANKS_ACCOUNTS, requestInfo)
                .then(response => {
                    if (response.ok) {
                        response.json().then(list => {
                            dispatch(alterProgressBar(false));
                            dispatch(listBanksAccounts(list));
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

    static newBankAccount(){
        return dispatch => {
            dispatch(formBankAccount(new BankAccount(), new Notification()));
        }
    }

    static changeBank(value, user){
        return dispatch => {
            dispatch(changeBankToAccount(value));
            dispatch(this.getBanksAgencies(value, user));
        }
    }

    static changeBankAgency(value){
        return dispatch => {
            dispatch(changeBankAgencyToAccount(value));
        }
    }

    static changeBankAccountType(value){
        return dispatch => {
            dispatch(changeBankAccountType(value));
        }
    }

    static getBanks(user){
        return dispatch => {

            const requestInfo = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': user.tokenAccess.token
                })
            };

            dispatch(alterProgressBar(true));

            fetch(LIST_BANKS, requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(list => {
                            dispatch(alterProgressBar(false));
                            
                            dispatch(listBanksToAccount(list));
                            return list;
                        });
                    } else {       
                        response.json().then(error=>{
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,error));
                            //console.log(error);
                            return error;
                        });
                    }
                });
        }
    }

    static getBanksAgencies(id, user){
        return dispatch => {

            const requestInfo = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': user.tokenAccess.token
                })
            };

            dispatch(alterProgressBar(true));

            fetch(LIST_BANKS_AGENCIES_BY_BANK.replace(':idBank', id), requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(list => {
                            dispatch(alterProgressBar(false));
                            
                            dispatch(listBanksAgenciesToAccount(list));
                            return list;
                        });
                    } else {       
                        response.json().then(error=>{
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,error));
                            //console.log(error);
                            return error;
                        });
                    }
                });
        }
    }

    static getBankAccountTypes(user){
        return dispatch => {

            const requestInfo = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': user.tokenAccess.token
                })
            };

            dispatch(alterProgressBar(true));

            fetch(BANK_ACCOUNT_TYPES, requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(list => {
                            dispatch(alterProgressBar(false));
                            
                            dispatch(listBankAccountTypes(list));
                            return list;
                        });
                    } else {       
                        response.json().then(error=>{
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,error));
                            //console.log(error);
                            return error;
                        });
                    }
                });
        }
    }

    static saveBankAccount(bankAccount, user){
        return dispatch => {
            let verb = 'POST';
            let url = POST_BANK_ACCOUNT;
            if(bankAccount.id && bankAccount.id > 0){
                verb = 'PUT';
                url = BANK_ACCOUNT.replace(":id", bankAccount.id);
            }

            const requestInfo = {
                method: verb,
                body: JSON.stringify(bankAccount),
                headers: new Headers({
                    'Authorization': user.tokenAccess.token,
                    'Content-type': 'application/json'
                })
            };

            dispatch(alterProgressBar(true));

            fetch(url, requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(success => {
                            dispatch(updateNotification(true,success));
                            dispatch(alterProgressBar(false));
                            browserHistory.push('/gestao/contas-bancarias');
                            return success;
                        });
                    } else {       
                        response.json().then(error=>{
                            //console.log("error", error);
                            dispatch(alterProgressBar(false));
                            dispatch(formBankAccount(null, error));
                            dispatch(updateNotification(true,error));
                            return error;
                        });
                    }
                });
        }
    }

    static getBankAccount(id, user, url) {
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
                            dispatch(alterProgressBar(false));
                            dispatch(formBankAccount(bankAccount, new Notification()));
                            browserHistory.push(url);
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

    static alterStatus(id, user){

        return dispatch => {
            //console.log("api info", id);
            const requestInfo = {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': user.tokenAccess.token
                })
            };
            dispatch(alterProgressBar(true));
            fetch(BANK_ACCOUNT_STATUS.replace(":id", id), requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(notification => {                            
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,notification));
                            dispatch(this.listBanksAccounts(user));                         
                        });
                    } else {       
                        response.json().then(error=>{
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,error));
                            //console.log(error);
                        });
                    }
                });
        }
    }

    static listBankAccountsToClient(user) {
        return dispatch => {

            const requestInfo = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': user.tokenAccess.token
                })
            };

            dispatch(alterProgressBar(true));

            fetch(BANK_ACCOUNT_BY_USER_CLIENT, requestInfo)
                .then(response => {
                    if (response.ok) {
                        response.json().then(list => {
                            dispatch(alterProgressBar(false));
                            dispatch(listBanksAccounts(list));
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

    static selectBankAccount(value){
        return dispatch => {
            dispatch(selectBankAccount(value));
        }
    }

    // static remove(id){
    //     return dispatch => {
    //         //console.log("api info", id);
    //         const requestInfo = {
    //             method: 'DELETE',
    //             headers: new Headers({
    //                 'Authorization': JSON.parse(localStorage.getItem("user")).token
    //             })
    //         };
    //         dispatch(alterProgressBar(true));
    //         fetch(INTERVIEW_SCHEDULE.replace(":id", id), requestInfo)
    //             .then(response => {
    //                 if(response.ok) {
    //                     response.json().then(user => {
    //                         dispatch(alterProgressBar(false));
    //                         dispatch(updateNotification(true,user));
    //                         browserHistory.push('/gestao/horarios-de-entrevista');
    //                     });
    //                 } else {       
    //                     response.json().then(error=>{
    //                         dispatch(alterProgressBar(false));
    //                         dispatch(updateNotification(true,error));
    //                         //console.log(error);
    //                     });
    //                 }
    //             });
    //     }
    // }
}