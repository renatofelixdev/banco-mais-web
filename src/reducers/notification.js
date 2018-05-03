import { NOTIFICATION } from "../paths/types";

export function notification(state =   {  msg: '', visible: false, status: '' } , action) {

    if(action.type === NOTIFICATION){
        //console.log(action);
        const response = action.jsonResponse;
        if(Object.keys(response).length !== 0 && response.constructor === Object)
            return {msg:response.message, visible:action.visible, status:response.status.toLowerCase()};
        else
            return  {  msg: '', visible: action.visible, status: '' };
    }

    return state;
}