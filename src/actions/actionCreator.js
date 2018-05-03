import { 
    LOGIN, 
    PROGRESS_BAR, 
    NOTIFICATION,
    USER_MASTER
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