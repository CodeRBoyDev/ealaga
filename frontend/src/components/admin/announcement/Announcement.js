import React from "react";
import { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';
import SideBar from "../../../layouts/adminSideBarNav";
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import Swal from 'sweetalert2'
import { Carousel, Card, Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Navbar from "../../../layouts/adminHeaderBarNav";
import AdminSideBar from "../../../layouts/adminHeaderSide";
// import SideBar from "../../../layouts/clientSideBarNav";
import { Scrollbars } from 'react-custom-scrollbars-2';

function Announcement() {
 

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

                    const [getAnnouncement, setgetAnnouncement] = useState(); 
                    const [addAnnouncement, setaddAnnouncement] = useState({announcement:""});

            const fetchAnnouncement= () => {
                axios({
                method: "get",
                url: `/api/announcement/read`,
                headers: {
                    "Content-Type" : "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
                }).then(response => {
                    
             setgetAnnouncement(response.data.announcement);
            }).catch((err) => console.log(err));
            };
            // console.log(AllHealthProblem)
            useEffect(() => {
              fetchAnnouncement();
            },[]);


                var data = {
                    columns: ["Announcement","Action"],
                    rows: []
                }
                getAnnouncement?.forEach(announcement => {
                        data.rows.push([
                          announcement.announcement,
                          announcement.status == "set" ?
                          <>
                          <Link to="" onClick={() => setAnnouncement(announcement._id)} style={{pointerEvents: "none"}} className="DisablegreenBgButton">
                          &nbsp;&nbsp;&nbsp;&nbsp;SET&nbsp;&nbsp;&nbsp;&nbsp;
                          </Link> 
                          <Link to="" onClick={() => deleteAnnouncement(announcement._id)} style={{pointerEvents: "none"}} className="DisableredBgButton">
                          DELETE
                          </Link> 
                          </>  :
                           <>
                          <Link to="" onClick={() => setAnnouncement(announcement._id)} className="greenBgButton">
                          &nbsp;&nbsp;&nbsp;&nbsp;SET&nbsp;&nbsp;&nbsp;&nbsp;
                          </Link> 
                          <Link to="" onClick={() => deleteAnnouncement(announcement._id)} className="redBgButton">
                          DELETE
                          </Link> 
                          </>
                          
                        ])
                })
             
                const setAnnouncement = _id => {
                  console.log(_id);
        
        
                  Swal.fire({
                    title: 'Are you sure you want to set this announcement?',
                    icon: 'warning',
                    color: '#EF3A47',
                    showCancelButton: true,
                    confirmButtonColor: '#EF3A47',
                    cancelButtonColor: '#f8bb86',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                  }).then((result) => {
                    if (result.isConfirmed) {
            
                      axios({
                        method: "put",
                        url: `/api/announcement/edit/${_id}`,
                        headers: {
                          "Content-Type" : "application/json",
                          'Access-Control-Allow-Origin': '*',
                          'Access-Control-Allow-Headers': '*',
                        },
                      }).then(response => {
        
                                          Swal.fire({
                                            title: 'Success!',
                                            text: 'You have successfully set the announcement.',
                                            imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1665936961/ezgif.com-gif-maker_jd433u.gif',
                                            imageWidth: 200,
                                            imageHeight: 200,
                                            imageAlt: 'Custom image',
                                            confirmButtonColor: '#EF3A47',
                                            }).then((result) => {
                                              if (result.isConfirmed) {
                                                fetchAnnouncement();
                                                  }
                                        })
                                      })
                            .catch(error => {
                                            console.log(error.response);
                                            // setError(error.response.data);
                                           
                                        });
            
                     
                    }
                  })
        
                }

                const deleteAnnouncement = _id => {
                  console.log(_id);
        
        
                  Swal.fire({
                    title: 'Are you sure you want to delete this announcement?',
                    icon: 'warning',
                    color: '#EF3A47',
                    showCancelButton: true,
                    confirmButtonColor: '#EF3A47',
                    cancelButtonColor: '#f8bb86',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                  }).then((result) => {
                    if (result.isConfirmed) {
            
                      axios({
                        method: "delete",
                        url: `/api/announcement/delete/${_id}`,
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
                                                fetchAnnouncement();
                                                  }
                                        })
                                      })
                            .catch(error => {
                                            console.log(error.response);
                                            // setError(error.response.data);
                                           
                                        });
            
                     
                    }
                  })
        
                }


         const handleAddAnnouncement = () => {
                  handleShow()

                }

         const onChange = e => {
          setaddAnnouncement({ ...addAnnouncement, [e.target.name]: e.target.value })
                }

         const submitaddAnnouncement = () => {

                  const newAnnouncements= {
                    announcement: addAnnouncement.announcement,
                  }
                  
                  console.log(newAnnouncements);
                  axios({
                    method:"post",
                    url:`/api/announcement/new`, 
                    data: newAnnouncements,
                    headers: {
                      "Content-Type" : "application/json",
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Headers': '*',
                    }
                })
                      .then(response => {
                                     handleClose();
                                      Swal.fire({
                                        title: 'Success!',
                                        text: 'You have successfully created your announcement.',
                                        imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1665936961/ezgif.com-gif-maker_jd433u.gif',
                                        imageWidth: 200,
                                        imageHeight: 200,
                                        imageAlt: 'Custom image',
                                        confirmButtonColor: '#EF3A47',
                                        })
                                      fetchAnnouncement();
                                  })
                        .catch(error => {
                                        console.log(error.response);
                                        // setError(error.response.data);
                                       
                                    });
        
                }

                // console.log(addAnnouncement)
             
  ///modal--------------------------

  const [show, setShow] = useState(false);
  const handleClose =() => {
          setShow(false);
          // setAnimalComment([]);
          // setAnimalImage([]);
        } 
  const handleShow = () => setShow(true);


    return (
      <>
       <Navbar toggle={toggle} />
           <AdminSideBar  isOpen={isOpen} toggle={toggle}/>

        <div style={contentStyle}>

          
           <div class="container-fluid">
        <br />
        <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-bullhorn"></i>&nbsp;Announcement</h1>
        <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
        <hr />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 
        
       
        <Button style={{ marginBottom: "10px"}} onClick={() => handleAddAnnouncement()} 
          color="danger"><i className="fas fa-plus"></i>&nbsp;&nbsp;Announcement</Button>

        <ThemeProvider theme={theme}> 

        <MUIDataTable
        title={<>
        {/* <h3>USER LIST</h3> */}
          {/* <button onClick={() => handleAddAnnouncement()} className="btn btn-dark py-1 px-2 ml-2" >&nbsp;&nbsp;
                        <i className="fas fa-plus"></i>&nbsp;&nbsp;</button> */}
        </>}
        data={data.rows}
        columns={data.columns}
        options={{
          filterType: "dropdown",
          responsive: "scroll",  
          selectableRows: 'none',
          print: false,
          download: false,
          filter: false,
            
            
          }}
      />
       </ThemeProvider>
                 </div>

       <Modal size='md' show={show} onHide={handleClose} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}><i class="fas fa-bullhorn"></i>&nbsp;&nbsp;Create an announcement</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>
            <div  className="panel-activity__status">
                 
                 <textarea name="announcement" onChange={onChange} id="commentfield" placeholder="Write your announcement here..." className="form-control"></textarea>
               
                    
                 <div className="actions">
                         <div className="btn-group">
                         <Button outline color="danger" onClick={() => submitaddAnnouncement()}><i class="fas fa-bullhorn"></i>&nbsp;Add Announcement</Button>
                         </div>
                     </div>
                 </div>

            </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


         <style>
        {`
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

export default Announcement;