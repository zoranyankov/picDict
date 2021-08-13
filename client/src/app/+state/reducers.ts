import {Action, createReducer, on, State} from '@ngrx/store';
import { INewUser } from '../shared/interfaces/new-user-interface';
import * as AuthActions from './actions';

const initialState: INewUser = {
    _id: 'some Id',
    username: 'No user',
    picture: 'picture is not here',
    token: 'toekenenenenenn',
}

export const loginReducer = createReducer(
    initialState, 
    on(AuthActions.login, (state, {username, password}) => ({...state, username: username, password: password})),
    on(AuthActions.login, (state) => {
        console.log(state);
        return state
    })
)

export function reducer(state: INewUser | undefined, action: Action){
    return loginReducer(state, action)
}

// export function appReducer(state: any = initialState, action: any) {
//     console.log(action);
//     return state;
// }