import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { ChatState } from "../context/chatProvider";

const SingleChat = () => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="100%"
      w="100%"
    >
      <Text fontSize="3xl" fontFamily="Work sans">
        {selectedChat
          ? `Active Chat: ${selectedChat.chatName}`
          : "Click on a user to start chatting"}
      </Text>
    </Box>
  );
};

export default SingleChat;
