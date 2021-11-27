import dotenv from "dotenv";
import path from "path";

// Find the .env file and load it into process.env
const envPath = path.resolve(".env");
dotenv.config({ path: envPath });
