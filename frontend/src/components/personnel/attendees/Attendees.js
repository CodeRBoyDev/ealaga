import React from "react";
import { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';

import RecreationalServicesList from './services.json';
import SideBar from "../../../layouts/personnelSideBarNav";
import Img from "../../../images/profile.jpg";
import Swal from 'sweetalert2'
import {TextField,createTheme,
  InputLabel,
  Select,
  MenuItem, FormControl, NativeSelect,FormLabel,FormControlLabel ,RadioGroup ,Radio, FormHelperText

} from "@material-ui/core";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ThemeProvider } from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import { QrReader } from 'react-qr-reader';
import UserListItem from "./UserListItem";
import SuccessAnimation from 'actually-accessible-react-success-animation';
import {
  HeroImageContainer,
  AppWrapper,
  App,
  TextWrapper,
  AppTitle,
  AppPara,
  BtnWrap2,
  ServicesH1,
  ServicesWrappers3,
  ServicesCard3,
  ServicesIcon,
  ServicesH2,
  ServicesCard5
} from "./QRElements";
import image2 from "../../../images/addsched.png";
import image3 from "../../../images/open.png";
import image1 from "../../../images/viewsched.png";
import image5 from "../../../images/close.png";
import { Link } from 'react-router-dom';
import { Carousel, Card, Modal, Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { Circles } from  'react-loader-spinner'
import Navbar from "../../../layouts/personnelHeaderBarNav";
import PersonnelSideBar  from "../../../layouts/personnelHeaderSide";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { getUser } from '../../login/helpers';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import Calendar from 'react-select-date';

import events from "./events";

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
  const [AllDateClose, setAllDateClose] = useState([]); 

  // console.log(AllDateClose)

  const [statuss, setStatus] = useState({status:""});
  const [timess, setTime] = useState({time:""});
  const [getBarangay, setBarangay] = useState({barangay:""});
  const [getCategory, setCategory] = useState({category:""});
  const [getAll, setAll] = useState({all:""});
 

  //calendar
  const [getCategoryFullCalendar, setCategoryFullCalendar] = useState({categoryFullCalendar:""});
  const [timessFullCalendar, setTimeFullCalendar] = useState({timeFullCalendar:""});

  const [getfilterFullCalendar, setfilterFullCalendar] = useState({category:"", time: ""});

  
  const onChangeStatus = e => {
    setStatus({ status: e.target.value});
  };

  const onChangeTime = e => {
    setTime({ time: e.target.value});
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
    setTime({ time: ""});
    setStartDate(moment().startOf('day'));
    setEndDate(null);
    setStartDateSelected(false);
  };


    //calendar
    const [getAddSchedule, setAddSchedule] = useState(false);



    const onChangeServicesFullCalendar = e => {
      setCategoryFullCalendar({ categoryFullCalendar: e.target.value});
    };

    const onChangeTimeFullCalendar = e => {
      setTimeFullCalendar({ timeFullCalendar: e.target.value});
    };

    const [startDateFullCalendar, setStartDateFullCalendar] = useState(null);
    

    const [searchResult, setSearchResult] = useState([]);
    const [getsearchUserName, setsearchUserName] = useState({ user_name: "" });
    const [getsearchUserId, setsearchUserId] = useState({ user_id: "" });
    
    const [loading, setLoadingsss] = useState(false);
    console.log(searchResult);

    const handleSearch = async (query) => {

      setsearchUserName({ ...getsearchUserName, "user_name": query });
      if (!query) {
        return;
      }
  
  
  
      try {
  
        setLoadingsss(true);
        const { data } = await axios.get(`/api/attendees/allUsers`,);
        // console.log(data, 'users search response from server');
  
        const filteredUsers = data?.filter(filterusers => {
          if (typeof filterusers.first_name === "string" && typeof filterusers.last_name === "string"
          ) {
            const fullName = filterusers.first_name + ' ' + filterusers.last_name;
      
            return fullName.toLowerCase().indexOf(query) !== -1;
          }
        });
  
  
        setLoadingsss(false);
        setSearchResult(filteredUsers);
  
      } catch (error) {
  
        console.error(error.message);
  
      }
    };

    const accessUser = async (userId, first_name, last_name) => {

      setSearchResult([]);
      setError({
        user_name: "",
      })
      
    
      setsearchUserId({ user_id: userId });
      setsearchUserName({ user_name: first_name + " " + last_name });
  
    };
    const newSelectedDate = new Date(startDateFullCalendar).toLocaleDateString('en-US',["date", {month: 'numeric', day: 'numeric',year: 'numeric' 
  }])

      const [service_error, setServiceError] = useState([]);
      const [recreational_services, setRecreationalServices] = useState([]);

      const [multipurpose_services, setMultipurpose_Services] = useState({
        purpose: '',
        attendees_number: '',
      });

      console.log(recreational_services);
      
      const handleChangess = (service) => {
      if (recreational_services.includes(service)) {
        setRecreationalServices(recreational_services.filter((s) => s !== service));
      } else if (recreational_services.length < 3) {
        setRecreationalServices([...recreational_services, service]);
      }
    };

    const [service_errorMP, setErrorMP] = useState([]);
    const [errorFullCalendar, setErrorFullCalendar] = useState('');

    const validateForm = () => {
      if (!multipurpose_services.purpose) {
        setErrorFullCalendar('Please enter a booking purpose');
        return false;
      }
      if (!multipurpose_services.attendees_number) {
        setErrorFullCalendar('Please select number of attendees');
        return false;
      }
      return true;
    };


    const onChange = e => {
      setMultipurpose_Services({ ...multipurpose_services, [e.target.name]: e.target.value })
            }


    const submitaddScheduleFullCalendar = () => {

      console.log(getsearchUserId)
  
      if(getsearchUserId.user_id == ""){
        setError({
          user_name: "Please select existing user",
        })
      }else if(recreational_services == "" && getfilterFullCalendar.category == "Recreational Activity"){
        setServiceError("no_service_selected")
      }else if (!validateForm() && getfilterFullCalendar.category == "Multipurpose Hall") {
        setErrorMP("no_service_selected")
        return;
      } 
      else{
        setServiceError("")
        setErrorMP("")
        setErrorFullCalendar('');

        const newSelectedDates= {
          date: newSelectedDate,
          user_id: getsearchUserId.user_id,
          category: 
          getfilterFullCalendar.category == "Recreational Activity" && getfilterFullCalendar.time == "am" ? "recreational_am" 
          : getfilterFullCalendar.category == "Recreational Activity" && getfilterFullCalendar.time == "pm" ? "recreational_pm" 
          : getfilterFullCalendar.category == "Dialysis" && getfilterFullCalendar.time == "am" ? "dialysis_am"
          : getfilterFullCalendar.category == "Dialysis" && getfilterFullCalendar.time == "pm" ? "dialysis_pm"
          : getfilterFullCalendar.category == "Multipurpose Hall" && getfilterFullCalendar.time == "am" ? "multipurpose_am"
          : getfilterFullCalendar.category == "Multipurpose Hall" && getfilterFullCalendar.time == "pm" ? "multipurpose_pm"
          : getfilterFullCalendar.category == "Multipurpose Hall" && getfilterFullCalendar.time == "whole_day" ? "multipurpose_wholeday"
          : ""
          , 
          status: "reserved",
          // purpose: multipurpose_services2.purpose,
          // attendees_number: multipurpose_services2.attendees_number
        }
        if(getfilterFullCalendar.category == "Recreational Activity"){
          newSelectedDates.recreational_services2 = recreational_services;
        }
        if(getfilterFullCalendar.category == "Multipurpose Hall"){
          newSelectedDates.purpose = multipurpose_services.purpose;
          newSelectedDates.attendees_number = multipurpose_services.attendees_number;
        }


        console.log(newSelectedDates);

        Swal.fire({
          title: 'Are you sure you want to add this schedule?',
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
                text: 'Please wait while processing booking.',
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
              method:"post",
              url:`/api/schedule/add`, 
              data: newSelectedDates,
              headers: {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
              }
          })
                .then(response => {
                             
                  handleClose();
                  
                  fetchAttendees();
                  setAddSchedule(false); 
                  setMultipurpose_Services({
                    purpose: '',
                    attendees_number: '',
                  });
                  setRecreationalServices([]);
                  setsearchUserId({ user_id: "" }); setError({user_name: "",}); 
                  setsearchUserName({user_name: "" });

                  setError({user_name: "",});
                  setServiceError("")
                  setErrorMP("")
                  setErrorFullCalendar('');

                  setSearchResult([]);
                  Swal.close();

                  Swal.fire({
                    title: 'Success!',
                    text: 'Sucessfully added.',
                    imageUrl: 'https://media0.giphy.com/media/dYmYhn4OXI1aOpVpFO/giphy.gif?cid=ecf05e479ym4epjp1orghtshgvg92nc27cty98jbg9rfzfdr&rid=giphy.gif&ct=s',
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                    confirmButtonColor: '#EF3A47',
                  })

                              
                            })
                  .catch(error => {
                                  console.log(error.response);
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!',
                                    footer: '<a href="">Why do I have this issue?</a>'
                                  })
                                  // setError(error.response.data);
                                 
                              });
  
          }
        })

      }
      
    };


    


    //========

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
  const { time} = timess;
  const { barangay} = getBarangay;
  const { category} = getCategory;

  //full calendar ===============

  const { categoryFullCalendar } = getCategoryFullCalendar;
  const { timeFullCalendar} = timessFullCalendar;
  const [selectedDate, setDuelSlots] = useState("");

  // console.log(selectedDate);

  function handleDateClick(info) {
      
    setStartDateFullCalendar(info.dateStr)
    handleShow()
  }

  
  const ViewSchedule = () => {
    setStartDate(moment(startDateFullCalendar))
    setCategory({ category: categoryFullCalendar});
    setTime({ time: timeFullCalendar});
    handleClose();
    setFullCalendar(false);
  }


  var patTimeFullCalendar = getfilterFullCalendar.time == "" ? "" : '^'+getfilterFullCalendar.time +'$';

  const [error, setError] = useState({
    user_name: '',
  });

  


  const onSubmitFullCalendar = () => {

    setfilterFullCalendar({category: categoryFullCalendar, time: timeFullCalendar})
    
  };


  const closeDate = () => {

    CloseDatehandleShow()

  };

  const [getDescription, setDescription] = useState({other_reason:"", description: ""});
  const [getReason, setReason] = useState({reason:""});
  const [errors, setErrors] = useState({});


  const onChangeDescription = e => {
    setDescription({ ...getDescription, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" });
          }


  const onChangeReason = e => {
    setReason({ reason: e.target.value});
    setErrors({reason: "", description: ""});
    setDescription({other_reason: "", description: ""});
        };



        const newSelectedCloseDate = new Date(selectedDate).toLocaleDateString('en-US',["date", {month: 'numeric', day: 'numeric',year: 'numeric' 
            }])


        const submitCloseDate = () => {

          // console.log(getNotifyType.notify_Type)

          const newErrors = {};

              if (!getReason.reason || getReason.reason .trim() === "") {
                newErrors.reason = "Reason is required";
              }

              if (!getDescription.description || getDescription.description.trim() === "") {
                newErrors.description = "Description is required";
              }
          
            if(getReason.reason == "other_reason"){
              if (!getDescription.other_reason || getDescription.other_reason.trim() === "") {
                newErrors.other_reason = "Title is required";
              }
            }
            

            // If there are errors, set them in the state and return
            if (Object.keys(newErrors).length > 0) {
              setErrors(newErrors);
              return;
            }

          const newCloseDate= {
            date: newSelectedCloseDate,
            type: getReason.reason == "other_reason" ? getDescription.other_reason : getReason.reason,
            description: getDescription.description,
          }

          console.log(newCloseDate)
          
          Swal.fire({
            title: 'Loading!',
            text: 'Please wait while processing your message.',
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
            method:"post",
            url:`/api/attendees/AddCloseDate`, 
            data: newCloseDate,
            headers: {
              "Content-Type" : "application/json",
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            }
        })
              .then(response => {
                setDuelSlots(""); setReason({reason:""}); setDescription({description:""})
                              Swal.fire({
                                title: 'Success!',
                                text: 'You have successfully closed the date.',
                                imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1681291898/closedate_i6xbvg.gif',
                                imageWidth: 200,
                                imageHeight: 200,
                                imageAlt: 'Custom image',
                                confirmButtonColor: '#EF3A47',
                                })
                                fetchAttendees();
                          })
                .catch(error => {
                                console.log(error.response);
                                setError(error.response.data);
                               
                            });

        }


        const submitOpenDate = () => {


          const newCloseDate= {
            date: newSelectedCloseDate,
          }

          console.log(newCloseDate)
          
          Swal.fire({
            title: 'Are you sure you want to open this date?',
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
                text: 'Please wait while processing your message.',
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
                method:"post",
                url:`/api/attendees/AddOpenDate`, 
                data: newCloseDate,
                headers: {
                  "Content-Type" : "application/json",
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': '*',
                }
            })
                  .then(response => {
                    setDuelSlots(""); setReason({reason:""}); setDescription({description:""})
                    Swal.fire({
                      title: 'Success!',
                      text: 'You have successfully open the date.',
                      imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1681291900/opendate_kcssy1.gif',
                      imageWidth: 250,
                      imageHeight: 200,
                      imageAlt: 'Custom image',
                      confirmButtonColor: '#EF3A47',
                      })
                      fetchAttendees();
                              })
                    .catch(error => {
                                    console.log(error.response);
                                    setError(error.response.data);
                                   
                                });
    
             
            }
          })

         

        }



  console.log(getDescription.description, getReason.reason);

