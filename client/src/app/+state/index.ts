import { ActionReducerMap } from "@ngrx/store";
import { IAuthState } from "../shared/interfaces/auth-state-interface";
import { INotifyState } from "../shared/interfaces/notify-state-interface";
import { authReducer } from "./authReducers";
import { notifyReducer } from "./notifyReducer";

export interface IAppState {
    readonly auth : IAuthState,
    readonly notify: INotifyState
}

export const reducers: ActionReducerMap<IAppState> = {
    auth: authReducer,
    notify: notifyReducer
}