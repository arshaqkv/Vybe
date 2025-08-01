import "dotenv/config";

const {
  PORT,
  NODE_ENV,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  CLIENT_URL,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

interface CorsConfig {
  CLIENT_URL: string;
  ALLOWED_HEADERS: string[];
  ALLOWED_METHODS: string[];
  CREDENTIALS: boolean;
}

interface DbConfig {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DATABASE: string;
}

interface Config {
  PORT: number;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  ENVIRONMENT: string;
  DB: DbConfig;
  CORS: CorsConfig;
}

export const config: Config = {
  PORT: parseInt(PORT || "4000", 10),
  JWT_ACCESS_SECRET: JWT_ACCESS_SECRET as string,
  JWT_REFRESH_SECRET: JWT_REFRESH_SECRET as string,
  ENVIRONMENT: NODE_ENV as string,
  DB: {
    HOST: DB_HOST as string,
    USER: DB_USER as string,
    PASSWORD: DB_PASSWORD as string,
    DATABASE: DB_NAME as string,
  },
  CORS: {
    CLIENT_URL: (CLIENT_URL as string) || "http://localhost:5173",
    ALLOWED_HEADERS: ["Content-type", "Authorization"],
    ALLOWED_METHODS: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    CREDENTIALS: true,
  },
};
