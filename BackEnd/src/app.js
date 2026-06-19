import express from "express";
import router from "./routes/userRoutes.js";
import {notFound,errorHandler} from "./middleware/errorMiddleware.js";
import chatRoutes from "./routes/chatRoutes.js";
const app = express();
import messageRoutes from "./routes/messageRoutes.js";
import chats from "./data/data.js";
import path from 'path';
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is runnning");
// });

app.use("/api/user",router);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes) ;

console.log("Users routes mounted");

//---------------------------Deployment------------------
const __dirname1=path.resolve();
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname1,"/frontend/build")));
    app.get('(.*)',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
    });
}

//---------------------------Deployment------------------
app.use(notFound);
app.use(errorHandler);

export default app;