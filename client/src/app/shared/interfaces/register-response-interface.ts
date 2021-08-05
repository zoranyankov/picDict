import { INewUser } from "./new-user-interface";

export interface IRegResponse {
    user: INewUser,
    token: String,
}