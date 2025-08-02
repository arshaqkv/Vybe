import mysql2 from "mysql2";
import { config } from "../../config/config";

const pool = mysql2
  .createPool({
    host: config.DB.HOST,
    user: config.DB.USER,
    password: config.DB.PASSWORD,
    database: config.DB.DATABASE,
  })
  .promise();

const checkDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✨ Database connected✨");
    connection.release();
  } catch (error) {
    console.log("❌ Error in Database connection", error);
  }
};

export { pool as db, checkDBConnection };
