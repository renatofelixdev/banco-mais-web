import { alterProgressBar, updateNotification, formUserMaster, formUserClient } from '../actions/actionCreator';
import {browserHistory} from  'react-router';
import { LOGIN_USER_MASTER, LOGIN_USER_CLIENT } from '../paths/routes';
import { CLIENT_ID, CLIENT_SECRET } from '../paths/GeneralAttrs';
import Notification from '../models/Notification';
import jwt from 'jsonwebtoken';

export default class LoginApi {

    static login(email, password) {
        return dispatch => {
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({ login:email, password, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET}),
                headers: new Headers({
                    'Content-type': 'application/json'
                })
            };

            dispatch(alterProgressBar(true));

            fetch(LOGIN_USER_MASTER, requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(user => {
                            dispatch(alterProgressBar(false));
                            let jwtUser = jwt.sign(user, "user");
                            localStorage.setItem('user', jwtUser);
                            console.log(jwtUser);
                            dispatch(formUserMaster(jwtUser, new Notification()));
                            browserHistory.push('/gestao');
                            return user;
                        });
                    } else {       
                        response.json().then(error=>{
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,error));
                        });
                    }
                });
        }
    }

    static loginClient(cpf, password) {
        return dispatch => {
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({ cpf, password, clientId: CLIENT_ID, clientSecret: CLIENT_SECRET}),
                headers: new Headers({
                    'Content-type': 'application/json'
                })
            };

            dispatch(alterProgressBar(true));

            fetch(LOGIN_USER_CLIENT, requestInfo)
                .then(response => {
                    if(response.ok) {
                        response.json().then(user => {
                            console.log(user);
                            dispatch(alterProgressBar(false));
                            let jwtUser = jwt.sign(user, "userClient");
                            localStorage.setItem('user', jwtUser);
                            dispatch(formUserClient(jwtUser, new Notification()));
                            browserHistory.push('/cliente');
                            return user;
                        });
                    } else {       
                        response.json().then(error=>{
                            dispatch(alterProgressBar(false));
                            dispatch(updateNotification(true,error));
                        });
                    }
                });
        }
    }
}