import React from "react";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChatState } from "../context/chatProvider"; // Double check if your folder is capitalized 'Context' or lowercase 'context'
import {ProfileModal} from "./miscellaneous/ProfileModal.js";

import {getSender,getSenderFull} from "../config/chatLogics";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal.js";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();

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
                {getSender(user, selectedChat.users)};
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {/* Group Chats: Simply prints the room name in all uppercase */}
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
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
            {/* Real-time message streaming feed loops will be wired right here next */}
            <Text alignSelf="center" margin="auto">
              Messages will stream here!
            </Text>
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
