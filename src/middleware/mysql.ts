import connection from "@common/mysql"
import SqlMapper, { ItemMapper, BaseKey, SqlPackage } from '@middleware/SqlMapper'
// import User from "@models/User"

class sourcedb {
    protected connection: any;
    protected tableName: string;
    protected baseKey: BaseKey;
    protected baseMapper: Array<ItemMapper>;
    protected sqlMapper: SqlMapper;

    constructor(tableName: string, baseKey?: BaseKey, baseMapper?: Array<ItemMapper>) {
        this.connection = connection
        this.tableName = tableName
        this.baseKey = baseKey
        this.baseMapper = baseMapper
        if (this.baseKey && this.baseMapper) {
            this.sqlMapper = new SqlMapper(this.tableName, this.baseKey, this.baseMapper)
        }
    }

    // public qurey(table: string) {
    //     return new Promise((resolve, reject) => {
    //         this.connection.query(`SELECT * FROM ${table}`, function (err, result) {
    //             if (err) {
    //                 resolve(result);
    //             } else {
    //                 resolve(err);
    //             }
    //         });
    //     });
    // }

    public fetch() {
        return new Promise<Array<any>>((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.tableName}`, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    public fetchLeft(tableName, tables) {
        // const getWhereMapperFetch
        const whereMapper: SqlPackage = this.sqlMapper.getWhereMapperFetch()
        return new Promise<Array<any>>((resolve, reject) => {
            const sqlStr = `SELECT ${this.sqlMapper.getJoinMapperSQL(tables)} FROM`
                + ` ${tableName} ${this.sqlMapper.getJoinKeysMapperSQL(tables, 'LEFT JOIN')}`
                + `${whereMapper.sql && (' ' + whereMapper.sql)}`
            this.connection.query(sqlStr, whereMapper.value,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    }

    public whereAndFetch(params) {
        return new Promise<Array<any>>((resolve, reject) => {
            this.connection.query(
                `SELECT * FROM ${this.tableName} WHERE ${Object.keys(params)
                    .map(item => item + ' = ?')
                    .join(' AND ')}`,
                Object.values(params),
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    }

    public update(condition, params) {
        return new Promise<any>((resolve, reject) => {
            this.connection.query(
                `UPDATE ${this.tableName} SET ${Object.keys(params)
                    .map(item => item + ' = ?')
                    .join(', ')
                } WHERE ${Object.keys(condition)
                    .map(item => item + ' = ?')
                    .join(' AND ')}`,
                [...Object.values(params), ...Object.values(condition)],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    }

    public insert(params) {
        return new Promise<any>((resolve, reject) => {
            this.connection.query(
                `INSERT INTO ${this.tableName} (${Object.keys(params).join(', ')}) VALUES (${Object.keys(params).map(() => '?').join(', ')})`,
                [...Object.values(params)],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    }

    // public async logincheck(username: string, password: string) {
    //     let params = {
    //         username,
    //         password
    //     }
    //     return await this.whereAndFetch(params)
    // }

    // public qureyUser() {
    //     return new Promise<User[]>((resolve, reject) => {
    //         this.connection.query(`SELECT * FROM user`, function (err, result) {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 // resolve(result);
    //                 const usersDB: User[] = new Array<User>()
    //                 result.forEach(element => {
    //                     usersDB.push(new User(element))
    //                 })
    //                 resolve(usersDB);
    //             }
    //         });
    //     });
    // }
}

export default sourcedb