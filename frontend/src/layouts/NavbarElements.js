import styled from "styled-components";
import { Navbar } from "react-bootstrap";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Nav = styled(Navbar)`
  background: ${({ scrollNav }) =>
    scrollNav ? " #fff" : "#fff"};
  height: 75px;
  box-shadow: 0 3px 5px rgba(255, 0, 0, 0.6);
  display: flex;
  margin-top: -80px;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  /*max-width: 1100px;*/
`;

export const NavLogo = styled(LinkR)`
  color: #1b262c;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: #414b52;
  }
  @media screen and (max-width: 960px) {
    font-size: 1.1rem;
    margin: 0;
    padding: 0;
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.4rem;
    cursor: pointer;
    color: #414b52;
    margin: 0;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -24px;
  float: left;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLinks = styled(LinkS)`
  display: flex;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 1rem;
  cursor: pointer;
  color: #1b262c;
  font-size: 0.9 rem;
  font-weight: bold;
  margin-right: 24px;
  text-decoration: none;

  &.active {
    border-bottom: 3px solid #3282b8;
  }

  &:hover {
    text-decoration: none;
    color: #414b52;
  }
`;

export const NavLinkR = styled(LinkR)`
  display: flex;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 1rem;
  cursor: pointer;
  color: #EF3A47;
  font-size: 0.9 rem;
  font-weight: bold;
  margin-right: 24px;
  text-decoration: none;
  
  &.active {
    border-bottom: 3px solid #3282b8;
  }

  &:hover {
    text-decoration: none;
    color: #1b262c;
  }
`;
