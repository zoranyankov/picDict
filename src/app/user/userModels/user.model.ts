export class User {
    constructor(
        public user: String,
        // public id: String,
        private _token: String,
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