import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";

import Chat from "../Models/chatModel.js";
export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password",
      );
      res.status(201).json(fullChat);
    } catch (err) {
      res.status(400);
      throw new Error(err.message);
    }
  }
});

export const fetchChats = asyncHandler(async (req, res) => {
  try {
    let results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    results = await User.populate(results, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    res.status(200).send(results);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});
export const createGroup = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    res.status(400).send({ message: "Please fill all the fields" });
  }
  let users=JSON.parse(req.body.users);
  if(users.length<2){
    return res.status(400).send("More than 2 users are required to form a group");
  }
  users.push(req.user._id);
  try{
    const groupChat=await Chat.create({
      chatName:req.body.name,
      users:users,
      isGroupChat:true,
      groupAdmin:req.user._id
    });

    const fullGroupChat=await Chat.findOne({_id:groupChat._id}).populate("users","-password").populate("groupAdmin","-password");
      
    res.status(201).json(fullGroupChat);

    }catch(err){
      res.status(400);
      throw new Error(err.message);
    }


});
