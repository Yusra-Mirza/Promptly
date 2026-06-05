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



// import mongoose from "mongoose";
// import config from "./src/config/config.js";
// import app from "./src/app.js";
// import connectDB from "./src/config/database.js";

// const port = config.PORT || 8000;

// // 2. Wrap your server initialization inside an explicit async execution function
// const startServer = async () => {
//   try {
//     // Attempt the database connection first
//     await connectDB();
//     console.log("Database connected successfully ✅");

//     // Start listening for API requests only after the DB is confirmed alive
//     app.listen(port, () => {
//       console.log(`Listening on port ${port} 🚀`);
//     });
//   } catch (error) {
//     console.error("CRITICAL ERROR: Server failed to start 💥", error.message);
//     process.exit(1); // Safely shut down the backend instance if it can't reach the database
//   }
// };

// startServer();
