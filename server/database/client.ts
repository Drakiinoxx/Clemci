// Get database URL from .env file
const { DATABASE_URL } = process.env;

// Create a connection pool to PostgreSQL
import { Pool } from "pg";

const client = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Nécessaire pour Supabase
  },
});

// Test de connexion
client.on("connect", () => {
  console.info("Connected to PostgreSQL database");
});

client.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

// Ready to export
export default client;

// Types export
import type { Pool as PgPool, QueryResult, QueryResultRow } from "pg";

type DatabaseClient = PgPool;
type Result = QueryResult;
type Rows = QueryResultRow[];

export type { DatabaseClient, Result, Rows };
