import R from "@models/Response"

class DataResponse extends R {

    private data: String;

    constructor(code: Number, massage?: String, data?: any) {
        super(code, massage)
        this.data = data
    }
    
}

export default DataResponse