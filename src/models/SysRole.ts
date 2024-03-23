class SysRole {
    private id: number;
    private code: string;
    private name: string;
    private describe: string;
    private createTime: number;
    private updateTime: number;

    static baseMapper: { [key: string]: string } = {
        id: 'id',
        code: 'code',
        name: 'name',
        describe: 'describe',
        createTime: 'create_time',
        updateTime: 'update_time'
    }
    
    constructor(sysRole: {
        id: number,
        code: string,
        name: string,
        describe: string,
        create_time: number,
        update_time: number,
    }) {
        this.id = sysRole.id
        this.code = sysRole.code
        this.name = sysRole.name
        this.describe = sysRole.describe
        this.createTime = sysRole.create_time
        this.updateTime = sysRole.update_time
    }
}

export default SysRole