import config from "./src/config/config.js";
import mongoose from "mongoose";
// import chats from "./src/data/data.js";

import app from "./src/app.js";
import connectDB from "./src/config/database.js";
// console.log(process.env.MONGO_URI);
await connectDB();
const port = config.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

