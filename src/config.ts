import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;

export const DN_NAME = process.env.DN_NAME;
export const DB_PASS = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_NAME;
