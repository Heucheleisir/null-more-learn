import R from "@models/Response"

class OauthResponse extends R {

    private token: String;

    constructor(code: Number, massage?: String, token?: String) {
        super(code, massage)
        this.token = token
    }
    
}

export default OauthResponse