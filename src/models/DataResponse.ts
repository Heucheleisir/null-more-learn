import R from "@models/Response"

class DataResponse extends R {

    private data: String;

    constructor(code: Number, message?: String, data?: any) {
        super(code, message)
        this.data = data
    }
    
}

export default DataResponse