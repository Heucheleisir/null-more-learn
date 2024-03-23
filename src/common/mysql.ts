import config from "@config/index";
import mysql from "mysql2";

const { dbConfig } = config

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
});

export default connection;