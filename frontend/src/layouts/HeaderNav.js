import React, { useState, useEffect } from "react";
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

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

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
  return (
    
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome}>
            <img src={Logo} style={{width: "60%", height: "auto"}} alt="eAlaga" />
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu className="justify-content-end">
            <NavItem >
              <NavLinkR
                to="/" 
              
              >
                Home
              </NavLinkR>
            </NavItem>
            <NavItem >
              <NavLinkR
                to="/about"
               
              >
                About
              </NavLinkR>
            </NavItem>
            <NavItem>
              <NavLinkR
                to="/services"
                
              >
                Services
              </NavLinkR>
            </NavItem>
            {/* <NavItem>
              <NavLinkR to="/joinus">Join Us</NavLinkR>
            </NavItem> */}
            <NavItem>
              <NavLinkR to="/login">Login</NavLinkR>
            </NavItem>
            <NavItem>
              <NavLinkR to="/register">Register</NavLinkR>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
