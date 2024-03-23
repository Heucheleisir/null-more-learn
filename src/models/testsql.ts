import mysql from "mysql2";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'testdb'
});
connection.connect((error) => {
    if (error) {
        console.log('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL database!');
});

export default connection