if (!process.env.DATABASE_URL)
  throw new Error("Missing environmental variable DATABASE_URL");
export const connectionString = process.env.DATABASE_URL;
