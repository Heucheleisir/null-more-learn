import express, { Application, Request, Response, NextFunction } from 'express'
import UserService from '@service/UserService';
import User from '@models/User';
import SysRolePermissions from '@models/DTO/SysRolePermissions';
import DR from '@models/DataResponse';
import SysPermission from '@models/SysPermission';

const router = express.Router();

router.get('/userinfo/:userId', async function (req: Request, res: Response, next: any) {
    const userService = new UserService()
    const userList: User[] = await userService.fetchList()
    res.json(new DR(200, 'success', userList))
})

router.get('/rolepermissions/', async function (request: Request, response: Response, next: any) {
    const userService = new UserService().bindContext(request)
    const sysRolePermissionsList: SysRolePermissions[] = await userService.fetchListRolePermissions()
    response.json(new DR(200, 'success', sysRolePermissionsList))
})

router.post('/permissions', async function (request: Request, response: Response, next: any) {
    const userService = new UserService().bindContext(request)
    const sysPermission = new SysPermission(request.body)
    const result: boolean = await userService.saveSysPermissions(sysPermission)
    response.json(new DR(200, 'success', result))
})

router.put('/permissions', async function (request: Request, response: Response, next: any) {
    const userService = new UserService().bindContext(request)
    const sysPermission = new SysPermission(request.body)
    if (sysPermission.insertInspect()) {
        const result: boolean = await userService.saveSysPermissions(sysPermission)
        response.json(new DR(200, 'success', result))
    } else {
        next(new Error(sysPermission.errMsg))
    }
})

export default router
