import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,

  front_end_url: process.env.FRONT_END_URL,

  database_url: process.env.DATABASE_URL,
};
