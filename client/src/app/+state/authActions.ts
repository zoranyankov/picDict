import { createAction, props } from "@ngrx/store";
import { INewUser } from "../shared/interfaces/new-user-interface";

const authNameSpase = '[Login Component]';

export const login = createAction(
    `${authNameSpase} login`,
    props<{user: INewUser | null}>()
)

export const logout = createAction(
    `${authNameSpase} logout`,
)