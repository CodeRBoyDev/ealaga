import React from "react";
import { Button } from 'reactstrap'

import Container from "react-bootstrap/Container";
import Stepper from "react-stepper-horizontal";
import image1 from "../../../../images/logovector.png";
import image3 from "../../../../images/massage.png";
import image4 from "../../../../images/dialysis.png";
import image5 from "../../../../images/conference.png";
import imageam from "../../../../images/am.png";
import imagepm from "../../../../images/pm.png";
import imagesunny from "../../../../images/sunny.png";
import { Card, ListGroup} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { TextField, createTheme,
  InputLabel,
  InputAdornment, FormControl, NativeSelect, FormLabel, FormControlLabel, RadioGroup, Radio, FormHelperText
} from "@material-ui/core";
import {
  ServicesWrapper,  ServicesH1, ServicesCard,ServicesCard2,ServicesWrappers2,
  ServicesH2,
  ServicesIcon,
  ServicesP,ServicesH3B,ServicesH3,
  ServicesWrappers, BtnWrap,ServicesWrappers3, ServicesCard3, ServicesWrappers4,
  ServicesCard4
} from "./HeroImageElements";
import { Transition } from 'react-transition-group';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import Calendar from 'react-select-date';
import { useState, useEffect } from 'react';
import axios from '../../../../axiosConfig';
import { Circles } from  'react-loader-spinner'
import { getUser } from '../../../login/helpers';
import moment from 'moment';
import { Fade } from "react-reveal";
import { Form, Modal } from 'react-bootstrap';
import RecreationalServicesList from './services.json';

