const express = require("express");
const app = express();
const dotenv=require("dotenv");
let chats = require("./Data/data.js");
dotenv.config();
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
const port=process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${8000}`);
});
