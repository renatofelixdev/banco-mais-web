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
    FORM_USER_CLIENT,
    LIST_BANK_ACCOUNT,
    FORM_BANK_ACCOUNT,
    BANKS_BANK_ACCOUNT,
    BANKS_AGENCY_BANK_ACCOUNT,
    CHANGE_BANK_AGENCY_BANK_ACCOUNT,
    BANK_ACCOUNT_TYPES,
    CHANGE_BANK_ACCOUNT_TYPE,
    CHANGE_BANK_BANK_ACCOUNT,
    BANK_ACCOUNT_SELECT,
    BANK_STATEMENT_OPERATION
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



export function listBanksAccounts(list){
    return {type:LIST_BANK_ACCOUNT, list}
}

export function formBankAccount(bankAccount=null, notification=new Notification(), banks=[], bankSelect='', banksAgencies=[], bankAgencySelect='', types=[], typeSelect=''){
    return {type:FORM_BANK_ACCOUNT, bankAccount, notification, banks, bankSelect, banksAgencies,bankAgencySelect,types, typeSelect}
}

export function listBanksToAccount(list){
    return {type:BANKS_BANK_ACCOUNT, list};
}

export function changeBankToAccount(value){
    return {type:CHANGE_BANK_BANK_ACCOUNT, value}
}

export function listBanksAgenciesToAccount(list){
    return {type:BANKS_AGENCY_BANK_ACCOUNT, list};
}

export function changeBankAgencyToAccount(value){
    return {type:CHANGE_BANK_AGENCY_BANK_ACCOUNT, value}
}

export function listBankAccountTypes(list){
    return {type:BANK_ACCOUNT_TYPES, list};
}

export function changeBankAccountType(value){
    return {type:CHANGE_BANK_ACCOUNT_TYPE, value}
}        


export function selectBankAccount(bankAccount){
    return {type:BANK_ACCOUNT_SELECT, bankAccount}
} 


export function bankStatement(list){
    return {type:BANK_STATEMENT_OPERATION, list}
} 