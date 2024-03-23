import jsonwebtoken from 'jsonwebtoken'
import config from "@config/index";
import Redis from "@common/redis";

const { SystemId } = config
const { jwtKey, jwtConfig } = config.jwt

export function oauthSign(username: string, userid: string): Promise<String> {
    return new Promise<String>((resolve, reject) => {
        jsonwebtoken.sign(
            { username, userid },
            jwtKey,
            jwtConfig,
            (err: any, token: any) => {
                resolve('Bearer ' + token)
                Redis.HSET(`user:${token}`, { SystemId })
            }
        )
    })
}

export async function oauthExist(token) {
    return await Redis.EXISTS(`user:${token}`)
    // return await Redis.EXISTS(token)
}

export async function verifyToken(token: string) {
    let verify = {
        verified: false,
        massage: '',
        payload: null,
    }
    await jsonwebtoken.verify(token, jwtKey, (err, payload) => {
        if (err) {
            verify.verified = false
            verify.massage = err
        }
        else {
            verify.verified = true
            verify.payload = payload
        }
    })
    return verify
}

export function jwtLogout(username: string, userid: string) {
    jsonwebtoken.sign(
        { username, userid },
        jwtKey,
        jwtConfig,
        async (err: any, token: any) => {
            return 'Bearer ' + token
        }
    )
}