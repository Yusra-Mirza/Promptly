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
  Text,
  Image,
  useDisclosure,
} from "@chakra-ui/react";


//eyeIcon
import { ViewIcon } from "@chakra-ui/icons";

export const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton icon={<ViewIcon />} onClick={onOpen} />
      )}
      {/* The Popup Window Box */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          {/* 1. Display the User's Name */}
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {/* 2. Display the User's Image from Cloudinary */}
            <Image
              src={user.pic}
              alt={user.name}
              borderRadius="full"
              boxSize="150px"
            />

            {/* 3. Display the User's Email */}
            <Text>Email: {user.email}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
