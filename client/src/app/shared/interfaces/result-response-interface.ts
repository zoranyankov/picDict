import { IResults } from "./results-interface";

export interface IResultRes {
    createdAt: string,
    creatorId: string,
    score: string,
    userResults: IResults,
    _id: string
}