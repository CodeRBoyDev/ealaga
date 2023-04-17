import React from 'react';
import { ViewIcon } from "@chakra-ui/icons";
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
  IconButton,
  Text,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";


const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered >
        <ModalOverlay />
        <ModalContent h="380px" bg="white">
          <ModalHeader
            fontSize="40px"
            // fontFamily="Work sans"
            d="flex"
            justifyContent="center"
            fontWeight="bold"
            color="#EF3A47"
          >
            {user?.first_name} {user?.last_name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            {
              !user?.profile_picture?.url ? <Avatar size="2xl" name={user?.first_name} borderColor="black" borderWidth="2px" bg="#EF3A47" color="black"/>
              :
              <img
              src={user?.profile_picture?.url}
              alt={user?.first_name}
             className="imageAvatar"
            />
            }
            
            <Text
              fontSize={{ base: "28px", md: "30px" }} fontWeight="bold" color="#EF3A47"
              fontFamily=""
            >
              {
                !user?.email ? <>User not available</> :
                <>Email: {user?.email}</>
              }
              
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} height="200%" colorScheme='red'>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <style>
        {`
   .imageAvatar{
    background: #EF3A47; 
    font-size: 2rem; 
    padding: 0.5rem; 
    border-radius: 5rem;
    width: 6rem; 
    height: 6rem;
    }
        `}
        </style>
    </React.Fragment>
  );
};

export default ProfileModal;