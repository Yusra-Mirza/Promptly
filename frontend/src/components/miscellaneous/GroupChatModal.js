import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../../context/chatProvider"; // Adjust path to your ChatProvider

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controls open/close state of modal

  // Local states for the form
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  // Fetch global chat context to update the sidebar later
  const { user, chats, setChats } = ChatState();

  const handleSearch = (query) => {
    // We will build this in Step 4
  };

  const handleSubmit = () => {
    // We will build this in Step 6
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody display="flex" flexDir="column" alignItems="center">
            {/* Inputs will go here */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
