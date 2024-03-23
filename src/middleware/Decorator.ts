
import { getUserRedis } from "@common/utils";
import User from "@models/User";
import SqlMapper, { ItemMapper } from '@middleware/SqlMapper'

type middlewareName = 'userRole'

const userTableName = 'user'
const middlewareTables = {
    userRole: {
        table: 'role_user',
        userkey: 'userId',
        key: 'roleId',
        mapper: {
            id: 'id',
            userId: 'user_id',
            roleId: 'role_id'
        }
    }
}

export function userPermissionsDecorator(baseTable: string, baseKey: string, middlewareName: middlewareName) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const _this = this;
            const sqlMapper: SqlMapper = _this.sqlMapper
            const user = await getUserRedis(_this.context)
            // 在方法调用前执行的逻辑
            const baseMapper = Object.keys(User.baseMapper).map((key: string): ItemMapper => ({
                field: key, fieldMapper: User.baseMapper[key]
            }))
            const middlewareTable = middlewareTables[middlewareName]
            const middlewareMapper = Object.keys(middlewareTable.mapper).map((key: string): ItemMapper => ({
                field: key, fieldMapper: middlewareTable.mapper[key]
            }))
            sqlMapper.setPermissionHeader(middlewareTable.table, middlewareMapper)
            sqlMapper.setPermissionHeader(userTableName, baseMapper,
                {
                    [`${userTableName}.${middlewareTable.mapper[middlewareTable.userkey]}`]: user.payload.userid
                })
            sqlMapper.setPermissionKeys([{
                table: userTableName,
                keyField: 'userId',
                joinField: { tabel: middlewareTable.table, key: middlewareTable.mapper[middlewareTable.userkey] }
            }, {
                table: middlewareTable.table,
                keyField: middlewareTable.key,
                joinField: { tabel: baseTable, key: baseKey }
            }])
            // 调用原始方法
            return originalMethod.apply(this, ...args);
        };
        return descriptor;
    }
}
