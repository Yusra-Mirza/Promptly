import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/chatProvider"; 
import SideDrawer from "../components/miscellaneous/sideDrawer";    
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();
  // state to trigger sidebar re-fetch when chat settings change
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {/* top navbar search drawer */}
      {user && <SideDrawer />}

      {/* main content split view */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        w="100%" 
        h="91.5vh" 
        p="10px"
      >
        {/* left sidebar chat history list */}
        {user && <MyChats fetchAgain={fetchAgain} />}

        {/* right main active chat messaging window */}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default ChatPage;