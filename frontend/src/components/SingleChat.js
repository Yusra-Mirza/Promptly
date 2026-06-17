import React from "react";
import { Box, Text, IconButton, FormControl } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChatState } from "../context/chatProvider"; // Double check if your folder is capitalized 'Context' or lowercase 'context'
import {ProfileModal} from "./miscellaneous/ProfileModal.js";
import { useState } from "react";
import {getSender,getSenderFull} from "../config/chatLogics";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal.js";
import axios from "axios";
import { useToast,Spinner,Input} from "@chakra-ui/react";
import io from "socket.io-client";
import {ScrollableChat} from "./ScrollableChat.js";
import { useEffect } from "react";
const ENDPOINT="http://localhost:8000";
let socket,selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config,
      );

      setMessages(data);
      setLoading(false);
      if (socket) {
        socket.emit("join chat", selectedChat._id);
      }
    } catch (err) {
      toast({
        title: "Error Occured",
        description: "Failed to Load Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("Connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  //no dependency array runs everytime
  useEffect(() => {
    if (!socket) return; // Prevent crashes if the socket hasn't booted up yet

    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // give notification logic goes here
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });

    // 👇 CRUCIAL CLEANUP FUNCTION: Turns off the old listener before creating a fresh one
    return () => {
      socket.off("message received");
    };
  }, [messages]); // ✅ Triggers safely only when a new message alters the state array
  const sendMessage = async (e) => {
    if (e.key == "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
        };

        const { data } = await axios.post(
          "/api/message/",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config,
        );
        // console.log(data);
        socket.emit("new message", data);
        setNewMessage("");
        setMessages([...messages, data]);
      } catch (err) {
        toast({
          title: "Error Occured",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //Typing Indicator Logic
  };
  return (
    <>
      {selectedChat ? (
        <>
          {/* TOP LAYOUT HEADER BAR */}
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Mobile Back Button - Only shows on mobile base screens */}
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {/* DYNAMIC TITLE DISPLAY */}
            {!selectedChat.isGroupChat ? (
              <>
                {/* 1-on-1 Private DMs: Compares IDs to hide your own name */}
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {/* Group Chats: Simply prints the room name in all uppercase */}
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>

          {/* INNER TEXT SCREEN WINDOW CONTAINER */}
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                overflowY="scroll"
                scrollbarWidth="none" // Hides scrollbar on Firefox
                sx={{
                  "&::-webkit-scrollbar": {
                    display: "none", // Hides scrollbar on Chrome, Safari, and Edge
                  },
                }}
                w="100%"
                h="100%"
                p={3}
              >
                <ScrollableChat messages={messages} />
              </Box>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a Message"
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // DEFAULT FALLBACK VIEW: Rendered when a user first signs in and has no active open chat
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          w="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
