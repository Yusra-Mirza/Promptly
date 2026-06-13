import React, { useState } from "react";
import { useHistory } from "react-router-dom"; 
import axios from "axios"; // Add this line to handle HTTP requests
import { 
  Box, 
  Text, 
  Button, 
  Tooltip, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Avatar,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Drawer,        
  DrawerBody,    
  DrawerHeader,  
  DrawerOverlay, 
  DrawerContent, 
  Input,         
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa"; 
import { ChatState } from "../../context/chatProvider";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"; 

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  
  const { isOpen, onOpen, onClose } = useDisclosure(); // Profile Modal Controls
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure(); // Left Drawer Controls
  
  const { user } = ChatState();
  const history = useHistory(); 
  const toast = useToast(); // Initialize the toast notification engine
  const logoutHandler = () => {
    localStorage.removeItem("userInfo"); 
    history.push("/"); 
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="1px"
      >
        {/* LEFT SIDE: SEARCH AREA */}
        <Tooltip label="Search Users to chat with" hasArrow placement="bottom-end">
          {/* Added onClick here to run our onDrawerOpen function! */}
          <Button variant="ghost" onClick={onDrawerOpen}>
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        {/* CENTER: LOGO */}
        <Text fontSize="2xl" fontFamily="Work sans">
          Promptly
        </Text>

        {/* RIGHT SIDE: SETTINGS CONTROLS */}
        <Box display="flex" alignItems="center">
          
          {/* 1. NOTIFICATION DROPDOWN */}
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList></MenuList> 
          </Menu>

          {/* 2. USER PROFILE DROPDOWN */}
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpen}>My Profile</MenuItem>
              <hr />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>

        </Box>
      </Box>

      {/* PROFILE VIEW MODAL POPUP */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="40px" fontFamily="Work sans" display="flex" justifyContent="center">
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
            <Avatar size="2xl" name={user.name} src={user.pic} marginBottom="20px" />
            <Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans">
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* NEW: THE SLIDING LEFT SEARCH DRAWER PANEL */}
      <Drawer placement="left" onClose={onDrawerClose} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button colorScheme="teal">Go</Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;