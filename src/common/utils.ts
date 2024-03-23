import { Request, Response } from 'express'
import { verifyToken } from "@common/jsonwebtoken";

export async function getUserRedis(request: Request) {
    if (request.headers.authorization) {
        const token = request.headers['authorization'].split(' ')?.[1]
        const verify = await verifyToken(token)
        return verify
    }
}

export function regExpOauthUrl(url: string): RegExp {
    const wildcard = url.slice(-1) === '*'
    return new RegExp(`^${url}${wildcard ? '' : '$'}`, 'g')
}