var pat = status == "" ? "" : '^'+status+'$';
var patTime = time == "" ? "" : '^'+time+'$';
var pat2 = category == "" ? "" : new RegExp('\\b('+category+')\\b');



const filteredAllAttendeesFullCalendar = AllAttendees.filter(attendees => {
  
    return attendees.category.match(getfilterFullCalendar.category) && attendees.time.toLowerCase().match(patTimeFullCalendar)
});

const groupedSchedules = filteredAllAttendeesFullCalendar?.reduce((totals, schedule) => {
  // const dateSchedule = schedule?.date_schedule;
  if (!totals[schedule?.date_schedule]) {
      totals[schedule?.date_schedule] = {
        date_schedule: schedule?.date_schedule,
        total: 0
      };
    }
    totals[schedule?.date_schedule].total++;
    return totals;

}, {});


        const totalSchedulePerDate = Object.values(groupedSchedules).map(({ date_schedule, total }) => ({
          total: total,
          date_schedule: moment(date_schedule).startOf('day').format('YYYY-MM-DD'),
        }));

        const filteredData = totalSchedulePerDate?.filter(item => moment(item.date_schedule).isSame(moment(startDateFullCalendar), 'day'));
      
        const total = filteredData?.length > 0 ? filteredData[0]?.total : 0;

        console.log(filteredData[0]?.date_schedule, total)

      const totalScheduleFullCalendar = getfilterFullCalendar.category == "Recreational Activity" && getfilterFullCalendar.time == "am" ? Object.values(groupedSchedules).map(({ date_schedule, total }) => ({
        title: `Total Slot: ${total} / 50`,
        start: moment(date_schedule).startOf('day').format('YYYY-MM-DD'),
      }))
      :
      getfilterFullCalendar.category == "Recreational Activity" && getfilterFullCalendar.time == "pm" ? Object.values(groupedSchedules).map(({ date_schedule, total }) => ({
        title: `Total Slot: ${total} / 50`,
        start: moment(date_schedule).startOf('day').format('YYYY-MM-DD'),
      }))
      :
      getfilterFullCalendar.category == "Dialysis" && getfilterFullCalendar.time == "am" ? Object.values(groupedSchedules).map(({ date_schedule, total }) => ({
        title: `Total Slot: ${total} / 8`,
        start: moment(date_schedule).startOf('day').format('YYYY-MM-DD'),
      }))
      :
      getfilterFullCalendar.category == "Dialysis" && getfilterFullCalendar.time == "pm" ? Object.values(groupedSchedules).map(({ date_schedule, total }) => ({
        title: `Total Slot: ${total} / 8`,
        start: moment(date_schedule).startOf('day').format('YYYY-MM-DD'),
      }))
      :
      getfilterFullCalendar.category == "Multipurpose Hall" && getfilterFullCalendar.time == "am" ? Object.values(groupedSchedules).map(({ date_schedule, total }) => ({
        title: `Total Slot: ${total} / 1`,
        start: moment(date_schedule).startOf('day').format('YYYY-MM-DD'),
      }))
      :
      getfilterFullCalendar.category == "Multipurpose Hall" && getfilterFullCalendar.time == "pm" ? Object.values(groupedSchedules).map(({ date_schedule, total }) => ({
        title: `Total Slot: ${total} / 1`,
        start: moment(date_schedule).startOf('day').format('YYYY-MM-DD'),
      }))
      :
      getfilterFullCalendar.category == "Multipurpose Hall" && getfilterFullCalendar.time == "whole_day" ? Object.values(groupedSchedules).map(({ date_schedule, total }) => ({
        title: `Total Slot: ${total} / 1`,
        start: moment(date_schedule).startOf('day').format('YYYY-MM-DD'),
      }))
      :
      ""




console.log(totalSchedulePerDate);


