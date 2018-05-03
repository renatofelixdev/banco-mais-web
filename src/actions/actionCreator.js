import { 
    LOGIN, 
    PROGRESS_BAR, 
    NOTIFICATION
} from '../paths/types';
import Notification from '../models/Notification';

export function login(jsonResponse){
    return {type:LOGIN, jsonResponse};    
}

export function alterProgressBar(visible){
    return {type:PROGRESS_BAR, visible};
}

export function updateNotification(visible, jsonResponse){
    return {type:NOTIFICATION, visible, jsonResponse};
}