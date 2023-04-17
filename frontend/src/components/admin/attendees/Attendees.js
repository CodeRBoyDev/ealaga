import React from "react";
import { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';
import SideBar from "../../../layouts/adminSideBarNav";
import Img from "../../../images/profile.jpg";
import Swal from 'sweetalert2'
import {TextField,createTheme,
  InputLabel,
  Select,
  MenuItem, FormControl, NativeSelect,FormLabel,FormControlLabel ,RadioGroup ,Radio

} from "@material-ui/core";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ThemeProvider } from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import { QrReader } from 'react-qr-reader';
import SuccessAnimation from 'actually-accessible-react-success-animation';
import {
  HeroImageContainer,
  AppWrapper,
  App,
  TextWrapper,
  AppTitle,
  AppPara
} from "./QRElements";
import { Link } from 'react-router-dom';
import { Carousel, Card, Modal, Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { Circles } from  'react-loader-spinner'
import Navbar from "../../../layouts/adminHeaderBarNav";
import AdminSideBar from "../../../layouts/adminHeaderSide";
import { Scrollbars } from 'react-custom-scrollbars-2';

function Attendees() {
 

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


  // filterrrrrrrr ================================================================================
  const [AllAttendees, setAllAttendees] = useState([]); 

  const [statuss, setStatus] = useState({status:""});
  const [getBarangay, setBarangay] = useState({barangay:""});
  const [getCategory, setCategory] = useState({category:""});
  const [getAll, setAll] = useState({all:""});
 
  
  const onChangeStatus = e => {
    setStatus({ status: e.target.value});
  };
  
  const onChangeBarangay = e => {
    setBarangay({ barangay: e.target.value});
  };

  const onChangeServices = e => {
    setCategory({ category: e.target.value});
  };
  

  const onAll = () => {
    setStatus({ status: ""});
    setBarangay({
      barangay: ""
    });
    setAll({
      all: ""
    });
    setCategory({ category: ""});
    setStartDate(moment().startOf('day'));
    setEndDate(null);
    setStartDateSelected(false);
  };


  const [startDateSelected, setStartDateSelected] = useState(false);

  const [startDate, setStartDate] = useState(moment().startOf('day'));
  const [endDate, setEndDate] = useState(null);
  
  const handleStartDateChange = date => {
    setStartDate(date);
    setStartDateSelected(true);

  };
  
  const handleEndDateChange = date => {
    setEndDate(date);
  };

  console.log({"start": startDate, "enddatee":endDate})
  const { status} = statuss;
  const { barangay} = getBarangay;
  const { category} = getCategory;
  
  console.log(category);

var pat = status == "" ? "" : '^'+status+'$';
var pat2 = category == "" ? "" : new RegExp('\\b('+category+')\\b');





const filteredAllAttendees = AllAttendees.filter(attendees => {
  const attendeeDate = moment(attendees?.date_schedule);
  if (startDate && !endDate) {
    return attendeeDate.isSame(moment(startDate).startOf('day'), 'day') && attendees.category.match(category) && attendees.status.toLowerCase().match(pat) 
    && attendees.user_id?.address?.barangay.match(barangay);
  } else if (startDate && endDate) {
    return attendeeDate.isBetween(moment(startDate).startOf('day'), moment(endDate).endOf('day'), 'day', '[]') && attendees.category.match(category) && attendees.status.toLowerCase().match(pat) 
    && attendees.user_id?.address?.barangay.match(barangay);
  }
  return true;
});
  console.log(filteredAllAttendees);
// console.log(filteredAllAttendees);


// function getDatesBetween(startDate, endDate) {
//   const allDates = [];
//   let currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     allDates.push(new Date(currentDate));
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return allDates;
// }


// const dates = getDatesBetween(start, end);
// console.log(dates); 




//================================================================================================================
        

            const [hasCamera, setHasCamera] = useState(true);

            const checkForCamera = async () => {
              if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setHasCamera(false);
                return;
              }

              try {
                await navigator.mediaDevices.getUserMedia({ video: true });
                setHasCamera(true);
              } catch (err) {
                setHasCamera(false);
              }
            };


          const fetchAttendees= () => {
            axios({
            method: "get",
            url: `/api/attendees`,
            headers: {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            }).then(response => {
              setAllAttendees(response.data.allAttendees);
          }).catch((err) => console.log(err));
          };
          // console.log(AllHealthProblem)
          useEffect(() => {
            fetchAttendees();
            checkForCamera();
          },[]);

          var data = {
            columns: ["ID",  {
              name: "Full Name",
              options: {
                filter: true,
                sort: true,
               }
             },"Category","Barangay","Gender","Email", "Status","Action"],
            rows: []
        }

        filteredAllAttendees?.forEach(user => {
          data.rows.push([
              user._id, 
              [user.user_id?.last_name,", ",user.user_id?.first_name,", ",user.user_id?.middle_name]
              ,user.category 
              , user.user_id?.address?.barangay ? user.user_id?.address?.barangay : "none",
              user.user_id?.gender ? user.user_id?.gender : "none",
              user.user_id?.email, 
              user.status == "not attended" ? <div className="redBg">
                  <span>to attend</span>
                </div> : <div className="greenBg">
                  <span>attended</span>
                </div>,
                 user.status == "not attended" ? <>
                <Link to="" onClick={() => acceptAttendees(user._id)} className="greenBgButton">
                <i className="fas fa-check"></i>
                </Link> 
               </> : <>
                <Link to="" onClick={() => acceptAttendees(user._id)} style={{pointerEvents: "none"}} className="DisablegreenBgButton">
                <i className="fas fa-check"></i>
                </Link> 
               </>
               

          ])
  })
    

        // verification =========================
        const acceptAttendees = _id => {
          console.log(_id);


          Swal.fire({
            title: 'Are you sure you want to accept this attendee?',
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
                url: `/api/user/attendees/${_id}`,
                headers: {
                  "Content-Type" : "application/json",
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': '*',
                },
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
                                        fetchAttendees();
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

        ////// =================== QR
        const [getOption, setOption] = useState('table');

        const [getUserssss, setgetUser] = useState(""); 


        const [datas, setData] = useState('');

        const QRread = _id => { 
          
          console.log(_id);
          Swal.fire({
              title: 'Scanning!',
              text: 'Please wait while scanning the qr code.',
              imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1674829678/qr_qwuwr6.gif',
              imageWidth: 200,
              imageHeight: 200,
              imageAlt: 'Custom image',
              confirmButtonColor: '#EF3A47',
              showCancelButton: false,
              showConfirmButton: false,
              allowOutsideClick: false
          });
          setTimeout(() => {
              axios({
                  method: "get",
                  url: `/api/user/attendees/read/${_id}`,
                  headers: {
                    "Content-Type" : "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                  },
              }).then(response => {
                  Swal.close();

                  setgetUser(response.data.readUser);

              }).catch(error => {
                Swal.close();
                Swal.fire({
                  title: 'error!',
                  text: 'This elderly is already attended.',
                  imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1674831517/attended_ohfsnl.gif',
                  imageWidth: 300,
                  imageHeight: 300,
                  imageAlt: 'Custom image',
                  icon: 'error',
                  confirmButtonColor: '#EF3A47',
              });

                  console.log(error.response);
              });
          }, 3000);

        }
        

        const QRapprove = _id => {
          console.log(_id);
          Swal.fire({
              title: 'Scanning!',
              text: 'Please wait while scanning the qr code.',
              imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1674829678/qr_qwuwr6.gif',
              imageWidth: 200,
              imageHeight: 200,
              imageAlt: 'Custom image',
              confirmButtonColor: '#EF3A47',
              showCancelButton: false,
              showConfirmButton: false,
              allowOutsideClick: false
          });
          setTimeout(() => {
              axios({
                  method: "put",
                  url: `/api/user/qr/attendees/${_id}`,
                  headers: {
                    "Content-Type" : "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                  },
              }).then(response => {
                  Swal.close();
                  Swal.fire({
                      title: 'Success!',
                      text: 'You have successfully accept attendee.',
                      icon: 'success',
                      confirmButtonColor: '#EF3A47',
                  }).then((result) => {
                      if (result.isConfirmed) {
                          fetchAttendees();
                      }
                  });
              }).catch(error => {
                Swal.close();
                Swal.fire({
                  title: 'error!',
                  text: 'This elderly is already attended.',
                  imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1674831517/attended_ohfsnl.gif',
                  imageWidth: 300,
                  imageHeight: 300,
                  imageAlt: 'Custom image',
                  icon: 'error',
                  confirmButtonColor: '#EF3A47',
              });

                  console.log(error.response);
              });
          }, 3000);
      }

        const [getLoading, setLoading] = useState({
          loading: true
        }); 

        const hideSpinner = () => {
          setLoading({
            loading: false
          });
        };

        moment.locale('en');


        //downloadpdf -----------------------------
        const [pdfSrc, setPdfSrc] = useState(null);

        const downloadPDF = () => {
          PDFhandleShow()
          axios({
            method: "post",
            url: `/api/attendees/downloadPDF`,
            headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            },
            data: JSON.stringify({ downloadPdf: filteredAllAttendees,
            start_date: startDate, end_date: endDate}),
            responseType: 'blob'
          }).then(response => {
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileUrl = URL.createObjectURL(file);
            setPdfSrc(fileUrl);
      
      
          }).catch(error => {
      
            // console.log(error.response.data)
            //     setError(error.response.data);
          });
      
      
      
        };

        const [PDFshow, setPDFShow] = useState(false);
        const PDFhandleClose = () => {
          setPDFShow(false);
          setLoading({
            loading: true
          });
        }
        const PDFhandleShow = () => setPDFShow(true);
      
      
      
        useEffect(() => {
          return () => {
            URL.revokeObjectURL(pdfSrc);
          };
        }, [pdfSrc]);

      
        
        const [scannerActive, setScannerActive] = useState(true);

        function handleResult(result, error) {
          hideSpinner();
          if (!!result) {
            setData(result?.text);
            QRread(result?.text);
            setScannerActive(false);
            setTimeout(() => {
              setScannerActive(true);
            }, 3000);
          }
          if (!!error) {
            // console.info(error);
          }
        }

    return (
      <>
      <Navbar toggle={toggle} />
      <AdminSideBar  isOpen={isOpen} toggle={toggle}/>
          
        <div style={contentStyle}>
           <div class="container-fluid">
        <br />
        <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-calendar-alt"></i>&nbsp;Today Attendees</h1>
        <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
        <TextField color="secondary" style={{marginTop: "1vh", marginRight: "2vh"}} InputLabelProps={{ shrink: true, required: true }} type="date" placeholder="Start Date" onChange={e => handleStartDateChange(e.target.value)} label="Start Date" />
        <TextField color="secondary" style={{marginTop: "1vh", marginRight: "2vh"}} disabled={!startDateSelected} InputLabelProps={{ shrink: true, required: true }} type="date" placeholder="End Date" onChange={e => handleEndDateChange(e.target.value)}  label="End Date" />
        <hr />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 
       
        {getOption === "table" ? 
         <Button style={{ marginBottom: "10px"}} onClick={()  => setOption("qrcode")}
         color="danger"><i className="fas fa-qrcode"></i>&nbsp;&nbsp;QRcode Scanner</Button>
                       :  
           <Button style={{ marginBottom: "10px"}} onClick={()  => setOption("table")}
          color="danger"><i className="fas fa-table"></i>&nbsp;&nbsp;Table</Button>

    }      

        
        {getOption === "table" ? <>

        <ThemeProvider theme={theme}>
        <MUIDataTable
        title={
        
          <div style={{display: "flex", flexDirection: "row"}}>
            <Button color="danger" onClick={downloadPDF} style={{ marginTop: "1vh", marginRight: "2vh" }}>&nbsp;<i class="fas fa-file-pdf"></i> Download &nbsp;</Button>
             <Button outline color="danger" onClick={onAll} style={{marginTop: "1vh", marginRight: "2vh"}}>&nbsp;Reset&nbsp;</Button>
            
           <FormControl style={{width: "17vh", marginRight: "2vh"}} fullWidth> 
                                      <InputLabel color="secondary" shrink="true"  variant="standard" htmlFor="uncontrolled-native">
                                       Select Status
                                      </InputLabel>
                                      <NativeSelect
                                        onChange={onChangeStatus}
                                        inputProps={{
                                          name: 'status',
                                          id: 'uncontrolled-native',
                                        }}
                                        color="secondary"
                                        value={status}
                                      >
                                         <option value="" selected disabled> <em>Select Status</em></option>
                                      <option value="attended">Attended</option>
                                      <option value="not attended">To Attend</option>
                                    </NativeSelect>
                                  </FormControl>
                 

                        <FormControl style={{width: "17vh", marginRight: "2vh"}} fullWidth> 
                                      <InputLabel color="secondary" shrink="true"  variant="standard" htmlFor="uncontrolled-native">
                                      Select Category
                                      </InputLabel>
                                      <NativeSelect
                                        onChange={onChangeServices}
                                        inputProps={{
                                          name: 'category',
                                          id: 'uncontrolled-native',
                                        }}
                                        color="secondary"
                                        value={category}
                                      >
                                         <option value="" selected disabled> <em>Select Category</em></option>
                                      <option value="Recreational Activity">Recreational Activity</option>
                                      <option value="Dialysis">Dialysis</option>
                                      <option value="Multipurpose Hall">Multipurpose Hall</option>
                                    </NativeSelect>
                                  </FormControl>

                    
                        <FormControl style={{width: "17vh", marginRight: "2vh"}} fullWidth>
                                      <InputLabel color="secondary" shrink="true"  variant="standard" htmlFor="uncontrolled-native">
                                       Select Barangay
                                      </InputLabel>
                                      <NativeSelect
                                        onChange={onChangeBarangay}
                                        inputProps={{
                                          name: 'barangay',
                                          id: 'uncontrolled-native',
                                        }}
                                        color="secondary"
                                        value={barangay}
                                      >
                                          <option value="" selected disabled> <em>Select Barangay</em></option>
                                      <option value="Bagumbayan">Bagumbayan</option>
                                      <option value="Bambang">Bambang</option>
                                      <option value="Calzada">Calzada</option>
                                      <option value="Central Bicutan">Central Bicutan</option>
                                      <option value="Central Signal Village">Central Signal Village (Signal Village)</option>
                                      <option value="Fort Bonifacio">Fort Bonifacio</option>
                                      <option value="Hagonoy">Hagonoy</option>
                                      <option value="Ibayo-tipas">Ibayo-tipas</option>
                                      <option value="Lower Bicutan">Lower Bicutan</option>
                                      <option value="Maharlika Village">Maharlika Village</option>
                                      <option value="Napindan">Napindan</option>
                                      <option value="New Lower Bicutan">New Lower Bicutan</option>
                                      <option value="North Daang Hari">North Daang Hari</option>
                                      <option value="North Signal Village">North Signal Village</option>
                                      <option value="Palingon">Palingon</option>
                                      <option value="Pinagsama">Pinagsama</option>
                                      <option value="San Miguel">San Miguel</option>
                                      <option value="Santa Ana">Santa Ana</option>
                                      <option value="South Daang Har">South Daang Hari</option>
                                      <option value="South Signal Villag">South Signal Village</option>
                                      <option value="Tanyag">Tanyag</option>
                                      <option value="Tuktukan">Tuktukan</option>
                                      <option value="Upper Bicutan">Upper Bicutan</option>
                                      <option value="Ususan">Ususan</option>
                                      <option value="Wawa">Wawa</option>
                                      <option value="Western Bicutan">Western Bicutan</option>
                                    </NativeSelect>
                                  </FormControl>
                        
            </div>
       }
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
     
        </> : 
        <> 



<div class="container-xl px-4 mt-4">

  
    <div class="row">
        <div class="col-xl-4">

           
            <div class="card mb-4 mb-xl-0">
                <div class="card-header">QR-Code Scanner</div>
                <div class="card-body text-center">
                 
                {
            !hasCamera ? 
            <>
             <h3 style={{ display: "flex",justifyContent: "center",
               alignItems: "center"}}>No Camera Detected</h3>
              {getLoading.loading ? (
               <div style={{ display: "flex",justifyContent: "center",
               alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center'/></div>
        ) : null}
            
            </> 
            :
            <div>
      {
      scannerActive ? <QrReader onResult={handleResult} className="qrCode" />
      :
      <img class="img-account-profile2 mb-2" src="https://res.cloudinary.com/du7wzlg44/image/upload/v1674829678/qr_qwuwr6.gif" alt="" />
     
      
      }
    
    </div>
          }

                </div>
            </div>
        </div>
        <div class="col-xl-8">
     
            <div class="card mb-4">
                <div class="card-header">Account Details</div>
                <div class="card-body">

          
              
                <div class="card-body text-center">

                  { getUserssss?.user_id?.profile_picture?.url ? 
                   <img style={{boxShadow: "2px 5px 5px rgba(0, 0, 0, 0.7)"}} class="img-account-profile rounded-circle mb-2" src={getUserssss?.user_id?.profile_picture?.url} alt="" />
                  : 
                  <img style={{boxShadow: "2px 5px 5px rgba(0, 0, 0, 0.7)"}} class="img-account-profile rounded-circle mb-2" src={Img} alt="" />
                  
                  }
                 
                   
                
                  
                </div>

                {
                  getUserssss ? 

                  <form>
                    
                  <div class="mb-3">

                  <div class="row gx-3 mb-3">

                  {
                        getUserssss?.status == "attended" ? 
                        <div class="col-md-6">
                        <label class="small mb-1" for="inputFirstName">Status</label>
                        <input style={{color: "green"}} class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={"Attended"} />
                    </div>
                       
                        : 
                        <div class="col-md-6">
                        <label class="small mb-1" for="inputFirstName">Status</label>
                        <input  class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={"To attend"} />
                    </div>
                      }
                       <div class="col-md-6">
                           <label class="small mb-1" for="inputLastName">Service Type</label>
                           <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value={getUserssss?.category} />
                       </div>
                   </div>

                       
                   </div>
                      <div class="row gx-3 mb-3">
                       
                          <div class="col-md-6">
                              <label class="small mb-1" for="inputFirstName">First name</label>
                              <input style={{color: "black"}} class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={getUserssss?.user_id?.first_name} />
                          </div>
                        
                          <div class="col-md-6">
                              <label class="small mb-1" for="inputLastName">Last name</label>
                              <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value={getUserssss?.user_id?.last_name} />
                          </div>
                      </div>
                    
                      <div class="row gx-3 mb-3">
                         
                          <div class="col-md-6">
                              <label class="small mb-1" for="inputOrgName">Barangay</label>
                              <input class="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" value={getUserssss?.user_id?.address?.barangay} />
                          </div>
                   
                          <div class="col-md-6">
                              <label class="small mb-1" for="inputLocation">Gender</label>
                              <input class="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="San Francisco, CA" />
                          </div>
                      </div>
                   
                      <div class="row gx-3 mb-3">
                      
                          <div class="col-md-6">
                              <label class="small mb-1" for="inputPhone">Email address</label>
                              <input class="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567" />
                          </div>
                      
                          <div class="col-md-6">
                              <label class="small mb-1" for="inputBirthday">Phone Number</label>
                              <input class="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value="06/10/1988" />
                          </div>
                      </div>
                      {
                        getUserssss?.status == "attended" ? 
                        <button disabled class="btn btn-secondary" type="button">Accept</button>
                        : 
                        <button onClick={() => acceptAttendees(getUserssss?._id)} class="btn btn-danger" type="button">Accept</button>
                      }
                   
                      
                  </form>
                  
                  :

                  <form>
                    
                    <div class="mb-3 text-center">
                         
                         <div class="text-center">
                             <label class="small mb-1 text-center" for="inputFirstName">Status</label>
                             <input class="form-control text-center" id="inputFirstName" type="text" placeholder="Enter your first name" value={"---"} />
                         </div>
                     </div>

                    </form>
                }
        
                  
                </div>
            </div>
        </div>
    </div>
</div>
        

        {/* <HeroImageContainer>
  
        <TextWrapper>
          <AppTitle>
            <h1>SCAN QR CODE</h1>
            <h1><i className="fas fa-arrow-down"></i><i className="fas fa-arrow-down"></i><i className="fas fa-arrow-down"></i></h1>
          </AppTitle>
        
        <div style={{ height: '300px', width: '400px', border: '2px solid black'}}>
          {
            !hasCamera ? 
            <>
             <h3 style={{ display: "flex",justifyContent: "center",
               alignItems: "center"}}>No Camera Detected</h3>
              {getLoading.loading ? (
               <div style={{ display: "flex",justifyContent: "center",
               alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center'/></div>
        ) : null}
            
            </> 
            :
            <QrReader
            onResult={(result, error) => {
              hideSpinner()
              if (!!result) {
                setData(result?.text);
                QRapprove(result?.text)
                
              }
        
              if (!!error) {
                // console.info(error);
              }
            }}
            className="qrCode"
            
          />
          }
         
        </div>
        </TextWrapper>
      
      </HeroImageContainer> */}
        </> 
        
        }



<Modal size='lg' show={PDFshow} onHide={PDFhandleClose} animation={true}>
          <Modal.Header style={{ background: '#CE3043' }}>
            <Modal.Title style={{ color: '#ffff' }}><i class="fas fa-user-tie"></i>&nbsp;&nbsp;Attendees List</Modal.Title>
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


  </div>
      

        <style>
        {`

.img-account-profile {
  height: 10rem;
}

.img-account-profile2 {
  height: 20rem;
}

.rounded-circle {
  border-radius: 50% !important;
}
.card {
  box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}
.card .card-header {
  font-weight: 500;
}
.card-header:first-child {
  border-radius: 0.35rem 0.35rem 0 0;
}
.card-header {
  padding: 1rem 1.35rem;
  margin-bottom: 0;
  background-color: rgba(33, 40, 50, 0.03);
  border-bottom: 1px solid rgba(33, 40, 50, 0.125);
}
.form-control, .dataTable-input {
  display: block;
  width: 100%;
  padding: 0.875rem 1.125rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1;
  color: #69707a;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #c5ccd6;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.35rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.nav-borders .nav-link.active {
  color: #0061f2;
  border-bottom-color: #0061f2;
}
.nav-borders .nav-link {
  color: #69707a;
  border-bottom-width: 0.125rem;
  border-bottom-style: solid;
  border-bottom-color: transparent;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0;
  padding-right: 0;
  margin-left: 1rem;
  margin-right: 1rem;
}

        .qrCode{
          margin-top: -100px;
          
        }

        @media{
          .qrCode{
            margin-top: -50px;
          
          }
      }
      

        
        .colStyle{
          margin-right: -115px;
        }

        @media screen and (max-width : 1500px) {
          .colStyle{
            margin-right: 0px;
          
          }
      }
      
      @media screen and (min-width : 768px) and (max-width : 1024px) {
        .colStyle{
          margin-right: 0px;
        
        }
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
            display: flex;
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

          .DisablegreenBgButton {
            background-color: rgba(0, 255, 0, 0.2);
            opacity: 0.2;
            color: green;
            padding: 10px;
            margin: 0.5em;
            display: flex;
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
        
        `}
      </style>

        </div>
        </>
    );

}

export default Attendees;