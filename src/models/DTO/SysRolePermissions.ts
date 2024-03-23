import SysRole from "@models/SysRole";
import SysPermission from "@models/SysPermission";

class SysRolePermissions extends SysRole {
    protected permissions: Array<SysPermission>
    constructor(sysRole: {
        id: number,
        code: string,
        name: string,
        describe: string,
        create_time: number,
        update_time: number,
        children: Array<any>
    }) {
        super(sysRole)
        this.permissions = []
        sysRole?.children?.map(child => child.children).forEach(permissions =>
            permissions.forEach(permission => {
                this.permissions.push(new SysPermission(permission))
            })
        )
    }
}

export default SysRolePermissions