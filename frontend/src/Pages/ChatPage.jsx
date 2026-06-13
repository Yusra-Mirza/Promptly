import React from "react";
import {Box} from "@chakra-ui/react";
import { ChatState } from "../context/chatProvider.js";
import SideDrawer from "../components/miscellaneous/sideDrawer.jsx";
const Chatpage = () => {
  const {user}=ChatState();
  
    return(
      <div style={{width:"100%"}}>
        {user && <SideDrawer/>}
        <Box
          display="flex"
          justifyContent='space-between'
          w="100%"
          h="91.5vh"
          p="10px"
        >
          {user && <div>My Chats Sidebar Panel</div>}
          {user && <div>Chat Box Communication Screen</div>}
        </Box>
      </div>
    );
};

export default Chatpage;
