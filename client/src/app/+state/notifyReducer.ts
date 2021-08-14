import { createReducer, on } from '@ngrx/store';
import { INotifyState } from '../shared/interfaces/notify-state-interface';
import { error, success } from './notifyActions';

export const initialState: INotifyState = {
    type: '',
    messages: [{message: ''}],
}

export const notifyReducer = createReducer(
    initialState,
    on(error, (state, { messages }) => ({ ...state, type: 'error', messages: messages })),
    on(success, (state, { messages }) => ({ ...state, type: 'success', messages: messages })),
)