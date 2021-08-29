import { IResults } from "./results-interface";

export interface IResultRes {
    createdAt: string,
    creatorId: string,
    score: number,
    userResults: IResults[],
    _id: string
}