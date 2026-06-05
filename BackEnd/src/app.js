import express from "express";
import router from "./routes/userRoutes.js";

const app = express();

import chats from "./data/data.js";
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is runnning");
});

app.use("/api/user",router);


// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode).json({
//     message: err.message,
//     stack: err.stack, // This will print the exact line causing the hidden issue directly into Postman!
//   });
// });
export default app;