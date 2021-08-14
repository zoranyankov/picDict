import { createSelector } from "@ngrx/store";
import { IAppState } from ".";

export const selectAuth = (s: IAppState) => s.notify;

export const selectType = createSelector(
    selectAuth,
    state => state.type
)
export const selectMessages = createSelector(
    selectAuth,
    state => state.messages
)
export const selectNotify= createSelector(
    selectAuth,
    state => state
)