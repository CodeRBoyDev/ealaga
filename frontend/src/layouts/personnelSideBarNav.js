import React, {useState, useEffect} from "react";
import SideNav, {
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { logout, getName,getRole } from '../components/login/helpers';
import Logovector from "../images/logovector.png";

export const SideBar = ({ sideNavExpanded, setSideNavExpanded }) => {
  
  let navigate = useNavigate();
  const location = useLocation();

  const [activeKey, setActiveKey] = useState("none");

  // console.log(activeKey)
  useEffect(() => {
    // Update activeKey based on the current location
    const path = location.pathname;
    if (path === '/personnel/dashboard') {
      setActiveKey("Dashboard");
    } else if (path === '/personnel/attendees') {
      setActiveKey("Attendees");
    } else if (path === '/personnel/dialysis') {
      setActiveKey("Dialysis");
    }else if (path === '/personnel/applicant') {
      setActiveKey("Applicant");
    }else if (path === '/personnel/announcement') {
      setActiveKey("Announcement");
    }else if (path === '/personnel/health') {
      setActiveKey("Health");
    }else if (path === '/personnel/user') {
      setActiveKey("User");
    }else if (path === '/personnel/donation') {
      setActiveKey("Donation");
    }
    else if (path === '/personnel/profile/information') {
      setActiveKey("Profile");
    }
  else if (path === '/personnel/report') {
    setActiveKey("Report");
  }
    // ...
   
  }, []);

  return (
    <>
      <SideNav
  style={{ background: 'white', color: 'red', fontWeight: 'bold' }}
  onToggle={() => {
    setSideNavExpanded(!sideNavExpanded);
  }}
  expanded={sideNavExpanded}
>
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected={activeKey}>
        <NavItem active={activeKey === "Profile" ? true : false} eventKey="Profile" onClick={()  => navigate('/personnel/profile/information')}>
            <NavIcon>
              <i className="fa fa-fw fa-user" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText> {getName() ? getName().toUpperCase() : 'Test'}</NavText>
          </NavItem>

          <hr class="sep-2"/>
          <NavItem active={activeKey === "Dashboard" ? true : false} eventKey="Dashboard" onClick={()  => navigate('/personnel/dashboard')}>
            <NavIcon>
              <i className="fas fa-chart-bar" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Dashboard</NavText>
          </NavItem>
          <NavItem active={activeKey === "Attendees" ? true : false} eventKey="Attendees" onClick={()  => navigate('/personnel/attendees')}>
            <NavIcon>
              <i className="fas fa-calendar-alt" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Schedule</NavText>
          </NavItem>
          <NavItem active={activeKey === "Dialysis" ? true : false} eventKey="Dialysis" onClick={()  => navigate('/personnel/dialysis')}>
            <NavIcon>
              <i className="fas fa-procedures" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Dialysis</NavText>
          </NavItem>
          <NavItem active={activeKey === "Applicant" ? true : false} eventKey="Applicant" onClick={()  => navigate('/personnel/applicant')}>
            <NavIcon>
              <i className="fas fa-user-tie" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Applicant</NavText>
          </NavItem>
          <NavItem active={activeKey === "Announcement" ? true : false} eventKey="Announcement" onClick={()  => navigate('/personnel/announcement')}>
            <NavIcon>
              <i className="fas fa-bullhorn" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Announcement</NavText>
          </NavItem>
          <NavItem active={activeKey === "Health" ? true : false} eventKey="Health" onClick={()  => navigate('/personnel/health')}>
            <NavIcon>
              <i className="fas fa-heartbeat" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Health</NavText>
          </NavItem>
          <NavItem active={activeKey === "Donation" ? true : false} eventKey="Donation" onClick={()  => navigate('/personnel/donation')}>
            <NavIcon>
            <i class="fas fa-box" style={{ fontSize: "1.75em" }}></i>
            </NavIcon>
            <NavText>Donation</NavText>
          </NavItem>
         
            {/* {getRole() === 'admin' &&  */}
            <NavItem active={activeKey === "User" ? true : false} eventKey="User" onClick={()  => navigate('/personnel/user')}>
                        <NavIcon>
                          <i className="fas fa-users" style={{ fontSize: "1.75em" }} />
                        </NavIcon>
                        <NavText>User</NavText>
                      </NavItem>

         <NavItem active={activeKey === "Report" ? true : false} eventKey="Report" onClick={()  => navigate('/personnel/report')}>
            <NavIcon>
            <i class="fas fa-file" style={{ fontSize: "1.75em" }}></i>
            </NavIcon>
            <NavText>Report</NavText>
          </NavItem>
                      {/* } */}
                     
          {/* <NavItem eventKey="Donation" onClick={()  => navigate('/personnel/dashboard')}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginTop: '10px' }}>
              <img src={Logovector} alt="Image" style={{ width: '70px', height: '70px' }} />
            </div>
          </NavItem> */}
          <div style={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingBottom: '10px' }}>
            <div>
              <img src={Logovector} alt="Image" style={{ width: '70px', height: '70px' }} />
            </div>
            <div>
              <p style={{ margin: 0 }}>©eAlaga</p>
            </div>
          </div>



        
  
          {/* <NavItem eventKey="logout" onClick={() => logout(() => navigate('/'))}>
            <NavIcon >
              <i className="fa  fa-sign-out-alt" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Logout</NavText>
          </NavItem><hr/> */}
      
        </SideNav.Nav>
      </SideNav>

      <style>
        {`
  
  hr.sep-2 {
    border: 0;
    height: 2px;
    background-image: linear-gradient(to right, #f0f0f0, #ff0000, #ff0000, #f0f0f0);
}

.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ-.sidenav---highlighted---oUx9u > .sidenav---navitem---9uL5T {

  background: #ffc8c8;
  cursor: default;
}

  .sidenav---sidenav-toggle---1KRjR .sidenav---icon-bar---u1f02 {
    display: block;
    width: 20px;
    height: 2px;
    margin: 0 auto;
    background-color: #EF3A47 !important;
    border-radius: 1px;
    transition: all 0.15s;
    opacity: 0.7;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
    filter: alpha(opacity=70);
}

  .sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T .sidenav---navicon---3gCRo, .sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T .sidenav---navtext---1AE_f {
    color: #EF3A47 !important;
    margin-top: 5px !important;
}

.sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T .sidenav---navicon---3gCRo > *, .sidenav---sidenav-nav---3tvij > .sidenav---sidenav-navitem---uwIJ- > .sidenav---navitem---9uL5T .sidenav---navtext---1AE_f > * {
  color: #EF3A47 !important;
}


   .sidenav---sidenav---_2tBP {
     position: fixed !important;
     min-width: 69px;
     top: 78px !important;
     z-index: 1 !important;
     box-shadow: 0 5px 10px rgba(255, 0, 0, 1);
   }
  
   
        
        `}
      </style>
    </>
  );
};

export default SideBar;
