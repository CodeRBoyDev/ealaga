import React from "react";
import { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';
import SideBar from "../../../layouts/adminSideBarNav";
import Pendingsrunning from "../../../images/pendingsrunning.gif";
import moment from 'moment';
import { createTheme } from '@material-ui/core';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2'

import Logovector from "../../../images/logovector.png";
import { makeStyles } from "@material-ui/core/styles";
import {
  AcheivementsContainer,
  AcheivementsText,
  AcheivementsContainerWave
} from "./LogsElements";
import Navbar from "../../../layouts/adminHeaderBarNav";
import AdminSideBar from "../../../layouts/adminHeaderSide";
import { Scrollbars } from 'react-custom-scrollbars-2';
import ScrollableFeed from "react-scrollable-feed";

const LoadingScreen = () => {

  const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '-10vh'
  };
  const divStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '-8vh'
  };

  return (
      <>
          <div className="loading-screen">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "-250px", height: "100vh" }}>

                  <div class="loader">
                      <div class="bounce1"></div>
                      <div class="bounce2"></div>
                      <div class="bounce3"></div>
                      <div class="logo">
                          <img src="https://res.cloudinary.com/du7wzlg44/image/upload/v1668318630/logovector_xbhcca.png" alt="" />
                      </div>
                  </div>
              </div>
              <div style={divStyles}>

                  <h4>Ease. Access. Care.</h4>
              </div>
              <div style={divStyle}>
                  <img style={{ width: "15vh" }} src="https://res.cloudinary.com/du7wzlg44/image/upload/v1674437022/logos_jwwfrz.png" alt="" />
              </div>
          </div>


          <style>
              {`
     .loader {
  width: 150px;
  height: 150px;
  position: relative;
  margin: 220px auto;

}
.logo{
  width:45%;
  position:absolute;
  left:27.5%;
  top: 27.5%;
  
}
img{
  width:100%;
  border-radius: 5%;
  z-index:5;
}
.bounce1, .bounce2, .bounce3 {
  width: 100%;
  height: 100%;
  border-radius: 30%;
  background-color: #F56565;
  opacity: 0.7;
  position: absolute;
  top: 0;
  left: 0;
   
  -webkit-animation: spreadout 2.7s infinite ease-in-out;
  animation: spreadout 2.7s infinite ease-in-out;
}

.bounce2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.bounce3 {
  -webkit-animation-delay: -1.8s;
  animation-delay: -1.8s;
}


@-webkit-keyframes spreadout {
  0% { -webkit-transform: scale(0.3) }
 
  100% {
    opacity: 0;
  }
}

@keyframes spreadout {
  0% { 
    -webkit-transform: scale(0.3);
    transform: scale(0.3);
  }
 
  100% {
    opacity: 0;
  }
}
      
      `}
          </style>
      </>
  );
}


function Health() {
 

const [sideNavExpanded, setSideNavExpanded] = React.useState(true);

function handleResize() {

  if (window.innerWidth <= 375) {
    setSideNavExpanded(false);

  }
}

React.useEffect(() => {
  window.addEventListener("resize", handleResize);

  handleResize(); // on-component-mount, check already to see if user has a small device

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []); // initialize event listeners on-mount & clean on-unmount

const contentStyle = {
  marginLeft: sideNavExpanded ? "250px" : "90px", // arbitrary values
  marginTop: sideNavExpanded ? "92px" : "90px", // arbitrary values
  transition: "margin 0.2s ease"
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: theme.spacing(32)
    }
  },
  container: {
    display: "flex"
  },

  customBorderRadius: {
    borderRadius: 25,
    border: `3px solid #EF3A47`,
    height: 200,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    margin: 30,
    minWidth: 200,
    Color: "#FFBABA",
  }
}));
const classes = useStyles();
const theme = createTheme({
  overrides: {
    MuiTableCell: {
      root: {
        border: [[1, 'solid', 'rgb(239, 58, 71)']],
        borderColor: '#d3d3d3',
        
      },
      head: {
        fontWeight:"bold",
        background: 'rgb(239, 58, 71) !important',
        color: "white"
    }
    
    },
    MuiTableSortLabel: {
      root: {
        alignItems: 'flex-start',
      },
    },
    // MuiTableFooter: {
    //   root: {
    //     background: 'rgb(239, 58, 71)',
    //   },
    // },
    // MUIDataTableToolbar: {
    //   root: {
    //     background: 'rgb(239, 58, 71)',
    //     boxShadow:"0 3px 5px rgb(255 0 0 / 60%)"
    //   },
    // },

    // MUIDataTable
    MUIDataTableHeadCell: {
      sortLabelRoot: {
        // height: undefined,
      },
    },
  },
});

 ////////////====header nav

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

