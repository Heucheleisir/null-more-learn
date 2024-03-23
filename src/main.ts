import express, { Application, Request, Response, NextFunction } from 'express'
import indexRouter from '@router/index'
import oauthRouter from '@router/oauth'
import Redis from "@common/redis";
import interceptor from '@middleware/Interceptor'
import errorInterceptor from '@middleware/errorInterceptor'

const App: Application = express();
App.use(express.json())
App.use(interceptor)
Redis.on('error', err => console.log('Redis Client Error', err))
    .connect();
// import Redis from "@config/redis";
// // import { Router } from "express";
// const app: Application = express();
// const path = require('path');
// var cookieParser = require('cookie-parser');

// // import oauthRouter from './routers/oauth.ts'
// var oauthRouter = require('./routers/oauth.ts');
// // import someInterfaceRef = require("./routers/SomeInterface");
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//     res.send('Hello World!');
// });
// console.log(Redis, 'Redis--test--11.29-9.40--new')
// app.post('/testpost', function (req, res) {
//     console.log(req, 'req--test--11.29-9.40--new')
//     res.json(req.body)
// });

// // const router = Router();
// app.use('/oauth', oauthRouter);
App.use('/', indexRouter);
App.use('/oauth', oauthRouter);
App.use(errorInterceptor);
App.listen(7777, function () {
    console.log('Example app listening on port 7777!');
})