class User {

    private userId: string;
    private username: string;
    private password: string;

    static baseMapper: { [key: string]: string } = {
        userId: 'user_id',
        username: 'username',
        password: 'password'
    }

    constructor(user: any) {
        this.userId = user.user_id || user.userId
        this.username = user.username
        this.password = user.password
    }

    public getValue(key) {
        return this[key]
    }
}

export default User