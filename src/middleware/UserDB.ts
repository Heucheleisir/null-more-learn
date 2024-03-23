import sourcedb from '@middleware/mysql'
import { ItemMapper } from '@middleware/SqlMapper'
import User from "@models/User"
import SysRole from "@models/SysRole"

const table = 'user'
const tableRoleUser = 'role_user'
const tableSysRole = 'sys_role'
const roleUserMapper = {
    userId: 'user_id',
    roleId: 'role_id'
}
class userDB extends sourcedb {
    constructor() {
        const baseMapper = Object.keys(User.baseMapper).map((key: string): ItemMapper => ({
            field: key, fieldMapper: User.baseMapper[key]
        }))
        super(table, { modelKey: 'userId', mapperKey: 'user_id' }, baseMapper)
        this.sqlMapper.joinMapperList.push({
            table: tableRoleUser,
            mapperList: Object.keys(roleUserMapper).map((key: string, index): ItemMapper => ({
                field: key, fieldMapper: roleUserMapper[key]
            }))
        }, {
            table: tableSysRole,
            mapperList: Object.keys(SysRole.baseMapper).map((key: string, index): ItemMapper => ({
                field: key, fieldMapper: SysRole.baseMapper[key]
            }))
        })
    }

    public list() {
        return new Promise<User[]>(async (resolve, reject) => {
            const usersDB: User[] = new Array<User>()
            // const boolean1 = await this.logincheck('admin', '123456')
            let result: Array<any> = await this.fetch();
            if (result) {
                result.forEach(element => {
                    usersDB.push(new User(element))
                })
                resolve(usersDB);
            }
            // this.sqlMapper.setJoinKeys([{
            //     table: this.tableName,
            //     keyField: 'userId',
            //     joinField: { tabel: tableRoleUser, key: 'user_id' }
            // }, {
            //     table: tableRoleUser,
            //     keyField: 'roleId',
            //     joinField: { tabel: tableSysRole, key: 'id' }
            // }])
            // let result2: Array<any> = await this.fetchLeft(this.sqlMapper.sqlMainTable, [this.tableName, tableRoleUser, tableSysRole]);
            // const result3 = this.sqlMapper.getJoinKeysMapperResult(result2)
            // console.log(result3)
        });
    }

    public async logincheck(username: string, password: string): Promise<User> {
        const result = await this.whereAndFetch({ username, password })
        if (result && result.length) {
            return new User(result[0])
        } else {
            return new User({})
        }
    }

    public async getById(userId: String): Promise<User> {
        const result = await this.whereAndFetch({ userId })
        if (result && result.length) {
            return new User(result[0])
        } else {
            return new User({})
        }
    }
}

export default userDB