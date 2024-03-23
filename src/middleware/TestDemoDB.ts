import sourcedb from '@middleware/mysql'
import TestDemo from "@models/TestDemo"

const table = 'test_demo'

class TestDemoDB extends sourcedb {
    constructor() {
        super(table)
    }

    public list() {
        return new Promise<TestDemo[]>(async (resolve, reject) => {
            const TestDemoDB: TestDemo[] = new Array<TestDemo>()
            // const boolean1 = await this.logincheck('admin', '123456')
            let result: Array<any> = await this.fetch();
            if (result) {
                result.forEach(element => {
                    TestDemoDB.push(new TestDemo(element))
                })
                resolve(TestDemoDB);
            }
        });
    }

    public async getById(id: String): Promise<TestDemo> {
        const result = await this.whereAndFetch({ id })
        if (result && result.length) {
            return new TestDemo(result[0])
        } else {
            return new TestDemo({})
        }
    }
    
    public async updateById(testDemo: TestDemo): Promise<boolean> {
        const testDemoSQL = testDemo.constructorSQL()
        const result = await this.update({ id: testDemoSQL.id }, testDemoSQL)
        if (result.warningStatus === 0 && result.affectedRows) {
            return true
        } else {
            return false
        }
    }

    public async save(testDemo: TestDemo): Promise<boolean> {
        const testDemoSQL = testDemo.constructorSQL()
        const result = await this.insert(testDemoSQL)
        if (result.warningStatus === 0 && result.affectedRows) {
            return true
        } else {
            return false
        }
    }
}

export default TestDemoDB