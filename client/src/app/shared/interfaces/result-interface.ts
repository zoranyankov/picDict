import { IAnswer } from "./answer-interface";

export interface IResult {
    creatorId: string,
    userResults: IAnswer[],
    score: number
}