import { alterProgressBar, 
    updateNotification, 
    listBanksAgencies,
    formBankAgency,
    changeBank,
    listBanksToAgencies} from '../actions/actionCreator';
import { LIST_BANKS, POST_BANK, BANK, BANK_STATUS, LIST_BANKS_AGENCIES, POST_BANK_AGENCY, BANK_AGENCY, BANK_AGENCY_STATUS } from '../paths/routes';
import { browserHistory } from 'react-router';
import BankAgency from '../models/BankAgency';
import Notification from '../models/Notification';

export default class BankAgencyApi {

    static listBanksAgencies(user) {
        return dispatch => {

            const requestInfo = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': user.tokenAccess.token
                })
            };

            dispatch(alterProgressBar(true));

            fetch(LIST_BANKS_AGENCIES, requestInfo)
                .then(response => {
                    if (response.ok) {
                        response.json().then(list => {
                            dispatch(alterProgressBar(false));
                            dispatch(listBanksAgencies(list));
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

    static newBankAgency(){
        return dispatch => {
            dispatch(formBankAgency(new BankAgency(), new Notification()));
        }
    }

    static changeBank(value){
        return dispatch => {
            dispatch(changeBank(value));
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
                            
                            dispatch(listBanksToAgencies(list));
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

    static saveBankAgency(bankAgency, user){
        return dispatch => {
            let verb = 'POST';
            let url = POST_BANK_AGENCY;
            if(bankAgency.id && bankAgency.id > 0){
                verb = 'PUT';
                url = BANK_AGENCY.replace(":id", bankAgency.id);
            }

            const requestInfo = {
                method: verb,
                body: JSON.stringify(bankAgency),
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
                            browserHistory.push('/gestao/agencias');
                            return success;
                        });
                    } else {       
                        response.json().then(error=>{
                            //console.log("error", error);
                            dispatch(alterProgressBar(false));
                            dispatch(formBankAgency(null, error));
                            dispatch(updateNotification(true,error));
                            return error;
                        });
                    }
                });
        }
    }

    static getBankAgency(id, user, url) {
        return dispatch => {

            const requestInfo = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': user.tokenAccess.token
                })
            };

            dispatch(alterProgressBar(true));

            fetch(BANK_AGENCY.replace(":id", id), requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(bankAgency => {
                            dispatch(alterProgressBar(false));
                            dispatch(formBankAgency(bankAgency, new Notification()));
                            browserHistory.push(url);
                            return bankAgency;
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
            fetch(BANK_AGENCY_STATUS.replace(":id", id), requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(notification => {                            
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,notification));
                            dispatch(this.listBanksAgencies(user));                         
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