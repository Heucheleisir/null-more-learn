class Response {

    private code: Number;
    private message: String;

    constructor(code: Number, message?: String ) {
        this.code = code
        this.message = message
    }
    
}

export default Response