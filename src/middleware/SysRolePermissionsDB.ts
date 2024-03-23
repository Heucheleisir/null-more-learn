import sourcedb from '@middleware/mysql'
import { ItemMapper } from '@middleware/SqlMapper'
// import User from "@models/User"
// import SysRole from "@models/SysRole"
import SysRolePermissions from '@models/DTO/SysRolePermissions'
import SysPermission from '@models/SysPermission'
import { Request } from 'express'
import { userPermissionsDecorator } from './Decorator'

const table = 'sys_role'
const tableRolePermission = 'role_premission'
const tableSysPermission = 'sys_permission'
const rolePermissionMapper = {
    roleId: 'role_id',
    permissionId: 'permission_id'
}

class SysRolePermissionsDB extends sourcedb {

    protected context: Request
    private permissionCallback: (() => void) | null

    constructor() {
        const baseMapper = Object.keys(SysRolePermissions.baseMapper).map((key: string): ItemMapper => ({
            field: key, fieldMapper: SysRolePermissions.baseMapper[key]
        }))
        super(table, { modelKey: 'id', mapperKey: 'id' }, baseMapper)
        this.permissionCallback = null
        this.sqlMapper.joinMapperList.push({
            table: tableRolePermission,
            mapperList: Object.keys(rolePermissionMapper).map((key: string, index): ItemMapper => ({
                field: key, fieldMapper: rolePermissionMapper[key]
            }))
        }, {
            table: tableSysPermission,
            mapperList: Object.keys(SysPermission.baseMapper).map((key: string, index): ItemMapper => ({
                field: key, fieldMapper: SysPermission.baseMapper[key]
            }))
        })
    }

    public bindContext(request: Request) {
        this.context = request
        this.sqlMapper.bindContext(request)
        return this
    }

    @userPermissionsDecorator(table, 'id', 'userRole')
    public list() {
        this.sqlMapper.setJoinKeys([{
            table: this.tableName,
            keyField: 'id',
            joinField: { tabel: tableRolePermission, key: 'role_id' }
        }, {
            table: tableRolePermission,
            keyField: 'permissionId',
            joinField: { tabel: tableSysPermission, key: 'id' }
        }])
        return new Promise<SysRolePermissions[]>(async (resolve, reject) => {
            const result: Array<any> = this.sqlMapper
                .getJoinKeysMapperResult(await this.fetchLeft(this.sqlMapper.sqlMainTable, [this.tableName, tableRolePermission, tableSysPermission]))
            const rolePermissionsDB: SysRolePermissions[] = new Array<SysRolePermissions>()
            result.forEach(element => {
                const rolePermissionItem = new SysRolePermissions(element)
                rolePermissionsDB.push(rolePermissionItem)
            })
            resolve(rolePermissionsDB)
        });
    }

    public async savePermission(sysPermission: SysPermission) {
        const sysPermissionSQL = sysPermission.constructorSQL()
        const result = await this.insert(sysPermissionSQL)
        if (result.warningStatus === 0 && result.affectedRows) {
            return true
        } else {
            return false
        }
    }

    // public async logincheck(username: string, password: string): Promise<User> {
    //     const result = await this.whereAndFetch({ username, password })
    //     if (result && result.length) {
    //         return new User(result[0])
    //     } else {
    //         return new User({})
    //     }
    // }

    // public async getById(userId: String): Promise<User> {
    //     const result = await this.whereAndFetch({ userId })
    //     if (result && result.length) {
    //         return new User(result[0])
    //     } else {
    //         return new User({})
    //     }
    // }
}

export default SysRolePermissionsDB