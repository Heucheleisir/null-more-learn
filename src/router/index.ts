import express, { Application, Request, Response, NextFunction } from 'express'
import UserController from '@controller/UserController'
import TestDemoController from '@controller/TestDemoController'
import ChatController from '@controller/ChatController'

const router = express.Router();

router.get('/test',async function (req: Request, res: Response, next: any) {
    console.log(req, req.body, 'req--test--11.29-9.40--new')
    res.json({ message: '测试成功' })
})

router.use("/users", UserController);
router.use("/chat", ChatController);
router.use("/testdemo", TestDemoController);

export default router
