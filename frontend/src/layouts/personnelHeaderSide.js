import React from "react";

import {
  SidebarContainer,
  SidebarWrapper,
  SideBtnWrap,
  SidebarRoute,
  Icon,
  CloseIcon,
  SidebarMenu,
  SidebarLink
} from "./SidebarElements";
import { useNavigate } from "react-router-dom";
import { logout} from '../components/login/helpers';

const AdminSideBar = ({ isOpen, toggle }) => {
  let navigate = useNavigate();
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {/* <SidebarLink to="/client/dashboard" onClick={toggle}>
            Dashboard
          </SidebarLink> */}
          <SidebarLink to="/personnel/chats" onClick={toggle}>
            Message
          </SidebarLink>
          <SidebarLink to="/personnel/profile/information" onClick={toggle}>
            Profile
          </SidebarLink>
          <a href="#" onClick={() => logout(() => navigate('/'))} style={{"text-decoration": "none"}}><SidebarLink to="/services" onClick={toggle}>
            Logout
          </SidebarLink></a> 
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default AdminSideBar;
