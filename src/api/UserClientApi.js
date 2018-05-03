import { alterProgressBar, 
    updateNotification, 
    listUsersClient,
    formUserClient} from '../actions/actionCreator';
import { LIST_USERS_CLIENT, POST_USER_CLIENT, USER_CLIENT, USER_CLIENT_STATUS } from '../paths/routes';
import { browserHistory } from 'react-router';
import UserClient from '../models/UserClient';
import Notification from '../models/Notification';

export default class UserClientApi {

    static listUsersClient(user) {
        return dispatch => {

            const requestInfo = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': user.tokenAccess.token
                })
            };

            dispatch(alterProgressBar(true));

            fetch(LIST_USERS_CLIENT, requestInfo)
                .then(response => {
                    if (response.ok) {
                        response.json().then(list => {
                            dispatch(alterProgressBar(false));
                            dispatch(listUsersClient(list));
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

    static newUserClient(){
        return dispatch => {
            dispatch(formUserClient(new UserClient(), new Notification()));
        }
    }

    static saveUserClient(userClient, user){
        return dispatch => {
            let verb = 'POST';
            let url = POST_USER_CLIENT;
            if(userClient.id && userClient.id > 0){
                verb = 'PUT';
                url = USER_CLIENT.replace(":id", userClient.id);
            }

            const requestInfo = {
                method: verb,
                body: JSON.stringify(userClient),
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
                            browserHistory.push('/gestao/clientes');
                            return success;
                        });
                    } else {       
                        response.json().then(error=>{
                            //console.log("error", error);
                            dispatch(alterProgressBar(false));
                            dispatch(formUserClient(null, error));
                            dispatch(updateNotification(true,error));
                            return error;
                        });
                    }
                });
        }
    }

    static getUserClient(id, user, url) {
        return dispatch => {

            const requestInfo = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': user.tokenAccess.token
                })
            };

            dispatch(alterProgressBar(true));

            fetch(USER_CLIENT.replace(":id", id), requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(userClient => {
                            dispatch(alterProgressBar(false));
                            dispatch(formUserClient(userClient, new Notification()));
                            browserHistory.push(url);
                            return userClient;
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
            fetch(USER_CLIENT_STATUS.replace(":id", id), requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(notification => {                            
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,notification));
                            dispatch(this.listUsersClient(user));                         
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