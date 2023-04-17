import React, { useEffect, useState, useContext } from 'react';
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from '../../axiosConfig';
import ChatContext from "./Context/chat-context";
import { getSender } from "./config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button, Input, Spinner } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
//import { useHelper } from '../config/helper-hook';
import { useDisclosure } from "@chakra-ui/hooks";
import UserListItem from "./userAvatar/UserListItem";
import { Tooltip } from "@chakra-ui/tooltip";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { selectedChat, setSelectedChat, user, setUser, chats, setChats } = useContext(ChatContext);
  //const {getSender}=useHelper();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}`}
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      // console.log(data, 'fetching all users chats in my chats');

    } catch (error) {

      console.log(error.message);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };


    const handleSearch = async() => {

      if (!search) {
        toast({
          title: "Please Enter something in search",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-left",
        });
        return;
      }

      try {
        setLoading(true);

        const config = {
          headers: { Authorization: `Bearer ${user.token}`}
        };

        const { data } = await axios.get(`/api/allUsers?search=${search}`,config);
        console.log(data, 'searchQuerry keyword response data');

        setLoading(false);
        setSearchResult(data);

      } catch (error) {

        console.log(error.message);
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };

    const accessChatCreateChat = async (userId) => {
      // console.log(userId); 
  
      try {
        setLoadingChat(true);
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(`/api/chat`, { userId }, config);
  
        if (!chats.find((chat) => chat._id === data._id)) setChats([data, ...chats]); 
        //already existing check clause //newly created chat above the rest
  
        setSelectedChat(data);
  
        console.log(data, 'access new/existing chat response data');
  
        setLoadingChat(false);
        onClose(); //drawer close afterwards
      } catch (error) {
  
        console.log(error.message);
        toast({
          title: "Error fetching the chat",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };


  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInformation"))); //chatLogics 
    setUser(JSON.parse(localStorage.getItem("userInformation"))); //chatLogics 
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  //fetching chats again witht the updated list of all of our chats...
  //--when we leave a group our updated list of chats needs to be fetched again

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      boxShadow="0 5px 10px rgba(100, 100, 50, 0.2)"
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
     

     <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        // fontFamily="Work sans"
        fontWeight= "bold"
        color= "#EF3A47"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      
      </Box>
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        // fontFamily="Work sans"
        fontWeight= "bold"
        color= "#EF3A47"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
          <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="white" bg ='#EF3A47' onClick={onOpen} fontSize={{ base: "40%", md: "40%", lg: "40%" }} color="white"
            _hover={{ background: "red.800", color:"yellow.400" }} _active={{ background: "purple.800", color:"yellow.400" }}>
              <i className="fas fa-search"></i>
              {/* <Text d={{ base: "none", md: "flex" }} px={4} fontWeight="bold"> */}
                Search User
              {/* </Text> */}
          </Button>
        </Tooltip>
       
        <GroupChatModal>
        <Tooltip label="Add new group chat" hasArrow placement="bottom-end">
          <Button
            d="flex"
            color="white"
            variant="white" bg ='#EF3A47' fontSize={{ base: "40%", md: "40%", lg: "40%" }}
            _hover={{ background: "red.800", color:"yellow.400" }} _active={{ background: "purple.800", color:"yellow.400" }}
            rightIcon={<AddIcon />}
           
          >
            New Group Chat
          </Button>
          
        </Tooltip>
        </GroupChatModal>
      </Box>
      
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats?.map((chat, i) => (
              
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#EF3A47" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => ( //user clicked on for chat
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChatCreateChat(user._id)}
                />
              ))
            ) 
            } 
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </Box>
  );
};

export default MyChats;
