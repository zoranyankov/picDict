export interface INotifyState {
    readonly type: string,
    readonly messages: Array<{message: string}>,
    // readonly token: string,
}