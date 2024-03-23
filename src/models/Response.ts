class Response {

    private code: Number;
    private massage: String;

    constructor(code: Number, massage?: String ) {
        this.code = code
        this.massage = massage
    }
    
}

export default Response