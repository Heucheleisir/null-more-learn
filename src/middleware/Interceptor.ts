import { Request, Response } from 'express'
import config from "@config/index";
import Redis from "@common/redis";
import { verifyToken, oauthExist } from "@common/jsonwebtoken";
import OR from "@models/OauthResponse"
import { regExpOauthUrl } from '@common/utils';

const { oauthRouter } = config

const interceptor = async function (request: Request, response: Response, next) {
    // console.log('拦截器--test--4.15-9.54--new')
    request.headers['x-request-id'] = `${new Date().getTime()}_${request.host}_${request.originalUrl}`
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type,authorization')
    if (oauthRouter.some(router => regExpOauthUrl(router).test(request.url))) {
        if (request.method === 'OPTIONS') {
            return response.end()
        }
        if (!request.headers.authorization) {
            response.status(401)
            return response.json(new OR(-1, '用户未登陆'));
        }
        const headers = request.headers
        const token = headers['authorization'].split(' ')?.[1]
        console.log(token, 'token--test--4.13-16.6--new')
        if (token && await oauthExist(token)) {
            const verify = await verifyToken(token)
            if (verify.verified) {
                next();
            } else {
                response.status(401)
                return response.json(new OR(-1, verify.massage));
            }
        } else {
            response.status(401)
            return response.json(new OR(-1, '登陆信息不存在'));
        }
    } else {
        next();
    }
};

export default interceptor;
