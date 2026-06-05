import mongoose from "mongoose";
// import chats from "./src/data/data.js";
import config from "./src/config/config.js";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
await connectDB();
const port=config.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
