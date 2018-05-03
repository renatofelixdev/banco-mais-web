import { 
    LOGIN, 
    PROGRESS_BAR, 
    NOTIFICATION,
    USER_MASTER,
    LIST_BANK,
    FORM_BANK,
    BANK_AGENCY_BANKS,
    CHANGE_BANK,
    LIST_BANK_AGENCY,
    FORM_BANK_AGENCY,
    LIST_USER_CLIENT,
    FORM_USER_CLIENT
} from '../paths/types';

export function login(jsonResponse){
    return {type:LOGIN, jsonResponse};    
}

export function alterProgressBar(visible){
    return {type:PROGRESS_BAR, visible};
}

export function updateNotification(visible, jsonResponse){
    return {type:NOTIFICATION, visible, jsonResponse};
}

export function formUserMaster(userMaster, notification){
    return {type:USER_MASTER, userMaster, notification}
}

export function listBanks(list){
    return {type:LIST_BANK, list}
}

export function formBank(bank=null, notification=new Notification()){
    return {type:FORM_BANK, bank, notification}
}


export function listBanksAgencies(list){
    return {type:LIST_BANK_AGENCY, list}
}

export function formBankAgency(bankAgency=null, notification=new Notification(), banks=[], bankSelect=''){
    return {type:FORM_BANK_AGENCY, bankAgency, notification, banks, bankSelect}
}


export function listBanksToAgencies(list){
    return {type:BANK_AGENCY_BANKS, list};
}

export function changeBank(value){
    return {type:CHANGE_BANK, value}
}


export function listUsersClient(list){
    return {type:LIST_USER_CLIENT, list}
}

export function formUserClient(userClient=null, notification=new Notification()){
    return {type:FORM_USER_CLIENT, userClient, notification}
}
