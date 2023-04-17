import React, {useContext} from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./config/ChatLogics";
import ChatContext from "./Context/chat-context";

const ScrollableChat = ({ messages }) => {

  const { user } =  useContext(ChatContext);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, i) => (
          <div style={{ display: "flex" }} key={message._id}>
            {(isSameSender(messages, message, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={!message.sender?.first_name ? "User Not Available" : message.sender?.first_name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  bg="#EF3A47"
                  color="whitesmoke"
                  cursor="pointer"
                  name={message.sender?.first_name}
                />
                 {/* {
                  
              message.sender.profile_picture?.url == "" ? 
              <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender.first_name}
                />
              :
              <img
              src={message.sender.profile_picture?.url}
              alt={message.sender.profile_picture?.url}
             className="imageAvatarss"
            />
            } */}
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  message.sender?._id === user._id ? "rgb(245 185 185)" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, message, i, user._id),
                marginTop: isSameUser(messages, message, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                textAlign: `${
                  message.sender?._id === user._id ? "right" : "left"
                }`,
              }}
            >
              {message.content}
            </span>
          </div>
        ))}

  <style>
        {`
  .imageAvatarss{
    margin-top:7px; 
    margin-right:2px; 
    cursor:pointer;
    background: #EF3A47; 
    color: black; 
    border-radius: 5rem;
    width: 2rem; 
    height: 2rem;
    }
        `}
        </style>

    </ScrollableFeed>
  );
};

export default ScrollableChat;