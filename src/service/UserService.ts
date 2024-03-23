import { Request } from 'express'
import userdb from '@middleware/UserDB';
import User from '@models/User';
import SysRolePermissionsDB from '@middleware/SysRolePermissionsDB';
import SysRolePermissions from '@models/DTO/SysRolePermissions';
import SysPermission from '@models/SysPermission';

const userDB = new userdb()

class UserService {
    protected context: Request

    public bindContext(request: Request) {
        this.context = request
        return this
    }

    public async loginUser(username: string, password: string): Promise<User> {
        return await userDB.logincheck(username, password)
    }

    public async fetchList() {
        const userList: User[] = await userDB.list()
        return userList
    }

    public async fetchListRolePermissions() {
        const sysRolePermissionsDB = new SysRolePermissionsDB().bindContext(this.context)
        const sysRolePermissionsList: SysRolePermissions[] = await sysRolePermissionsDB.list()
        return sysRolePermissionsList
    }

    public async saveSysPermissions(sysPermission: SysPermission) {
        const sysRolePermissionsDB = new SysRolePermissionsDB()
        return await sysRolePermissionsDB.savePermission(sysPermission)
    }

    public async getUserById(userId: string): Promise<User> {
        return await userDB.getById(userId)
    }
}

export default UserService