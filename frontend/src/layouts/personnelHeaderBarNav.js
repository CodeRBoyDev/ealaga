import React, { useState, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavItem,
  MobileIcon,
  NavLinks,
  NavMenu,
  NavLinkR
} from "./NavbarElements";
import { IconContext } from "react-icons/lib";
import Logo from "../images/logos.png";
import { useNavigate } from "react-router-dom";
import { logout} from '../components/login/helpers';
import ChatContext from "../components/chat/Context/chat-context";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import io from "socket.io-client";

// const ENDPOINT = "http://localhost:4000"; //development

// const ENDPOINT = "https://ealaga.vercel.app"; //for deployment -production
// const ENDPOINT = "https://ealaga-server.onrender.com"; //for deployment -production
const ENDPOINT = "https://ealaga.up.railway.app/"; //for deployment -production
// const ENDPOINT = "https://ealaga-server.vercel.app"; //for deployment -production

var socket, selectedChatCompare;

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const { selectedChat, setSelectedChat, user, notification, setNotification } = useContext(ChatContext);


  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  let navigate = useNavigate();
  
  useEffect(() => {

    //just to keep a track
    selectedChatCompare = selectedChat;

    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);

  }, [user]); // added user as dependency

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if ( !selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {

       
          setNotification([newMessageRecieved, ...notification]);
      }
    });
  });
  
  return (
    
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to="/personnel/dashboard"  onClick={toggleHome}>
            <img src={Logo} style={{width: "60%", height: "auto"}} alt="Agrigators Earth" />
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu className="justify-content-end">
            
            <NavItem >
              <NavLinkR
                to="/personnel/chats" 
                onClick={() => {setNotification([]); setSelectedChat(""); }}
              >
                <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
                style={{
                  position: 'absolute',
                  right: '-75px',
                  top:'25px',
                  height: '23%',
                }}
              />
                Message
              </NavLinkR>
              
            </NavItem>
            <NavItem >
              <NavLinkR
                to="/personnel/profile/information"
               
              >
                Profile
              </NavLinkR>
            </NavItem>
            <NavItem>
              <a href="#" onClick={() => logout(() => navigate('/'))} style={{"text-decoration": "none"}}><NavLinkR to="/logout">Logout</NavLinkR></a>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
