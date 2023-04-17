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
import axios from '../axiosConfig';
import { IconContext } from "react-icons/lib";
import Logo from "../images/logos.png";
import { useNavigate } from "react-router-dom";
import { logout} from '../components/login/helpers';
import ChatContext from "../components/chat/Context/chat-context";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import moment from 'moment';
import { Carousel, Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import io from "socket.io-client";
import { Circles } from  'react-loader-spinner'

// const ENDPOINT = "http://localhost:4000"; //development

// const ENDPOINT = "https://ealaga.vercel.app"; //for deployment -production
// const ENDPOINT = "https://ealaga-5v97.onrender.com/"; //for deployment -production
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




  const [getAllNotification, setAllNotification] = useState([]);
  const [getTotalNotification, setTotalNotification] = useState("");

  const [getSpecificNotification, setSpecificNotification] = useState("");

console.log(getSpecificNotification)
  
  const onClickNotif = () => {

          console.log("dwadwadwadw");
          axios({
            method:"post",
            url: `/api/notification/updateLength`,
            headers: {
              "Content-Type" : "application/json",
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            }
        })
        .then(response => {
          fetchAllNotification();

          }).catch(error => {

            // console.log(error.response.data)
            //     setError(error.response.data);
          });

    
  };


  const onClickSpecificNotif = (_id) => {
    
    handleShow()
    setSpecificNotification("");

    console.log(_id);
    axios({
      method: "put",
      url: `/api/notification/updateNotif/${_id}`,
      headers: {
        "Content-Type" : "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    }).then(response => {
      setSpecificNotification(response.data.notification);
      // handleShow()
      fetchAllNotification();
  
      
      }).catch(error => {

    });  


};

///modal ===

const [show, setShow] = useState(false);
const handleClose =() => {
        setShow(false);
        
      } 
const handleShow = () => setShow(true);



      console.log(getAllNotification)

    const fetchAllNotification = () => {
      axios({
      method: "get",
      url: `/api/allNotification`,
      headers: {
          "Content-Type" : "application/json",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
      },
      }).then(response => {
        setAllNotification(response.data.notification)
        setTotalNotification(response.data.total_notif)
        
    }).catch((err) => console.log(err));
    };
    // console.log(AllHealthProblem)
    useEffect(() => {
      fetchAllNotification();

      const interval = setInterval(fetchAllNotification, 2000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
      
    },[]);



  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  let navigate = useNavigate();
  
  useEffect(() => {

    //just to keep a track
    selectedChatCompare = selectedChat;

    // eslint-disable-next-line
  }, [selectedChat]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const [isClicked, setIsClicked] = useState(false);
  
  const handleDropdownItemClick = () => {
    setIsClicked(true); // Set isClicked state to true when DropdownItem is clicked
  }


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
          <NavLogo to="/client/dashboard"  onClick={toggleHome}>
            <img src={Logo} style={{width: "60%", height: "auto"}} alt="ealaga" />
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu className="justify-content-end">
            <NavItem >
              <NavLinkR
                to="/client/dashboard" 
              
              >
                 
                Dashboard
              </NavLinkR>
            </NavItem>
            <NavItem >
              <NavLinkR
                to="/client/chats" 
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

            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle style={{backgroundColor: "white", borderColor: "white", height: "50px", width: "120px",marginRight:"30px",marginLeft:"-20px", marginTop: "-45px"}}>
              <NavItem >
              <NavLinkR
                to="" 
                onClick={onClickNotif} 
              >
                <NotificationBadge
                count={getTotalNotification}
                effect={Effect.SCALE}
                style={{
                  position: 'absolute',
                  right: '-95px',
                  top:'25px',
                  height: '23%',
                }}
              />
                Notification
              </NavLinkR>
              
            </NavItem>
              </DropdownToggle>
              <DropdownMenu
                style={{
                  width: "320px",
                  marginTop: "30px",
                  marginLeft: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 5px 10px rgba(100, 100, 100, 0.6)",
                  maxHeight: "300px", // Set a max height for the dropdown menu
                  overflowY: "auto", // Add overflow-y property for scrolling
                }}
              >
                <h4 style={{ margin: "auto", marginLeft: "10px", color: "#EF3A47" }}>
                  <i class="fas fa-bell"></i> Notification
                </h4>
                <hr></hr>

                {getAllNotification.length > 0 ? (
                    getAllNotification
                      .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()) // Sort by notification.date field in descending order
                      .map((notification) => (
                        <DropdownItem
                          className="custom-dropdown-item"
                        style={{ backgroundColor: notification.specific_read === false ? "rgb(220 220 220)" : "transparent" }} // Check if notification.specific_read is false, then set background color to gray, else set it to transparent
                        onClick={(e) => {
                          e.stopPropagation(); // Stop event propagation to prevent toggleDropdown from being called
                          onClickSpecificNotif(notification._id);
                        }}
                        >
                          <div style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
                            <p style={{ flex: 1, textAlign: "left" }}>
                              {notification.description.substring(
                                0,
                                25 - moment(notification.date).format("hh:mm A").length
                              )}
                              ...
                            </p>
                            <div style={{ position: "relative", flex: "0 0 auto" }}>
                              <hr
                                style={{
                                  border: "none",
                                  borderBottom: "1px solid black",
                                  position: "absolute",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  width: "100%",
                                }}
                              />
                              <p style={{ textAlign: "right", marginLeft: "10px" }}>
                                {moment(notification.date).format("hh:mm A")}
                              </p>
                            </div>
                          </div>
                        </DropdownItem>
                      ))
                  ) : (
                    <p style={{ textAlign: "left", marginLeft: "10px" }}>No notification available.</p>
                  )}


              </DropdownMenu>

            </Dropdown>

            <NavItem >
              <NavLinkR
                to="/client/profile/information"
               
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


      
      <Modal size='md' show={show} onHide={handleClose} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}><i class="fas fa-bell"></i>&nbsp;&nbsp;Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>

                      {
                        getSpecificNotification == "" ? <>
                        <div style={{
                                        display: "flex", justifyContent: "center",
                                        alignItems: "center"
                                      }}><Circles color="#EF3A47" alignSelf='center' /></div>
                        </>
                        :
                        
                        
                        <div class="container">
   
                        <div class="row">
                          
                        
                                <div class="card right-profile-card">
                                    
                                    <div class="card-body">
                                        <div class="tab-content" id="pills-tabContent">
                                            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                     
                                            {/* <img class="card-img img-fluid" style={{height: 80, width: 80, float: "right" }} src="https://media3.giphy.com/media/eAM3QfIOSnD0chi73X/giphy.gif?cid=ecf05e47zva0hgu86ho9z66v3q76v9mgvkbih6np4m2fh7ir&rid=giphy.gif&ct=s" alt=""/> */}
                                          
                                            <div class="work-container">
                                                 
                                              <h2> <img class="card-img img-fluid" style={{ marginLeft: -10, height: 35, width: 50 }} src="https://media0.giphy.com/media/cL4VwGyAEP76FQV4vs/giphy.gif?cid=ecf05e47dodeb2degb42u491gtpx6dn869a9jsps0clhw2xm&rid=giphy.gif&ct=s" 
                                              alt=""/> 
                                              
                                              {
                                              
                                              getSpecificNotification?.type == "verification_process" ? 
                                              "Verification Process" 
                                              : 
                                              getSpecificNotification?.type == "welcome_message" ? 
                                              "Welcome!" 
                                              : 
                                              getSpecificNotification?.type == "admin_verified" ? 
                                              "Verified Account" 
                                              : 
                                              getSpecificNotification?.type == "admin_notverified" ? 
                                              "Not Verified Account" 
                                              : 
                                              getSpecificNotification?.type == "admin_pending" ? 
                                              "Pending Account" 
                                              : 
                     
                                              getSpecificNotification?.type == "status_restricted" ? 
                                              "Restricted Account" 
                                              : 
                                              getSpecificNotification?.type == "status_inactive" ? 
                                              "Inactive Account" 
                                              : 
                                              getSpecificNotification?.type == "status_active" ? 
                                              "Active Account" 
                                              : 
                                              getSpecificNotification?.type == "invalid_id" ? 
                                              "Invalid ID" 
                                              : 
                                              getSpecificNotification?.type == "invalid_information" ? 
                                              "Invalid Information" 
                                              : 
                                              getSpecificNotification?.type == "unverified_account" ? 
                                              "Unverified Account" 
                                              : 
                                              getSpecificNotification?.type == "suspicious_activity" ? 
                                              "Suspicious Activity" 
                                              : 
                                              getSpecificNotification?.type == "technical_issues" ? 
                                              "Technical Issues" 
                                              : 
                     
                     
                                            getSpecificNotification?.type
                                              
                                              }
                                              
                                              </h2>
                                              <h4><i class="far fa-calendar-alt"></i>{moment(getSpecificNotification?.date).format("MMMM DD, YYYY, dddd - hh:mm A ")}</h4>
                     
                                              <p style={{ textAlign: "justify", textIndent: "2em" }}>{getSpecificNotification?.description}</p>
                                              <p >Regards,</p>
                                              <p style={{ marginTop: "-5px",}}>eAlaga</p>
                                              <hr></hr>
                                              <div style={{ display: "flex", justifyContent: "center" }}>
                                              {
                                              
                                              getSpecificNotification?.type == "verification_process" ? 
                                              <a href="/#/client/profile/information" style={{ color: "red" }} id="view-status-link">
                                              View Account Status
                                            </a>
                                              : 
                                              getSpecificNotification?.type == "welcome_message" ? 
                                              <a href="/#/client/profile/information" style={{ color: "red" }} id="view-status-link">
                                              View Account Status
                                            </a>
                                              :
                     
                                              getSpecificNotification?.type == "admin_verified" ? 
                                              <a href="/#/client/profile/information" style={{ color: "red" }} id="view-status-link">
                                               View Account Status
                                            </a>
                                              :
                     
                                              getSpecificNotification?.type == "admin_notverified" ? 
                                              <a href="/#/client/profile/information" style={{ color: "red" }} id="view-status-link">
                                                View Account Status
                                            </a>
                                              :
                     
                                              getSpecificNotification?.type == "admin_pending" ? 
                                              <a href="/#/client/profile/information" style={{ color: "red" }} id="view-status-link">
                                                View Account Status
                                            </a>
                                              :
                     
                                              getSpecificNotification?.type == "Schedule Reminder" ? 
                                              <a href="/#/client/activities" style={{ color: "red" }} id="view-status-link">
                                                View Schedule
                                            </a>
                                              :
                                              getSpecificNotification?.type == "invalid_id" ? 
                                              <a href="/#/client/profile/information" style={{ color: "red" }} id="view-status-link">
                                                View Profile
                                            </a>
                                              :
                                              getSpecificNotification?.type == "invalid_information" ? 
                                              <a href="/#/client/profile/information" style={{ color: "red" }} id="view-status-link">
                                                View Profile
                                            </a>
                                              :
                                              getSpecificNotification?.type == "unverified_account" ? 
                                              <a href="/#/client/profile/information" style={{ color: "red" }} id="view-status-link">
                                                View Profile
                                            </a>
                                              :
                                              getSpecificNotification?.type == "suspicious_activity" ? 
                                              <a href="/#/client/profile/information" style={{ color: "red" }} id="view-status-link">
                                                View Profile
                                            </a>
                                              :
                                              
                                              ""
                                              
                                              }
                                               
                                             </div>
                     
                                              </div>
                                           
                     
                                               
                     
                                            </div>
                                      
                                        </div>
                                    </div>
                                </div>
                        
                        </div>
                     </div>

                      }
        
           

            </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

      <style>
        {`
    
    .custom-dropdown-item:hover {
      background-color: #EF3A47 !important;
      color: white !important;
    }



    .left-profile-card .user-profile {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: auto;
      margin-bottom: 20px;
  }
  
  .left-profile-card h3 {
      font-size: 18px;
      margin-bottom: 0;
      font-weight: 700;
  }
  
  .left-profile-card p {
      margin-bottom: 5px;
  }
  
  .left-profile-card .progress-bar {
      background-color: var(--main-color);
  }
  
  .personal-info {
      margin-bottom: 30px;
  }
  
  .personal-info .personal-list {
      list-style-type: none;
      margin: 0;
      padding: 0;
  }
  
  .personal-list li {
      margin-bottom: 5px;
  }
  
  .personal-info h3 {
      margin-bottom: 10px;
  }
  
  .personal-info p {
      margin-bottom: 5px;
      font-size: 14px;
  }
  
  .personal-info i {
      font-size: 15px;
      color: var(--main-color);
      ;
      margin-right: 15px;
      width: 18px;
  }
  
  .skill {
      margin-bottom: 30px;
  }
  
  .skill h3 {
      margin-bottom: 15px;
  }
  
  .skill p {
      margin-bottom: 5px;
  }
  
  .languages h3 {
      margin-bottom: 15px;
  }
  
  .languages p {
      margin-bottom: 5px;
  }
  
  .right-profile-card .nav-pills .nav-link.active,
  .nav-pills .show>.nav-link {
      color: #fff;
      background-color: var(--main-color);
  }
  
  .right-profile-card .nav>li {
      float: left;
      margin-right: 10px;
  }
  
  .right-profile-card .nav-pills .nav-link {
      border-radius: 26px;
  }
  
  .right-profile-card h3 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 15px;
  }
  
  .right-profile-card h4 {
      font-size: 16px;
      margin-bottom: 15px;
  }
  
  .right-profile-card i {
      font-size: 15px;
      margin-right: 10px;
  }
  
  .right-profile-card .work-container {
      border-bottom: 1px solid #eee;
      margin-bottom: 20px;
      padding: 10px;
  }
  
  
  /*timeline*/
  
  .img-circle {
      border-radius: 50%;
  }
  
  .timeline-centered {
      position: relative;
      margin-bottom: 30px;
  }
  
  .timeline-centered:before,
  .timeline-centered:after {
      content: " ";
      display: table;
  }
  
  .timeline-centered:after {
      clear: both;
  }
  
  .timeline-centered:before,
  .timeline-centered:after {
      content: " ";
      display: table;
  }
  
  .timeline-centered:after {
      clear: both;
  }
  
  .timeline-centered:before {
      content: '';
      position: absolute;
      display: block;
      width: 4px;
      background: #f5f5f6;
      /*left: 50%;*/
      top: 20px;
      bottom: 20px;
      margin-left: 30px;
  }
  
  .timeline-centered .timeline-entry {
      position: relative;
      /*width: 50%;
          float: right;*/
      margin-top: 5px;
      margin-left: 30px;
      margin-bottom: 10px;
      clear: both;
  }
  
  .timeline-centered .timeline-entry:before,
  .timeline-centered .timeline-entry:after {
      content: " ";
      display: table;
  }
  
  .timeline-centered .timeline-entry:after {
      clear: both;
  }
  
  .timeline-centered .timeline-entry:before,
  .timeline-centered .timeline-entry:after {
      content: " ";
      display: table;
  }
  
  .timeline-centered .timeline-entry:after {
      clear: both;
  }
  
  .timeline-centered .timeline-entry.begin {
      margin-bottom: 0;
  }
  
  .timeline-centered .timeline-entry.left-aligned {
      float: left;
  }
  
  .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner {
      margin-left: 0;
      margin-right: -18px;
  }
  
  .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-time {
      left: auto;
      right: -100px;
      text-align: left;
  }
  
  .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-icon {
      float: right;
  }
  
  .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-label {
      margin-left: 0;
      margin-right: 70px;
  }
  
  .timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-label:after {
      left: auto;
      right: 0;
      margin-left: 0;
      margin-right: -9px;
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner {
      position: relative;
      margin-left: -20px;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner:before,
  .timeline-centered .timeline-entry .timeline-entry-inner:after {
      content: " ";
      display: table;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner:after {
      clear: both;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner:before,
  .timeline-centered .timeline-entry .timeline-entry-inner:after {
      content: " ";
      display: table;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner:after {
      clear: both;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-time {
      position: absolute;
      left: -100px;
      text-align: right;
      padding: 10px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-time>span {
      display: block;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-time>span:first-child {
      font-size: 15px;
      font-weight: bold;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-time>span:last-child {
      font-size: 12px;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon {
      background: #fff;
      color: #737881;
      display: block;
      width: 40px;
      height: 40px;
      -webkit-background-clip: padding-box;
      -moz-background-clip: padding;
      background-clip: padding-box;
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      border-radius: 20px;
      text-align: center;
      -moz-box-shadow: 0 0 0 5px #f5f5f6;
      -webkit-box-shadow: 0 0 0 5px #f5f5f6;
      box-shadow: 0 0 0 5px #f5f5f6;
      line-height: 40px;
      font-size: 15px;
      float: left;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-primary {
      background-color: #303641;
      color: #fff;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-secondary {
      background-color: #ee4749;
      color: #fff;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-success {
      background-color: #00a651;
      color: #fff;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-info {
      background-color: #21a9e1;
      color: #fff;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-warning {
      background-color: #fad839;
      color: #fff;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-danger {
      background-color: #cc2424;
      color: #fff;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label {
      position: relative;
      background: #f5f5f6;
      padding: 1em;
      margin-left: 60px;
      -webkit-background-clip: padding-box;
      -moz-background-clip: padding;
      background-clip: padding-box;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label:after {
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 9px 9px 9px 0;
      border-color: transparent #f5f5f6 transparent transparent;
      left: 0;
      top: 10px;
      margin-left: -9px;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2,
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label p {
      color: #737881;
      font-size: 12px;
      margin: 0;
      line-height: 1.428571429;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label p+p {
      margin-top: 15px;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 {
      font-size: 16px;
      margin-bottom: 10px;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 a {
      color: #303641;
  }
  
  .timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 span {
      -webkit-opacity: .6;
      -moz-opacity: .6;
      opacity: .6;
      -ms-filter: alpha(opacity=60);
      filter: alpha(opacity=60);
  }

        `}
      </style>

    </>
  );
};

export default Navbar;
