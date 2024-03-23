import { Request } from 'express'
type JoinType = 'LEFT JOIN' | 'RIGHT JOIN'
type BaseType = string | boolean | number
interface JoinField {
    tabel: string
    key: string
}
interface JoinKey {
    table: string
    keyField: string
    joinField: JoinField
}
export interface ItemMapper {
    field: string
    fieldMapper: string
    joinField?: JoinField
}
export interface BaseKey {
    modelKey: string
    mapperKey: string
}
export interface SqlPackage {
    sql: string
    value: Array<BaseType>
}
class SqlMapper {

    private table: string
    public sqlMainTable: string
    private baseMapper: Array<ItemMapper>
    private baseKey: {
        modelKey: string
        mapperKey: string
    }
    protected whereMapper: { [key: string]: BaseType } | null
    private permission: boolean
    private permissionMapperList: Array<{ table: string, mapperList: Array<ItemMapper> }>
    private permissionWhereMapper: { [key: string]: BaseType } | null
    public joinMapperList: Array<{ table: string, mapperList: Array<ItemMapper> }>
    protected context: Request

    constructor(table: string, baseKey: BaseKey, mapperList: Array<ItemMapper>) {
        this.table = table
        this.sqlMainTable = table
        this.baseKey = baseKey
        this.baseMapper = []
        mapperList.forEach((item: ItemMapper) => {
            this.baseMapper.push(item)
        })
        this.joinMapperList = [{
            table: this.table,
            mapperList: this.baseMapper
        }]
        this.whereMapper = null
        this.permission = false
        this.permissionMapperList = []
        this.permissionWhereMapper = null
    }
    public bindContext(request: Request) {
        this.context = request
        return this
    }
    public setPermissionHeader(table: string, mapperList: Array<ItemMapper>, where?: { [key: string]: BaseType }) {
        this.permission = true
        this.permissionMapperList.unshift({ table, mapperList })
        this.sqlMainTable = table
        where && (this.permissionWhereMapper = Object.assign(this.permissionWhereMapper || {}, where))
    }
    protected getPermissionMapperList(tableList: Array<string>): { tableList: Array<string>, joinMapperList: typeof this.joinMapperList } {
        const joinMapperList = []
        if (this.permission) {
            joinMapperList.push(...this.permissionMapperList)
            tableList.unshift(...this.permissionMapperList.map(itemMapper => itemMapper.table))
        }
        joinMapperList.push(...this.joinMapperList)
        return { tableList, joinMapperList }
    }
    protected getPermissionMapperResult() {

    }
    private getMapperSQL(itemTable, itemMapper): string {
        return itemMapper
            .map(base => `${itemTable}.${base.fieldMapper} as '${itemTable}.${base.fieldMapper}'`)
            .join()
    }
    public getBaseMapperSQL(): string {
        return this.getMapperSQL(this.table, this.baseMapper)
    }
    public getJoinMapperSQL(tables: Array<string>): string {
        const { tableList, joinMapperList } = this.getPermissionMapperList(tables)
        return joinMapperList
            .filter(table => tableList.includes(table.table))
            .map(joinBase => this.getMapperSQL(joinBase.table, joinBase.mapperList))
            .join()
    }
    public setJoinKeys(keys: Array<JoinKey>) {
        const iterator: IterableIterator<JoinKey> = keys[Symbol.iterator]()
        let iteratorCurr = iterator.next()
        this.joinMapperList.some(baseMapper => {
            const currKeys: JoinKey = iteratorCurr.value
            if (baseMapper.table === currKeys.table) {
                baseMapper.mapperList
                    .forEach(itemMapper => currKeys.keyField === itemMapper.field
                        ? itemMapper.joinField = currKeys.joinField
                        : itemMapper.joinField = null)
                iteratorCurr = iterator.next()
            }
            if (iteratorCurr.done) {
                return true
            }
        })
    }
    public setPermissionKeys(keys: Array<JoinKey>) {
        const iterator: IterableIterator<JoinKey> = keys[Symbol.iterator]()
        let iteratorCurr = iterator.next()
        this.permissionMapperList.some(baseMapper => {
            const currKeys: JoinKey = iteratorCurr.value
            if (baseMapper.table === currKeys.table) {
                baseMapper.mapperList
                    .forEach(itemMapper => currKeys.keyField === itemMapper.field
                        ? itemMapper.joinField = currKeys.joinField
                        : itemMapper.joinField = null)
                iteratorCurr = iterator.next()
            }
            if (iteratorCurr.done) {
                return true
            }
        })
    }
    public getJoinKeysMapperSQL(tables: Array<string>, joinType: JoinType): string {
        const { tableList, joinMapperList } = this.getPermissionMapperList(tables)
        const joinKeysMappers = []
        joinMapperList.forEach(tableMapper => {
            if (tableList.includes(tableMapper.table)) {
                const mapperList = tableMapper.mapperList
                for (let index = 0; index < mapperList.length; index++) {
                    const itemMapper = mapperList[index];
                    if (itemMapper.joinField?.tabel
                        && tableList.includes(itemMapper.joinField.tabel)) {
                        joinKeysMappers.push(`${joinType} ${itemMapper.joinField.tabel} ON `
                            + `${tableMapper.table}.${itemMapper.fieldMapper} = `
                            + `${itemMapper.joinField.tabel}.${itemMapper.joinField.key}`)
                    }
                }
            }
        })
        return joinKeysMappers.join(' ')
    }
    public getWhereMapperFetch(): SqlPackage {
        const whereMapper = Object.assign({}, this.permissionWhereMapper || {}, this.whereMapper || {})
        if (Object.keys(whereMapper).length) {
            return {
                sql: `WHERE ${Object.keys(whereMapper)
                    .map(item => item + ' = ?')
                    .join(' AND ')}`,
                value: Object.values(whereMapper),
            }
        }
        return {
            sql: '',
            value: []
        }
    }
    public getJoinKeysMapperResult(results: Array<any>, joinType?: JoinType): Array<any> {
        joinType = joinType || 'LEFT JOIN'
        const joinResult = []
        const tables = []
        if (joinType === 'LEFT JOIN' && results?.length) {
            Object.keys(results[0]).forEach(key =>
                (key.split('.')[0] !== this.table)
                && (!tables.includes(key.split('.')[0]))
                && tables.push(key.split('.')[0])
            )
            results.forEach(result => {
                // 主表Item
                const joinResultItem: {
                    [key: string]: any,
                    children: Array<any>
                } = joinResult.find(item => {
                    return item[this.baseKey.mapperKey] === result[`${this.table}.${this.baseKey.mapperKey}`]
                }) || {}
                if (!joinResultItem[this.baseKey.mapperKey]) {
                    this.baseMapper.forEach(itemMapper => {
                        joinResultItem[itemMapper.fieldMapper] = result[`${this.table}.${itemMapper.fieldMapper}`]
                    })
                    joinResultItem.children = []
                    joinResult.push(joinResultItem)
                }
                // 子表Item指针
                let childItemPointer = joinResultItem
                this.joinMapperList
                    .filter(joinMapperItem => tables.includes(joinMapperItem.table))
                    .forEach(joinMapperItem => {
                        const tableKey = joinMapperItem.mapperList.find(itemMapper => itemMapper.joinField)?.fieldMapper
                        // if (!tableKey) { return }
                        // 父表-子表列表
                        const childrenItemPointer = childItemPointer.children
                        // 更改指针指向子表Item
                        childItemPointer = (tableKey && childItemPointer.children.find(childResult =>
                            childResult[tableKey] === result[`${joinMapperItem.table}.${tableKey}`])) || {}
                        if (!childItemPointer[tableKey]) {
                            joinMapperItem.mapperList.forEach(itemMapper => {
                                childItemPointer[itemMapper.fieldMapper] = result[`${joinMapperItem.table}.${itemMapper.fieldMapper}`]
                            })
                            childItemPointer.children = []
                            childrenItemPointer.push(childItemPointer)
                        }
                    })
            })
        }
        return joinResult
    }
}

export default SqlMapper