const HeroImage = () => {

  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };
  let navigate = useNavigate();
  const [recreational_am, fetchrecreational_am] = useState();
  const [recreational_pm, fetchrecreational_pm] = useState();
  const [dialysis_am, fetchdialysis_am] = useState();
  const [dialysis_pm, fetchdialysis_pm] = useState();
  const [multipurpose_am, fetchmultipurpose_am] = useState();
  const [multipurpose_pm, fetchmultipurpose_pm] = useState();
  const [multipurpose_whole, fetchmultipurpose_whole] = useState();

  
  const [geclosedateAll, fetchclosedateAll] = useState();
  const [getclosedatesched, fetchclosedate] = useState();
  

  const updatedRecreationalAm = recreational_am?.filter((item) => {
    // Extract the date from the item in recreational_am
    const recreationalAmDate = new Date(item.date).toLocaleDateString();
    
    // Check if the date exists in geclosedateAll
    const isDateExists = geclosedateAll.some((closedDateItem) => {
      // Extract the date from the item in geclosedateAll
      const closedDate = new Date(closedDateItem.date).toLocaleDateString();
      
      // Compare the dates
      return closedDate === recreationalAmDate;
    });
  
    // If the date does not exist in geclosedateAll, keep the item in updatedRecreationalAm
    return !isDateExists;
  });

  const updatedRecreationalPm = recreational_pm?.filter((item) => {
    // Extract the date from the item in recreational_am
    const recreationalAmDate = new Date(item.date).toLocaleDateString();
    
    // Check if the date exists in geclosedateAll
    const isDateExists = geclosedateAll.some((closedDateItem) => {
      // Extract the date from the item in geclosedateAll
      const closedDate = new Date(closedDateItem.date).toLocaleDateString();
      
      // Compare the dates
      return closedDate === recreationalAmDate;
    });
  
    // If the date does not exist in geclosedateAll, keep the item in updatedRecreationalAm
    return !isDateExists;
  });


  const updatedDialysisAm = dialysis_am?.filter((item) => {
    // Extract the date from the item in recreational_am
    const recreationalAmDate = new Date(item.date).toLocaleDateString();
    
    // Check if the date exists in geclosedateAll
    const isDateExists = geclosedateAll.some((closedDateItem) => {
      // Extract the date from the item in geclosedateAll
      const closedDate = new Date(closedDateItem.date).toLocaleDateString();
      
      // Compare the dates
      return closedDate === recreationalAmDate;
    });
  
    // If the date does not exist in geclosedateAll, keep the item in updatedRecreationalAm
    return !isDateExists;
  });

  const updatedDialysisPm = dialysis_pm?.filter((item) => {
    // Extract the date from the item in recreational_am
    const recreationalAmDate = new Date(item.date).toLocaleDateString();
    
    // Check if the date exists in geclosedateAll
    const isDateExists = geclosedateAll.some((closedDateItem) => {
      // Extract the date from the item in geclosedateAll
      const closedDate = new Date(closedDateItem.date).toLocaleDateString();
      
      // Compare the dates
      return closedDate === recreationalAmDate;
    });
  
    // If the date does not exist in geclosedateAll, keep the item in updatedRecreationalAm
    return !isDateExists;
  });

  // console.log(updatedRecreationalAm)

  const [DialysisMonthlyBooking, setDialysisMonthlyBooking] = useState();
  const [disableDialysisDialysisfutureDates, setDialysisDialysisfutureDates] = useState();

  var DialysisMonthlyBookingLeft = 4 - DialysisMonthlyBooking;

  const [slot_dialyis, fetchdialyis] = useState();

  const [selectedDate, setDuelSlots] = useState();
  const [disableDate, setDisableDate] = useState();
  const [disableuserRecreationalSched, setDisableuserRecreationalSched] = useState();
  const [disableuserMultipurposeSched, setDisableuserMultipurposeSched] = useState();
  const [disableuserDialysisSched, setDisableuseruserDialysisSched] = useState();

   const [TotaluserRequirements, setTotaluserRequirements] = useState();

  const [getSelecServices, setSelecServices] = useState({service:""});
  const [getSelectTime, setSelectTime] = useState({time:""});

  function refreshPage() {
    window.location.reload();
  }
  

      const fetchDate= () => {
        axios({
          method: "get",
          url: `/api/schedule/${getUser()}`,
          headers: {
            "Content-Type" : "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
        }).then(response => {
        
          fetchdialyis(response.data.slot_dialysis);
          fetchrecreational_am(response.data.slot_recreational_am);
          fetchrecreational_pm(response.data.slot_recreational_pm);
          fetchdialysis_am(response.data.slot_dialysis_am);
          fetchdialysis_pm(response.data.slot_dialysis_pm);
          fetchmultipurpose_am(response.data.userMultipurposeSchedAm);
          fetchmultipurpose_pm(response.data.userMultipurposeSchedPm);
          fetchmultipurpose_whole(response.data.userMultipurposeSchedWhole);
          setDisableDate(response.data.disableDate);
          setDisableuserRecreationalSched(response.data.userRecreationalSched);
          setDisableuserMultipurposeSched(response.data.userMultipurposeSched);
          setDisableuseruserDialysisSched(response.data.userDialysisSched);
          setDialysisMonthlyBooking(response.data.DialysisbookingsThisMonth);
          setDialysisDialysisfutureDates(response.data.DialysisfutureDates);
          setTotaluserRequirements(response.data.totaluserRequirements);

          fetchclosedateAll(response.data.closedate);
          fetchclosedate(response.data.closedateSched);

      }).catch((err) => console.log(err));
    };
    // fetchDate();
   
    useEffect(() => {
      fetchDate();
       // Set an interval to fetch messages every 5 seconds
    const interval = setInterval(fetchDate, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
    },[]);
 

    const newSelectedDate = new Date(selectedDate).toLocaleDateString('en-US',["date", {month: 'numeric', day: 'numeric',year: 'numeric' 
  }])
    const newSelectedDatess = new Date(selectedDate).toDateString()

    const [isLoadings, setLoadings] = useState(false);
    
    function submitAppointment(event) {


      const newSelectedDates= {
        date: newSelectedDate,
        user_id: getUser(),
        category: getSelecServices.service,
        status: "reserved",
        recreational_services2: recreational_services2,
        purpose: multipurpose_services2.purpose,
        attendees_number: multipurpose_services2.attendees_number
      }

    

      if(newSelectedDate === "Invalid Date"){

        Swal.fire({
					title: 'Please select a date!',
          color: '#EF3A47',
					imageUrl: 'https://media1.giphy.com/media/fqIOmNAvFOaiQO9GFy/giphy.gif?cid=ecf05e47znz5hzwird0qfu43mht206tqfrhjhkira9fnkx5l&rid=giphy.gif&ct=s',
					imageWidth: 200,
					imageHeight: 200,
					imageAlt: 'Custom image',
					confirmButtonColor: '#EF3A47',
				  })

      }else{

        Swal.fire({
          title: 'Are you sure you want to accept your appointment?',
          icon: 'warning',
          color: '#EF3A47',
          showCancelButton: true,
          confirmButtonColor: '#EF3A47',
          cancelButtonColor: '#f8bb86',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            if(!isLoadings) {
              Swal.fire({
                title: 'Loading!',
                text: 'Please wait while processing your booking.',
                imageUrl: 'https://media3.giphy.com/media/jtFds4dHM4bXUOnHAU/giphy.gif?cid=ecf05e475is9ul1rls0lk34lqv2myv5dwhbaptp7xbpkwh42&rid=giphy.gif&ct=s',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom image',
                confirmButtonColor: '#EF3A47',
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false
                })
          }
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
                              setLoadings(true)
                               fetchDate();
                               navigate('/client/dashboard')
                               setSelecServices({service:""})
                               setSelectTime({time:""})

                               if(response?.data?.schedule?.category == "Multipurpose Hall")
                               {
                                Swal.fire({
                                  // title: 'Incomplete Dialysis Requirements',
                                  html: 
                                  '<h5 style="font-size: 1.2rem; text-align: justify;" >Reminder - Multipurpose Hall</h5>'
                                  +
                                  '<p style="font-size: 1rem; text-align: justify; text-indent: 20px; " >You can only cancel your schedule one day before in case you will not be able to attend, or else it will be marked as not attended. This helps us ensure that other users have the opportunity to book that slot.</p>'
                                  +
                                  '<p style="font-size: 1rem; text-align: justify; text-indent: 20px; " >Please note that if you accumulate 5 not attended, you will be restricted from booking for a period of 7 days.</p>'
                                  ,
                                  imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1679320574/reminderbook_zgitkl.gif',
                                  imageWidth: 400,
                                  imageHeight: 300,
                                  imageAlt: 'Custom image',
                                  confirmButtonColor: '#EF3A47',
                                  footer: '<a href="/#/client/activities" style="color:red;" id="view-status-link">Redirect to Schedule</a>',
                                  allowOutsideClick: false,
                                  allowEscapeKey: false
                                });
                                document.getElementById('view-status-link').addEventListener('click', function() {
                                  Swal.close();
                                });
                               }else{
                                Swal.fire({
                                  // title: 'Incomplete Dialysis Requirements',
                                  html: 
                                  '<h5 style="font-size: 1.2rem; text-align: justify;" >Reminder</h5>'
                                  +
                                  '<p style="font-size: 1rem; text-align: justify; text-indent: 20px; " >Please cancel your booked schedule if you are unable to attend the day before, or else it will be marked as not attended. This helps us ensure that other users have the opportunity to book that slot.</p>'
                                  +
                                  '<p style="font-size: 1rem; text-align: justify; text-indent: 20px; " >Please note that if you accumulate 5 not attended, you will be restricted from booking for a period of 7 days.</p>'
                                  ,
                                  imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1679320574/reminderbook_zgitkl.gif',
                                  imageWidth: 400,
                                  imageHeight: 300,
                                  imageAlt: 'Custom image',
                                  confirmButtonColor: '#EF3A47',
                                  footer: '<a href="/#/client/activities" style="color:red;" id="view-status-link">Redirect to Schedule</a>',
                                  allowOutsideClick: false,
                                  allowEscapeKey: false
                                });
                                document.getElementById('view-status-link').addEventListener('click', function() {
                                  Swal.close();
                                });
                               }
                               
                               
                              
                            })
                  .catch(error => {
                               
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

      
    //   if(getSelecServices.service == "dialysis_wholeday"){
        
    //     if (DialysisMonthlyBooking >= 4) {
    //       Swal.fire({
    //         title: 'Sorry, you have reached the booking limit for this month!',
    //         color: '#EF3A47',
    //         imageUrl: 'https://media1.giphy.com/media/fqIOmNAvFOaiQO9GFy/giphy.gif?cid=ecf05e47znz5hzwird0qfu43mht206tqfrhjhkira9fnkx5l&rid=giphy.gif&ct=s',
    //         imageWidth: 200,
    //         imageHeight: 200,
    //         imageAlt: 'Custom image',
    //         confirmButtonColor: '#EF3A47',
    //         })
    //     }else{
    //       const newSelectedDates= {
    //         date: newSelectedDate,
    //         user_id: getUser(),
    //         category: getSelecServices.service,
    //         status: "not attended"
    //       }
    

    
    //       if(newSelectedDate === "Invalid Date"){
    
    //         Swal.fire({
    //           title: 'Please select a date!',
    //           color: '#EF3A47',
    //           imageUrl: 'https://media1.giphy.com/media/fqIOmNAvFOaiQO9GFy/giphy.gif?cid=ecf05e47znz5hzwird0qfu43mht206tqfrhjhkira9fnkx5l&rid=giphy.gif&ct=s',
    //           imageWidth: 200,
    //           imageHeight: 200,
    //           imageAlt: 'Custom image',
    //           confirmButtonColor: '#EF3A47',
    //           })
    
    //       }else{
    
    //         Swal.fire({
    //           title: 'Are you sure you want to accept your appointment?',
    //           icon: 'warning',
    //           color: '#EF3A47',
    //           showCancelButton: true,
    //           confirmButtonColor: '#EF3A47',
    //           cancelButtonColor: '#f8bb86',
    //           confirmButtonText: 'Yes',
    //           cancelButtonText: 'No'
    //         }).then((result) => {
    //           if (result.isConfirmed) {
    //             if(!isLoadings) {
    //               Swal.fire({
    //                 title: 'Loading!',
    //                 text: 'Please wait while processing your booking.',
    //                 imageUrl: 'https://media3.giphy.com/media/jtFds4dHM4bXUOnHAU/giphy.gif?cid=ecf05e475is9ul1rls0lk34lqv2myv5dwhbaptp7xbpkwh42&rid=giphy.gif&ct=s',
    //                 imageWidth: 200,
    //                 imageHeight: 200,
    //                 imageAlt: 'Custom image',
    //                 confirmButtonColor: '#EF3A47',
    //                 showCancelButton: false,
    //                 showConfirmButton: false,
    //                 allowOutsideClick: false
    //                 })
    //           }
    //             axios({
    //               method:"post",
    //               url:`/api/schedule/add`, 
    //               data: newSelectedDates,
    //               headers: {
    //                 "Content-Type" : "application/json",
    //                 'Access-Control-Allow-Origin': '*',
    //                 'Access-Control-Allow-Headers': '*',
    //               }
    //           })
    //                 .then(response => {
    //                               setLoadings(true)
    //                                fetchDate();
    //                                navigate('/client/dashboard')
    //                                setSelecServices({service:""})
    //                                setSelectTime({time:""})
                                   
    //                                 Swal.fire({
    //                                   title: 'Thank You!',
    //                                   text: 'You have successfully created your booking.',
    //                                   imageUrl: 'https://media0.giphy.com/media/dYmYhn4OXI1aOpVpFO/giphy.gif?cid=ecf05e479ym4epjp1orghtshgvg92nc27cty98jbg9rfzfdr&rid=giphy.gif&ct=s',
    //                                   imageWidth: 200,
    //                                   imageHeight: 200,
    //                                   imageAlt: 'Custom image',
    //                                   confirmButtonColor: '#EF3A47',
    //                                   })
    //                             })
    //                   .catch(error => {
  
    //                                   Swal.fire({
    //                                     icon: 'error',
    //                                     title: 'Oops...',
    //                                     text: 'Something went wrong!',
    //                                     footer: '<a href="">Why do I have this issue?</a>'
    //                                   })
    //                                   // setError(error.response.data);
                                     
    //                               });
      
    //           }
    //         })
            
    //       }
    //     }
        

    //   }else{


    //   const newSelectedDates= {
    //     date: newSelectedDate,
    //     user_id: getUser(),
    //     category: getSelecServices.service,
    //     status: "not attended",
    //     recreational_services2: recreational_services2,
    //     purpose: multipurpose_services2.purpose,
    //     attendees_number: multipurpose_services2.attendees_number
    //   }



    //   if(newSelectedDate === "Invalid Date"){

    //     Swal.fire({
		// 			title: 'Please select a date!',
    //       color: '#EF3A47',
		// 			imageUrl: 'https://media1.giphy.com/media/fqIOmNAvFOaiQO9GFy/giphy.gif?cid=ecf05e47znz5hzwird0qfu43mht206tqfrhjhkira9fnkx5l&rid=giphy.gif&ct=s',
		// 			imageWidth: 200,
		// 			imageHeight: 200,
		// 			imageAlt: 'Custom image',
		// 			confirmButtonColor: '#EF3A47',
		// 		  })

    //   }else{

    //     Swal.fire({
    //       title: 'Are you sure you want to accept your appointment?',
    //       icon: 'warning',
    //       color: '#EF3A47',
    //       showCancelButton: true,
    //       confirmButtonColor: '#EF3A47',
    //       cancelButtonColor: '#f8bb86',
    //       confirmButtonText: 'Yes',
    //       cancelButtonText: 'No'
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         if(!isLoadings) {
    //           Swal.fire({
    //             title: 'Loading!',
    //             text: 'Please wait while processing your booking.',
    //             imageUrl: 'https://media3.giphy.com/media/jtFds4dHM4bXUOnHAU/giphy.gif?cid=ecf05e475is9ul1rls0lk34lqv2myv5dwhbaptp7xbpkwh42&rid=giphy.gif&ct=s',
    //             imageWidth: 200,
    //             imageHeight: 200,
    //             imageAlt: 'Custom image',
    //             confirmButtonColor: '#EF3A47',
    //             showCancelButton: false,
    //             showConfirmButton: false,
    //             allowOutsideClick: false
    //             })
    //       }
    //         axios({
    //           method:"post",
    //           url:`/api/schedule/add`, 
    //           data: newSelectedDates,
    //           headers: {
    //             "Content-Type" : "application/json",
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': '*',
    //           }
    //       })
    //             .then(response => {
    //                           setLoadings(true)
    //                            fetchDate();
    //                            navigate('/client/dashboard')
    //                            setSelecServices({service:""})
    //                            setSelectTime({time:""})
                               
    //                             Swal.fire({
    //                               title: 'Thank You!',
    //                               text: 'You have successfully created your booking.',
    //                               imageUrl: 'https://media0.giphy.com/media/dYmYhn4OXI1aOpVpFO/giphy.gif?cid=ecf05e479ym4epjp1orghtshgvg92nc27cty98jbg9rfzfdr&rid=giphy.gif&ct=s',
    //                               imageWidth: 200,
    //                               imageHeight: 200,
    //                               imageAlt: 'Custom image',
    //                               confirmButtonColor: '#EF3A47',
    //                               })
    //                         })
    //               .catch(error => {

    //                               Swal.fire({
    //                                 icon: 'error',
    //                                 title: 'Oops...',
    //                                 text: 'Something went wrong!',
    //                                 footer: '<a href="">Why do I have this issue?</a>'
    //                               })
    //                               // setError(error.response.data);
                                 
    //                           });
  
    //       }
    //     })
        
    //   }
    // }
          
                    
    }
 

  moment.locale('en');
  var newdisableuserRecreationalSched= [];
  var newdisableuserMultipurposeSched= [];
  var newdisableuserDialysisSched= [];
  var newdisableDialysisDialysisfutureDates= [];
  
  var newdisablegetclosedatesched= [];
  

    // iterate over the dates list from above

    for(let i = 0; i <= getclosedatesched?.length; i++) {
      // pass the date at index i into moment
      // let date = moment(disableUserSchedDate[i]).subtract(1, "days").format('MM-DD-YYYY');
      let date = getclosedatesched[i];
      // console.log("date", date);
      // add this new date to the newDateArray
      newdisablegetclosedatesched.push(date)
      
  }


    for(let i = 0; i <= disableuserRecreationalSched?.length; i++) {
        // pass the date at index i into moment
        // let date = moment(disableUserSchedDate[i]).subtract(1, "days").format('MM-DD-YYYY');
        let date = disableuserRecreationalSched[i];
        // console.log("date", date);
        // add this new date to the newDateArray
        newdisableuserRecreationalSched.push(date)
        
    }

    // iterate over the dates list from above
    for(let i = 0; i <= disableuserMultipurposeSched?.length; i++) {
      // pass the date at index i into moment
      // let date = moment(disableUserSchedDate[i]).subtract(1, "days").format('MM-DD-YYYY');
        let date = disableuserMultipurposeSched[i];
        // console.log("date", date);
        // add this new date to the newDateArray
        newdisableuserMultipurposeSched.push(date)
        
    }

    for(let i = 0; i <= disableuserDialysisSched?.length; i++) {
      // pass the date at index i into moment
      // let date = moment(disableUserSchedDate[i]).subtract(1, "days").format('MM-DD-YYYY');
        let date = disableuserDialysisSched[i];
        // console.log("date", date);
        // add this new date to the newDateArray
        newdisableuserDialysisSched.push(date)
        
    }

    for(let i = 0; i <= disableDialysisDialysisfutureDates?.length; i++) {
      // pass the date at index i into moment
      // let date = moment(disableUserSchedDate[i]).subtract(1, "days").format('MM-DD-YYYY');
        let date = disableDialysisDialysisfutureDates[i];
        // console.log("date", date);
        // add this new date to the newDateArray
        newdisableDialysisDialysisfutureDates.push(date)
        
    }


    ////////multipurpose

    var newdisableuserMultipurposeSchedAm= [];
    var newdisableuserMultipurposeSchedPm= [];
    var newdisableuserMultipurposeSchedWhole= [];

    for(let i = 0; i <= multipurpose_am?.length; i++) {
      // pass the date at index i into moment
      // let date = moment(disableUserSchedDate[i]).subtract(1, "days").format('MM-DD-YYYY');
        let date = multipurpose_am[i];
        // console.log("date", date);
        // add this new date to the newDateArray
        newdisableuserMultipurposeSchedAm.push(date)
        
    }

    for(let i = 0; i <= multipurpose_pm?.length; i++) {
      // pass the date at index i into moment
      // let date = moment(disableUserSchedDate[i]).subtract(1, "days").format('MM-DD-YYYY');
        let date = multipurpose_pm[i];
        // console.log("date", date);
        // add this new date to the newDateArray
        newdisableuserMultipurposeSchedPm.push(date)
        
    }

    for(let i = 0; i <= multipurpose_whole?.length; i++) {
      // pass the date at index i into moment
      // let date = moment(disableUserSchedDate[i]).subtract(1, "days").format('MM-DD-YYYY');
        let date = multipurpose_whole[i];
        // console.log("date", date);
        // add this new date to the newDateArray
        newdisableuserMultipurposeSchedWhole.push(date)
        
    }

// console.log(newDateArray)


    // console.log(newDateArray);
  //  const current = new Date();
  // const dateNow = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;
 
  const dateNow = moment(new Date()).format('YYYY-MM-DD')

  
//////////////////////////////////////////// date slot --------------------------

  // let recreational_am_array = JSON.parse(recreational_am); --- Disable all date that has no slot
  const disable_recreational_am = recreational_am?.filter(x => x.avaliableSlot === 0).map(item => item.date);
  const disable_recreational_pm = recreational_pm?.filter(x => x.avaliableSlot === 0).map(item => item.date);

  const disable_dialysis_am = dialysis_am?.filter(x => x.avaliableSlot === 0).map(item => item.date);
  const disable_dialysis_pm = dialysis_pm?.filter(x => x.avaliableSlot === 0).map(item => item.date);

  const disable_slot_dialyis = slot_dialyis?.filter(x => x.avaliableSlot === 0).map(item => item.date);

  // const disable_multipurpose_am = multipurpose_am?.filter(x => x.avaliableSlot === 0).map(item => item.date);
  // const disable_multipurpose_pm = multipurpose_pm?.filter(x => x.avaliableSlot === 0).map(item => item.date);










          ///----------Recreational activies list of services

         

          const [recreational_services, setRecreationalServices] = useState([]);
          const [recreational_services2, setRecreationalServices2] = useState([]);

          const [multipurpose_services, setMultipurpose_Services] = useState({
            purpose: '',
            attendees_number: '',
          });
          const [multipurpose_services2, setMultipurpose_Services2] = useState([]);
        
          const [error, setError] = useState('');
          const [service_error, setServiceError] = useState([]);
          const [service_errorMP, setErrorMP] = useState([]);

          const validateForm = () => {
            if (!multipurpose_services.purpose) {
              setError('Please enter a booking purpose');
              return false;
            }
            if (!multipurpose_services.attendees_number) {
              setError('Please select number of attendees');
              return false;
            }
            return true;
          };
          
         
          const handleChangess = (service) => {
            if (recreational_services.includes(service)) {
              setRecreationalServices(recreational_services.filter((s) => s !== service));
            } else if (recreational_services.length < 3) {
              setRecreationalServices([...recreational_services, service]);
            }
          };

          const onChange = e => {
            setMultipurpose_Services({ ...multipurpose_services, [e.target.name]: e.target.value })
                  }


          const submitRecreationalServices = () => {

            if(recreational_services == ""){
              setServiceError("no_service_selected")
            }else{
              setSelecServices({service:"recreational"})
              setRecreationalServices2(recreational_services);
              handleClose()
             
            }
          }


          const submitDialysisServices = () => {

            // if(!TotaluserRequirements){
            //   Swal.fire({
            //     title: 'Loading!',
            //     imageUrl: 'https://media3.giphy.com/media/jtFds4dHM4bXUOnHAU/giphy.gif?cid=ecf05e475is9ul1rls0lk34lqv2myv5dwhbaptp7xbpkwh42&rid=giphy.gif&ct=s',
            //     imageWidth: 200,
            //     imageHeight: 200,
            //     imageAlt: 'Custom image',
            //     confirmButtonColor: '#EF3A47',
            //     showCancelButton: false,
            //     showConfirmButton: false,
            //     allowOutsideClick: false
            //     })
            // }

            if(TotaluserRequirements != 8){
              Swal.fire({
                // title: 'Incomplete Dialysis Requirements',
                html: 
                '<h5 style="font-size: 1.2rem; text-align: justify;" >Incomplete Dialysis Requirements</h5>'
                +
                '<p style="font-size: 1rem; text-align: justify; text-indent: 20px; " >Your requirements for dialysis in your health information profile are currently incomplete. To ensure that we provide you with the best possible care, we kindly request that you update your profile by checking the appropriate checkbox to indicate whether or not you have fulfilled all the necessary requirements for dialysis.</p>'
                +
                '<p style="font-size: 1rem; text-align: justify; text-indent: 20px; " >Please navigate to your profile, go to the "Health Information" section, select "Dialysis Requirements", and check the relevant checkbox.</p>'
                ,
                imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1677103433/Incomplete_requirements_notas6.gif',
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: 'Custom image',
                confirmButtonColor: '#EF3A47',
                footer: '<a href="/#/client/profile/information" style="color:red;" id="view-status-link">Redirect to Profile</a>',
                allowOutsideClick: false,
                allowEscapeKey: false
              });
              document.getElementById('view-status-link').addEventListener('click', function() {
                Swal.close();
              });
            }else{

              setSelecServices({service:"dialysis"})
              handleCloseDialysis()
              // setSelectTime({time:"dialysis_wholeday"});
              // setSelecServices({service:"dialysis_wholeday"});
           
             
            }
          }
          

          const submitMultipurposeServices = () => {
            // console.log(multipurpose_services);

            if (!validateForm()) {
              setErrorMP("no_service_selected")
              return;
            } else {
              setSelecServices({service:"multipurpose"})
              setMultipurpose_Services2(multipurpose_services);
              handleCloseMP()
            }
          }

       

          ///////modalllll



          const [show, setShow] = useState(false);
          const [showMP, setShowMP] = useState(false);
          const [showDialysis, setShowDialysis] = useState(false);

          const handleClose =() => {
                  setShow(false);
                  setRecreationalServices([]);
                  setServiceError("")
                  // setaddHealth({ health_problem:"",
                  // description:""})
                  // setError({ health_problem:"",
                  // description:""})
                  
                  // setAnimalImage([]);
                } 

                
          const handleCloseMP =() => {
            setShowMP(false);
            setError()
            setMultipurpose_Services([]);
            setErrorMP([])
            // setaddHealth({ health_problem:"",
            // description:""})
            // setError({ health_problem:"",
            // description:""})
            
            // setAnimalImage([]);
          } 

          const handleCloseDialysis =() => {
            setShowDialysis(false);
            // setaddHealth({ health_problem:"",
            // description:""})
            // setError({ health_problem:"",
            // description:""})
            
            // setAnimalImage([]);
          } 

          const handleShow = () => setShow(true);
          const handleShowMP = () => setShowMP(true);
          const handleShowDialysis = () => setShowDialysis(true);



  return (
    <Container style={{ minHeight: "45vh" }}>
    <div style={styles}>
    <ServicesWrapper>

    {getSelecServices.service == "" ? <Stepper
        steps={[
          {
            title: "Pick a service",
          },
          { title: "Select a Time / Requirements" },
          { title: "Set a Schedule and Confirm" },
        ]}
        activeStep={0}
        activeColor="#EF3A47"
        completeColor="#EF3A47"
        activeTitleColor="#EF3A47"
        completeTitleColor="#EF3A47"
        circleFontColor="#FFF"
        defaultBorderColor="#EF3A47"
        defaultBorderStyle="#EF3A47"
        completeBarColor="#EF3A47"
      /> 
      : getSelecServices.service == "recreational" ? <Stepper
      steps={[
        {
          title: "Pick a service",
        },
        { title: "Select a Time" },
        { title: "Set a Schedule and Confirm" },
      ]}
      activeStep={1}
      activeColor="#EF3A47"
      completeColor="#EF3A47"
      activeTitleColor="#EF3A47"
      completeTitleColor="#EF3A47"
      circleFontColor="#FFF"
      defaultBorderColor="#EF3A47"
      defaultBorderStyle="#EF3A47"
      completeBarColor="#EF3A47"
    /> 
    : getSelecServices.service == "dialysis" ? <Stepper
      steps={[
        {
          title: "Pick a service",
        },
        { title: "Requirements for dialysis" },
        { title: "Set a Schedule and Confirm" },
      ]}
      activeStep={1}
      activeColor="#EF3A47"
      completeColor="#EF3A47"
      activeTitleColor="#EF3A47"
      completeTitleColor="#EF3A47"
      circleFontColor="#FFF"
      defaultBorderColor="#EF3A47"
      defaultBorderStyle="#EF3A47"
      completeBarColor="#EF3A47"
    /> 
    : getSelecServices.service == "multipurpose" ? <Stepper
      steps={[
        {
          title: "Pick a service",
        },
        { title: "Select a Time" },
        { title: "Set a Schedule and Confirm" },
      ]}
      activeStep={1}
      activeColor="#EF3A47"
      completeColor="#EF3A47"
      activeTitleColor="#EF3A47"
      completeTitleColor="#EF3A47"
      circleFontColor="#FFF"
      defaultBorderColor="#EF3A47"
      defaultBorderStyle="#EF3A47"
      completeBarColor="#EF3A47"
    /> 
    : getSelectTime.time == "recreational_am" ? <Stepper
      steps={[
        {
          title: "Pick a service",
        },
        { title: "Select a Time" },
        { title: "Set a Schedule and Confirm" },
      ]}
      activeStep={2}
      activeColor="#EF3A47"
      completeColor="#EF3A47"
      activeTitleColor="#EF3A47"
      completeTitleColor="#EF3A47"
      circleFontColor="#FFF"
      defaultBorderColor="#EF3A47"
      defaultBorderStyle="#EF3A47"
      completeBarColor="#EF3A47"
    /> 
      : 
      <Stepper
      steps={[
        {
          title: "Pick a service",
        },
        { title: "Select a Time" },
        { title: "Set a Schedule and Confirm" },
      ]}
      activeStep={2}
      activeColor="#EF3A47"
      completeColor="#EF3A47"
      activeTitleColor="#EF3A47"
      completeTitleColor="#EF3A47"
      circleFontColor="#FFF"
      defaultBorderColor="#EF3A47"
      defaultBorderStyle="#EF3A47"
      completeBarColor="#EF3A47"
    />}
    
     
      

      </ServicesWrapper>

      {getSelecServices.service == "recreational" ?  
      <>
       <ServicesH1>Select a Time
        <h6 style={{color:"black"}}>Choose Your Time: AM or PM</h6>
        </ServicesH1>
        <Fade left duration={2000} distance="40px">
        <ServicesWrappers3>
          <ServicesCard3 onClick={()  => {setSelectTime({time:"recreational_am"});setSelecServices({service:"recreational_am"})}}>
            <ServicesIcon src={imageam} />
            <ServicesH2>8:00am-11:59am</ServicesH2>
          </ServicesCard3>
          <ServicesCard3 onClick={()  => {setSelectTime({time:"recreational_pm"});setSelecServices({service:"recreational_pm"})}}>
            <ServicesIcon src={imagepm} />
            <ServicesH2> 1:00pm-5:00pm</ServicesH2>
          </ServicesCard3>
         
        </ServicesWrappers3>
        </Fade>
        <BtnWrap>
        <Button outline color="danger" onClick={()  => {setSelecServices({service:""}); setRecreationalServices2([]);}}>← Back</Button>
        </BtnWrap>
      </>
      : getSelectTime.time == "recreational_am" ?  
      <>
     
      <ServicesH1>Set a schedule and confirm
        <h6 style={{color:"black"}}>Set the date of your desired day of activities and confirm</h6>
        </ServicesH1>
        <Fade left duration={2000} distance="40px">
        {!recreational_am ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
        alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
        :
        <ServicesWrappers>
        <ServicesCard>
       
        <Calendar
       onSelect = {(date) => setDuelSlots(date)}
       minDate = {dateNow}
       maxDate = "12/31/2023"
       selectDateType = 'single'
       showSelectMonthArrow = { true }
       showSelectYearArrow = { true }
       showDateInputField = { false }
       disableDays = {[ "sun", "sat"]}
       disableCertainDates = {[...disable_recreational_am, ...newdisableuserRecreationalSched, ...newdisableuserMultipurposeSched, ...newdisableuserDialysisSched, ...newdisablegetclosedatesched]}
       duelSlotDates = {[...updatedRecreationalAm, ...geclosedateAll]}
     />
     </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={image1} />
            <ServicesH2>DETAILS</ServicesH2>
            {newSelectedDate === "Invalid Date" ?  <ServicesH3B >Schedule<ServicesH3> | Morning 8:00am - 11:59am</ServicesH3></ServicesH3B>
            : <ServicesH3B>Schedule<ServicesH3>{newSelectedDatess} | Morning 8:00am - 11:59am</ServicesH3></ServicesH3B>}
           <hr></hr>
            <ServicesH3B>PLACE:<ServicesH3>13, 1639 Manzanitas St, Taguig, Metro Manila</ServicesH3></ServicesH3B><hr></hr>
            <ServicesH3B>TYPE OF SERVICE<ServicesH3>Recreational Activities<ServicesP>Therapy Pool, Massage, Saunas, Yoga, Ballroom, Gym, Board Games, Cinema </ServicesP></ServicesH3> </ServicesH3B>
             
            <hr className="line"></hr>
            <BtnWrap>
        <Button outline color="danger" onClick={()  => {setSelecServices({service:"recreational"});setSelectTime({time:""});setDuelSlots("")}}>← Back</Button>&nbsp;
        <Button outline color="danger" onClick={submitAppointment}>Confirm →</Button>
        </BtnWrap>
          </ServicesCard>
        </ServicesWrappers>
      }
  </Fade>
      </>
       : getSelectTime.time == "recreational_pm" ?  
       <>
     
       <ServicesH1>Set a schedule and confirm
         <h6 style={{color:"black"}}>Set the date of your desired day of activities and confirm</h6>
         </ServicesH1>
  
         {!recreational_am ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
         alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
         :
         <ServicesWrappers>
         <ServicesCard>
        
         <Calendar
        onSelect = {(date) => setDuelSlots(date)}
        minDate = {dateNow}
        maxDate = "12/31/2023"
        selectDateType = 'single'
        showSelectMonthArrow = { true }
        showSelectYearArrow = { true }
        showDateInputField = { false }
        disableDays = {[ "sun", "sat"]}
        disableCertainDates = {[...disable_recreational_pm, ...newdisableuserRecreationalSched, ...newdisableuserMultipurposeSched, ...newdisableuserDialysisSched, ...newdisablegetclosedatesched]}
        duelSlotDates = {[...updatedRecreationalPm, ...geclosedateAll]}
      />
      </ServicesCard>
           <ServicesCard>
             <ServicesIcon src={image1} />
             <ServicesH2>DETAILS</ServicesH2>
             {newSelectedDate === "Invalid Date" ?  <ServicesH3B >Schedule<ServicesH3> | Afternoon 1:00pm - 5:00pm</ServicesH3></ServicesH3B>
             : <ServicesH3B>Schedule<ServicesH3>{newSelectedDatess} | Afternoon 1:00pm - 5:00pm</ServicesH3></ServicesH3B>}
            <hr></hr>
             <ServicesH3B>PLACE:<ServicesH3>13, 1639 Manzanitas St, Taguig, Metro Manila</ServicesH3></ServicesH3B><hr></hr>
             <ServicesH3B>TYPE OF SERVICE<ServicesH3>Recreational Activities<ServicesP>Therapy Pool, Massage, Saunas, Yoga, Ballroom, Gym, Board Games, Cinema </ServicesP></ServicesH3> </ServicesH3B>
              
             <hr className="line"></hr>
             <BtnWrap>
         <Button outline color="danger" onClick={()  => {setSelecServices({service:"recreational"});setSelectTime({time:""});setDuelSlots("")}}>← Back</Button>&nbsp;
         <Button outline color="danger" onClick={submitAppointment}>Confirm →</Button>
         </BtnWrap>
           </ServicesCard>
         </ServicesWrappers>
       }
  
       </>

   
    : getSelecServices.service == "dialysis" ? 

//     <>
//      <Fade left duration={2000} distance="40px">
//      <div style={{ display: "flex",  justifyContent: "center" }}>
//        <div style={{ width: "30rem"}}>
//             <Card style={{background: "linear-gradient(to bottom,rgba(255,186,186,50%),rgba(255,186,186,0%))"}}>
//             <Card.Title style={{ color: "#EF3A47", marginTop: "1rem",  fontWeight: "bold"}}>Requirements for dialysis</Card.Title>
//             <Card.Subtitle style={{ marginBottom: "1rem", marginLeft: "1rem" }} className="mb-2 text-muted">Ensure you have the necessary dialysis requirements to bring before clicking the 'proceed.'</Card.Subtitle>
       
//          <ListGroup>
//           <ul style={{ textAlign: "left", marginTop: "0.5rem", marginLeft: "1rem" }}>
//             <li>Medical Abstract or History</li>
//             <li>Pinakahuling Hepatitis Profile - HBsAg, anti-HCV, anti-HBs
// <br/>(nakuha sa nakaraang tatlong buwan)</li>
//             <li>Pinakahuling Complete Blood Count (CBC)
//             <br/>(nakuha sa nakaraang buwan)</li>
//             <li>Pinakahuling resulta ng Creatin, K, Ca, Phosphorus, Albumin
//             <br/>(nakuha sa nakaraang buwan)</li>
//             <li>Swab Test Result
//             <br/>(nakuha sa nakaraang dalawang linggo)</li>
//             <li>Chest X-ray
//             <br/>(nakuha sa nakaraang anim buwan)</li>
//               <li>Kopya ng Treatment Monitoring Sheet/Record (Huling tatlong treatment) mula sa huling dialysis center</li>
//               <li>Voter's Registration/Certificate or any Valid ID</li>
             
//           </ul>
//         </ListGroup>
      
              
             
//             </Card>
//             </div>
//             </div>
//      </Fade>
//     <BtnWrap>
//         <Button outline color="danger" onClick={()  => {setSelecServices({service:""})}}>← Back</Button>&nbsp;
//         {/* <Button outline color="danger" onClick={()  => {setSelectTime({time:"dialysis_wholeday"});setSelecServices({service:"dialysis_wholeday"})}}>Proceed →</Button> */}
//         <Button outline color="danger" onClick={() => submitDialysisServices()}>Proceed →</Button>
//         </BtnWrap>
//    </>

        <>
        <ServicesH1>Select a Time
        <h6 style={{color:"black"}}>Choose Your Time: AM or PM</h6>
        </ServicesH1>
        <Fade left duration={2000} distance="40px">
        <ServicesWrappers3>
          <ServicesCard3 onClick={()  => {setSelectTime({time:"dialysis_am"});setSelecServices({service:"dialysis_am"})}}>
            <ServicesIcon src={imageam} />
            <ServicesH2>8:00am-11:59am</ServicesH2>
          </ServicesCard3>
          <ServicesCard3 onClick={()  => {setSelectTime({time:"dialysis_pm"});setSelecServices({service:"dialysis_pm"})}}>
            <ServicesIcon src={imagepm} />
            <ServicesH2> 1:00pm-5:00pm</ServicesH2>
          </ServicesCard3>
          
        </ServicesWrappers3>
        </Fade>
        <BtnWrap>
        <Button outline color="danger" onClick={()  => {setSelecServices({service:""}); setRecreationalServices2([]);}}>← Back</Button>
        </BtnWrap>
        </>
   
  //   : getSelectTime.time == "dialysis_wholeday" ?

  //   <>
     
  //   <ServicesH1>Set a schedule and confirm
  //     <h6 style={{color:"black"}}>Set the date of your desired day of activities and confirm</h6>
  //     <h5>Monthly Bookings Remaining: {DialysisMonthlyBookingLeft}</h5>
    
  //     </ServicesH1>
  //     {!slot_dialyis ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
  //     alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
  //     :
  //     <ServicesWrappers>
  //     <ServicesCard>
     
  //     <Calendar
  //    onSelect = {(date) => setDuelSlots(date)}
  //    minDate = {dateNow}
  //    maxDate = "12/31/2023"
  //    selectDateType = 'single'
  //    showSelectMonthArrow = { true }
  //    showSelectYearArrow = { true }
  //    showArrow = {false}
  //    showDateInputField = { false }
  //    disableDays = {[ "sun", "sat"]}
  //    disableCertainDates = {[...disable_slot_dialyis, ...newdisableDialysisDialysisfutureDates, ...newdisableuserDialysisSched]}
  //    duelSlotDates = {slot_dialyis}
  //  />
  //  </ServicesCard>
  //       <ServicesCard>
  //         <ServicesIcon src={image1} />
  //         <ServicesH2>DETAILS</ServicesH2>
  //         {newSelectedDate === "Invalid Date" ?  <ServicesH3B >Schedule<ServicesH3> | Wholeday 8:00am - 5:00pm</ServicesH3></ServicesH3B>
  //         : <ServicesH3B>Schedule<ServicesH3>{newSelectedDatess} | Wholeday 8:00am - 5:00pm</ServicesH3></ServicesH3B>}
  //        <hr></hr>
  //        <ServicesH3B>PLACE:<ServicesH3>13, 1639 Manzanitas St, Taguig, Metro Manila</ServicesH3></ServicesH3B><hr></hr>
  //           <ServicesH3B>TYPE OF SERVICE<ServicesH3>Dialysis<ServicesP>A service allowing users to book a schedule for dialysis treatment 4 times per month.</ServicesP></ServicesH3> </ServicesH3B>
            
  //         <hr className="line"></hr>
  //         <BtnWrap>
  //     <Button outline color="danger" onClick={()  => {setSelecServices({service:"dialysis"});setSelectTime({time:""});setDuelSlots("")}}>← Back</Button>&nbsp;
  //     <Button outline color="danger" onClick={submitAppointment}>Confirm →</Button>
  //     </BtnWrap>
  //       </ServicesCard>
  //     </ServicesWrappers>
  //   }

  //   </>

          : getSelectTime.time == "dialysis_am" ?  
          <>
        
          <ServicesH1>Set a schedule and confirm
            <h6 style={{color:"black"}}>Set the date of your desired day of activities and confirm</h6>
            </ServicesH1>
            <Fade left duration={2000} distance="40px">
            {!recreational_am ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
            alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
            :
            <ServicesWrappers>
            <ServicesCard>
          
            <Calendar
          onSelect = {(date) => setDuelSlots(date)}
          minDate = {dateNow}
          maxDate = "12/31/2023"
          selectDateType = 'single'
          showSelectMonthArrow = { true }
          showSelectYearArrow = { true }
          showDateInputField = { false }
          disableDays = {[ "sun", "sat"]}
          disableCertainDates = {[...disable_dialysis_am, ...newdisableuserDialysisSched, ...newdisableuserRecreationalSched, ...newdisableuserMultipurposeSched, ...newdisablegetclosedatesched]}
          duelSlotDates = {[...updatedDialysisAm, ...geclosedateAll]}
        />
        </ServicesCard>
              <ServicesCard>
                <ServicesIcon src={image1} />
                <ServicesH2>DETAILS</ServicesH2>
                {newSelectedDate === "Invalid Date" ?  <ServicesH3B >Schedule<ServicesH3> | Morning 8:00am - 11:59am</ServicesH3></ServicesH3B>
                : <ServicesH3B>Schedule<ServicesH3>{newSelectedDatess} | Morning 8:00am - 11:59am</ServicesH3></ServicesH3B>}
              <hr></hr>
                <ServicesH3B>PLACE:<ServicesH3>13, 1639 Manzanitas St, Taguig, Metro Manila</ServicesH3></ServicesH3B><hr></hr>
                <ServicesH3B>TYPE OF SERVICE<ServicesH3>Dialysis Consultation<ServicesP>The dialysis consultation is a specialized medical evaluation that aims to determine eligibility for dialysis treatment through a comprehensive assessment by a healthcare provider with expertise in kidney disease.</ServicesP></ServicesH3> </ServicesH3B>
                
                <hr className="line"></hr>
                <BtnWrap>
            <Button outline color="danger" onClick={()  => {setSelecServices({service:"dialysis"});setSelectTime({time:""});setDuelSlots("")}}>← Back</Button>&nbsp;
            <Button outline color="danger" onClick={submitAppointment}>Confirm →</Button>
            </BtnWrap>
              </ServicesCard>
            </ServicesWrappers>
          }
        </Fade>
          </>
          : getSelectTime.time == "dialysis_pm" ?  
          <>
        
          <ServicesH1>Set a schedule and confirm
            <h6 style={{color:"black"}}>Set the date of your desired day of activities and confirm</h6>
            </ServicesH1>

            {!recreational_am ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
            alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
            :
            <ServicesWrappers>
            <ServicesCard>
            
            <Calendar
            onSelect = {(date) => setDuelSlots(date)}
            minDate = {dateNow}
            maxDate = "12/31/2023"
            selectDateType = 'single'
            showSelectMonthArrow = { true }
            showSelectYearArrow = { true }
            showDateInputField = { false }
            disableDays = {[ "sun", "sat"]}
            disableCertainDates = {[...disable_dialysis_pm, ...newdisableuserDialysisSched, ...newdisableuserRecreationalSched, ...newdisableuserMultipurposeSched, ...newdisablegetclosedatesched]}
            duelSlotDates = {[...updatedDialysisPm, ...geclosedateAll]}
          />
          </ServicesCard>
              <ServicesCard>
                <ServicesIcon src={image1} />
                <ServicesH2>DETAILS</ServicesH2>
                {newSelectedDate === "Invalid Date" ?  <ServicesH3B >Schedule<ServicesH3> | Afternoon 1:00pm - 5:00pm</ServicesH3></ServicesH3B>
                : <ServicesH3B>Schedule<ServicesH3>{newSelectedDatess} | Afternoon 1:00pm - 5:00pm</ServicesH3></ServicesH3B>}
                <hr></hr>
                <ServicesH3B>PLACE:<ServicesH3>13, 1639 Manzanitas St, Taguig, Metro Manila</ServicesH3></ServicesH3B><hr></hr>
                <ServicesH3B>TYPE OF SERVICE<ServicesH3>Dialysis Consultation<ServicesP>The dialysis consultation is a specialized medical evaluation that aims to determine eligibility for dialysis treatment through a comprehensive assessment by a healthcare provider with expertise in kidney disease.</ServicesP></ServicesH3> </ServicesH3B>
                  
                <hr className="line"></hr>
                <BtnWrap>
            <Button outline color="danger" onClick={()  => {setSelecServices({service:"dialysis"});setSelectTime({time:""});setDuelSlots("")}}>← Back</Button>&nbsp;
            <Button outline color="danger" onClick={submitAppointment}>Confirm →</Button>
            </BtnWrap>
              </ServicesCard>
            </ServicesWrappers>
          }

          </>


  : getSelecServices.service == "multipurpose" ? 

  <>
  <ServicesH1>Select a Time
   <h6 style={{color:"black"}}>Choose Your Time: AM | PM | Whole Day</h6>
   </ServicesH1>
   <Fade left duration={2000} distance="40px">
   <ServicesWrappers4>
     <ServicesCard4 onClick={()  => {setSelectTime({time:"multipurpose_am"});setSelecServices({service:"multipurpose_am"})}}>
       <ServicesIcon src={imageam} />
       <ServicesH2>8:00am-11:59am</ServicesH2>
     </ServicesCard4>
     <ServicesCard4 onClick={()  => {setSelectTime({time:"multipurpose_pm"});setSelecServices({service:"multipurpose_pm"})}}>
       <ServicesIcon src={imagepm} />
       <ServicesH2> 1:00pm-5:00pm</ServicesH2>
     </ServicesCard4>
     <ServicesCard4 onClick={()  => {setSelectTime({time:"multipurpose_wholeday"});setSelecServices({service:"multipurpose_wholeday"})}}>
       <ServicesIcon src={imagesunny} />
       <ServicesH2>Whole Day</ServicesH2>
     </ServicesCard4>
    
   </ServicesWrappers4>
   </Fade>
   <BtnWrap>
   <Button outline color="danger" onClick={()  => {setSelecServices({service:""})}}>← Back</Button>
   </BtnWrap>
 </>

    : getSelectTime.time == "multipurpose_am" ?  
      <>
     
      <ServicesH1>Set a schedule and confirm
        <h6 style={{color:"black"}}>Set the date of your desired day of activities and confirm</h6>
        </ServicesH1>
 
        {!recreational_am ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
        alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
        :
        <ServicesWrappers>
        <ServicesCard>
       
        <Calendar
       onSelect = {(date) => setDuelSlots(date)}
       minDate = {dateNow}
       maxDate = "12/31/2023"
       selectDateType = 'single'
       showSelectMonthArrow = { true }
       showSelectYearArrow = { true }
       showDateInputField = { false }
       disableDays = {[ "sun", "sat"]}
       disableCertainDates = {[...newdisableuserMultipurposeSched, ...geclosedateAll, ...newdisableuserMultipurposeSchedAm, ...newdisableuserMultipurposeSchedWhole, ...newdisableuserRecreationalSched, ...newdisableuserDialysisSched, ...newdisablegetclosedatesched]}
     />
     </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={image1} />
            <ServicesH2>DETAILS</ServicesH2>
            {newSelectedDate === "Invalid Date" ?  <ServicesH3B >Schedule<ServicesH3> | Morning 8:00am - 11:59am</ServicesH3></ServicesH3B>
            : <ServicesH3B>Schedule<ServicesH3>{newSelectedDatess} | Morning 8:00am - 11:59am</ServicesH3></ServicesH3B>}
           <hr></hr>
            <ServicesH3B>PLACE:<ServicesH3>13, 1639 Manzanitas St, Taguig, Metro Manila</ServicesH3></ServicesH3B><hr></hr>
            <ServicesH3B>TYPE OF SERVICE<ServicesH3>Multipurpose Hall<ServicesP> A flexible space that can be used for a variety of events and activities, such as meetings, conferences, and social gatherings.</ServicesP></ServicesH3> </ServicesH3B>
             
            <hr className="line"></hr>
            <BtnWrap>
        <Button outline color="danger" onClick={()  => {setSelecServices({service:"multipurpose"});setSelectTime({time:""});setDuelSlots("")}}>← Back</Button>&nbsp;
        <Button outline color="danger" onClick={submitAppointment}>Confirm →</Button>
        </BtnWrap>
          </ServicesCard>
        </ServicesWrappers>
      }
 
      </>
      :

      getSelectTime.time == "multipurpose_pm" ?  
      <>
     
      <ServicesH1>Set a schedule and confirm
        <h6 style={{color:"black"}}>Set the date of your desired day of activities and confirm</h6>
        </ServicesH1>
 
        {!recreational_am ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
        alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
        :
        <ServicesWrappers>
        <ServicesCard>
       
        <Calendar
       onSelect = {(date) => setDuelSlots(date)}
       minDate = {dateNow}
       maxDate = "12/31/2023"
       selectDateType = 'single'
       showSelectMonthArrow = { true }
       showSelectYearArrow = { true }
       showDateInputField = { false }
       disableDays = {[ "sun", "sat"]}
       disableCertainDates = {[...newdisableuserMultipurposeSched, ...geclosedateAll, ...newdisableuserMultipurposeSchedPm, ...newdisableuserMultipurposeSchedWhole, ...newdisableuserRecreationalSched, ...newdisableuserDialysisSched, ...newdisablegetclosedatesched]}
     />
     </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={image1} />
            <ServicesH2>DETAILS</ServicesH2>
            {newSelectedDate === "Invalid Date" ?  <ServicesH3B >Schedule<ServicesH3> | Afternoon 1:00pm - 5:00pm</ServicesH3></ServicesH3B>
            : <ServicesH3B>Schedule<ServicesH3>{newSelectedDatess} | Afternoon 1:00pm - 5:00pm</ServicesH3></ServicesH3B>}
           <hr></hr>
            <ServicesH3B>PLACE:<ServicesH3>13, 1639 Manzanitas St, Taguig, Metro Manila</ServicesH3></ServicesH3B><hr></hr>
            <ServicesH3B>TYPE OF SERVICE<ServicesH3>Multipurpose Hall<ServicesP> A flexible space that can be used for a variety of events and activities, such as meetings, conferences, and social gatherings.</ServicesP></ServicesH3> </ServicesH3B>
             
            <hr className="line"></hr>
            <BtnWrap>
        <Button outline color="danger" onClick={()  => {setSelecServices({service:"multipurpose"});setSelectTime({time:""});setDuelSlots("")}}>← Back</Button>&nbsp;
        <Button outline color="danger" onClick={submitAppointment}>Confirm →</Button>
        </BtnWrap>
          </ServicesCard>
        </ServicesWrappers>
      }
 
      </>
      :

      getSelectTime.time == "multipurpose_wholeday" ?  
      <>
     
      <ServicesH1>Set a schedule and confirm
        <h6 style={{color:"black"}}>Set the date of your desired day of activities and confirm</h6>
        </ServicesH1>
 
        {!recreational_am ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
        alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
        :
        <ServicesWrappers>
        <ServicesCard>
       
        <Calendar
       onSelect = {(date) => setDuelSlots(date)}
       minDate = {dateNow}
       maxDate = "12/31/2023"
       selectDateType = 'single'
       showSelectMonthArrow = { true }
       showSelectYearArrow = { true }
       showDateInputField = { false }
       disableDays = {[ "sun", "sat"]}
       disableCertainDates = {[...newdisableuserMultipurposeSched, ...geclosedateAll, ...newdisableuserMultipurposeSchedPm, ...newdisableuserMultipurposeSchedAm, ...newdisableuserRecreationalSched, ...newdisableuserDialysisSched, ...newdisablegetclosedatesched]}
     />
     </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={image1} />
            <ServicesH2>DETAILS</ServicesH2>
            {newSelectedDate === "Invalid Date" ?  <ServicesH3B >Schedule<ServicesH3> | WholeDay 8:00am - 5:00pm</ServicesH3></ServicesH3B>
            : <ServicesH3B>Schedule<ServicesH3>{newSelectedDatess} | WholeDay 8:00am - 5:00pm</ServicesH3></ServicesH3B>}
           <hr></hr>
            <ServicesH3B>PLACE:<ServicesH3>13, 1639 Manzanitas St, Taguig, Metro Manila</ServicesH3></ServicesH3B><hr></hr>
            <ServicesH3B>TYPE OF SERVICE<ServicesH3>Multipurpose Hall<ServicesP> A flexible space that can be used for a variety of events and activities, such as meetings, conferences, and social gatherings.</ServicesP></ServicesH3> </ServicesH3B>
             
            <hr className="line"></hr>
            <BtnWrap>
        <Button outline color="danger" onClick={()  => {setSelecServices({service:"multipurpose"});setSelectTime({time:""});setDuelSlots("")}}>← Back</Button>&nbsp;
        <Button outline color="danger" onClick={submitAppointment}>Confirm →</Button>
        </BtnWrap>
          </ServicesCard>
        </ServicesWrappers>
      }
 
      </>
      :

    <>
    <ServicesH1>Pick a Service
        <h6 style={{color:"black"}}>Pick a service you want to avail</h6>
        </ServicesH1>
        <Fade left duration={2000} distance="40px">
        <ServicesWrappers2>
          {/* <ServicesCard2 onClick={()  => {setSelecServices({service:"recreational"})}}> */}
          <ServicesCard2 onClick={()  => {handleShow()}}>
            <ServicesIcon src={image3} />
            <ServicesH2>Recreational Activities</ServicesH2>
            <ServicesP>
            A variety of services including Therapy Pool, Massage, Saunas, Yoga, Ballroom, Gym, Board Games, and Cinema for leisure and relaxation.
            </ServicesP>
          </ServicesCard2>
          {/* <ServicesCard2 onClick={()  => {setSelecServices({service:"dialysis"})}}> */}
          <ServicesCard2 onClick={()  => {handleShowDialysis()}}>
            <ServicesIcon src={image4} />
            <ServicesH2>Dialysis Consultation</ServicesH2>
            <ServicesP>
            A specialized medical evaluation that aims to determine eligibility for dialysis treatment through a comprehensive assessment by a healthcare provider with expertise in kidney disease.
            </ServicesP>
          </ServicesCard2>
          {/* <ServicesCard2 onClick={()  => {setSelecServices({service:"multipurpose"})}}> */}
          <ServicesCard2 onClick={()  => {handleShowMP()}}>
            <ServicesIcon src={image5} />
            <ServicesH2>Multi-Purpose Hall</ServicesH2>
            <ServicesP>
            A flexible space that can be used for a variety of events and activities, such as meetings, conferences, and social gatherings.
            </ServicesP>
          </ServicesCard2>
        </ServicesWrappers2>
        <BtnWrap>
        <Button outline color="danger" onClick={()  => navigate('/client/dashboard')}>← Back</Button>
        </BtnWrap>
        </Fade>
        </>
    }


      <Modal size='md' show={show} onHide={handleClose} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}><i class="fas fa-dumbbell"></i>&nbsp;&nbsp;Recreational Activities</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
              <h5 style={{ color: "black", margin: "0 0 10px 0" }}>Select a recreational activities you want to avail</h5>
              <p style={{ color: "black", margin: "0" }}>(Maximum of 3)</p>
              {
                service_error == "no_service_selected" ? <p style={{color: "red", "font-size": "0.8rem"}}>Please select a recreational activities</p> : ""
              }
            </div>
            <div style={{ marginLeft: "30px", }}>
            {RecreationalServicesList?.map((service) => (
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
            {/* <TextField fullWidth color="secondary" id="health_problem" onChange={onChange} InputLabelProps={{ required: true }} name="health_problem" label="Health Problem" />
            <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.health_problem}</InputLabel> 
            <br></br>
            <div  className="panel-activity__status">
                 <textarea name="description" id="commentfield" onChange={onChange} placeholder="Write the description here..." className="form-control"></textarea>
                 <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.description}</InputLabel> 
                    
                
                 </div> */}
                  {/* <div className="actions">
                         <div className="btn-group">
                         <Button outline color="danger" onClick={() => submitRecreationalServices()} >&nbsp;Proceed →</Button>
                         </div>
                     </div> */}

                     <div  className="panel-activity__status">
           
                 <div className="actions">
                         <div className="btn-group">
                         <Button outline color="danger" onClick={() => submitRecreationalServices()}><i class="fas fa-dumbbell"></i>&nbsp;Proceed →</Button>
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


          <Modal size='md' show={showMP} onHide={handleCloseMP} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}><i class="fas fa-hospital"></i>&nbsp;&nbsp;Multipurpose Hall</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>
            <div style={{ display: "flex", marginBottom: "-20px", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
              
              
              {
                service_errorMP == "no_service_selected" ? 
                <h5 style={{ color: "red"}}>*Please complete the required field(s) below*</h5>
                : <h5 style={{ color: "black"}}>Please complete the required field(s) below</h5>
              }
            </div>
            <br></br>
            <TextField fullWidth onChange={onChange} color="secondary" id="health_problem"  InputLabelProps={{ required: true }} name="purpose" label="Booking purpose" 
            value={multipurpose_services.purpose}
            error={error === 'Please enter a booking purpose'}
            helperText={error === 'Please enter a booking purpose' ? 'Please enter a booking purpose' : ''}
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
                  {error === 'Please select number of attendees' && (
                    <FormHelperText style={{ color: "red"}}>Please select number of attendees</FormHelperText>
                  )}
                </FormControl>

                 {/* <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.description}</InputLabel>  */}
                 <br />
                 <br />
                 <div className="actions">
                         <div className="btn-group">
                         <Button outline color="danger" onClick={() => submitMultipurposeServices()}><i class="fas fa-hospital"></i>&nbsp;Proceed →</Button>
                         </div>
                     </div>
                 </div>

            </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handleCloseMP}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>



          <Modal size='md' show={showDialysis} onHide={handleCloseDialysis} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}><i class="fas fa-medkit"></i>&nbsp;&nbsp;Dialysis Consultation</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>
            <div style={{ display: "flex",  justifyContent: "center" }}>
       <div style={{ width: "30rem"}}>
            <Card style={{background: "linear-gradient(to bottom,rgba(255,186,186,50%),rgba(255,186,186,0%))"}}>
            <Card.Title style={{ textAlign: "center",color: "#EF3A47", marginTop: "1rem",  fontWeight: "bold"}}>Requirements for dialysis</Card.Title>
            <Card.Subtitle style={{ textAlign: "center",marginBottom: "1rem", marginLeft: "1rem" }} className="mb-2 text-muted">Ensure you have the necessary dialysis requirements to bring before clicking the 'proceed.'</Card.Subtitle>
       
         <ListGroup>
          <ul style={{ textAlign: "left", marginTop: "0.5rem", marginLeft: "1rem" }}>
            <li>Medical Abstract or History</li>
            <li>Pinakahuling Hepatitis Profile - HBsAg, anti-HCV, anti-HBs
<br/>(nakuha sa nakaraang tatlong buwan)</li>
            <li>Pinakahuling Complete Blood Count (CBC)
            <br/>(nakuha sa nakaraang buwan)</li>
            <li>Pinakahuling resulta ng Creatin, K, Ca, Phosphorus, Albumin
            <br/>(nakuha sa nakaraang buwan)</li>
            <li>Swab Test Result
            <br/>(nakuha sa nakaraang dalawang linggo)</li>
            <li>Chest X-ray
            <br/>(nakuha sa nakaraang anim buwan)</li>
              <li>Kopya ng Treatment Monitoring Sheet/Record (Huling tatlong treatment) mula sa huling dialysis center</li>
              <li>Voter's Registration/Certificate or any Valid ID</li>
             
          </ul>
        </ListGroup>
      
              
             
            </Card>
            </div>
            </div>

            <div  className="panel-activity__status">
           
                 <div className="actions">
                         <div className="btn-group">
                         <Button outline color="danger" onClick={() => submitDialysisServices()}><i class="fas fa-medkit"></i>&nbsp;Proceed →</Button>
                         </div>
                     </div>
                 </div>

            </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handleCloseDialysis}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


      
   
      <style>
        {`
   
   .form-check-input:checked {
    background-color: #EF3A47;
    border-color: #EF3A47;
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

  option {
    font-weight: normal;
    display: block;
    white-space: nowrap;
    min-height: 1.2em;
    padding: 0px 2px 20px;
    color: #fff;
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
    </Container>
  );
};

export default HeroImage;
