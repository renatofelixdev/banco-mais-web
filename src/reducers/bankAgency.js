import {List} from 'immutable';
import { LIST_BANK_AGENCY, FORM_BANK_AGENCY, CHANGE_BANK, BANK_AGENCY_BANKS } from '../paths/types';
import Notification from '../models/Notification';
import BankAgency from '../models/BankAgency';

export function banksAgencies(state = new List(), action) {
    if (action.type === LIST_BANK_AGENCY) {
        ////console.log(action);
        return new List(action.list);
    }
    return state;
}

export function formBankAgency(state = {bankAgency: new BankAgency(), notification: new Notification(), banks:[], bankSelect:''}, action) {
    if (action.type === FORM_BANK_AGENCY) {
        if(action.banks.length > 0)
            state.banks = action.banks;
        if(action.bankAgency !== null)
            state.bankAgency = action.bankAgency;
        if(action.bankSelect !== null)
            state.bankSelect = action.bankSelect;
        state.notification = action.notification;
        return Object.assign({}, state);
    }

    if(action.type === BANK_AGENCY_BANKS){
        state.banks = action.list; 
        return Object.assign({}, state);
    }

    if(action.type === CHANGE_BANK){
        state.bankSelect = action.value;
        return Object.assign({}, state);
    }

    return state;
}