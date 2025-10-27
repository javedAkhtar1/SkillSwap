import path from "path";
import dotenv from "dotenv";

// Load the .env file from backend folder explicitly
const envPath = path.resolve(__dirname, "../.env"); // adjust path if needed
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.warn(
    "⚠ Could not load .env file from backend folder. Make sure it exists."
  );
} else {
  console.log("✅ .env loaded from backend folder");
}
