export default {
    serverPort: 9093,
    redis: { url: 'redis://null-more-redis:6379' },
    jwt: {
        jwtKey: 'null-more',
        jwtConfig: {
            expiresIn: '24h'
        }
    },
    oauthRouter: [
        "/users/userinfo",
        "/users/rolepermissions/*",
        "/oauth/menu",
        "/testdemo/*",
    ],
    SystemId: 'partone',
    dbConfig: {
        HOST: "null-more-mysql",
        USER: "root",
        PASSWORD: "123456",
        DB: "testdb",
        PORT : 3306
    },
};