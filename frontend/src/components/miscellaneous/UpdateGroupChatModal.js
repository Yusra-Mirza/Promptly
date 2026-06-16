import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/chatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";
import axios from "axios";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat, user } = ChatState();

  // Helper utility to safely pull your string ID right out of the access token string
  const getLoggedInUserId = () => {
    if (user && user.accessToken) {
      try {
        const base64Url = user.accessToken.split(".")[1];
        const decodedPayload = JSON.parse(window.atob(base64Url));
        return decodedPayload.id || decodedPayload._id;
      } catch (e) {
        console.error("Token parsing failure", e);
      }
    }
    return user?._id || "";
  };

  // 1. RENAME FUNCTIONALITY
  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config,
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      setGroupChatName("");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "Failed to rename group",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
  };

  // 2. ADD USER FUNCTIONALITY
  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      toast({
        title: "User Already in Group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    const loggedInUserId = getLoggedInUserId();

    // Admin Security Gatekeeper
    if (selectedChat.groupAdmin._id !== loggedInUserId) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config,
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "Failed to add user",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  // 3. REMOVE / LEAVE FUNCTIONALITY
  const handleRemove = async (userToRemoveOrId) => {
    // Determine if we were passed a full user object, or a direct raw string ID
    const targetUserId = userToRemoveOrId._id || userToRemoveOrId;
    const loggedInUserId = getLoggedInUserId();

    if (
      selectedChat.groupAdmin._id !== loggedInUserId &&
      targetUserId !== loggedInUserId
    ) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupremove",
        {
          chatId: selectedChat._id,
          userId: targetUserId,
        },
        config,
      );

      targetUserId === loggedInUserId
        ? setSelectedChat("")
        : setSelectedChat(data);

      setFetchAgain(!fetchAgain);
      fetchMessages();
      
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "Failed to remove user",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  // 4. LIVE USER SEARCH FUNCTIONALITY
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody display="flex" flexDir="column" alignItems="center">
            {/* Joined Member Badges */}
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>

            {/* Rename Form */}
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>

            {/* Live User Search Input */}
            <FormControl>
              <Input
                placeholder="Add User to group eg: John, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {/* Streaming Filtered User Results */}
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((u) => (
                  <UserListItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleAddUser(u)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            {/* Passes the clean, extracted ID string directly so MongoDB doesn't throw a CastError */}
            <Button
              onClick={() => handleRemove(getLoggedInUserId())}
              colorScheme="red"
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
