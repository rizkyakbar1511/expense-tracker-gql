declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    SESSION_SECRET: string;
    PORT: number;
  }
}
