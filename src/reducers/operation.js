import {List} from 'immutable';
import { BANK_STATEMENT_OPERATION } from '../paths/types';

export function bankStatement(state = new List(), action) {
    if (action.type === BANK_STATEMENT_OPERATION) {
        ////console.log(action);
        return new List(action.list);
    }
    return state;
}