import { Request, Response, NextFunction } from 'express'

const errorInterceptor = function (error: Error, request: Request, response: Response, next: NextFunction) {

    console.error(`捕获到的异常：${error.message}`);
    response.status(500).send('服务器错误');
}

export default errorInterceptor