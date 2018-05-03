import { alterProgressBar, 
    updateNotification, 
    listBanks,
    formBank} from '../actions/actionCreator';
import { LIST_BANKS, POST_BANK, BANK, BANK_STATUS } from '../paths/routes';
import { browserHistory } from 'react-router';
import Bank from '../models/Bank';
import Notification from '../models/Notification';

export default class BankApi {

    static listBanks(user) {
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
                    if (response.ok) {
                        response.json().then(list => {
                            dispatch(alterProgressBar(false));
                            dispatch(listBanks(list));
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

    static newBank(){
        return dispatch => {
            dispatch(formBank(new Bank(), new Notification()));
        }
    }

    static saveBank(bank, user){
        return dispatch => {
            let verb = 'POST';
            let url = POST_BANK;
            if(bank.id && bank.id > 0){
                verb = 'PUT';
                url = BANK.replace(":id", bank.id);
            }

            const requestInfo = {
                method: verb,
                body: JSON.stringify(bank),
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
                            browserHistory.push('/gestao/bancos');
                            return success;
                        });
                    } else {       
                        response.json().then(error=>{
                            //console.log("error", error);
                            dispatch(alterProgressBar(false));
                            dispatch(formBank(null, error));
                            dispatch(updateNotification(true,error));
                            return error;
                        });
                    }
                });
        }
    }

    static getBank(id, user, url) {
        return dispatch => {

            const requestInfo = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': user.tokenAccess.token
                })
            };

            dispatch(alterProgressBar(true));

            fetch(BANK.replace(":id", id), requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(bank => {
                            dispatch(alterProgressBar(false));
                            dispatch(formBank(bank, new Notification()));
                            browserHistory.push(url);
                            return bank;
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
            fetch(BANK_STATUS.replace(":id", id), requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(notification => {                            
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,notification));
                            dispatch(this.listBanks(user));                         
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