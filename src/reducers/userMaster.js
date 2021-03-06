import { USER_MASTER } from '../paths/types';
import Notification from '../models/Notification';

export function formUserMaster(state = { user: '', notification: new Notification() }, action) {
    if (action.type === USER_MASTER) {
        //console.log(action);
        state.user = action.userMaster;
        state.notification = action.notification;
        return Object.assign({}, state);
    }

    return state;
}