import { createAction, props } from "@ngrx/store";
import { INotifyState } from "../shared/interfaces/notify-state-interface";

const notifyNameSpase = '[Notify]';

export const error = createAction(
    `${notifyNameSpase} error`,
    props<{ messages: Array<{message: string}>}>(),
)

export const success = createAction(
    `${notifyNameSpase} success`,
    props<{ messages: Array<{message: string}>}>(),
)