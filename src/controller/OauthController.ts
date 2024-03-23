import express, { Application, Request, Response, NextFunction } from 'express'
import UserService from '@service/UserService';
import User from '@models/User';
import OR from "@models/OauthResponse"
import DR from '@models/DataResponse';
import { oauthSign } from "@common/jsonwebtoken";
import SysRolePermissions from '@models/DTO/SysRolePermissions';

const router = express.Router();
const userService = new UserService()

router.post('/login', async function (req: Request, res: Response) {
    const currUser: User = await userService.loginUser(req.body.username, req.body.password)
    if (currUser.getValue('userId')) {
        let token = await oauthSign(currUser.getValue('username'), currUser.getValue('userId'))
        res.json(new OR(200, '测试login成功', token))
    } else {
        res.json(new OR(403, '用户名密码错误'))
    }
    // res.json(req.body)
})

router.get('/menu', async function (request: Request, response: Response) {
    const userService = new UserService().bindContext(request)
    const sysRolePermissionsList: SysRolePermissions[] = await userService.fetchListRolePermissions()
    response.json(new DR(200, 'success', sysRolePermissionsList))
})

export default router
