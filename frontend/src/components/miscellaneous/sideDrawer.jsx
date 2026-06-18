import React, { useState } from "react";
import { useHistory } from "react-router-dom"; 
import axios from "axios";  
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
  useToast,
  Skeleton, 
  Stack     
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa"; 
import { ChatState } from "../../context/chatProvider";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"; 
import { getSender } from "../../config/chatLogics";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure(); 
  const toast = useToast(); 
  const history = useHistory(); 
  const { user, setSelectedChat, chats, setChats,notification ,setNotification } = ChatState(); 
  const logoutHandler = () => {
    localStorage.removeItem("userInfo"); 
    history.push("/"); 
  };

  const accessChat=async(userId)=>{
    
    try{
      setLoading(true);
      const config={
        headers:{
          Authorization:`Bearer ${user.accessToken}`,
        }
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      if(!(chats.find((c)=>c._id===data._id))){
        setChats([...chats,data]);
      }
      setSelectedChat(data);
      setLoading(false);
      onDrawerClose();
    }
    catch(error){
      toast({
        title:"Error fetching chats",
        description:error.message,
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-left",
      });
      setLoadingChat(false);
    }
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return; 
    }

    try {
      setLoading(true);
      // console.log("FRONTEND SECURITY CHECK -> USER TOKEN:", user?.accessToken);
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      // FIXED: Safely wrapped in backticks (``) instead of quotes for string template literal evaluation
      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
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
        {/* LEFT PILLAR: SEARCH TRIGGER */}
        <Tooltip label="Search Users to chat with" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onDrawerOpen}>
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        {/* CENTER PILLAR: BRAND LOGO */}
        <Text fontSize="4xl" fontFamily="'Outfit', sans-serif" fontWeight="bold" color="#1d9bf0">
          Promptly
        </Text>

        {/* RIGHT PILLAR: CONTROLS TRAY */}
        <Box display="flex" alignItems="center">
          
          <Menu>
            <MenuButton p={1}>
              <Box position="relative" display="inline-block"> {/* Adds local context box boundary */}
              <BellIcon fontSize="2xl" m={1} />
              {notification.length>0 && (
      <Box
        position="absolute"
        top="2px"
        right="2px"
        bg="red.500"
        color="white"
        borderRadius="full"
        w="18px"
        h="18px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="10px"
        fontWeight="bold"
      >
        {notification.length}
      </Box>)}
      </Box>
            </MenuButton>

            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map(notif=>(
                <MenuItem key={notif._id} onClick={()=>{setSelectedChat(notif.chat);
                  setNotification(notification.filter((n)=>n!==notif));
                }}
                >
                  {notif.chat.isGroupChat?`New Message in ${notif.chat.chatName}`:`New Message from ${getSender(user,notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList> 
          </Menu>

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

      {/* COMPONENT POPUP: CENTERED USER BADGE PROFILE CARD */}
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

      {/* COMPONENT SLIDE: LEFT SEARCH SIDEBAR PANEL */}
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
              <Button colorScheme="teal" onClick={handleSearch}>Go</Button>
            </Box>

            {/* SKELETON PLACEHOLDERS VS REAL DB SEARCH DATA MAPPING */}
            {loading ? (
              <Stack>
                <Skeleton height="45px" borderRadius="lg" />
                <Skeleton height="45px" borderRadius="lg" />
                <Skeleton height="45px" borderRadius="lg" />
                <Skeleton height="45px" borderRadius="lg" />
                <Skeleton height="45px" borderRadius="lg" />
              </Stack>
            ) : (
              searchResult?.map((searchedUser) => (
                <Box
                  key={searchedUser._id}
                  onClick={()=> accessChat(searchedUser._id)}
                  p={2}
                  bg="gray.100"
                  mb={2}
                  borderRadius="md"
                  _hover={{ bg: "teal.500", color: "white" }}
                  cursor="pointer"
                >
                  <Text fontWeight="bold">{searchedUser.name}</Text>
                  <Text fontSize="xs">Email: {searchedUser.email}</Text>
                </Box>
              ))
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;