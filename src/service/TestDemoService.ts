import testdemodb from "@middleware/TestDemoDB";
import TestDemo from '@models/TestDemo';

const testDemoDB = new testdemodb()

class TestDemoService {

    public async fetchList() {
        const testDemoList: TestDemo[] = await testDemoDB.list()
        return testDemoList
    }

    public async getTestDemoById(id: string): Promise<TestDemo> {
        return await testDemoDB.getById(id)
    }
    
    public async updateTestDemoById(testDemo: TestDemo): Promise<boolean> {
        return await testDemoDB.updateById(testDemo)
    }

    public async saveTestDemo(testDemo: TestDemo): Promise<boolean> {
        return await testDemoDB.save(testDemo)
    }
}

export default TestDemoService