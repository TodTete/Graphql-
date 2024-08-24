import { createConnection } from "typeorm";
import { Users } from "./Entities/users";
import "./config";
import { DB_HOST, DB_PORT, DB_PASS, DN_NAME, DB_USERNAME } from "./config";

export const connectDB = async () => {
  await createConnection({
    type: "mysql",
    username: DN_NAME,
    password: DB_PASS,
    port: Number(DB_PORT),
    host: DB_HOST,
    database: DB_USERNAME,
    entities: [Users],
    synchronize: false,
    ssl: false,
  });
};
