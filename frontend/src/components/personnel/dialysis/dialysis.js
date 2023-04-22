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
} from "./DialysisElements";
import Navbar from "../../../layouts/personnelHeaderBarNav";
import PersonnelSideBar  from "../../../layouts/personnelHeaderSide";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link } from 'react-router-dom';


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


function Dialysis() {
 

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

        const [getDialysis, setgetDialysis] = useState([]); 
        const [getDialysisPatient, setgetDialysisPatient] = useState([]); 

        const [getViewApplicant, setViewApplicant] = useState({}); 
        const [getViewApplicantDialysis, setViewApplicantDialysis] = useState([]); 

        const [getBatches, setBatches] = useState(false);

          const fetchDialysis= () => {
            axios({
            method: "get",
            url: `/api/dialysis/allDialysis`,
            headers: {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            }).then(response => {
              setgetDialysis(response.data.allDialysis);
              setgetDialysisPatient(response.data.allDialysisPatient)
              setIsLoadingsss(false);

          }).catch((err) => console.log(err));
          };
          // console.log(AllHealthProblem)
          useEffect(() => {
            fetchDialysis();
          },[]);

          // console.log(getDialysis);


            //=============filter batch


          const [getBatchyears, setBatchyears] = useState({years: moment().year()});

            const YearMonths = [];

            // Get current year
            // const currentYears = moment(getBatchyears.years).year();
            
            // Loop through each month of the year
            for (let i = 0; i < 12; i++) {
              // Get month name with year
              const monthNameWithYear = moment().month(i).year(getBatchyears.years).format('MMMM YYYY');
            
              // Add month name with year to array
              YearMonths.push(monthNameWithYear);
            }


            const startYear = 2019;
            const endYear = moment().year();

            // create an array to store the years
            const yearsData = [];

            // loop through the years and push them into the array
            for (let year = startYear; year <= endYear; year++) {
              yearsData.push(year);
            }

   
        const [getBatch, setBatch] = useState({batch: moment().format('MMMM YYYY')});

        const onChangeBatch = e => {
          setBatch({ batch: e.target.value});
        };

        const onChangeBatchYears = e => {
          setBatchyears({ years: e.target.value});
        };

        const onAll = () => {
          setBatch({batch: moment().format('MMMM YYYY')});
          setBatchyears({years: moment().year()});

        };

        var patgetBatch = getBatch?.batch == "" ? "" : '^'+getBatch?.batch+'$';

        const filteredgetDialysisPatient = getDialysisPatient?.filter(getDialysisPatient => {
          
            return getDialysisPatient.batch.match(patgetBatch)
        });


        // ---------------------------------------
          
       if(getBatches){

        var data = {
          columns: ["ID","Full Name", "Email","Barangay", "Batch","Action"],
          rows: []
      }


      filteredgetDialysisPatient?.forEach(getDialysis => {
              data.rows.push([
                getDialysis._id,
                [getDialysis.user_id?.last_name,", ",getDialysis.user_id?.first_name," ",getDialysis.user_id?.middle_name],
                getDialysis.user_id?.email,
                getDialysis.user_id?.address.barangay,
                getDialysis.batch,
                <>
                <Link to="" onClick={() => handleViewApplicant(getDialysis._id)} className="yellowBgButton">
                View
                </Link> 
               
                </>
              ])
      })

       }else{
        var data = {
          columns: ["ID","Full Name", "Email","Barangay", "Dialysis Status","Action"],
          rows: []
      }


      getDialysis?.forEach(getDialysis => {
              data.rows.push([
                getDialysis._id,
                [getDialysis.user_id?.last_name,", ",getDialysis.user_id?.first_name," ",getDialysis.user_id?.middle_name],
                getDialysis.user_id?.email,
                getDialysis.user_id?.address.barangay,
                !getDialysis.dialysis_status ? "Pending" : getDialysis.dialysis_status,

                getDialysis.dialysis_status == "accepted" || getDialysis.dialysis_status == "denied" 
                ?

                <>
                <Link to="" onClick={() => handleViewApplicant(getDialysis._id)} className="yellowBgButton">
                View
                </Link> 
               
                  <>
                  <Link to="" style={{pointerEvents: "none"}} onClick={() => handleAcceptApplicant(getDialysis._id)}  className="DisablegreenBgButton">
                  Accept
                  </Link> 
                  <Link to=""  style={{pointerEvents: "none"}} onClick={() => handleDeniedApplicant(getDialysis._id)} className="DisableredBgButton">
                  Denied
                  </Link> 
                  </> 
                </>

                :
                <>
                <Link to="" onClick={() => handleViewApplicant(getDialysis._id)} className="yellowBgButton">
                View
                </Link> 
               
                  <>
                  <Link to="" onClick={() => handleAcceptApplicant(getDialysis._id)}  className="greenBgButton">
                  Accept
                  </Link> 
                  <Link to=""  onClick={() => handleDeniedApplicant(getDialysis._id)} className="redBgButton">
                  Denied
                  </Link> 
                  </> 
                </>
                
              ])
      })
       }
        


        const handleViewApplicant = (_id) => {
         
          Swal.fire({
            title: 'Loading!',
            text: 'Please wait while processing the schedule.',
            imageUrl: 'https://media3.giphy.com/media/jtFds4dHM4bXUOnHAU/giphy.gif?cid=ecf05e475is9ul1rls0lk34lqv2myv5dwhbaptp7xbpkwh42&rid=giphy.gif&ct=s',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#EF3A47',
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false
          })

          axios({
              method: "get",
              url: `/api/dialysis/view/${_id}`,
              headers: {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
              },
            }).then(response => {
              handleShow()
              Swal.close()
              console.log(response.data)

              setViewApplicant(response.data.allDialysis);
              setViewApplicantDialysis(response.data.PatientallDialysis);
              
                            })
                  .catch(error => {
                                  console.log(error.response);
                                  // setError(error.response.data);
                                 
                              });

        }

  
        const handleAcceptApplicant = (_id) => {
         
          Swal.fire({
            title: 'Loading!',
            text: 'Please wait while processing the schedule.',
            imageUrl: 'https://media3.giphy.com/media/jtFds4dHM4bXUOnHAU/giphy.gif?cid=ecf05e475is9ul1rls0lk34lqv2myv5dwhbaptp7xbpkwh42&rid=giphy.gif&ct=s',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#EF3A47',
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false
          })

          axios({
              method: "get",
              url: `/api/dialysis/view/${_id}`,
              headers: {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
              },
            }).then(response => {
              handleacceptShow()
              Swal.close()
              console.log(response.data)

              setViewApplicant(response.data.allDialysis);
              setViewApplicantDialysis(response.data.PatientallDialysis);
              
                            })
                  .catch(error => {
                                  console.log(error.response);
                                  // setError(error.response.data);
                                 
                              });

        }


       // Get current year
const currentYear = moment().year();

// Create an array to store month names with year
const futureMonths = [];

// Loop through each month from current year to next year, skipping the current month
for (let i = 1; i <= 12; i++) {
  // Get month name with year
  const monthNameWithYear = moment().add(i, 'months').format('MMMM YYYY');

  // Check if month is within current year
  if (moment().add(i, 'months').year() === currentYear) {
    // Add month name with year to array
    futureMonths.push(monthNameWithYear);
  }
}







        const [getBatchDate, setBatchDate] = useState({month_name:""});

    

        const onChangeBatchDate = e => {
          setBatchDate({ month_name: e.target.value});
        };



        const acceptPatient = _id => {
          console.log(_id, getBatchDate.month_name);

          if(getBatchDate.month_name == ""){
              Swal.fire({
                title: 'Please select a batch!',
                text: 'You forgot to select a batch.',
                icon: 'error',
                confirmButtonColor: '#EF3A47',
              })
          }else{

          let formData = new FormData();

          formData.set("batch", getBatchDate.month_name);

          Swal.fire({
            title: 'Are you sure you want to accept this patient?',
            icon: 'warning',
            color: '#EF3A47',
            showCancelButton: true,
            confirmButtonColor: '#EF3A47',
            cancelButtonColor: '#f8bb86',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {

              Swal.fire({
                title: 'Loading!',
                text: 'Please wait while processing the schedule.',
                imageUrl: 'https://media3.giphy.com/media/jtFds4dHM4bXUOnHAU/giphy.gif?cid=ecf05e475is9ul1rls0lk34lqv2myv5dwhbaptp7xbpkwh42&rid=giphy.gif&ct=s',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom image',
                confirmButtonColor: '#EF3A47',
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false
              })
    
              axios({
                method: "put",
                url: `/api/dialysis/accept/${_id}`,
                headers: {
                  "Content-Type" : "application/json",
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': '*',
                },
                data: formData
              }).then(response => {

                                  Swal.fire({
                                    title: 'Success!',
                                    text: 'You have successfully accept attendee.',
                                    imageUrl: 'https://media1.giphy.com/media/rxjNZHtke62I6Gz9mA/giphy.gif?cid=ecf05e473ser3at0y751oy413e5fqszku4ib8436jtok4cwj&rid=giphy.gif&ct=s',
                                    imageWidth: 200,
                                    imageHeight: 200,
                                    imageAlt: 'Custom image',
                                    confirmButtonColor: '#EF3A47',
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        fetchDialysis();
                                        handleacceptClose();
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

        }


        const [idDenied, setidDenied] = useState("");
        const handleDeniedApplicant = (_id) => {
          setidDenied(_id)
          handledeniedShow()

        
        }


        const [getaddMessage, setaddMessage] = useState({message:""});
        const [error, setError] = useState({
          message: '',
        });


        const onChange = e => {
          setaddMessage({ ...getaddMessage, [e.target.name]: e.target.value })
                }


        const submitDenied = _id => {

          console.log(_id, getaddMessage.message);
          if(getaddMessage.message == ""){
            setError({message: 'Please input a message'})
              Swal.fire({
                title: 'Please input a message!',
                text: 'You forgot to input a message.',
                icon: 'error',
                confirmButtonColor: '#EF3A47',
              })
          }else{

            let formData = new FormData();

            formData.set("message", getaddMessage.message);


          Swal.fire({
            title: 'Are you sure you want to denied this patient?',
            icon: 'warning',
            color: '#EF3A47',
            showCancelButton: true,
            confirmButtonColor: '#EF3A47',
            cancelButtonColor: '#f8bb86',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {

              Swal.fire({
                title: 'Loading!',
                text: 'Please wait while processing the schedule.',
                imageUrl: 'https://media3.giphy.com/media/jtFds4dHM4bXUOnHAU/giphy.gif?cid=ecf05e475is9ul1rls0lk34lqv2myv5dwhbaptp7xbpkwh42&rid=giphy.gif&ct=s',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom image',
                confirmButtonColor: '#EF3A47',
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false
              })
    
              axios({
                method: "put",
                url: `/api/dialysis/denied/${_id}`,
                headers: {
                  "Content-Type" : "application/json",
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': '*',
                },
                data: formData
              }).then(response => {

                                  Swal.fire({
                                    title: 'Success!',
                                    text: 'You have successfully denied attendee.',
                                    imageUrl: 'https://media1.giphy.com/media/rxjNZHtke62I6Gz9mA/giphy.gif?cid=ecf05e473ser3at0y751oy413e5fqszku4ib8436jtok4cwj&rid=giphy.gif&ct=s',
                                    imageWidth: 200,
                                    imageHeight: 200,
                                    imageAlt: 'Custom image',
                                    confirmButtonColor: '#EF3A47',
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        fetchDialysis();
                                        handledeniedClose()
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

        }

        

      




 ///modal--------------------------

 const [show, setShow] = useState(false);
 const handleClose =() => {
         setShow(false);
         
     } 
 const handleShow = () => setShow(true);


 const [acceptshow, setacceptShow] = useState(false);
 const handleacceptClose =() => {
      setacceptShow(false);
      setBatchDate({ month_name: ""});
         
     } 
 const handleacceptShow = () => setacceptShow(true);


 const [deniedshow, setdeniedShow] = useState(false);
 const handledeniedClose =() => {
         setdeniedShow(false);
         
     } 
 const handledeniedShow = () => setdeniedShow(true);



  

  const [isLoadingss, setIsLoadingsss] = useState(true);

  if(isLoadingss){
    return <>
      <Navbar toggle={toggle} />
      <PersonnelSideBar isOpen={isOpen} toggle={toggle}/>
 

        <div style={contentStyle}>
           <div class="container-fluid">
        <br />
        <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-procedures"></i>&nbsp;Dialysis</h1>
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
        {
          getBatches ? 
          <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-procedures"></i>&nbsp;Dialysis</h1>
       :
       <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-procedures"></i>&nbsp;Today Attendees</h1>
      
        } 
        <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
        
          {
          getBatches ? 
          <div style={{display: "flex", flexDirection: "row"}}>
          <Button color="danger"  onClick={()  => setBatches(false)} style={{marginTop: "1vh", marginRight: "2vh"}}><i class="fas fa-window-close"></i>&nbsp; Close Dialysis Batches&nbsp;</Button>
          <Button outline color="danger" onClick={onAll} style={{marginTop: "1vh", marginRight: "2vh"}}>&nbsp;Reset&nbsp;</Button>
<FormControl style={{width: "17vh", marginRight: "2vh"}} fullWidth> 
                        <InputLabel color="secondary" shrink="true"  variant="standard" htmlFor="uncontrolled-native">
                        Select Year
                        </InputLabel>
                        <NativeSelect
                        onChange={onChangeBatchYears}
                          inputProps={{
                            name: 'status',
                            id: 'uncontrolled-native',
                          }}
                          color="secondary"
                          value={getBatchyears.years}
                        >
                            <option value="" selected disabled> <em>Select a Year</em></option>
                                    {yearsData.map((years, index) => (
                                        <option value={years}>{years}</option>
                                      ))}
                      </NativeSelect>
                    </FormControl>

              <FormControl style={{width: "17vh", marginRight: "2vh"}} fullWidth> 
                        <InputLabel color="secondary" shrink="true"  variant="standard" htmlFor="uncontrolled-native">
                        Select Batch
                        </InputLabel>
                        <NativeSelect
                        onChange={onChangeBatch}
                          inputProps={{
                            name: 'status',
                            id: 'uncontrolled-native',
                          }}
                          color="secondary"
                          value={getBatch.batch}
                        >
                            <option value="" selected disabled> <em>Select a Batch</em></option>
                                    {YearMonths.map((month, index) => (
                                        <option value={month}>{month}</option>
                                      ))}
                      </NativeSelect>
                    </FormControl>
      </div>
          :
          <Button color="danger"  onClick={()  => setBatches(true)} style={{marginTop: "1vh", marginRight: "2vh"}}><i className="fas fa-calendar-alt"></i>&nbsp;Dialysis Batches&nbsp;</Button>
          }
       
             
        <hr class="sep-2" />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 


        {
          getBatches &&
          <>



              <div class="container">
            <div class="row">
                    <div class="col-md-9">
                        <div class="wrapper wrapper-content animated fadeInUp">
                            <div class="ibox">
                               
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="m-b-md">
                                                <h2>Batch of {getBatch.batch} </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-5">
                                            <dl class="dl-horizontal">

                                                <dt>Start Date:</dt> <dd>First Week of {getBatch.batch}</dd>
                                                <dt>Total Patient:</dt> <dd>  {filteredgetDialysisPatient ? filteredgetDialysisPatient.length : 0}</dd>
                                                {/* <dt>Client:</dt> <dd><a href="#" class="text-navy"> Zender Company</a> </dd>
                                                <dt>Version:</dt> <dd>     v1.4.2 </dd> */}
                                            </dl>
                                        </div>
                                        <div class="col-lg-7" id="cluster_info">
                                            <dl class="dl-horizontal">

                                                <dt>End Date:</dt> <dd>Last Week of {getBatch.batch}</dd>
                                                {/* <dt>Created:</dt> <dd> 	10.07.2014 23:36:57 </dd> */}
                                                {/* <dt>Participants:</dt> */}
                                            </dl>
                                        </div>
                                    </div>
                          
                                
                            </div>
                        </div>
                    </div>
            
                </div>
            </div>
            </>
}

     

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







<Modal size='lg' show={show} onHide={handleClose} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}><i class="fas fa-user-tie"></i>&nbsp;&nbsp;Patient Information</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#f1f1f1'}}>
          
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
<div class="container bootstrap snippets bootdey">
<div class="row">


      <div class="panel">
    
          <div class="bio-graph-heading">
          <div class="user-heading round">
              <a href="#">
                  <img style={{ "width": "100px", "height": "100px", "border-radius": "50%"}} src={getViewApplicant?.user_id?.profile_picture?.url} alt="" />
              </a>
              <h1 style={{ "font-size": "20px"}}>{getViewApplicant?.user_id?.first_name} {getViewApplicant?.user_id?.last_name}</h1>
              <p>{getViewApplicant?.user_id?.email}</p>
          </div>
          </div>
          <div class="panel-body bio-graph-info">
              <h1 style={{marginTop:"30px !important", "text-decoration": "underline" }}>Personal Information</h1>
              <div class="row">
                  <div class="bio-row">
                      <p><span>First Name </span>: {getViewApplicant?.user_id?.first_name}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Last Name </span>: {getViewApplicant?.user_id?.last_name}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Barangay </span>: {getViewApplicant?.user_id?.address.barangay}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Birthday</span>: {moment(getViewApplicant?.user_id?.birth_date).format('MMM DD, YYYY')}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Age </span>: {getViewApplicant?.user_id?.age}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Gender </span>: {getViewApplicant?.user_id?.gender}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Dialysis Status </span>: <span style={{color: "#e5a634", fontWeight:"bold" }}>{!getViewApplicant?.dialysis_status ? "Pending" : getViewApplicant?.dialysis_status}</span> </p>
                  </div>
                  <div class="bio-row">
                      <p><span>Batch of </span>: <span style={{color: "#e5a634", fontWeight:"bold" }}>{!getViewApplicant?.batch ? "Pending" : getViewApplicant?.batch} </span></p>
                  </div>
              </div>
          </div>
      </div>
      <div>
      <div class="panel-body bio-graph-info">  
       
        
        <h1 style={{marginTop:"30px !important", }}>Total Batch of Dialysis Attended: {getViewApplicantDialysis?.length}</h1>
    
           
        <div class="container-fluid" style={{ marginBottom: "50px" }}>

        
        {
      getViewApplicantDialysis?.length == 0
       ? 
       <h3 style={{ fontWeight: "bold",marginBottom:"200px" }} >No Data</h3>
      :
      <div class="row g-3 mb-3">

      {getViewApplicantDialysis?.map((month, index) => (
                           <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4" id="thumb">
                           <div class="thumbBox">
                             <p style={{ fontWeight: "bold" }}>Batch of {month.batch}</p>
                             <p style={{ fontWeight: "bold",marginTop:"-20px" }}>Started #</p>
                             <p style={{ fontWeight: "bold",marginTop:"-30px" }}>First Week of {month.batch}</p>
                             <p style={{ fontWeight: "bold",marginTop:"-30px" }}>Ended #</p>
                             <p style={{ fontWeight: "bold",marginTop:"-30px" }}>Last Week of {month.batch}</p>
                           </div>
                         </div>
                       ))}
  
          </div>
    }




            </div>


                    
                  
            

                </div>
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


          <Modal size='lg' show={acceptshow} onHide={handleacceptClose} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}><i class="fas fa-user-tie"></i>&nbsp;&nbsp;Patient Information</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#f1f1f1'}}>
          
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
<div class="container bootstrap snippets bootdey">
<div class="row">


      <div class="panel">
    
          <div class="bio-graph-heading">
          <div class="user-heading round">
              <a href="#">
                  <img style={{ "width": "100px", "height": "100px", "border-radius": "50%"}} src={getViewApplicant?.user_id?.profile_picture?.url} alt="" />
              </a>
              <h1 style={{ "font-size": "20px"}}>{getViewApplicant?.user_id?.first_name} {getViewApplicant?.user_id?.last_name}</h1>
              <p>{getViewApplicant?.user_id?.email}</p>
          </div>
          </div>
          <div class="panel-body bio-graph-info">
              <h1 style={{marginTop:"30px !important", "text-decoration": "underline" }}>Personal Information</h1>
              <div class="row">
                  <div class="bio-row">
                      <p><span>First Name </span>: {getViewApplicant?.user_id?.first_name}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Last Name </span>: {getViewApplicant?.user_id?.last_name}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Barangay </span>: {getViewApplicant?.user_id?.address.barangay}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Birthday</span>: {moment(getViewApplicant?.user_id?.birth_date).format('MMM DD, YYYY')}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Age </span>: {getViewApplicant?.user_id?.age}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Gender </span>: {getViewApplicant?.user_id?.gender}</p>
                  </div>
                  <div class="bio-row">
                      <p><span>Dialysis Status </span>: <span style={{color: "#e5a634", fontWeight:"bold" }}>{!getViewApplicant?.dialysis_status ? "Pending" : getViewApplicant?.dialysis_status}</span> </p>
                  </div>
                  <div class="bio-row">
                      <p><span>Batch of </span>: 
                      
                      &nbsp;
                      <span style={{color: "#e5a634", fontWeight:"bold" }}>
                        
                      <FormControl style={{width: "17vh", marginRight: "2vh"}} fullWidth> 
                                      <NativeSelect
                                        onChange={onChangeBatchDate}
                                        inputProps={{
                                          name: 'category',
                                          id: 'uncontrolled-native',
                                        }}
                                        color="secondary"
                                        value={getBatchDate.month_name}
                                      >
                                          <option value="" selected disabled> <em>Select a Batch</em></option>
                                         {futureMonths.map((month, index) => (
                                              <option value={month}>{month}</option>
                                            ))}
                                    </NativeSelect>
                                  </FormControl>
                        
                        
                        </span>
                        {getBatchDate.month_name == "" &&  <p style={{marginTop:"-330px !important", color: "red", "font-size": "1rem"}}>Please select a Batch</p>
                       
                        }
                       
                      </p>
                     
                  </div>
              </div>
          </div>
      </div>
      <div>
      <div class="panel-body bio-graph-info">  
       
        
      <h1 style={{marginTop:"30px !important",}}>Total Batch of Dialysis Attended: {getViewApplicantDialysis?.length}</h1>
    
           
    <div class="container-fluid" style={{ marginBottom: "50px" }}>

    {
      getViewApplicantDialysis?.length == 0
       ? 
       <h3 style={{ fontWeight: "bold",marginBottom:"200px" }} >No Data</h3>
      :
      <div class="row g-3 mb-3">

      {getViewApplicantDialysis?.map((month, index) => (
                           <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4" id="thumb">
                           <div class="thumbBox">
                             <p style={{ fontWeight: "bold" }}>Batch of {month.batch}</p>
                             <p style={{ fontWeight: "bold",marginTop:"-20px" }}>Started #</p>
                             <p style={{ fontWeight: "bold",marginTop:"-30px" }}>First Week of {month.batch}</p>
                             <p style={{ fontWeight: "bold",marginTop:"-30px" }}>Ended #</p>
                             <p style={{ fontWeight: "bold",marginTop:"-30px" }}>Last Week of {month.batch}</p>
                           </div>
                         </div>
                       ))}
  
          </div>
    }




            </div>


                    
                  
            

                </div>
            </div>
         

            <div  className="panel-activity__status" align="center">
            <div className="actions">
                         <div className="btn-group">
                         <Button outline color="danger" onClick={() => acceptPatient(getViewApplicant?._id)} ><i class="fas fa-procedures"></i>&nbsp;Accept Patient</Button>
                         </div>
                     </div>
            </div>

      </div>
      
      </div>
      

            </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handleacceptClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
      

          <Modal size='md' show={deniedshow} onHide={handledeniedClose} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}><i class="fas fa-user-tie"></i>&nbsp;&nbsp;Denied Patient</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>
            <div  className="panel-activity__status">
                 <textarea name="message" 
                 onChange={onChange} 
                 id="commentfield" placeholder="Write your message here..." className="form-control"></textarea>
                 <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>
                  {error.message}
                  </InputLabel>
                    
                 <div className="actions">
                         <div className="btn-group">
                         <Button outline color="danger" 
                         onClick={() => submitDenied(idDenied)}
                         ><i class="fas fa-bullhorn"></i>&nbsp;Denied Patient</Button>
                         </div>
                     </div>
                 </div>
                        
            </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handledeniedClose}>
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

.thumbBox {
  padding: 15px 0 0;
  color: #fff;
  border-radius: 4px;
  margin-bottom: 30px;
  float: left;
  width: 100%;
  background: rgb(206, 48, 67);
}
.thumbBox h4,
.thumbBox h1,
.thumbBox p {
  padding: 10px 15px;
}
.thumbBox a {
  color: #fff;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  float: left;
  padding: 10px 15px;
}




  /* PROJECTS */
  .project-people,
  .project-actions {
    text-align: right;
    vertical-align: middle;
  }
  dd.project-people {
    text-align: left;
    margin-top: 5px;
  }
  .project-people img {
    width: 32px;
    height: 32px;
  }
  .project-title a {
    font-size: 14px;
    color: #676a6c;
    font-weight: 600;
  }
  .project-list table tr td {
    border-top: none;
    border-bottom: 1px solid #e7eaec;
    padding: 15px 10px;
    vertical-align: middle;
  }
  .project-manager .tag-list li a {
    font-size: 10px;
    background-color: white;
    padding: 5px 12px;
    color: inherit;
    border-radius: 2px;
    border: 1px solid #e7eaec;
    margin-right: 5px;
    margin-top: 5px;
    display: block;
  }
  .project-files li a {
    font-size: 11px;
    color: #676a6c;
    margin-left: 10px;
    line-height: 22px;
  }
  
  /* PROFILE */
  .profile-content {
    border-top: none !important;
  }
  .profile-stats {
    margin-right: 10px;
  }
  .profile-image {
    width: 120px;
    float: left;
  }
  .profile-image img {
    width: 96px;
    height: 96px;
  }
  .profile-info {
    margin-left: 120px;
  }
  .feed-activity-list .feed-element {
    border-bottom: 1px solid #e7eaec;
  }
  .feed-element:first-child {
    margin-top: 0;
  }
  .feed-element {
    padding-bottom: 15px;
  }
  .feed-element,
  .feed-element .media {
    margin-top: 15px;
  }
  .feed-element,
  .media-body {
    overflow: hidden;
  }
  .feed-element > .pull-left {
    margin-right: 10px;
  }
  .feed-element img.img-circle,
  .dropdown-messages-box img.img-circle {
    width: 38px;
    height: 38px;
  }
  .feed-element .well {
    border: 1px solid #e7eaec;
    box-shadow: none;
    margin-top: 10px;
    margin-bottom: 5px;
    padding: 10px 20px;
    font-size: 11px;
    line-height: 16px;
  }
  .feed-element .actions {
    margin-top: 10px;
  }
  .feed-element .photos {
    margin: 10px 0;
  }
  .feed-photo {
    max-height: 180px;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .file-list li {
    padding: 5px 10px;
    font-size: 11px;
    border-radius: 2px;
    border: 1px solid #e7eaec;
    margin-bottom: 5px;
  }
  .file-list li a {
    color: inherit;
  }
  .file-list li a:hover {
    color: #1ab394;
  }
  .user-friends img {
    width: 42px;
    height: 42px;
    margin-bottom: 5px;
    margin-right: 5px;
  }
  
  .ibox {
    clear: both;
    margin-bottom: 25px;
    margin-top: 0;
    padding: 0;
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
    border-color: #e7eaec;
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
  ul.notes li,
  ul.tag-list li {
    list-style: none;
  }
        .vl {
          border-left: 2px solid #EF3A47;
          height: 50px;
        }



      .bio-graph-heading {
          background: rgb(206, 48, 67);
          color: #fff;
          text-align: center;
          padding: 20px 110px;
          border-radius: 4px 4px 0 0;
          -webkit-border-radius: 4px 4px 0 0;
          font-size: 16px;
          font-weight: 300;
      }
      
      .bio-graph-info {
        color: black;
        margin: auto;
        background: white;
    }

      
    .bio-graph-info h1 {
      font-size: 22px !important;
      margin: 0 20px  21px !important;
  }
      
  .bio-row {
    width: 50% !important;
    float: left !important;
    margin-bottom: 10px !important;
    padding: 0 35px !important;
}
      
      .bio-row p span {
          width: 100px !important;
          display: inline-block !important;
      }
      
      .bio-chart, .bio-desk {
          float: left;
          background: rgb(206, 48, 67);
          color: white;
      }
      
      .bio-chart {
          width: 30%;
      }
      
      .bio-desk {
          width: 60%;
      }
      
      .bio-desk h4 {
          font-size: 15px;
          font-weight:400;
      }
      
      .bio-desk h4.terques {
          color: white;
      }
      
      .bio-desk h4.red {
          color: white;
      }
      
      .bio-desk h4.green {
          color: white;
      }
      
      .bio-desk h4.purple {
          color: #caa3da;
      }
      
      .file-pos {
          margin: 6px 0 10px 0;
      }
      
      .profile-activity h5 {
          font-weight: 300;
          margin-top: 0;
          color: #c3c3c3;
      }
      
      .summary-head {
          background: #ee7272;
          color: #fff;
          text-align: center;
          border-bottom: 1px solid #ee7272;
      }
      
      .summary-head h4 {
          font-weight: 300;
          text-transform: uppercase;
          margin-bottom: 5px;
      }
      
      .summary-head p {
          color: rgba(255,255,255,0.6);
      }
      
      ul.summary-list {
          display: inline-block;
          padding-left:0 ;
          width: 100%;
          margin-bottom: 0;
      }
      
      ul.summary-list > li {
          display: inline-block;
          width: 19.5%;
          text-align: center;
      }
      
      ul.summary-list > li > a > i {
          display:block;
          font-size: 18px;
          padding-bottom: 5px;
      }
      
      ul.summary-list > li > a {
          padding: 10px 0;
          display: inline-block;
          color: #818181;
      }
      
      ul.summary-list > li  {
          border-right: 1px solid #eaeaea;
      }
      
      ul.summary-list > li:last-child  {
          border-right: none;
      }
      
      .activity {
          width: 100%;
          float: left;
          margin-bottom: 10px;
      }
      
      .activity.alt {
          width: 100%;
          float: right;
          margin-bottom: 10px;
      }
      
      .activity span {
          float: left;
      }
      
      .activity.alt span {
          float: right;
      }
      .activity span, .activity.alt span {
          width: 45px;
          height: 45px;
          line-height: 45px;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          background: #eee;
          text-align: center;
          color: #fff;
          font-size: 16px;
      }
      
      .activity.terques span {
          background: #8dd7d6;
      }
      
      .activity.terques h4 {
          color: #8dd7d6;
      }
      .activity.purple span {
          background: #b984dc;
      }
      
      .activity.purple h4 {
          color: #b984dc;
      }
      .activity.blue span {
          background: #90b4e6;
      }
      
      .activity.blue h4 {
          color: #90b4e6;
      }
      .activity.green span {
          background: #aec785;
      }
      
      .activity.green h4 {
          color: #aec785;
      }
      
      .activity h4 {
          margin-top:0 ;
          font-size: 16px;
      }
      
      .activity p {
          margin-bottom: 0;
          font-size: 13px;
      }
      
      .activity .activity-desk i, .activity.alt .activity-desk i {
          float: left;
          font-size: 18px;
          margin-right: 10px;
          color: #bebebe;
      }
      
      .activity .activity-desk {
          margin-left: 70px;
          position: relative;
      }
      
      .activity.alt .activity-desk {
          margin-right: 70px;
          position: relative;
      }
      
      .activity.alt .activity-desk .panel {
          float: right;
          position: relative;
      }
      
      .activity-desk .panel {
          background: #F4F4F4 ;
          display: inline-block;
      }
      
      
      .activity .activity-desk .arrow {
          border-right: 8px solid #F4F4F4 !important;
      }
      .activity .activity-desk .arrow {
          border-bottom: 8px solid transparent;
          border-top: 8px solid transparent;
          display: block;
          height: 0;
          left: -7px;
          position: absolute;
          top: 13px;
          width: 0;
      }
      
      .activity-desk .arrow-alt {
          border-left: 8px solid #F4F4F4 !important;
      }
      
      .activity-desk .arrow-alt {
          border-bottom: 8px solid transparent;
          border-top: 8px solid transparent;
          display: block;
          height: 0;
          right: -7px;
          position: absolute;
          top: 13px;
          width: 0;
      }
      
      .activity-desk .album {
          display: inline-block;
          margin-top: 10px;
      }
      
      .activity-desk .album a{
          margin-right: 10px;
      }
      
      .activity-desk .album a:last-child{
          margin-right: 0px;
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

        .yellowBgButton {
          background-color: rgba(0, 0, 255, 0.2);
          color: #8146FF;
          padding: 10px;
          margin: 0.5em;
          text-decoration: none;
          border-radius: 2em;
          font-weight: bolder;
          justify-content: center;
          box-shadow: 0 5px 10px rgba(100, 100, 100, 0.6);
          
        }
        .yellowBgButton:hover {
          text-decoration: none;
          color: white;
          background-color: #8146FF;
          box-shadow: 0 5px 10px rgba(0, 0, 255, 0.6);
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
            margin-top: 20px;
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

export default Dialysis;