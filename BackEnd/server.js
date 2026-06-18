import config from "./src/config/config.js";
import mongoose from "mongoose";
// import chats from "./src/data/data.js";
import { Socket ,Server} from "socket.io";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
// console.log(process.env.MONGO_URI);
await connectDB();
const port = config.PORT;
const server=app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


const io=new Server(server,{
  pingTimeout:60000,
  cors:{
    origin:"http://localhost:3000",
  }
});

io.on("connection",(Socket)=>{
  console.log("Connected to socket.io successfully");
  //creating room for a particular user
  Socket.on('setup',(userData)=>{
    Socket.join(userData._id);
    // console.log(userData._id);
    Socket.emit("Connected");
  });

  Socket.on ('join chat',(room)=>{
    Socket.join(room);
    console.log("User Joined Room: "+room);
  });

  Socket.on('new message',(newMessageReceived)=>{
    let chat=newMessageReceived.chat;

    if(!chat.users) return console.log('Chat.users not defined');

    chat.users.forEach(user => {
      if(user._id===newMessageReceived.sender._id) return;
      Socket.in(user._id).emit("message received",newMessageReceived);
    });

  });
  Socket.on('typing',(room)=>{
    Socket.in(room).emit("typing",{room});
  });
  Socket.on("stop typing",(room)=>{
    Socket.in(room).emit("stop typing", { room });
  })

  Socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });

})