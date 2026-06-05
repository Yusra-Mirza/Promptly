import express from "express";
const app = express();

import chats from "./data/data.js";

app.get("/", (req, res) => {
  res.send("API is runnning");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  let { id } = req.params;
  const singleChat = chats.find((c) => c._id === id);
  // const singleChat=chats.findById(_id);
  res.send(singleChat);
});
export default app;