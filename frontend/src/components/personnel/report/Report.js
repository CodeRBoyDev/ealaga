import React from "react";
import { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';


import SideBar from "../../../layouts/personnelSideBarNav";
import { Card} from 'react-bootstrap';
import moment from 'moment';
import { createTheme, TableFooter, TableRow, TableCell } from '@material-ui/core';
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
} from "./ReportElements";
import Navbar from "../../../layouts/personnelHeaderBarNav";
import PersonnelSideBar  from "../../../layouts/personnelHeaderSide";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Circles } from 'react-loader-spinner'



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


const [getInformation, setInformation] = useState("barangay"); 
const [getBarangay, setgetBarangay] = useState(); 
const [getUsers, setgetUsers] = useState(); 
const [getDonations, setgetDonations] = useState(); 

const fetchData = () => {
    if (getInformation === "barangay") {
        axios({
            method: "get",
            url: `/api/report/barangay`,
            headers: {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
        }).then(response => {
            setgetBarangay(response.data.result);
            setIsLoadingsss(false);
        }).catch((err) => console.log(err));
    } else if (getInformation === "users") {
        axios({
            method: "get",
            url: `/api/report/user`,
            headers: {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
        }).then(response => {
            setgetUsers(response.data.result);
            setIsLoadingsss(false);
        }).catch((err) => console.log(err));
    } else {
        axios({
            method: "get",
            url: `/api/report/donation`,
            headers: {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
        }).then(response => {
            setgetDonations(response.data.result);
            setIsLoadingsss(false);
        }).catch((err) => console.log(err));
    }
};

useEffect(() => {
    fetchData();
}, [getInformation]); 


                var data = {
                  columns: getInformation === "barangay" ? ["Barangay","Active Users","Not Active Users", "Restricted Users", "Total Users"]
                             : getInformation === "users" ? ["User", "No. of Donations","No. of Book Services", "Status"]
                    : ["Category","No. of User Donor","Quantities", "Existing Users", "Non Existing Users",],
                  rows: []
                };

                getInformation === "barangay" ?  
                  getBarangay?.forEach(barangay => {
                          data.rows.push([
                            <p style={{fontWeight: "bold", fontSize:"1rem", }}>{barangay.barangay}</p> ,
                            <p style={{fontWeight: "bold", fontSize:"1rem", color: barangay.activeUsers == 0 ? "red" : "black"}}>{barangay.activeUsers}</p> ,
                            <p style={{fontWeight: "bold", fontSize:"1rem", color: barangay.inactiveUsers == 0 ? "red" : "black"}}>{barangay.inactiveUsers}</p>,
                            <p style={{fontWeight: "bold", fontSize:"1rem", color: barangay.restrictedUsers == 0 ? "red" : "black"}}>{barangay.restrictedUsers}</p>,
                            <p style={{fontWeight: "bold", fontSize:"1rem", color: barangay.totalUsers == 0 ? "red" : "black"}}>{barangay.totalUsers}</p>,
                          ])
                  })
                  :
                  getInformation === "users" ?

                  getUsers?.forEach(usersss => {
                    data.rows.push([
                      <p style={{fontWeight: "bold", fontSize:"1rem"}}>{usersss.name}</p> ,
                      <p style={{fontWeight: "bold", fontSize:"1rem", color: usersss.donationCount == 0 ? "red" : "black"}}>{usersss.donationCount}</p> ,
                      <p style={{fontWeight: "bold", fontSize:"1rem", color: usersss.scheduleCount == 0 ? "red" : "black"}}>{usersss.scheduleCount}</p>,
                      <p style={{fontWeight: "bold", fontSize:"1rem", color: usersss.status == "inactive" ? "black" : 
                      usersss.status == "active" ? "green" : "red" }}>{usersss.status}</p>,
                    ])
            })

                  : 

                  getDonations?.forEach(donationsss => {
                    data.rows.push([
                      <p style={{fontWeight: "bold", fontSize:"1rem", }}>{donationsss.category}</p> ,
                      <p style={{fontWeight: "bold", fontSize:"1rem", color: donationsss.total_users == 0 ? "red" : "black"}}>{donationsss.total_users}</p> ,
                      <p style={{fontWeight: "bold", fontSize:"1rem", color: donationsss.total_quantity == 0 ? "red" : "black"}}>{donationsss.total_quantity}</p> ,
                      <p style={{fontWeight: "bold", fontSize:"1rem", color: donationsss.existing_users == 0 ? "red" : "black"}}>{donationsss.existing_users}</p>,
                      <p style={{fontWeight: "bold", fontSize:"1rem", color: donationsss.non_existing_users == 0 ? "red" : "black"}}>{donationsss.non_existing_users}</p>,
                    ])
            })




            const [pdfSrc, setPdfSrc] = useState(null);

  const downloadBarangayPDF = () => {
    console.log("downloadBarangayPDF")

    PDFhandleShow()
    axios({
      method: "post",
      url: `/api/report/downloadBarangayPDF`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      data: JSON.stringify({ downloadPdf: getBarangay}),
      responseType: 'blob'
    }).then(response => {
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(file);
      setPdfSrc(fileUrl);

      // download(response.data, 'USER.pdf', 'application/pdf');

    }).catch(error => {

      // console.log(error.response.data)
      //     setError(error.response.data);
    });
  
  };

  const downloadUserPDF= () => {
    console.log("downloadUserPDF")

       PDFhandleShow()
       axios({
      method: "post",
      url: `/api/report/downloadUserPDF`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      data: JSON.stringify({ downloadPdf: getUsers}),
      responseType: 'blob'
    }).then(response => {
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(file);
      setPdfSrc(fileUrl);

      // download(response.data, 'USER.pdf', 'application/pdf');

    }).catch(error => {

      // console.log(error.response.data)
      //     setError(error.response.data);
    });
  
  };

  const downloadDonationPDF = () => {
    console.log("downloadDonationPDF")

    PDFhandleShow()
    axios({
      method: "post",
      url: `/api/report/downloadDonationPDF`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      data: JSON.stringify({ downloadPdf: getDonations}),
      responseType: 'blob'
    }).then(response => {
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(file);
      setPdfSrc(fileUrl);

      // download(response.data, 'USER.pdf', 'application/pdf');

    }).catch(error => {

      // console.log(error.response.data)
      //     setError(error.response.data);
    });
  
  };
  
  
  const [getLoading, setLoadings] = useState({
    loading: true
  });

  const hideSpinner = () => {
    setLoadings({
      loading: false
    });
  };



  const [PDFshow, setPDFShow] = useState(false);
  const PDFhandleClose = () => {
    setPDFShow(false);
    setPdfSrc("")
    setLoadings({
      loading: true
    });
  }
  const PDFhandleShow = () => setPDFShow(true);



  const [isLoadingss, setIsLoadingsss] = useState(true);

  
  if(isLoadingss){
    return <>
  <Navbar toggle={toggle} />
      <PersonnelSideBar isOpen={isOpen} toggle={toggle}/>
 

        <div style={contentStyle}>
           <div class="container-fluid">
        <br />
        <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-file"></i>&nbsp;Report</h1>
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
        <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-file"></i>&nbsp;Report</h1>
        <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
        <hr class="sep-2" />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 

       
        <Button style={{ marginBottom: "10px"}} 
        onClick={() => setInformation("barangay")} 
        outline
        active={getInformation === "barangay" ? true : false}

          color="danger"><i className="fas fa-map-marked-alt"></i>&nbsp;&nbsp;Barangay Information</Button> &nbsp;&nbsp;
        <Button style={{ marginBottom: "10px"}} 
                onClick={() => setInformation("users")} 
                active={getInformation === "users" ? true : false}
                outline
                  color="danger"><i className="fas fa-users"></i>&nbsp;&nbsp;Users Information</Button> &nbsp;&nbsp;
        <Button style={{ marginBottom: "10px"}} 
                onClick={() => setInformation("donations")} 
                active={getInformation === "donations" ? true : false}
                outline
                  color="danger"><i className="fas fa-box-open"></i>&nbsp;&nbsp;Donations Information</Button> &nbsp;&nbsp;


        <ThemeProvider theme={theme}> 
        <MUIDataTable
  title={
    <div style={{ display: "flex", flexDirection: "row" }}>

      {
         getInformation === "barangay" ?   <Button color="danger" 
         onClick={downloadBarangayPDF}
         style={{ marginTop: "1vh", marginRight: "2vh" }}>
         &nbsp;<i class="fas fa-file-pdf"></i> Download &nbsp;
       </Button>
       : getInformation === "users" ?  <Button color="danger" 
       onClick={downloadUserPDF}
          style={{ marginTop: "1vh", marginRight: "2vh" }}>
          &nbsp;<i class="fas fa-file-pdf"></i> Download &nbsp;
        </Button>
        :
        <Button color="danger" 
        onClick={downloadDonationPDF}
        style={{ marginTop: "1vh", marginRight: "2vh" }}>
        &nbsp;<i class="fas fa-file-pdf"></i> Download &nbsp;
      </Button>
      }
    
      
    </div>
  }
  data={data?.rows} // added a check for `data`
  columns={data?.columns} // added a check for `data`
  options={{
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: "none",
    print: false,
    download: false,
    filter: false,
    search: false,
    viewColumns: false,
  }}
/>


        </ThemeProvider>
</div>


<Modal size='lg' show={PDFshow} onHide={PDFhandleClose} animation={true}>
          <Modal.Header style={{ background: '#CE3043' }}>
          

            {
         getInformation === "barangay" ?   
         <Modal.Title style={{ color: '#ffff' }}><i class="fas fa-user-tie"></i>
         &nbsp;&nbsp;Barangay Information
            </Modal.Title>
       : getInformation === "users" ?
       <Modal.Title style={{ color: '#ffff' }}><i class="fas fa-user-tie"></i>
       &nbsp;&nbsp;Users Information
       </Modal.Title>
        :
        <Modal.Title style={{ color: '#ffff' }}><i class="fas fa-user-tie"></i>
        &nbsp;&nbsp;Donations Information
        </Modal.Title>
      }
          
          </Modal.Header>
          <Modal.Body style={{ background: '#ffff' }}>
            <div className="panel-activity__status" align="center">

              {getLoading.loading ? (
                <div style={{
                  display: "flex", justifyContent: "center",
                  alignItems: "center"
                }}><Circles color="#EF3A47" alignSelf='center' /></div>
              ) : null}



              <iframe src={pdfSrc} onLoad={hideSpinner} width="700" height="600"></iframe>





              {/* <div className="actions">
                <div className="btn-group">
                  <Button outline color="danger" ><i class="fas fa-download"></i>&nbsp;Download Document</Button>
                </div>
              </div> */}
            </div>


          </Modal.Body>
          <Modal.Footer style={{ background: 'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))' }}>
            <Button style={{ background: '#EF3A47', color: 'white' }} variant="light" onClick={PDFhandleClose}>
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