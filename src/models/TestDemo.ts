class TestDemo {

    public id: number;
    public testDemo1: string;
    public testDemo2: string;
    public testDemo3: string;
    public testDemo4: string;
    public testDemo5: string;
    public errMsg?: string;

    constructor(testDemo: any) {
        this.id = testDemo.id
        this.testDemo1 = testDemo.test_demo1 || testDemo.testDemo1
        this.testDemo2 = testDemo.test_demo2 || testDemo.testDemo2
        this.testDemo3 = testDemo.test_demo3 || testDemo.testDemo3
        this.testDemo4 = testDemo.test_demo4 || testDemo.testDemo4
        this.testDemo5 = testDemo.test_demo5 || testDemo.testDemo5
    }
    constructorSQL() {
        return {
            id: this.id,
            test_demo1: this.testDemo1,
            test_demo2: this.testDemo2,
            test_demo3: this.testDemo3,
            test_demo4: this.testDemo4,
            test_demo5: this.testDemo5
        }
    }
    insertInspect(): boolean {
        if (this.id) {
            this.errMsg = '参数: id报错'
            return false
        } else {
            return true
        }
    }
}

export default TestDemo