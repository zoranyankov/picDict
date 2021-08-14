// import { IAppState } from "."

import { createSelector } from "@ngrx/store";
import { IAppState } from ".";

// export function getUsername(s: IAppState){
//     return s.auth.username;
// }

export const selectAuth = (s: IAppState) => s.auth;

export const selectUsername = createSelector(
    selectAuth,
    state => state.username
)