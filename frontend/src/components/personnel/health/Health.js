import React from "react";
import { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';
import SideBar from "../../../layouts/personnelSideBarNav";
import { Card} from 'react-bootstrap';
import moment from 'moment';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import { Carousel, Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2'
import {TextField,
  InputLabel,
  Select,
  MenuItem, FormControl, NativeSelect,FormLabel,FormControlLabel ,RadioGroup ,Radio

} from "@material-ui/core";
import CountUp from "react-countup";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import red from "@material-ui/core/colors/blue";
import { makeStyles } from "@material-ui/core/styles";
import {
  AcheivementsContainer,
  AcheivementsText,
  AcheivementsContainerWave
} from "./HealthElements";
import Navbar from "../../../layouts/personnelHeaderBarNav";
import PersonnelSideBar  from "../../../layouts/personnelHeaderSide";
import { Scrollbars } from 'react-custom-scrollbars-2';



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

        const [getHealth, setgetHealth] = useState(); 

        const [getTotalUser, setTotalUser] = useState(); 
        const [geteditHealth, seteditHealth] = useState({health_problem:"", description:""}); 

        const [addHealth, setaddHealth] = useState({health_problem:"", description:""});
        const [error, setError] = useState({  
          health_problem: '',
          description: '',
          });

// console.log(error);
          const fetchHealth= () => {
            axios({
            method: "get",
            url: `/api/health/read`,
            headers: {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            }).then(response => {
                
              setgetHealth(response.data.health);
              setIsLoadingsss(false);

          }).catch((err) => console.log(err));
          };
          // console.log(AllHealthProblem)
          useEffect(() => {
            fetchHealth();
          },[]);


          var data = {
            columns: ["ID","Health Problem","Description","Action"],
            rows: []
        }
        getHealth?.forEach(healthsss => {
                data.rows.push([
                  healthsss._id,
                  healthsss.health_problem,
                  healthsss.description.substring(0, 25) ,
                  <div> <button className="btn btn-secondary py-1 px-2 ml-2" onClick={() => viewHealth(healthsss._id)}>
                  <i className="fas fa-eye"></i>
                  </button>&nbsp;
                  <button style={{background:"orange", color:"#fff"}} onClick={() => editHealth(healthsss._id)}className="btn btn-warning py-1 px-2 ml-2" >
                  <i className="fas fa-pencil-alt"></i></button>&nbsp;
                  <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteHealth(healthsss._id)}>
                  <i className="fas fa-trash-alt"></i>
                  </button>
                  </div>
                  
                ])
        })


        const onChange = e => {
          setaddHealth({ ...addHealth, [e.target.name]: e.target.value })
                }


        const submitaddHealth = () => {

                  const newHealths= {
                    health_problem: addHealth.health_problem,
                    description: addHealth.description
                  }
                  
                  // console.log(newHealths);
                  axios({
                    method:"post",
                    url:`/api/health/new`, 
                    data: newHealths,
                    headers: {
                      "Content-Type" : "application/json",
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Headers': '*',
                    }
                })
                      .then(response => {
                                     handleClose();
                                     setaddHealth({ health_problem:"",
                                      description:""})
                                     
                                     fetchHealth();
                                      Swal.fire({
                                        title: 'Success!',
                                        text: 'Successfully created a health problem.',
                                        imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1666086805/giphy_15_l7eulx.gif',
                                        imageWidth: 200,
                                        imageHeight: 200,
                                        imageAlt: 'Custom image',
                                        confirmButtonColor: '#EF3A47',
                                        })
                                        
                                  })
                        .catch(error => {
                                        console.log(error.response);
                                        setError(error.response.data);
                                       
                                    });
        
                }

                const viewHealth = _id => {
                  console.log(_id);
                  handleviewShow()

                  axios({
                    method: "get",
                    url: `/api/health/edit/${_id}`,
                    headers: {
                        "Content-Type" : "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                    },
                    }).then(response => {
                        setTotalUser(response.data.totalUser)
                      seteditHealth(response.data.health);
                      
                  }).catch((err) => console.log(err));

                }

                const editHealth = _id => {
                  console.log(_id);
                  handleeditShow()

                  axios({
                    method: "get",
                    url: `/api/health/edit/${_id}`,
                    headers: {
                        "Content-Type" : "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                    },
                    }).then(response => {
                        
                      seteditHealth(response.data.health);
                      
                  }).catch((err) => console.log(err));

                }

               


                const onChangeedit = e => {
                  
                  seteditHealth({ ...geteditHealth, [e.target.name]: e.target.value })
                    
              }

              const submitEdit = (_id) => {
    
  
                let formData = new FormData();

                formData.set("health_problem", geteditHealth.health_problem);
                formData.set("description", geteditHealth.description);
          
                Swal.fire({
                  title: 'Loading!',
                  text: 'Please wait while processing your new data.',
                  imageUrl: 'https://media2.giphy.com/media/4hVUoT5cdyjWRWlZc3/giphy.gif?cid=ecf05e47xglkm9xa6j4ukbge65fg47tfunliqhc5aza0dwmi&rid=giphy.gif&ct=s',
                  imageWidth: 200,
                  imageHeight: 200,
                  imageAlt: 'Custom image',
                  confirmButtonColor: '#EF3A47',
                  showCancelButton: false,
                  showConfirmButton: false
                  })
                  
                axios({
                  method: "put",
                  url: `/api/health/update/${_id}`,
                  headers: {
                    "Content-Type" : "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                  },
                  data: formData
                }).then(response => {
                  Swal.close()
                  handleEditClose();
                  fetchHealth();
                  Swal.fire({
                    title: 'Success!',
                    text: 'Sucessfully Updated.',
                    imageUrl: 'https://media0.giphy.com/media/dYmYhn4OXI1aOpVpFO/giphy.gif?cid=ecf05e479ym4epjp1orghtshgvg92nc27cty98jbg9rfzfdr&rid=giphy.gif&ct=s',
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                    confirmButtonColor: '#EF3A47',
                    })
                  //   setLoadingss(false)
                  // // console.log(response.data.user);
                  // // setgetUser(response.data.user);
                  // // setAllHealth(response.data.health);
                  // // setProfilePreview(response.data.user.profile_picture.url)
            
                 
                  
              }).catch(error => {
                Swal.close()
                console.log(error.response.data)
                    setError(error.response.data);
            });  
            
              };


console.log(geteditHealth)

                const deleteHealth = _id => {
                  // console.log(_id);

                  Swal.fire({
                    title: 'Are you sure you want to delete this health problem?',
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
                        url: `/api/health/delete/${_id}`,
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
                                                fetchHealth();
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


  ///modal--------------------------

  const [show, setShow] = useState(false);
  const handleClose =() => {
          setShow(false);
          setaddHealth({ health_problem:"",
          description:""})
          setError({ health_problem:"",
          description:""})
          
          // setAnimalImage([]);
        } 
  const handleShow = () => setShow(true);


  const [editShow, seteditShow] = useState(false);
  const handleEditClose =() => {
      seteditShow(false);
        
          // setAnimalImage([]);
        } 
  const handleeditShow = () => seteditShow(true);

  const [viewShow, setviewShow] = useState(false);
  const handleViewClose =() => {
    setviewShow(false);
        
          // setAnimalImage([]);
        } 
  const handleviewShow = () => setviewShow(true);

  

  const [isLoadingss, setIsLoadingsss] = useState(true);

  if(isLoadingss){
    return <>
      <Navbar toggle={toggle} />
      <PersonnelSideBar isOpen={isOpen} toggle={toggle}/>
 

        <div style={contentStyle}>
           <div class="container-fluid">
        <br />
        <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-heartbeat"></i>&nbsp;Health</h1>
        <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
        <hr class="sep-2" />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 

    <LoadingScreen />
    </div>
    </div>
    </>
   }  



    return (
      <>
      <Navbar toggle={toggle} />
      <PersonnelSideBar isOpen={isOpen} toggle={toggle}/>
 

        <div style={contentStyle}>
           <div class="container-fluid">
        <br />
        <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-heartbeat"></i>&nbsp;Health</h1>
        <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
        <hr class="sep-2" />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 

       
        <Button style={{ marginBottom: "10px"}} onClick={() => handleShow()} 
          color="danger"><i className="fas fa-plus"></i>&nbsp;&nbsp;Health Problem</Button>

        <ThemeProvider theme={theme}> 
        <MUIDataTable
        title={<>
        {/* <h3>USER LIST</h3> */}
          {/* <button  onClick={() => handleShow()} className="btn btn-dark py-1 px-2 ml-2" >&nbsp;&nbsp;
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
              <Modal.Title style={{color:'#ffff'}}><i class="fas fa-medkit"></i>&nbsp;&nbsp;Create an Health Problem</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>

            <TextField fullWidth color="secondary" id="health_problem" onChange={onChange} InputLabelProps={{ required: true }} name="health_problem" label="Health Problem" />
            <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.health_problem}</InputLabel> 
            <br></br>
            <div  className="panel-activity__status">
                 <textarea name="description" id="commentfield" onChange={onChange} placeholder="Write the description here..." className="form-control"></textarea>
                 <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.description}</InputLabel> 
                    
                 <div className="actions">
                         <div className="btn-group">
                         <Button outline color="danger" onClick={() => submitaddHealth()}><i class="fas fa-medkit"></i>&nbsp;Add Health Problem</Button>
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


          <Modal size='md' show={editShow} onHide={handleEditClose} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}><i class="fas fa-medkit"></i>&nbsp;&nbsp;Edit Health Problem</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>

            <TextField fullWidth color="secondary" id="health_problem" InputLabelProps={{ required: true }} onChange={onChangeedit} value={geteditHealth.health_problem}name="health_problem" label="Health Problem" />
            <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.health_problem}</InputLabel> 
            <br></br>
            <div  className="panel-activity__status">
                 <textarea name="description" id="commentfield" placeholder="Write the description here..." onChange={onChangeedit} value={geteditHealth.description} className="form-control"></textarea>
                 <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.description}</InputLabel> 
                    
                 <div className="actions">
                         <div className="btn-group">
                         <Button outline color="danger" onClick={() => submitEdit(geteditHealth._id)}  ><i class="fas fa-medkit"></i>&nbsp;Update Health Problem</Button>
                         </div>
                     </div>
                 </div>

            </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handleEditClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal size='md' show={viewShow} onHide={handleViewClose} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}><i class="fas fa-medkit"></i>&nbsp;&nbsp;Health Problem</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>
            <h5><b>Health Condition:</b> {geteditHealth.health_problem}</h5>
              <hr></hr>
              <h5><b>Description:</b> {geteditHealth.description.substring(0, 20)}</h5>
              <hr></hr>
            <AcheivementsContainer>
             
            <AcheivementsText>
            <h1>Total of Elderly who have this health problem.</h1>
            </AcheivementsText>
              <AcheivementsText>
                <div className={classes.container} justifyContent="center">

            <Grid container justify="flex-start">
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Paper className={classes.customBorderRadius} elevation={15}>
                  <Box p={1}>
                    <CountUp end={getTotalUser} duration={0.3} delay={0.3} />
                    <Typography variant="h5">TOTAL</Typography>
                  </Box>
                </Paper>
              </Grid>
              </Grid>
           </div>
        </AcheivementsText>
      </AcheivementsContainer>

            </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handleViewClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

  
          <style>
        {`

hr.sep-2 {
  border: 0;
  height: 2px;
  background-image: linear-gradient(to right, #f0f0f0, #ff0000, #ff0000, #f0f0f0);
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