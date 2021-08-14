import { createSelector } from "@ngrx/store";
import { IAppState } from ".";

export const selectAuth = (s: IAppState) => s.auth;

export const selectUsername = createSelector(
    selectAuth,
    state => state.username
)