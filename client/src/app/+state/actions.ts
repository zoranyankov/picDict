import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[Login Component] login',
    props<{username: string, password: string}>()
)

export function increment() {
    return {
        type: 'hahah'
    }
}