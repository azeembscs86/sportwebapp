import mysql from "mysql2/promise";
import { env } from "./env";
import { logger } from "../utils/logger";

export const mysqlPool = mysql.createPool({
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  connectionLimit: 10
});

export const validateMysqlConnection = async () => {
  const connection = await mysqlPool.getConnection();
  try {
    await connection.ping();
    logger.info("MySQL connection established");
  } finally {
    connection.release();
  }
};