//================================================================================================================

const clearActivityLogs = () => {

  Swal.fire({
    text: 'Please wait!',
    imageUrl: Pendingsrunning,
    imageWidth: 400,
    imageHeight: 325,
    imageAlt: 'Custom image',
    confirmButtonColor: '#EF3A47',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false
  })

  axios({
    method: "delete",
    url: `/api/activitylogs/delete`,
    headers: {
      "Content-Type" : "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  }).then(response => {

                      Swal.fire({
                        title: 'Success!',
                        text: 'Deleted successfully.',
                        imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1665937703/ezgif.com-gif-maker_2_h7h5ey.gif',
                        imageWidth: 200,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                        confirmButtonColor: '#EF3A47',
                        }).then((result) => {
                          if (result.isConfirmed) {
                            fetchActivityLogs();
                              }
                    })
                  })

}

const clearAPILogs = () => {

  Swal.fire({
    text: 'Please wait!',
    imageUrl: Pendingsrunning,
    imageWidth: 400,
    imageHeight: 325,
    imageAlt: 'Custom image',
    confirmButtonColor: '#EF3A47',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false
  })

  axios({
    method: "delete",
    url: `/api/apilogs/delete`,
    headers: {
      "Content-Type" : "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  }).then(response => {

                      Swal.fire({
                        title: 'Success!',
                        text: 'Deleted successfully.',
                        imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1665937703/ezgif.com-gif-maker_2_h7h5ey.gif',
                        imageWidth: 200,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                        confirmButtonColor: '#EF3A47',
                        }).then((result) => {
                          if (result.isConfirmed) {
                            fetchActivityLogs();
                              }
                    })
                  })

}


        const [AllActivityLogs, setAllActivityLogs] = useState([]);
        const [AllAPILogs, setAllAPILogs] = useState([]);

            // console.log(AllActivityLogs)
  
          const fetchActivityLogs= () => {
            axios({
            method: "get",
            url: `/api/allActivityLogs`,
            headers: {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            }).then(response => {
              setAllActivityLogs(response.data.allActivityLogs)
              setAllAPILogs(response.data.allAPILogs)
              setIsLoadingsss(false);
              
          }).catch((err) => console.log(err));
          };
          // console.log(AllHealthProblem)
          useEffect(() => {
            fetchActivityLogs();
            const interval = setInterval(fetchActivityLogs, 2000);

            // Clean up the interval when the component unmounts
            return () => clearInterval(interval);

          },[]);


          const [getOption, setOption] = useState('activity');

      
          const [isLoadingss, setIsLoadingsss] = useState(true);

          if(isLoadingss){
            return <>
           <Navbar toggle={toggle} />
      <AdminSideBar  isOpen={isOpen} toggle={toggle}/>
 
      

        <div style={contentStyle}>
      
           <div class="container-fluid">
        <br />
        <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-history"></i>&nbsp;
        Logs</h1>
        <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
        <hr />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 
        
            <LoadingScreen />
            </div>
            </div>
            </>
           }  
      
    return (
      <>
      <Navbar toggle={toggle} />
      <AdminSideBar  isOpen={isOpen} toggle={toggle}/>
 
      

        <div style={contentStyle}>
      
           <div class="container-fluid">
        <br />
        <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-history"></i>&nbsp;
        Logs</h1>
        <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
        <hr />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 

        

        {getOption === "api" ? 
         <Button style={{ marginBottom: "10px"}} onClick={()  => setOption("activity")}
         color="danger"><i className="fas fa-laptop-code"></i>&nbsp;&nbsp;Activity Logs</Button>
                       :  
           <Button style={{ marginBottom: "10px"}} onClick={()  => setOption("api")}
          color="danger"><i className="fas fa-project-diagram"></i>&nbsp;&nbsp;API Logs</Button>

    }      




    <div class="row">
        <div class="col-lg-12">
            <div class="ibox chat-view">

            {getOption === "activity" ? 
        
         <div class="ibox-title">
         Activity Logs <small class="pull-right text-muted">|  {moment().format("ddd MMM DD YYYY - HH:mm:ss")}</small>
         </div>
         
      
                       :  
                       <div class="ibox-title">
                       API Logs <small class="pull-right text-muted">|  {moment().format("ddd MMM DD YYYY - HH:mm:ss")}</small>
                       </div>

    }      

               
                <div class="ibox-content">

                {getOption === "activity" ? 
                    

                    <div class="chat-discussion">
                    <ScrollableFeed>
                    {AllActivityLogs.length > 0 ? (
                      AllActivityLogs.map((activityLog) => (
                        
                        <div class="chat-message left">
                          <img class="message-avatar" src={Logovector} alt=""/>
                          <div class="message">
                            <p class="message-author" >
                              {activityLog.user_id?.user_name} |  
                              <span> {moment(activityLog.date).format("ddd MMM DD YYYY - HH:mm:ss")}</span>
                            </p>
                            <hr />
                            <span class="message-content">
                              {activityLog.description}
                            </span>
                          </div>
                        </div>
                      
                      ))
                    ) : (
                      <p>No activity logs available.</p>
                    )}
                    </ScrollableFeed>
                    </div>

                                  :  
                     

                                  <div class="chat-discussion">
                                  <ScrollableFeed>
                                  {AllAPILogs.length > 0 ? (
                                    AllAPILogs.map((apiLogs) => (
                                      
                                      <div class="chat-message left">
                                        <img class="message-avatar" src={Logovector} alt=""/>
                                        <div class="message">
                                          <p class="message-author" >
                                            {apiLogs.platform} | {apiLogs.status} | 
                                            <span> {moment(apiLogs.date).format("ddd MMM DD YYYY - HH:mm:ss")}</span>
                                          </p>
                                          <hr />
                                          <span class="message-content">
                                          {apiLogs.method} | {apiLogs.responseTime} | {apiLogs.url} | {apiLogs.userAgent}
                                          </span>
                                        </div>
                                      </div>
                                    
                                    ))
                                  ) : (
                                    <p>No activity logs available.</p>
                                  )}
                                  </ScrollableFeed>
                                  </div>

                }   


                           

                </div>

                <div class="ibox-footer">
                {getOption === "activity" ? 
                           <Button outline onClick={() => clearActivityLogs()}
          color="danger" ><i className="fas fa-minus"></i>&nbsp;&nbsp;Clear Activity Logs</Button>
          :
          <Button outline onClick={() => clearAPILogs()}
          color="danger" ><i className="fas fa-minus"></i>&nbsp;&nbsp;Clear API Logs</Button>}

                  </div>
            </div>
        </div>
    </div>
</div>




  
          <style>
        {`


/* WRAPPERS */
#wrapper {
  width: 100%;
  overflow-x: hidden;
}
.wrapper {
  padding: 0 20px;
}
.wrapper-content {
  padding: 20px 10px 40px;
}
#page-wrapper {
  padding: 0 15px;
  min-height: 568px;
  position: relative !important;
}
@media (min-width: 768px) {
  #page-wrapper {
    position: inherit;
    margin: 0 0 0 240px;
    min-height: 2002px;
  }
}


.message-input {
  height: 90px !important;
}
.chat-avatar {
  white: 36px;
  height: 36px;
  float: left;
  margin-right: 10px;
}
.chat-user-name {
  padding: 10px;
}
.chat-user {
  padding: 8px 10px;
  border-bottom: 1px solid #e7eaec;
}
.chat-user a {
  color: inherit;
}
.chat-view {
  z-index: 20012;
}
.chat-users,
.chat-statistic {
  margin-left: -30px;
}
@media (max-width: 992px) {
  .chat-users,
  .chat-statistic {
    margin-left: 0;
  }
}
.chat-view .ibox-content {
  padding: 0;
}
.chat-message {
  padding: 10px 20px;
}
.message-avatar {
  height: 48px;
  width: 48px;
  border: 1px solid #e7eaec;
  border-radius: 4px;
  margin-top: 1px;
}
.chat-discussion .chat-message.left .message-avatar {
  float: left;
  margin-right: 10px;
}
.chat-discussion .chat-message.right .message-avatar {
  float: right;
  margin-left: 10px;
}
.message {
  background-color: #fff;
  border: 1px solid #e7eaec;
  text-align: left;
  display: block;
  padding: 10px 20px;
  position: relative;
  border-radius: 4px;
}
.chat-discussion .chat-message.left .message-date {
  float: right;
}
.chat-discussion .chat-message.right .message-date {
  float: left;
}
.chat-discussion .chat-message.left .message {
  text-align: left;
  margin-left: 55px;
}
.chat-discussion .chat-message.right .message {
  text-align: right;
  margin-right: 55px;
}
.message-date {
  font-size: 10px;
  color: #888888;
}
.message-content {
  display: block;
}
.chat-discussion {
  background: #eee;
  padding: 5px;
  height: 500px;
  overflow-y: hidden;
  scrollbar-width: none;
}
.chat-users {
  overflow-y: auto;
  height: 400px;
}
.chat-message-form .form-group {
  margin-bottom: 0;
}
.ibox {
  clear: both;
  margin-bottom: 25px;
  margin-top: 0;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.ibox.collapsed .ibox-content {
  display: none;
}
.ibox.collapsed .fa.fa-chevron-up:before {
  content: "\f078";
}
.ibox.collapsed .fa.fa-chevron-down:before {
  content: "\f077";
}
.ibox:after,
.ibox:before {
  display: table;
}
.ibox-title {
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background-color: #ffffff;
  border-color: #EF3A47;
  border-image: none;
  border-style: solid solid none;
  border-width: 3px 0 0;
  color: inherit;
  margin-bottom: 0;
  padding: 14px 15px 7px;
  min-height: 48px;
 
}
.ibox-content {
  background-color: #ffffff;
  color: inherit;
  padding: 15px 20px 20px 20px;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
}
.ibox-footer {
  color: inherit;
  border-top: 1px solid #e7eaec;
  font-size: 90%;
  background: #ffffff;
  padding: 10px 15px;
}

.message-input {
    height: 90px !important;
}
.form-control, .single-line {
    background-color: #FFFFFF;
    background-image: none;
    border: 1px solid #e5e6e7;
    border-radius: 1px;
    color: inherit;
    display: block;
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
    font-size: 14px;
}








        .vl {
          border-left: 2px solid #EF3A47;
          height: 50px;
        }

        .redBg {
            background-color: rgba(255, 0, 0, 0.2);
            color: red;
            padding: 0.3em 0.5em;
            margin: 0.5em;
            display: flex;
            text-decoration: none;
            border-radius: 2em;
            font-weight: bolder;
            justify-content: center;
          }
          .greenBgButton {
            background-color: rgba(0, 255, 0, 0.2);
            color: green;
            padding: 10px;
            margin: 0.5em;
            text-decoration: none;
            border-radius: 2em;
            font-weight: bolder;
            justify-content: center;
            box-shadow: 0 5px 10px rgba(100, 100, 100, 0.6);
            
          }
          .greenBgButton:hover {
            text-decoration: none;
            color: white;
            background-color: green;
            box-shadow: 0 5px 10px rgba(0, 255, 0, 0.6);
          }

          .redBgButton {
            background-color: rgba(255, 0, 0, 0.2);
            color: red;
            padding: 10px;
            margin: 0.5em;
            text-decoration: none;
            border-radius: 2em;
            font-weight: bolder;
            justify-content: center;
            box-shadow: 0 5px 10px rgba(100, 100, 100, 0.6);
            
          }
          .redBgButton:hover {
            text-decoration: none;
            color: white;
            background-color: red;
            box-shadow: 0 5px 10px rgba(255, 0, 0, 0.2);
          }

          .DisablegreenBgButton {
            background-color: rgba(0, 255, 0, 0.2);
            opacity: 0.2;
            color: green;
            padding: 10px;
            margin: 0.5em;
            text-decoration: none;
            border-radius: 2em;
            font-weight: bolder;
            justify-content: center;
            box-shadow: 0 5px 10px rgba(100, 100, 100, 0.6);
            
          }

          .DisableredBgButton {
            background-color: rgba(255, 0, 0, 0.2);
            opacity: 0.2;
            color: red;
            padding: 10px;
            margin: 0.5em;
            text-decoration: none;
            border-radius: 2em;
            font-weight: bolder;
            justify-content: center;
            box-shadow: 0 5px 10px rgba(100, 100, 100, 0.6);
            
          }

        .greenBg {
            background-color: green;
            color: white;
            padding: 0.3em 0.5em;
            margin: 0.5em;
            display: flex;
            text-decoration: none;
            border-radius: 2em;
            font-weight: bolder;
            justify-content: center;
          }

        .yellowBg {
            background-color: orange;
            color: white;
            padding: 0.3em 0.5em;
            margin: 0.5em;
            display: flex;
            text-decoration: none;
            border-radius: 2em;
            font-weight: bolder;
            justify-content: center;
          }
        
          .form-control {
            height: 150px;
          
        }
      
          .centerss{
            padding-left: 100px;
          }
              a {
                color: #EF3A47;
                text-decoration: underline;
            }
            a:hover {
              color: #F58890;
              transition: all 0.2s ease-in-out ;
      
            }
            .colll{
              display: flex; 
              float:left;
              width:200px;
              margin:5px;
              
            }
      
            .page-link {
              position: relative;
              display: block;
              color: #ff0000;
              text-decoration: none;
              background-color: #fff;
              border: 1px solid #dee2e6;
              transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
          .panel-activity__status > .actions {
            display: -ms-flexbox;
            display: -webkit-box;
            display: flex;
            padding: 10px 20px;
            background-color: #ebebea;
            border-style: solid;
            border-width: 0 1px 1px;
            border-color: #ccc;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }
      
            .panel-activity__status > .actions > .btn-group > .btn-link:not(:last-child) {
              margin-right: 25px;
          }
      
          .panel-activity__status > .actions > .btn-group > .btn-link {
              padding-left: 0;
              padding-right: 0;
              color: #9c9c9c;
          }
      
          .panel-activity__status > .actions > .btn-group {
            -ms-flex: 1;
            -webkit-box-flex: 1;
            flex: 1;
            font-size: 16px;
        }
      
              .btn-group,
            .btn-group-vertical {
                position: relative;
                display: -ms-inline-flexbox;
                display: inline-flex;
                vertical-align: middle;
            }
      
            .panel-activity__status > .actions > .btn-group > .btn-link:not(:last-child) {
              margin-right: 25px;
            }
      
            .btn-link {
              display: inline-block;
              color: inherit;
              font-weight: inherit;
              cursor: pointer;
              background-color: transparent;
            }
      
            button.btn-link {
              border-width: 0;
            }
        `}
      </style>

        </div>
        </>
    );

}

export default Health;