const filteredAllAttendees = AllAttendees.filter(attendees => {
  const attendeeDate = moment(attendees?.date_schedule);
  if (startDate && !endDate) {
    return attendeeDate.isSame(moment(startDate).startOf('day'), 'day') && attendees.category.match(category) 
    && attendees.status.toLowerCase().match(pat) && attendees.time.toLowerCase().match(patTime) 
    && attendees.user_id?.address?.barangay.match(barangay);
  } else if (startDate && endDate) {
    return attendeeDate.isBetween(moment(startDate).startOf('day'), moment(endDate).endOf('day'), 'day', '[]') && attendees.category.match(category) 
    && attendees.status.toLowerCase().match(pat) && attendees.time.toLowerCase().match(patTime) 
    && attendees.user_id?.address?.barangay.match(barangay);
  }
  return true;
});
 
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
              setAllDateClose(response.data.dateCloseSlot);
              setIsLoadingsss(false);
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
             },"Category","Time","Barangay","Gender","Email","Date", "Status","Action"],
            rows: []
        }
        const today = new Date();

        // console.log()

        

        filteredAllAttendees?.forEach(user => {
          data.rows.push([
              user._id, 
              [user.user_id?.last_name,", ",user.user_id?.first_name,", ",user.user_id?.middle_name]
              ,user.category 
              ,user.time == "am" ? "Morning"
              :
              user.time == "pm" ? "Afternoon"
              :
              "Whole Day"
              , user.user_id?.address?.barangay ? user.user_id?.address?.barangay : "none",
              user.user_id?.gender ? user.user_id?.gender : "none",
              user.user_id?.email, 
              moment(user.date_schedule).format("MMMM DD, YYYY "),
              user.status == "not attended" ? <div className="redBg">
                  <span>not attended</span>
                </div> 
                :
                user.status == "reserved" ? <div className="yellowBg">
                  <span>to attend</span>
                </div> 
                : 
                <div className="greenBg">
                  <span>attended</span>
                </div>,
                user.status === "reserved" && moment(startDate).isSame(moment(today).startOf("day"), "day") && (!endDate || moment(endDate).isSame(moment(today).startOf("day"), "day")) ? (
                  <Link to="" onClick={() => acceptAttendees(user._id)} className="greenBgButton">
                    <i className="fas fa-check"></i>
                  </Link> 
                ) : (
                  <Link to="" style={{pointerEvents: "none"}} className="DisablegreenBgButton">
                    <i className="fas fa-check"></i>
                  </Link> 
                )
                
               

          ])
  })
    

        // verification =========================
        const acceptAttendees = _id => {
          console.log(_id);

          let formData = new FormData();

          formData.set("processed_by", getUser());

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
                url: `/api/user/attendees/${_id}`,
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
console.log(getUserssss)

        const [datas, setData] = useState('');

        const QRread = _id => { 

       
          
          setgetUser("");
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

            let formData = new FormData();

            formData.set("processed_by", getUser());
            
              axios({
                  method: "put",
                  url: `/api/user/attendees/read/${_id}`,
                  headers: {
                    "Content-Type" : "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                  },
                  data: formData
              }).then(response => {
                setgetUser(response.data.readUser);
                  Swal.close();
console.log(response.data.qr_code)
                  if(response.data.qr_code == "false"){ 
                    Swal.fire({
                      imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1677915951/qrnotexists_yu8y3f.gif',
                      imageWidth: 500,
                      imageHeight: 350,
                      imageAlt: 'Custom image',
                      confirmButtonColor: '#EF3A47',
                  });
                  }else{

          

                  if(response.data.today_schedule == "false"){
                    Swal.fire({
                      title: 'The schedule of this user is not today!',
                      color: '#EF3A47',
                      imageUrl: 'https://media1.giphy.com/media/fqIOmNAvFOaiQO9GFy/giphy.gif?cid=ecf05e47znz5hzwird0qfu43mht206tqfrhjhkira9fnkx5l&rid=giphy.gif&ct=s',
                      imageWidth: 200,
                      imageHeight: 200,
                      imageAlt: 'Custom image',
                      confirmButtonColor: '#EF3A47',
                      })
                  }else{
                    if(response.data.schedule_status == "attended"){
                      Swal.fire({
                        imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1677917195/Incomplete_requirements_1_mety1x.gif',
                        imageWidth: 500,
                        imageHeight: 350,
                        imageAlt: 'Custom image',
                        confirmButtonColor: '#EF3A47',
                    });
                    }else{

                      

                     Swal.fire({
                      imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1677918023/qraccepted_psisgo.gif',
                      imageWidth: 500,
                      imageHeight: 350,
                      imageAlt: 'Custom image',
                      confirmButtonColor: '#EF3A47',
                  });
                    }

                  }
                  
                  }

              }).catch(error => {
                Swal.close();
                Swal.fire({
                  title: 'error!',
                  text: 'doesnt exists.',
                  imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1677915951/qrnotexists_yu8y3f.gif',
                  imageWidth: 300,
                  imageHeight: 300,
                  imageAlt: 'Custom image',
                  icon: 'error',
                  confirmButtonColor: '#EF3A47',
              });

                  console.log(error.response);
              });
          }, 2000);

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
            start_date: startDate, end_date: endDate, status: status, time: time, barangay: barangay, category: category}),
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


        const [CloseDateshow, setCloseDateShow] = useState(false);
        const CloseDatehandleClose = () => {
          setCloseDateShow(false);
          setDuelSlots("");
        }
        const CloseDatehandleShow = () => setCloseDateShow(true);


        const [PDFshow, setPDFShow] = useState(false);
        const PDFhandleClose = () => {
          setPDFShow(false);
          setLoading({
            loading: true
          });
        }
        const PDFhandleShow = () => setPDFShow(true);


          ///modal--------------------------

            const [show, setShow] = useState(false);
            const handleClose = () => {
              setShow(false);
              setAddSchedule(false); 
              setMultipurpose_Services({
                purpose: '',
                attendees_number: '',
              });
              setRecreationalServices([]);
              setsearchUserId({ user_id: "" }); setError({user_name: "",}); 
              setsearchUserName({user_name: "" });

              setError({user_name: "",});
              setServiceError("")
              setErrorMP("")
              setErrorFullCalendar('');
              setSearchResult([])
            }
            const handleShow = () => setShow(true);
      
      
      
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
            }, 2000);
          }
          if (!!error) {
            // console.info(error);
          }
        }


        const [isLoadingss, setIsLoadingsss] = useState(true);
        const [getFullCalendar, setFullCalendar] = useState(false);

        if(isLoadingss){
          return <>
          <Navbar toggle={toggle} />
          <PersonnelSideBar isOpen={isOpen} toggle={toggle}/>
              
            <div style={contentStyle}>
              <div class="container-fluid">
            <br />
            <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-calendar-alt"></i>&nbsp;Today Attendees</h1>
            <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
          
            <hr class="sep-2" />
            <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 
      
          <LoadingScreen />
          </div>
          </div>
          </>
     }



     // full calendar checkbox =================================================================




    return (
      <>
      <Navbar toggle={toggle} />
      <PersonnelSideBar isOpen={isOpen} toggle={toggle}/>
          
        <div style={contentStyle}>
           <div class="container-fluid">
        <br />
        {
          getFullCalendar ? 
          <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-calendar-alt"></i>&nbsp;Schedule</h1>
          :
          moment(startDate).format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD') ?
          <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-calendar-alt"></i>&nbsp;Schedule</h1>
          :
          startDate && endDate ?
          <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-calendar-alt"></i>&nbsp;Schedule</h1>
          :
          <h1 style={{color:"rgb(239, 58, 71)"}}><i class="fas fa-calendar-alt"></i>&nbsp;Today Attendees</h1>
        }
       
        <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
        {
          getFullCalendar ? 
          <>
          <Button style={{ marginTop: "15px"}} onClick={() => {
            setFullCalendar(false);
            setfilterFullCalendar({ category: "", time: "" });
            setCategoryFullCalendar({categoryFullCalendar:""});
            setTimeFullCalendar({timeFullCalendar:""});
          }}
          color="danger"><i className="fas fa-calendar-alt"></i>&nbsp;&nbsp;Exit Full Calendar</Button>
          <hr class="sep-2" />
          </>
          :

         <>
           <TextField color="secondary" style={{marginTop: "1vh", marginRight: "2vh"}} InputLabelProps={{ shrink: true, required: true }} type="date" value={moment(startDate).format('YYYY-MM-DD')} placeholder="Start Date" onChange={e => handleStartDateChange(e.target.value)} label="Start Date" />
        <TextField color="secondary" style={{marginTop: "1vh", marginRight: "2vh"}} disabled={!startDateSelected} InputLabelProps={{ shrink: true, required: true }} type="date" placeholder="End Date" onChange={e => handleEndDateChange(e.target.value)}  label="End Date" />
        <Button style={{ marginTop: "15px"}} onClick={()  => setFullCalendar(true)}
          color="danger"><i className="fas fa-calendar-alt"></i>&nbsp;&nbsp;Full Calendar</Button>
            <Button style={{ marginTop: "15px", marginLeft:"10px"}} onClick={closeDate}
          color="danger"><i class="fas fa-window-close"></i>&nbsp;&nbsp;Close a Date</Button>

<hr class="sep-2" />
        {getOption === "table" ? 
         <Button style={{ marginBottom: "10px"}} onClick={()  => setOption("qrcode")}
         color="danger"><i className="fas fa-qrcode"></i>&nbsp;&nbsp;QRcode Scanner</Button>
                       :  
           <Button style={{ marginBottom: "10px"}} onClick={()  => setOption("table")}
          color="danger"><i className="fas fa-table"></i>&nbsp;&nbsp;Table</Button>

    }    


         </>

        }
      

        
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 
       
     


                    {getFullCalendar ?
                    <>
                  <div style={{display: "flex", flexDirection: "row", marginBottom: "10px"}}>

                  <FormControl style={{width: "17vh", marginRight: "2vh"}} 
                  fullWidth 
                  > 
                                              <InputLabel color="secondary" shrink="true"  variant="standard" htmlFor="uncontrolled-native">
                                              Select Category
                                              </InputLabel>
                                              <NativeSelect
                                                onChange={onChangeServicesFullCalendar}
                                                inputProps={{
                                                  name: 'category',
                                                  id: 'uncontrolled-native',
                                                }}
                                                color="secondary"
                                                value={categoryFullCalendar}
                                              >
                                                  <option value="" selected disabled> <em>Select Category</em></option>
                                              <option value="Recreational Activity">Recreational Activity</option>
                                              <option value="Dialysis">Dialysis</option>
                                              <option value="Multipurpose Hall">Multipurpose Hall</option>
                                            </NativeSelect>
                                </FormControl>

              
                                <FormControl style={{width: "17vh", marginRight: "2vh"}} fullWidth  disabled={!categoryFullCalendar}> 
                                              <InputLabel color="secondary" shrink="true"  variant="standard" htmlFor="uncontrolled-native">
                                                Select Time
                                              </InputLabel>
                                              <NativeSelect
                                                onChange={onChangeTimeFullCalendar}
                                                inputProps={{
                                                  name: 'status',
                                                  id: 'uncontrolled-native',
                                                }}
                                                color="secondary"
                                                value={timeFullCalendar}
                                              >
                                                  <option value="" selected disabled> <em>Select Time</em></option>
                                              <option value="am">Am</option>
                                              <option value="pm">Pm</option>
                                              {
                                                categoryFullCalendar == "Multipurpose Hall" && (<option value="whole_day">Whole Day</option>)
                                              }
                                             
                                            </NativeSelect>
                                          </FormControl>

                                <Button outline disabled={!timeFullCalendar} color="danger" onClick={onSubmitFullCalendar} style={{marginTop: "1vh", marginRight: "2vh"}}>&nbsp;Submit&nbsp;</Button>
            
                          </div>

                          <div class="row">
                          <div class="col-lg-12">
                              <div class="ibox chat-view">
                             
                              <div class="ibox-title">
                  {
                    getfilterFullCalendar.category == "Recreational Activity" && getfilterFullCalendar.time == "am" ?
                   <>
                    <h6><i class="fas fa-dumbbell" style={{color:"red"}}></i> Reacreational Activity | Morning Schedule</h6>
                    <FullCalendar
                    defaultView="dayGridMonth"
                    // headerToolbar={{
                    //   center: 'title',
                    // }}
                    title={"dwadwa"}
                    themeSystem="Simplex"
                    plugins={[dayGridPlugin, interactionPlugin]} // add the plugins here
                    events={totalScheduleFullCalendar}
                    dateClick={handleDateClick} 
                    style={{
                      color: "#EF3A47",
                    }}
                  />
                 </>
               :
                getfilterFullCalendar.category == "Recreational Activity" && getfilterFullCalendar.time == "pm" ?
                <>
                <h6><i class="fas fa-dumbbell" style={{color:"red"}}></i> Reacreational Activity | Afternoon Schedule</h6>
                <FullCalendar
                defaultView="dayGridMonth"
                // headerToolbar={{
                //   center: 'title',
                // }}
                title={"dwadwa"}
                themeSystem="Simplex"
                plugins={[dayGridPlugin, interactionPlugin]} // add the plugins here
                events={totalScheduleFullCalendar}
                dateClick={handleDateClick} 
                style={{
                  color: "#EF3A47",
                }}
              />
               </>

                :
                getfilterFullCalendar.category == "Dialysis" && getfilterFullCalendar.time == "am" ?
                <>
                <h6><i class="fas fa-procedures" style={{color:"red"}}></i> Dialysis | Morning Schedule</h6>
                <FullCalendar
                defaultView="dayGridMonth"
                // headerToolbar={{
                //   center: 'title',
                // }}
                title={"dwadwa"}
                themeSystem="Simplex"
                plugins={[dayGridPlugin, interactionPlugin]} // add the plugins here
                events={totalScheduleFullCalendar}
                dateClick={handleDateClick} 
                style={{
                  color: "#EF3A47",
                }}
                />
                </>

                  :
                  getfilterFullCalendar.category == "Dialysis" && getfilterFullCalendar.time == "pm" ?
                  <>
                  <h6><i class="fas fa-procedures" style={{color:"red"}}></i> Dialysis | Afternoon Schedule</h6>
                  <FullCalendar
                  defaultView="dayGridMonth"
                  // headerToolbar={{
                  //   center: 'title',
                  // }}
                  title={"dwadwa"}
                  themeSystem="Simplex"
                  plugins={[dayGridPlugin, interactionPlugin]} // add the plugins here
                  events={totalScheduleFullCalendar}
                  dateClick={handleDateClick} 
                  style={{
                    color: "#EF3A47",
                  }}
                  />
                  </>

                    :
                    getfilterFullCalendar.category == "Multipurpose Hall" && getfilterFullCalendar.time == "am" ?
                    <>
                    <h6><i class="fas fa-hospital-alt" style={{color:"red"}}></i> Multipurpose Hall | Morning Schedule</h6>
                    <FullCalendar
                    defaultView="dayGridMonth"
                    // headerToolbar={{
                    //   center: 'title',
                    // }}
                    title={"dwadwa"}
                    themeSystem="Simplex"
                    plugins={[dayGridPlugin, interactionPlugin]} // add the plugins here
                    events={totalScheduleFullCalendar}
                    dateClick={handleDateClick} 
                    style={{
                      color: "#EF3A47",
                    }}
                    />
                    </>

                    :
                    getfilterFullCalendar.category == "Multipurpose Hall" && getfilterFullCalendar.time == "pm" ?
                    <>
                    <h6><i class="fas fa-hospital-alt" style={{color:"red"}}></i> Multipurpose Hall | Afternoon Schedule</h6>
                    <FullCalendar
                    defaultView="dayGridMonth"
                    // headerToolbar={{
                    //   center: 'title',
                    // }}
                    title={"dwadwa"}
                    themeSystem="Simplex"
                    plugins={[dayGridPlugin, interactionPlugin]} // add the plugins here
                    events={totalScheduleFullCalendar}
                    dateClick={handleDateClick} 
                    style={{
                      color: "#EF3A47",
                    }}
                    />
                    </>

                    :
                    getfilterFullCalendar.category == "Multipurpose Hall" && getfilterFullCalendar.time == "whole_day" ?
                    <>
                    <h6><i class="fas fa-hospital-alt" style={{color:"red"}}></i> Multipurpose Hall | Whole Day Schedule</h6>
                    <FullCalendar
                    defaultView="dayGridMonth"
                    // headerToolbar={{
                    //   center: 'title',
                    // }}
                    title={"dwadwa"}
                    themeSystem="Simplex"
                    plugins={[dayGridPlugin, interactionPlugin]} // add the plugins here
                    events={totalScheduleFullCalendar}
                    dateClick={handleDateClick} 
                    style={{
                      color: "#EF3A47",
                    }}
                    />
                    </>

              :
              ""
                    
                  }
                     </div>        

                    
                              </div>
                          </div>
                      </div>  
                      </>
                      
                      :
                       


        
        (getOption === "table" ? <>

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
                                      <option value="reserved">To attend</option>
                                      <option value="not attended">Not attended</option>
                                    </NativeSelect>
                                  </FormControl>
                 
                        <FormControl style={{width: "17vh", marginRight: "2vh"}} fullWidth> 
                                      <InputLabel color="secondary" shrink="true"  variant="standard" htmlFor="uncontrolled-native">
                                       Select Time
                                      </InputLabel>
                                      <NativeSelect
                                        onChange={onChangeTime}
                                        inputProps={{
                                          name: 'status',
                                          id: 'uncontrolled-native',
                                        }}
                                        color="secondary"
                                        value={time}
                                      >
                                         <option value="" selected disabled> <em>Select Time</em></option>
                                      <option value="am">Am</option>
                                      <option value="pm">Pm</option>
                                      <option value="whole_day">Whole Day</option>
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
                   <img style={{boxShadow: "2px 5px 5px rgba(0, 0, 0, 0.7)", height: "160px", width: "170px"}} class="img-account-profile rounded-circle mb-2" src={getUserssss?.user_id?.profile_picture?.url} alt="" />
                  : 
                  <img style={{boxShadow: "2px 5px 5px rgba(0, 0, 0, 0.7)"}} class="img-account-profile rounded-circle mb-2" src={Img} alt="" />
                  
                  }
                 
                   
                
                  
                </div>

                {
                  getUserssss ? 

                  <form>

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
                    
                  <div class="mb-3">

                  <div class="row gx-3 mb-3">

                  {
                        getUserssss?.status == "attended" ? 
                        <div class="col-md-6">
                        <label class="small mb-1" for="inputFirstName">Status: <label class="small mb-1" for="inputFirstName">Attended</label></label>
                        <input style={{color: "green", fontWeight:"bold"}} class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={"Attended"} />
                    </div>
                       
                        : 
                        <div class="col-md-6">
                        <label class="small mb-1" for="inputFirstName">Status</label>
                        <input  style={{color: "blue", fontWeight:"bold"}} class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={"To attend"} />
                    </div>
                      }
                       <div class="col-md-6">
                           <label class="small mb-1" for="inputLastName">Service Type</label>
                           {
                            getUserssss?.category == "Recreational Activity" ? 
                            <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name"  value={`${getUserssss?.category}: ${getUserssss?.recreational_services}`}
                            />
                            :
                            <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name"  value={getUserssss?.category}
                            />
                           }
                          
                       </div>
                   </div>

                       
                   </div>
                    
                    
                      <div class="row gx-3 mb-3">
                         
                          <div class="col-md-6">
                              <label class="small mb-1" for="inputLocation">Date Schedule</label>
                              <input class="form-control" id="inputLocation" type="text" placeholder="Enter your location" value={new Date(getUserssss?.date_schedule).toLocaleDateString()} />
                          </div>

                          
                          <div class="col-md-6">
                              <label class="small mb-1" for="inputBirthday">Time Schedule</label>
                              
                              {
                                getUserssss?.time == "am" ?
                                <input class="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value={"Morning"} />
                                :
                                getUserssss.time == "pm" ?
                                <input class="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value={"Afternoon"} />
                                :
                                <input class="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value={"Whole Day"} />
                              }

                            
                          </div>
                          
                      </div>
                   
                      <div class="row gx-3 mb-3">
                        <div class="col-md-6">
                              <label class="small mb-1" for="inputOrgName">Barangay</label>
                              <input class="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" value={getUserssss?.user_id?.address?.barangay} />
                          </div>
                          <div class="col-md-6">
                              <label class="small mb-1" for="inputPhone">Email address</label>
                              <input class="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value={getUserssss?.user_id?.email} />
                          </div>
                      
                      </div>
                      {/* {
                        getUserssss?.status == "attended" ? 
                        <button disabled class="btn btn-secondary" type="button">Accept</button>
                        : 
                        <button onClick={() => acceptAttendees(getUserssss?._id)} class="btn btn-danger" type="button">Accept</button>
                      } */}
                   
                      
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
        
        )
      }


<Modal size='md' show={show} onHide={handleClose} animation={true}>
        <Modal.Header style={{ background: '#CE3043' }}>
          <Modal.Title style={{ color: '#ffff' }}><i class="fas fa-calendar"></i>&nbsp;&nbsp;Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#ffff' }}>

                {getAddSchedule ? 

                <>
              
                <Col>
                <TextWrapper>
                            {/* <ServicesH1>Schedule Management</ServicesH1> */}
                                   <ServicesIcon src={image2} />
                          </TextWrapper>
                <Row>
                <Col>
                Service Type: 
                <p>{getfilterFullCalendar.category}</p>
                </Col>
                <Col>
                Date and Time: 
                <p>{moment(newSelectedDate).format("MMMM DD, YYYY")} | {getfilterFullCalendar.time == "am" ? "Morning"
                :getfilterFullCalendar.time == "am" ? "Afternoon": "Whole Day"}</p>
                </Col>
                </Row>
                        {
                          getsearchUserId?.user_id == "" ?    <TextField fullWidth color="secondary" id="health_problem" 
                          value={getsearchUserName?.user_name} 
                          onChange={(e) => handleSearch(e.target.value)} 
                          style={{marginBottom:"10px"}}
                          InputLabelProps={{ required: true }} name="name" label="Elderly Name" />
                          :
                          <TextField disabled fullWidth color="secondary" id="health_problem" 
                          value={getsearchUserName?.user_name} 
                          onChange={(e) => handleSearch(e.target.value)} 
                          style={{marginBottom:"10px"}}
                          InputLabelProps={{ required: true }} name="name" label="Elderly Name" />
                        }  
                  <InputLabel style={{ color: "red", "font-size": "0.8rem",marginBottom:"5px"}}>{error.user_name}</InputLabel>
                  {loading ? (
                    // <ChatLoading />
                    <div>Loading...</div>
                  ) : ( //top 4 results
                    searchResult
                      ?.slice(0, 4)
                      .map((user) => (
                        <UserListItem
                          key={user._id}
                          user={user}
                          handleFunction={() => accessUser(user._id, user.first_name, user.last_name)}
                        />
                      ))
                  )}

                  <Button onClick={() => {  setsearchUserId({ user_id: "" }); setError({user_name: "",}); setsearchUserName({user_name: "" });  }} 
                    color="danger"><i class="fas fa-minus-circle"></i>&nbsp;Reset</Button>
                      <InputLabel style={{color: "black", "font-size": "1rem", marginTop: "10px"}}>
                      Not Existing User?
                      <Link to="/personnel/user" 
                      style={{color: "red", "font-size": "1rem", "text-decoration": "none"}}>&nbsp;Add here!</Link>
                      </InputLabel>         
                </Col>
            
                {
                  getfilterFullCalendar.category == "Recreational Activity" ?
                  <>
                      <hr/>
                  <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                  <h5 style={{ color: "black", margin: "0 0 10px 0" }}>Select a recreational activities</h5>
                  <p style={{ color: "black", margin: "0" }}>(Maximum of 3)</p>
                  {
                    service_error == "no_service_selected" ? <p style={{color: "red", "font-size": "0.8rem"}}>Please select a recreational activities</p> : ""
                  }
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ flexBasis: "50%", marginLeft: "30px" }}>
                    {RecreationalServicesList?.slice(0, Math.ceil(RecreationalServicesList.length / 2)).map((service) => (
                      <Form.Check
                        key={service}
                        inline1
                        label={service}
                        name="_id"
                        type="checkbox"
                        style={{ fontSize: "1.1rem", cursor: "pointer" }}
                        value={service}
                        onChange={() => handleChangess(service)}
                        selected={recreational_services.includes(service)}
                        disabled={recreational_services.length === 3 && !recreational_services.includes(service)}
                      />
                    ))}
                  </div>
                  <div style={{ flexBasis: "50%" }}>
                    {RecreationalServicesList?.slice(Math.ceil(RecreationalServicesList.length / 2)).map((service) => (
                      <Form.Check
                        key={service}
                        inline1
                        label={service}
                        name="_id"
                        type="checkbox"
                        style={{ fontSize: "1.1rem", cursor: "pointer" }}
                        value={service}
                        onChange={() => handleChangess(service)}
                        selected={recreational_services.includes(service)}
                        disabled={recreational_services.length === 3 && !recreational_services.includes(service)}
                      />
                    ))}
                  </div>
                </div>
                </>
                :   getfilterFullCalendar.category == "Multipurpose Hall" ?
                <>
                    <hr/>
                 <div style={{ display: "flex", marginBottom: "-20px", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
              
              
                 {
                service_errorMP == "no_service_selected" ? 
                <h5 style={{ color: "red"}}>*Please complete the required field(s) below*</h5>
                : <h5 style={{ color: "black"}}>Please complete the required field(s) below</h5>
              }
            </div>
            <br></br>
            <TextField fullWidth 
            onChange={onChange} 
            color="secondary" id="health_problem"  InputLabelProps={{ required: true }} name="purpose" label="Booking purpose" 
            value={multipurpose_services.purpose}
            error={errorFullCalendar === 'Please enter a booking purpose'}
            helperText={errorFullCalendar === 'Please enter a booking purpose' ? 'Please enter a booking purpose' : ''}
            />
            <br></br>
            <br></br>
            <div  className="panel-activity__status">
           
            <FormControl fullWidth >
                  <InputLabel color="secondary" shrink="true" variant="standard" htmlFor="uncontrolled-native">
                  Number of attendees
                  </InputLabel>
                 
                  <NativeSelect
                  value={multipurpose_services.attendees_number}
                   onChange={onChange}
                    inputProps={{
                      name: 'attendees_number',
                      id: 'uncontrolled-native',
                    }}
                    color="secondary"
                  >
                    <option style={{ color: "gray"}} value="" selected disabled> <em>Select Number of Attendees</em></option>
                    <option style={{ color: "black"}} value="10-15">10-15 attendees</option>
                    <option style={{ color: "black"}} value="16-20">16-20 attendees</option>
                    <option style={{ color: "black"}} value="21-above">21 or more attendees</option>
                  </NativeSelect>
                  {errorFullCalendar === 'Please select number of attendees' && (
                    <FormHelperText style={{ color: "red"}}>Please select number of attendees</FormHelperText>
                  )}
                </FormControl>

                 <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{errorFullCalendar.description}</InputLabel> 
               
                 </div>
                </>

                :
                ""
                }
              

                 <BtnWrap2>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button outline 
                    onClick={() => { 
                      setAddSchedule(false); 
                      setMultipurpose_Services({
                        purpose: '',
                        attendees_number: '',
                      });
                      setRecreationalServices([]);
                      setsearchUserId({ user_id: "" }); setError({user_name: "",}); 
                      setsearchUserName({user_name: "" });

                      setError({user_name: "",});
                      setServiceError("")
                      setErrorMP("")
                      setErrorFullCalendar('');

                      setSearchResult([]);
                  } } 


                    color="danger"><i class="fas fa-arrow-left"></i>&nbsp;Back</Button> &nbsp; &nbsp;
                    <Button outline 
                    onClick={() => submitaddScheduleFullCalendar()} 
                    color="danger">
                      <i class="fas fa-file"></i>&nbsp;SUBMIT</Button>
                  </div>
                </BtnWrap2>
                </>
                :
                          <>
                         
                           {moment(startDateFullCalendar, "YYYY-MM-DD").isBefore(moment(), "day") 
                           && moment(startDateFullCalendar, "YYYY-MM-DD").isoWeekday() !== 6 
                           && moment(startDateFullCalendar, "YYYY-MM-DD").isoWeekday() !== 7 ? 
                           <>
                           <TextWrapper>
                            <ServicesH1>Schedule Management
                              <h6 style={{ color: "black" }}>Choose an option below to manage schedule.</h6>
                            </ServicesH1>
                          </TextWrapper>
                          <ServicesWrappers3>
                            <ServicesCard3
                            onClick={ViewSchedule}
                            >
                              <ServicesIcon src={image1} />
                              <ServicesH2>View Schedule</ServicesH2>
                            </ServicesCard3>
                          </ServicesWrappers3>
                             </>
                          : [0, 6].includes(moment(startDateFullCalendar, "YYYY-MM-DD").day()) ?
                                <TextWrapper>
                                   <ServicesIcon style={{width: "40vh", height: "40vh", marginBottom:"-50px", marginTop:"-60px"}} src={image5} />
                                  <p style={{ color: "black" }}>The Center for the Elderly is closed every weekends for routine maintenance and staff rest to ensure the best care for our beloved seniors during the week.
                                  </p>
                                
                              </TextWrapper>
                             :

                             
                              getfilterFullCalendar.category == "Recreational Activity" ?
                              (
                              getfilterFullCalendar.time == "am" && moment(filteredData[0]?.date_schedule, "YYYY-MM-DD").isSame(moment(startDateFullCalendar, "YYYY-MM-DD"), 'day')
                              && total == 50
                              ? 
                              
                              <>
                              <TextWrapper>
                               <ServicesH1>Schedule Management
                                 <h6 style={{ color: "black" }}>Choose an option below to manage schedule.</h6>
                               </ServicesH1>
                             </TextWrapper>
                             <ServicesWrappers3>
                               <ServicesCard3
                               onClick={ViewSchedule}
                               >
                                 <ServicesIcon src={image1} />
                                 <ServicesH2>View Schedule</ServicesH2>
                               </ServicesCard3>
                             </ServicesWrappers3>
                             <ServicesWrappers3>
                              <ServicesCard5
                                style={{background: "silver"}}
                              >
                                <ServicesIcon src={image2} />
                                <ServicesH2>Add Schedule</ServicesH2>
                                <h6>Slot Unavailable</h6>
                                
                              </ServicesCard5>


                              </ServicesWrappers3>
                                </>
                                
                              : 

                              getfilterFullCalendar.time == "pm" && moment(filteredData[0]?.date_schedule, "YYYY-MM-DD").isSame(moment(startDateFullCalendar, "YYYY-MM-DD"), 'day')
                              && total == 50
                              ? 
                              
                              <>
                              <TextWrapper>
                               <ServicesH1>Schedule Management
                                 <h6 style={{ color: "black" }}>Choose an option below to manage schedule.</h6>
                               </ServicesH1>
                             </TextWrapper>
                             <ServicesWrappers3>
                               <ServicesCard3
                               onClick={ViewSchedule}
                               >
                                 <ServicesIcon src={image1} />
                                 <ServicesH2>View Schedule</ServicesH2>
                               </ServicesCard3>
                             </ServicesWrappers3>
                             <ServicesWrappers3>
                              <ServicesCard5
                                style={{background: "silver"}}
                              >
                                <ServicesIcon src={image2} />
                                <ServicesH2>Add Schedule</ServicesH2>
                                <h6>Slot Unavailable</h6>
                                
                              </ServicesCard5>


                              </ServicesWrappers3>
                                </>
                                
                              : 
                              
                              
                              <>
                             <TextWrapper>
                            <ServicesH1>Schedule Management
                              <h6 style={{ color: "black" }}>Choose an option below to manage schedule.</h6>
                            </ServicesH1>
                          </TextWrapper>
                          <ServicesWrappers3>
                            <ServicesCard3
                            onClick={ViewSchedule}
                            >
                              <ServicesIcon src={image1} />
                              <ServicesH2>View Schedule</ServicesH2>
                            </ServicesCard3>
                          </ServicesWrappers3>
                          <ServicesWrappers3>
                              <ServicesCard3
                                onClick={() => { setAddSchedule(true); }}
                              >
                                <ServicesIcon src={image2} />
                                <ServicesH2>Add Schedule</ServicesH2>
                              </ServicesCard3>


                              </ServicesWrappers3>
                            </>
                                
                              )
                              
                             

                             :

                             getfilterFullCalendar.category == "Dialysis" ?
                              (
                              getfilterFullCalendar.time == "am" && moment(filteredData[0]?.date_schedule, "YYYY-MM-DD").isSame(moment(startDateFullCalendar, "YYYY-MM-DD"), 'day')
                              && total == 8
                              ? 
                              
                              <>
                              <TextWrapper>
                               <ServicesH1>Schedule Management
                                 <h6 style={{ color: "black" }}>Choose an option below to manage schedule.</h6>
                               </ServicesH1>
                             </TextWrapper>
                             <ServicesWrappers3>
                               <ServicesCard3
                               onClick={ViewSchedule}
                               >
                                 <ServicesIcon src={image1} />
                                 <ServicesH2>View Schedule</ServicesH2>
                               </ServicesCard3>
                             </ServicesWrappers3>
                             <ServicesWrappers3>
                              <ServicesCard5
                                style={{background: "silver"}}
                              >
                                <ServicesIcon src={image2} />
                                <ServicesH2>Add Schedule</ServicesH2>
                                <h6>Slot Unavailable</h6>
                                
                              </ServicesCard5>


                              </ServicesWrappers3>
                                </>
                                
                              : 

                              getfilterFullCalendar.time == "pm" && moment(filteredData[0]?.date_schedule, "YYYY-MM-DD").isSame(moment(startDateFullCalendar, "YYYY-MM-DD"), 'day')
                              && total == 8
                              ? 
                              
                              <>
                              <TextWrapper>
                               <ServicesH1>Schedule Management
                                 <h6 style={{ color: "black" }}>Choose an option below to manage schedule.</h6>
                               </ServicesH1>
                             </TextWrapper>
                             <ServicesWrappers3>
                               <ServicesCard3
                               onClick={ViewSchedule}
                               >
                                 <ServicesIcon src={image1} />
                                 <ServicesH2>View Schedule</ServicesH2>
                               </ServicesCard3>
                             </ServicesWrappers3>
                             <ServicesWrappers3>
                              <ServicesCard5
                                style={{background: "silver"}}
                              >
                                <ServicesIcon src={image2} />
                                <ServicesH2>Add Schedule</ServicesH2>
                                <h6>Slot Unavailable</h6>
                                
                              </ServicesCard5>


                              </ServicesWrappers3>
                                </>
                                
                              : 
                              
                              
                              <>
                             <TextWrapper>
                            <ServicesH1>Schedule Management
                              <h6 style={{ color: "black" }}>Choose an option below to manage schedule.</h6>
                            </ServicesH1>
                          </TextWrapper>
                          <ServicesWrappers3>
                            <ServicesCard3
                            onClick={ViewSchedule}
                            >
                              <ServicesIcon src={image1} />
                              <ServicesH2>View Schedule</ServicesH2>
                            </ServicesCard3>
                          </ServicesWrappers3>
                          <ServicesWrappers3>
                              <ServicesCard3
                                onClick={() => { setAddSchedule(true); }}
                              >
                                <ServicesIcon src={image2} />
                                <ServicesH2>Add Schedule</ServicesH2>
                              </ServicesCard3>


                              </ServicesWrappers3>
                            </>
                                
                              )
                              
                             

                             :

                             getfilterFullCalendar.category == "Multipurpose Hall" ?
                             (
                             getfilterFullCalendar.time == "am" && moment(filteredData[0]?.date_schedule, "YYYY-MM-DD").isSame(moment(startDateFullCalendar, "YYYY-MM-DD"), 'day')
                             && total == 1
                             ? 
                             
                             <>
                             <TextWrapper>
                              <ServicesH1>Schedule Management
                                <h6 style={{ color: "black" }}>Choose an option below to manage schedule.</h6>
                              </ServicesH1>
                            </TextWrapper>
                            <ServicesWrappers3>
                              <ServicesCard3
                              onClick={ViewSchedule}
                              >
                                <ServicesIcon src={image1} />
                                <ServicesH2>View Schedule</ServicesH2>
                              </ServicesCard3>
                            </ServicesWrappers3>
                            <ServicesWrappers3>
                             <ServicesCard5
                               style={{background: "silver"}}
                             >
                               <ServicesIcon src={image2} />
                               <ServicesH2>Add Schedule</ServicesH2>
                               <h6>Slot Unavailable</h6>
                               
                             </ServicesCard5>


                             </ServicesWrappers3>
                               </>
                               
                             : 

                             getfilterFullCalendar.time == "pm" && moment(filteredData[0]?.date_schedule, "YYYY-MM-DD").isSame(moment(startDateFullCalendar, "YYYY-MM-DD"), 'day')
                             && total == 1
                             ? 
                             
                             <>
                             <TextWrapper>
                              <ServicesH1>Schedule Management
                                <h6 style={{ color: "black" }}>Choose an option below to manage schedule.</h6>
                              </ServicesH1>
                            </TextWrapper>
                            <ServicesWrappers3>
                              <ServicesCard3
                              onClick={ViewSchedule}
                              >
                                <ServicesIcon src={image1} />
                                <ServicesH2>View Schedule</ServicesH2>
                              </ServicesCard3>
                            </ServicesWrappers3>
                            <ServicesWrappers3>
                             <ServicesCard5
                               style={{background: "silver"}}
                             >
                               <ServicesIcon src={image2} />
                               <ServicesH2>Add Schedule</ServicesH2>
                               <h6>Slot Unavailable</h6>
                               
                             </ServicesCard5>


                             </ServicesWrappers3>
                               </>
                               
                             : 

                             getfilterFullCalendar.time == "whole_day" && moment(filteredData[0]?.date_schedule, "YYYY-MM-DD").isSame(moment(startDateFullCalendar, "YYYY-MM-DD"), 'day')
                             && total == 1
                             ? 
                             
                             <>
                             <TextWrapper>
                              <ServicesH1>Schedule Management
                                <h6 style={{ color: "black" }}>Choose an option below to manage schedule.</h6>
                              </ServicesH1>
                            </TextWrapper>
                            <ServicesWrappers3>
                              <ServicesCard3
                              onClick={ViewSchedule}
                              >
                                <ServicesIcon src={image1} />
                                <ServicesH2>View Schedule</ServicesH2>
                              </ServicesCard3>
                            </ServicesWrappers3>
                            <ServicesWrappers3>
                             <ServicesCard5
                               style={{background: "silver"}}
                             >
                               <ServicesIcon src={image2} />
                               <ServicesH2>Add Schedule</ServicesH2>
                               <h6>Slot Unavailable</h6>
                               
                             </ServicesCard5>


                             </ServicesWrappers3>
                               </>
                               
                             : 
                             
                             
                             <>
                            <TextWrapper>
                           <ServicesH1>Schedule Management
                             <h6 style={{ color: "black" }}>Choose an option below to manage schedule.</h6>
                           </ServicesH1>
                         </TextWrapper>
                         <ServicesWrappers3>
                           <ServicesCard3
                           onClick={ViewSchedule}
                           >
                             <ServicesIcon src={image1} />
                             <ServicesH2>View Schedule</ServicesH2>
                           </ServicesCard3>
                         </ServicesWrappers3>
                         <ServicesWrappers3>
                             <ServicesCard3
                               onClick={() => { setAddSchedule(true); }}
                             >
                               <ServicesIcon src={image2} />
                               <ServicesH2>Add Schedule</ServicesH2>
                             </ServicesCard3>


                             </ServicesWrappers3>
                           </>
                               
                             )
                             
                            

                            :
                             
                            <>
                             <TextWrapper>
                            <ServicesH1>Schedule Management
                              <h6 style={{ color: "black" }}>Choose an option below to manage schedule.</h6>
                            </ServicesH1>
                          </TextWrapper>
                          <ServicesWrappers3>
                            <ServicesCard3
                            onClick={ViewSchedule}
                            >
                              <ServicesIcon src={image1} />
                              <ServicesH2>View Schedule</ServicesH2>
                            </ServicesCard3>
                          </ServicesWrappers3>
                          <ServicesWrappers3>
                              <ServicesCard3
                                onClick={() => { setAddSchedule(true); }}
                              >
                                <ServicesIcon src={image2} />
                                <ServicesH2>Add Schedule</ServicesH2>
                              </ServicesCard3>


                              </ServicesWrappers3>
                            </>
                          }



                        </>
                }
  
          
        </Modal.Body>
        <Modal.Footer style={{ background: 'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))' }}>
          <Button style={{ background: '#EF3A47', color: 'white' }} variant="light" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      

      <Modal 
      size={
        // selectedDate ? "md" : 
      'lg'}  
      show={CloseDateshow} onHide={CloseDatehandleClose} animation={true}>
          <Modal.Header style={{ background: '#CE3043' }}>
            <Modal.Title style={{ color: '#ffff' }}><i class="fas fa-user-tie"></i>&nbsp;&nbsp;Close a Date</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: '#ffff' }}>
    
            {
              selectedDate ? 
              (
                AllDateClose.find(dateObj => moment(dateObj.date, "M/D/YYYY").isSame(selectedDate, "day")).avaliableSlot === "closed" ? (

                    
                  <>
                  <TextWrapper>
                 <ServicesH1>Open the Date
                   <h6 style={{ color: "black" }}>Open this date if you think the date mentioned for the center's closure is incorrect.</h6>
                 </ServicesH1>
               </TextWrapper>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <p style={{marginTop: "-40px"}}>Date: {moment(selectedDate).format("MMMM DD, YYYY")} </p>
                
                </div>  <hr style={{marginTop: "-10px"}} /> 

               <ServicesWrappers3>
                   <ServicesCard3
                     onClick={() => submitOpenDate()}
                   >
                     <ServicesIcon style={{height: "100px", width: "120px"}} src={image3} />
                     {/* <ServicesH2>Open</ServicesH2> */}
                   </ServicesCard3>


                   </ServicesWrappers3>

                   <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                               <Button outline color="danger" 
                               onClick={() => {setDuelSlots(""); setReason({reason:""}); setDescription({description:""});  setErrors({reason: "", description: ""});}}
                               >&nbsp;← Back</Button>
                             </div>

                 </>



                ) : (
                  <>
              <TextWrapper>
                 <ServicesH1>Close the Date
                  
                 </ServicesH1>
               </TextWrapper>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <p style={{marginTop: "-40px"}}>Date: {moment(selectedDate).format("MMMM DD, YYYY")} </p>
                
                </div>  <hr style={{marginTop: "-10px"}} /> 
                  <Col style={{marginBottom:"20px", marginTop:"20px"}}>
                   
                       <FormControl fullWidth>
                                             <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                                               Type*
                                             </InputLabel>
                                             <NativeSelect
                                                 onChange={onChangeReason}
                                                 inputProps={{
                                                   name: 'status',
                                                   id: 'uncontrolled-native',
                                                 }}
                                                 color="secondary"
                                                 value={getReason.reason}
                                                 error={!!errors.reason}
                                                 helperText={errors.reason}
                                             >
                                               <option value="" selected disabled> <em>Select a Reasons</em></option>
                                               <option value="Closed for Holidays">Closed for Holidays</option>
                                               <option value="Undergoing Renovations">Undergoing Renovations</option>
                                               <option value="Temporarily Closed for Event">Temporarily Closed for Event</option>
                                               <option value="Upgrading Facilities">Upgrading Facilities</option>
                                               <option value="Closed for Special Occasion">Closed for Special Occasion</option>
                                               <option value="other_reason">Other Reasons</option>
                                             </NativeSelect>
                                             {errors.reason && (
                                         <div style={{ color: "red", fontSize: "0.8rem" }}>
                                           {errors.reason}
                                         </div>
                                       )}
                             </FormControl>
                     {getReason.reason == "other_reason" &&    
                     <TextField
                        fullWidth
                        color="secondary"
                        id="health_problem"
                        onChange={onChangeDescription} 
                        value={getDescription.other_reason} 
                        InputLabelProps={{ shrink: true, required: true }}
                        name="other_reason"
                        placeholder="Write the reason here"
                       //  label="Title"
                        error={!!errors.other_reason}
                        helperText={errors.other_reason}
                      />
                     
                     }
                       {/* <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.title}</InputLabel> */}
                    </Col>
                   
                    <div  className="panel-activity__status">
                       <textarea name="description" 
                       onChange={onChangeDescription} 
                       value={getDescription.description} 
                       id="commentfield" placeholder="Write your message here..."  
                       className={`form-control`}
                       ></textarea>
                        {errors.description && (
                           <div style={{ color: "red", fontSize: "0.8rem" }}>
                             {errors.description}
                           </div>
                         )}
                       {/* <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.announcement}</InputLabel> */}
                          
                       <div className="actions">
                               <div className="btn-group">
                               <Button outline color="danger" 
                               onClick={() => {setDuelSlots(""); setReason({reason:""}); setDescription({description:""});  setErrors({reason: "", description: ""});}}
                               >&nbsp;← Back</Button>
                               &nbsp;&nbsp; &nbsp;&nbsp;
                               <Button outline color="danger" 
                               onClick={() => submitCloseDate()}
                               >&nbsp;Submit →</Button>
                               </div>
                           </div>
                       </div>
                  </>
                )

              )
              


              :
              <>
              <TextWrapper>
                                  <ServicesH1>Pick a Date
                                  
                                  </ServicesH1>
                                </TextWrapper>
                                <hr style={{marginTop: "-10px"}} /> 
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              
                            <Calendar
                                onSelect = {(date) => setDuelSlots(date)}
                                minDate = { moment().format("MMMM/DD/YYYY")}
                                maxDate = {moment().add(2, 'years').format("MMMM/DD/YYYY")}
                                selectDateType = 'single'
                                showSelectMonthArrow = { true }
                                showSelectYearArrow = { true }
                                showDateInputField = { false }
                                disableDays = {[ "sun", "sat"]}
                                // disableCertainDates = {[...disable_recreational_am, ...newdisableuserRecreationalSched, ...newdisableuserMultipurposeSched, ...newdisableuserDialysisSched]}
                                duelSlotDates = {AllDateClose}
                                style={{
                                  height: '22px',
                                  width: '66px',
                                  position: 'center',
                                  top: '0',
                                  left: '0',
                                  fontSize: '1.1rem',
                                  borderRadius: '0 0 16px 0',
                                  color: '#fff',
                                  background: AllDateClose.length > 0 && AllDateClose[0].avaliableSlot === "closed" ? '#CCCCCC' : '#EF3A47',
                                  boxShadow: '0px 0px 3px 0px #000000',
                                  textAlign: 'left',
                                }}
                              />
                          
                          </div>
              </>
            }
             
          </Modal.Body>
          <Modal.Footer style={{ background: 'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))' }}>
            
            <Button style={{ background: '#EF3A47', color: 'white' }} variant="light" onClick={CloseDatehandleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>


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

.page-link {
  position: relative;
  display: block;
  color: #ff0000;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #dee2e6;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.form-control {
height: 150px;

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










.cld_btnAlign button {
  cursor: pointer;
  font-size: 30px;
  padding: 7px;
  height: fit-content;
  border-radius: 2px;
  border: none;
  box-shadow: 0px 0px 2.4px 0px #8a8a8a;
  background-color: #ffffff;
  color: #849095;
}

.cld_noslotWidth {
  width: 30%;
  min-width: 34rem !important;
}

@media screen and (max-width: 780px) {
.cld_noslotWidth {
  width: 20%;
  min-width: 27rem !important;

}
}

@media screen and (max-width: 480px) {
.cld_noslotWidth {
  width: 30%;
  min-width: 20rem !important;
}
}

hr {
border-top: 5px solid red;
width: 100%;

}
.cld_container table {
height: 47vh;
}
.cld_container td {
font-size: 16px;
font-weight: bold;
}

@media screen and (max-width: 480px) {
.cld_container td {
  font-size: 1rem;
  margin-top: 20px;
}
}

.line {
border-top: 1px solid red;
width: 100%;

}
.cld_slotWidth {
    width: 40%;
    min-width: 34rem;

}

@media screen and (max-width: 780px) {
  .cld_slotWidth {
    width: 20%;
    min-width: 27rem;

}
}

@media screen and (max-width: 480px) {
  .cld_slotWidth {
    width: 15%;
    min-width: 19rem;

}
}

.cld_noslotWidth {
  width: 40%;
  min-width: 34rem;
}

.cld_greenHighlight {
  background-color: #EF3A47;
}
.cld_slotInfoSize ~ span {
font-size: 11px;
font-weight: 500;
color: #383838;
}

.cld_highlightNumCircle {
height: 27px;
border-radius: 200px;
color: #ffffff;
margin: 0 5px;
background-color: #683838;
}




.cld_currentDay.cld_currentDayGreen::before {
background: #ff0000;
}

.cld_availableSlots {
  height:22px;
width: 66px;
  position: center;
  top: 0;
  left: 0;
  font-size: 1.1rem;
  border-radius: 0 0 16px 0;
  color: #fff;
  background: #EF3A47;
  box-shadow: 0px 0px 3px 0px #000000;
  text-align: left;
}

@media screen and (max-width: 480px) {
.cld_availableSlots {
  height: 18px;
width: 80%;
  position: center;
  top: 0;
  left: 0;
  font-size: 0.8rem;
  border-radius: 0 0 16px 0;
  color: #fff;
  background: #EF3A47;
  box-shadow: 0px 0px 3px 0px #000000;
  text-align: left;
}
}

@media screen and (max-width: 780px) {
.cld_availableSlots {
  height: 18px;
width: 80%;
  position: center;
  top: 0;
  left: 0;
  font-size: 1rem;
  border-radius: 0 0 16px 0;
  color: #fff;
  background: #EF3A47;
  box-shadow: 0px 0px 3px 0px #000000;
  text-align: left;
}
}


.cld_totalSlots {
height:21px;
width: 66px;
position: absolute;
bottom: 0;
right: 0;
font-size: 1.1rem;
border-radius: 16px 0 0 0;
box-shadow: 0px 0px 3px 0px #ff6500;
background: #fbddb9;
color: #000000;
}

@media screen and (max-width: 480px) {
.cld_totalSlots {
height: 18px;
width: 80%;
position: absolute;
bottom: 0;
right: 0;
font-size: 0.8rem;
border-radius: 16px 0 0 0;
box-shadow: 0px 0px 3px 0px #ff6500;
background: #fbddb9;
color: #000000;
}
}

@media screen and (max-width: 780px) {
.cld_totalSlots {
height: 18px;
width: 80%;
position: absolute;
bottom: 0;
right: 0;
font-size: 1rem;
border-radius: 16px 0 0 0;
box-shadow: 0px 0px 3px 0px #ff6500;
background: #fbddb9;
color: #000000;
}
}

.cld_slotInfoTotalClr {
background-color: #fbddb9;
}


.cld_slotInfoAvailableClr {
background-color: #EF3A47;
}

.cld_slotInfoSelectedGreenClr {
background-color: #683838;
}

.cld_disableDate {
color: #d1cfcf;
}
.cld_slotInfoLabel{
font-size: 1.1rem;
}

.cld_slotInfoDisabledClr {
background-color: #c1c1c1;
}

.cld_container {
  box-shadow: 0px 1px 5px 1px #ffffff;
  padding: 1%;
  border-radius: 5px;
  background: #ffffff;
}

  .cld_showDays {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    color: #EF3A47;
}

.cld_container th {
  font-weight: 400;
  color: #000000;
  font-size: 16px;
  font-weight: bold;
}

@media screen and (max-width: 480px) {
.cld_container th {
  color: #000000;
  font-size: 0.9rem;
  font-weight: bold;
}
}


.form-check-input:checked {
  background-color: #EF3A47;
  border-color: #EF3A47;
}

.fc .fc-daygrid-day-number {
  padding: 9px;
  position: relative;
  z-index: 4;
  font-size: 1.5rem;
  font-weight: bold;
}

.fc-daygrid-block-event .fc-event-time, .fc-daygrid-block-event .fc-event-title {
  padding: 25px;
  font-size: 1.2rem;
  font-weight: bold;
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

.fc {
  font-size: 1.2rem;
}

a {
  color: #EF3A47;
  text-decoration: none;
}

.fc-day {
  cursor: pointer;
}

.fc-day:hover {
  background-color: #f0f0f0;
}

.fc-h-event .fc-event-main {
  color: #fff;
  background-color: #EF3A47 !important;
}
.fc-h-event {
  background-color: #EF3A47 !important;
  border: 1px solid #EF3A47 !important;
}

.fc .fc-button-primary {
  background-color: #EF3A47;
  border: 1px solid #EF3A47 !important;
  color: var(--fc-button-text-color);
}

.fc .fc-button-primary:disabled {
  background-color: #EF3A47;
  border-color: #EF3A47;
  color: var(--fc-button-text-color);
}

hr.sep-2 {
  border: 0;
  height: 2px;
  background-image: linear-gradient(to right, #f0f0f0, #ff0000, #ff0000, #f0f0f0);
}

.card .card-header {
  color: white;
  padding: 15px;
  background: #EF3A47;
  border-radius: 4px 4px 0 0;
}
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