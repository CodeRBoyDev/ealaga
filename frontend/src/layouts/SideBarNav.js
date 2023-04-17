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

const SideBar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/" onClick={toggle}>
            home
          </SidebarLink>
          <SidebarLink to="/about" onClick={toggle}>
            about
          </SidebarLink>
          <SidebarLink to="/services" onClick={toggle}>
            services
          </SidebarLink>
          <SidebarLink to="/joinus" onClick={toggle}>
            Join Us
          </SidebarLink>
          <SidebarLink to="/login" onClick={toggle}>
            Login
          </SidebarLink>
          <SidebarLink to="/register" onClick={toggle}>
            Register
          </SidebarLink>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default SideBar;
