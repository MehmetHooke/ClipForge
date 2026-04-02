import dotenv from "dotenv";
import app from "./app";

dotenv.config();
console.log("API KEY:", process.env.GEMINI_API_KEY);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
