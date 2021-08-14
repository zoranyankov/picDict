import { createReducer, on } from '@ngrx/store';
import { IAuthState } from '../shared/interfaces/auth-state-interface';
import { login, logout } from './authActions';

export const initialState: IAuthState = {
    _id: '',
    username: '',
    picture: '',
    token: '',
    isLogged: false
}

export const authReducer = createReducer(
    initialState,
    on(login, (state, { user }) => ({ ...state, ...user })),
    on(logout, () => initialState),
)

// export function appReducer(state: any = initialState, action: any) {
//     console.log(action);
//     return state;
// }