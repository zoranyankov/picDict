import { INewUser } from "./new-user-interface";

export interface IRegResponse {
    user: {  _id: string
        username: string,
        password: string,
        picture: string,},
    token: string,
}