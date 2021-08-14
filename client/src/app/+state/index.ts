import { ActionReducerMap } from "@ngrx/store";
import { IAuthState } from "../shared/interfaces/auth-state-interface";
import { authReducer } from "./authReducers";

export interface IAppState {
    readonly auth : IAuthState
}

export const reducers: ActionReducerMap<IAppState> = {
    auth: authReducer
}