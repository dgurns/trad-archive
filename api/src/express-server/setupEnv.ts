import dotenv from "dotenv";
import path from "path";

// Find the .env file and load it into process.env
const envPath =
	process.env.NODE_ENV === "development"
		? path.resolve(".env")
		: "/etc/secrets/.env";
dotenv.config({ path: envPath });
