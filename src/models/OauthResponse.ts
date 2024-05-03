import R from "@models/Response"

class OauthResponse extends R {

    private token: String;

    constructor(code: Number, message?: String, token?: String) {
        super(code, message)
        this.token = token
    }
    
}

export default OauthResponse