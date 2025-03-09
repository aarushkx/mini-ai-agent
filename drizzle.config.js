import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: "./db/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.NEONDB_URL,
    },
});
