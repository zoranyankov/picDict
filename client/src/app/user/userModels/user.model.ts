export class User {
    constructor(
        private _id: string,
        // public id: string,
        public user: string,
        private _token: string,
        // private _tokenExpirationDate: Date,
    ) { }

    //Get current Token 
    get token() {
        // if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        //     return null;
        // }
        return this._token;
    }
}