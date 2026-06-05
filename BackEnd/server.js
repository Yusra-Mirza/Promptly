
import chats from "./src/data/data.js";
import config from "./src/config/config.js";
import app from "./src/app.js";

// app.get("/", (req, res) => {
//   res.send("API is runnning");
// });

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   let { id } = req.params;
//   const singleChat = chats.find((c) => c._id === id);
//   // const singleChat=chats.findById(_id);
//   res.send(singleChat);
// });
const port=config.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
