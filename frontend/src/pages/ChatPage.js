import React, { useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import ChatContext from "../components/chat/Context/chat-context";
import MyChats from '../components/chat/MyChats';
import ChatBox from '../components/chat/ChatBox';
import SideDrawer from '../components/chat/miscellaneous/SideDrawer';
import { Box } from '@chakra-ui/react';
import { ChakraProvider } from "@chakra-ui/react";
import '../App.css';
import {
  ServicesWrapper,  ServicesH1, ServicesCard,
  ServicesH2,
  ServicesIcon,
  ServicesP,
  ServicesWrappers, BtnWrap,HeroImageContainer,LinkR
} from "./ChatPageElements";
import Container from "react-bootstrap/Container";

import Navbar from "../layouts/clientHeaderNav";
import SideBar from "../layouts/clientSideBarNav";

import { Scrollbars } from 'react-custom-scrollbars-2';

import Footer from '../components/home/Footer'


const ChatPage = () => {

  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };

  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useContext(ChatContext);

  // console.log(user)
  /*  const navigate = useNavigate();
  const isRefreshingRef = useIsRefreshingRef() */

  //navigate('/chats');

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: 'rgba(35, 49, 86, 0.8)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

    const CustomScrollbars = props => (
        <Scrollbars
          renderThumbHorizontal={renderThumb}
          renderThumbVertical={renderThumb}
          {...props}
        />
      );

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const mystyle = {
        background: 'none'
      };

      let navigate = useNavigate();


  return (
  
     
    <>
  
        <SideBar  isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle} />
      <Container style={{ minHeight: "45vh" }}>
    <HeroImageContainer>
      <div className="container light-style flex-grow-1 container-p-y">
      <ServicesH1>
            &nbsp;&nbsp;<LinkR to='/client/dashboard'><i className="fas fa-arrow-left hover-red-gray"></i></LinkR>&nbsp;&nbsp;Chat Room
        </ServicesH1>
        </div>
    
      <ServicesWrapper>
      <ChakraProvider resetCSS={false}> 
          {/* {user && <SideDrawer />} */}
          <Box d="flex" justifyContent="space-between" width="100%" h="70vh" p="12px">
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && ( <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
          </Box>
          </ChakraProvider>
          </ServicesWrapper>
          
          </HeroImageContainer>
          </Container>
          <style>
        {`
        .hover-red-gray {
          color: #EF3A47;
        }
        
        .hover-red-gray:hover {
          color: #ff7e7e;
        }
        
        `}
      </style>
    </>
 
  );
};

export default ChatPage;
