import {List} from 'immutable';
import { LIST_BANK, FORM_BANK } from '../paths/types';
import Notification from '../models/Notification';
import Bank from '../models/Bank';

export function banks(state = new List(), action) {
    if (action.type === LIST_BANK) {
        ////console.log(action);
        return new List(action.list);
    }
    return state;
}

export function formBank(state = {bank: new Bank(), notification: new Notification()}, action) {
    if (action.type === FORM_BANK) {
        if(action.bank !== null)
            state.bank = action.bank;
        state.notification = action.notification;
        return Object.assign({}, state);
    }
    return state;
}