import {List} from 'immutable';
import { LIST_BANK_ACCOUNT, 
    FORM_BANK_ACCOUNT, 
    CHANGE_BANK_BANK_ACCOUNT, 
    CHANGE_BANK_AGENCY_BANK_ACCOUNT,
    BANKS_BANK_ACCOUNT,
    BANKS_AGENCY_BANK_ACCOUNT, 
    BANK_ACCOUNT_TYPES,
    CHANGE_BANK_ACCOUNT_TYPE} from '../paths/types';
import Notification from '../models/Notification';
import BankAccount from '../models/BankAccount';

export function banksAccounts(state = new List(), action) {
    if (action.type === LIST_BANK_ACCOUNT) {
        ////console.log(action);
        return new List(action.list);
    }
    return state;
}

export function formBankAccount(state = {bankAccount: new BankAccount(), 
                                                notification: new Notification(), 
                                                banks:[], 
                                                bankSelect:'', 
                                                banksAgencies:[], 
                                                bankAgencySelect:'',
                                                types:[],
                                                typeSelect:''}, 
                                                action) {
    if (action.type === FORM_BANK_ACCOUNT) {
        if(action.banks.length > 0)
            state.banks = action.banks;
        if(action.banksAgencies.length > 0)
            state.banksAgencies = action.banksAgencies;            
        if(action.types.length > 0)
            state.types = action.types;

        if(action.bankAccount !== null)
            state.bankAccount = action.bankAccount;

        if(action.bankSelect !== null)
            state.bankSelect = action.bankSelect;
        if(action.bankAgencySelect !== null)
            state.bankAgencySelect = action.bankAgencySelect;
        if(action.typeSelect !== null)
            state.typeSelect = action.typeSelect;
        state.notification = action.notification;
        return Object.assign({}, state);
    }

    if(action.type === BANKS_BANK_ACCOUNT){
        state.banks = action.list; 
        return Object.assign({}, state);
    }

    if(action.type === CHANGE_BANK_BANK_ACCOUNT){
        state.bankSelect = action.value;
        return Object.assign({}, state);
    }

    if(action.type === BANKS_AGENCY_BANK_ACCOUNT){
        state.banksAgencies = action.list; 
        return Object.assign({}, state);
    }

    if(action.type === CHANGE_BANK_AGENCY_BANK_ACCOUNT){
        state.bankAgencySelect = action.value;
        return Object.assign({}, state);
    }

    if(action.type === BANK_ACCOUNT_TYPES){
        state.types = action.list; 
        return Object.assign({}, state);
    }

    if(action.type === CHANGE_BANK_ACCOUNT_TYPE){
        state.typeSelect = action.value;
        return Object.assign({}, state);
    }

    return state;
}