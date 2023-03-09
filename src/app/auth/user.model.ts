export class User {
    constructor(
      public userId: string,
      private _token: string,
      private _tokenExpirationDate: Date
    ) {}
  
    get token() {
    //   if (!this._tokenExpirationData || new Date() > this._tokenExpirationData) {
    //     return null;
    //   }
      return this._token;
    }
  }
  