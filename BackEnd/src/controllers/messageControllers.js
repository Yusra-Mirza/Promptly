import asyncHandler  from "express-async-handler";
import Message from "../Models/messageModel.js";
import Chat from "../Models/chatModel.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../Models/userModel.js";
import Notification from "../Models/notificationModel.js";
export const sendMessage=asyncHandler(async (req,res)=>{
    const {content,chatId}=req.body;
    if(!content || !chatId){
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }
    let newMessage={
        sender:req.user._id,
        content:content,
        chat:chatId,
    }
    try{
        let message=await Message.create(newMessage);
        message=await message.populate("sender","name pic");message=await message.populate("chat");

        // "Hey Mongoose, take this completely finished message object, dig deep down into the chat.users path, take those raw user IDs, run over to the User collection, and swap them out for real names, pictures, and emails.";
        message=await User.populate(message,{
            path:"chat.users",
            select:"name pic email",
        });

        //setting latestMessage
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message,
        });
        
        const fullChat = message.chat;
        const trackingNotification = fullChat.users
          .filter((userId) => userId.toString() != req.user._id.toString())
          .map((recipientId) => ({
            user: recipientId,
            chat: chatId,
            message: message._id,
          }));
          if (trackingNotification.length > 0) {
            await Notification.insertMany(trackingNotification);
          }



          res.json(message);

    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }

});






export const allMessages=asyncHandler(async (req,res)=>{
    try{
        
        const messages=await Message.find({chat:req.params.chatId}).populate("sender","name pic email")
        .populate("chat");
        // console.log(messages);
        res.json(messages);
    }
    catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})

