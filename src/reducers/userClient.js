import {List} from 'immutable';
import { LIST_USER_CLIENT, FORM_USER_CLIENT } from '../paths/types';
import Notification from '../models/Notification';
import UserClient from '../models/UserClient';

export function usersClient(state = new List(), action) {
    if (action.type === LIST_USER_CLIENT) {
        ////console.log(action);
        return new List(action.list);
    }
    return state;
}

export function formUserClient(state = {userClient: new UserClient(), notification: new Notification()}, action) {
    if (action.type === FORM_USER_CLIENT) {
        if(action.userClient !== null)
            state.userClient = action.userClient;
        state.notification = action.notification;
        return Object.assign({}, state);
    }
    return state;
}