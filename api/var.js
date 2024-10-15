import "dotenv/config"

export const DB_STRING_MONGO = process.env.DB_STRING;
export const SALT_ROUND = Number(process.env.SALT_ROUND);
export const JWT_SECRET = process.env.JWT_SECRET;