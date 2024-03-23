class SysPermission {
    private id: number;
    private code: string;
    private name: string;
    private describe: string;
    private createTime: number;
    private updateTime: number;
    public errMsg: string;

    static baseMapper: { [key: string]: string } = {
        id: 'id',
        code: 'code',
        name: 'name',
        describe: 'describe',
        createTime: 'create_time',
        updateTime: 'update_time'
    }

    constructor(sysPermission) {
        this.id = sysPermission.id
        this.code = sysPermission.code
        this.name = sysPermission.name
        this.describe = sysPermission.describe
        this.createTime = sysPermission.create_time
        this.updateTime = sysPermission.update_time
    }

    constructorSQL() {
        return {
            id: this.id,
            code: this.code,
            name: this.name,
            describe: this.describe,
            create_time: this.createTime,
            update_time: this.updateTime
        }
    }
    insertInspect(): boolean {
        if (this.id) {
            this.errMsg = '参数: id报错'
            return false
        } else {
            return true
        }
    }
}

export default SysPermission