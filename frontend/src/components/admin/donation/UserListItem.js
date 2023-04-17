import React from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";

const UserListItem = ({user, handleFunction }) => { //user !notLoggedIn //selected to chat userId
  //const { user } = ChatState();
console.log(user)
  return (
    <ChakraProvider resetCSS={false}> 
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar mr={2} size="sm" cursor="pointer" name={user?.first_name}/>
      <Box>
        <Text>{user?.first_name} {user?.last_name}</Text>
        <Text fontSize="xs"> <b>Email : </b> {user?.email} </Text>
      </Box>
    </Box>
    </ChakraProvider>
  );
};

export default UserListItem;