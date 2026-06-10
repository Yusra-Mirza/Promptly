import express from "express";
import router from "./routes/userRoutes.js";
import {notFound,errorHandler} from "./middleware/errorMiddleware.js";
import chatRoutes from "./routes/chatRoutes.js";
const app = express();

import chats from "./data/data.js";
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is runnning");
// });

app.use("/api/user",router);
app.use("/api/chat",chatRoutes); 
console.log("Users routes mounted");
app.use(notFound);
app.use(errorHandler);

export default app;