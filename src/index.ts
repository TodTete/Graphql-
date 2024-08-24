import app from "./app";
import { PORT } from "./config";
import { connectDB } from "./db";

async function main() {
  try {

    await connectDB();
    app.listen(PORT);
    console.log("listening on ", PORT);
  } catch (error) {
    console.error("Error starting server", error);
  }
}

main();
