import React, {useContext} from 'react';

import { Box } from "@chakra-ui/layout";
//import "./styles.css";
import SingleChat from "./SingleChat";
import ChatContext from "./Context/chat-context";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {

  const { selectedChat } = useContext(ChatContext);

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      boxShadow="0 5px 10px rgba(100, 100, 50, 0.2)"
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
