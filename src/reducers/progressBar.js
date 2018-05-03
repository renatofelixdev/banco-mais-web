import { PROGRESS_BAR } from "../paths/types";

export function progressBar(state = false, action) {

    if(action.type === PROGRESS_BAR){
        return action.visible;
    }

    return state;
}