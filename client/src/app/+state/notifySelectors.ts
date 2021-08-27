import { createSelector } from "@ngrx/store";
import { IAppState } from ".";

export const selectNotification = (s: IAppState) => s.notify;

export const selectType = createSelector(
    selectNotification,
    state => state.type
)
export const selectMessages = createSelector(
    selectNotification,
    state => state.messages
)
export const selectNotify= createSelector(
    selectNotification,
    state => state
)