import express, { Application, Request, Response, NextFunction } from 'express'
import DR from '@models/DataResponse';
import Docs from '@config/docs';

const router = express.Router();

router.get('/test', async function (request: ({ query?: { message?: string } } & Request), response: Response) {
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    const { message } = request.query
    // response.setHeader('Cache-Control', 'no-reconnect'); // 禁止前端自动重连
    const chatID = new Date().getTime()
    const END_FLAGE = `[DONE]`
    let sseDocs = Docs.testSseContent.find(item =>
        item.input.includes(message) || item.input === 'default').output
    // 每隔一段时间发送一个事件到客户端
    const intervalId = setInterval(() => {
        const sseStr = sseDocs.substring(0, 10)
        sseDocs = sseDocs.substring(10)
        if (sseStr) {
            response.write(`id: ${chatID}\n\ndata: ${JSON.stringify(sseStr.split('\n').join('\\n'))}\n\nretry: 1000`);
        } else {
            clearInterval(intervalId)
            response.write(`id: ${chatID}\n\ndata: ${END_FLAGE}\n\nretry: 1000`);
            response.end()
        }
    }, 100);
})
router.post('/test', async function (request: ({ query?: { message?: string } } & Request), response: Response) {
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    const { message } = request.body
    // response.setHeader('Cache-Control', 'no-reconnect'); // 禁止前端自动重连
    const chatID = new Date().getTime()
    let sseDocs = Docs.testSseContent.find(item =>
        item.input.includes(message) || item.input === 'default').output
    // 每隔一段时间发送一个事件到客户端
    const intervalId = setInterval(() => {
        const sseStr = sseDocs.substring(0, 10)
        sseDocs = sseDocs.substring(10)
        if (sseStr) {
            response.write(`id: ${chatID}\n\ndata: ${JSON.stringify(sseStr.split('\n').join('\\n'))}\n\nretry: 1000`);
        } else {
            clearInterval(intervalId)
            // response.write(`id: ${chatID}\n\ndata: ${END_FLAGE}\n\nretry: 1000`);
            response.end()
        }
    }, 100);
})
export default router
