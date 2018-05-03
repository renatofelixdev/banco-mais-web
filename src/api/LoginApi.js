import { alterProgressBar, updateNotification, formUserMaster } from '../actions/actionCreator';
import {browserHistory} from  'react-router';
import { LOGIN_USER_MASTER } from '../paths/routes';
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
                            //localStorage.setItem('user', JSON.stringify({id: jsonResponse.id, token: jsonResponse.token, name: jsonResponse.name, email: jsonResponse.email}));
                            
                            dispatch(formUserMaster(jwt.sign(user, "user"), new Notification()));
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
}