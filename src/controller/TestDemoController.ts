import express, { Application, Request, Response, NextFunction } from 'express'
import TestDemoService from '@service/TestDemoService';
import TestDemo from '@models/TestDemo';
import DR from '@models/DataResponse';

const router = express.Router();

const testDemoService = new TestDemoService()

router.get('/fetchList', async function (req: Request, res: Response, next: NextFunction) {
    const testDemoList: TestDemo[] = await testDemoService.fetchList()
    res.json(new DR(200, 'success', testDemoList))
})

router.get('/getById/:id', async function (req: Request, res: Response, next: NextFunction) {
    const testDemo: TestDemo = await testDemoService.getTestDemoById(req.params.id)
    res.json(new DR(200, 'success', testDemo))
})

router.post('/', async function (req: Request, res: Response, next: NextFunction) {
    const result: boolean = await testDemoService.updateTestDemoById(new TestDemo(req.body))
    res.json(new DR(200, 'success', result))
})

router.put('/', async function (req: Request, res: Response, next: NextFunction) {
    const testDemo = new TestDemo(req.body)
    if (testDemo.insertInspect()) {
        const result: boolean = await testDemoService.saveTestDemo(testDemo)
        res.json(new DR(200, 'success', result))
    } else {
        next(new Error(testDemo.errMsg))
    }
})

router.post('/upload', async function (req: Request, res: Response, next: NextFunction) {
    const testDemo = new TestDemo(req.body)
    if (testDemo.insertInspect()) {
        const result: boolean = await testDemoService.saveTestDemo(testDemo)
        res.json(new DR(200, 'success', result))
    } else {
        next(new Error(testDemo.errMsg))
    }
})

export default router
