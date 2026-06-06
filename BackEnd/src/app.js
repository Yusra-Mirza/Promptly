import express from "express";
import router from "./routes/userRoutes.js";

const app = express();

import chats from "./data/data.js";
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is runnning");
});

app.use("/api/user",router);

app.use(notFound);
app.use(errorHandler);

export default app;