import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../axiosConfig';
import {
  LinkR,
  ServicesCard,
  ServicesContainer,
  ServicesH1,
  ServicesH2,
  ServicesIcon,
  ServicesP,
  ServicesWrapper
} from "./ServicesElements";
import image1 from "../../../images/donation.png";
import image2 from "../../../images/appointments.png";
import image3 from "../../../images/massage.png";
import image4 from "../../../images/clock.png";
import { getName, getUser } from '../../login/helpers';
import { Fade } from "react-reveal";
import Swal from 'sweetalert2'

const Services = () => {
  let navigate = useNavigate();
  

  const fetchHistories = () => {
    axios({
      method: "get",
      url: `/api/homeClient/${getUser()}`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    }).then(response => {

      // console.log(response.data.filter);
     
    }).catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    fetchHistories();
  }, []);


  const submitEdiUser = () => {

    Swal.fire({
      text: 'Please wait while processing your account.',
      imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1675391478/PENDING_3_xd4dzb.gif',
      imageWidth: 400,
      imageHeight: 325,
      imageAlt: 'Custom image',
      confirmButtonColor: '#EF3A47',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
      })

    axios({
      method: "get",
      url: `/api/user/edit/${getUser()}`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    }).then(response => {
      console.log(response.data.user.account_verified);
      Swal.close()
      if(response.data.user.account_verified == "not verified"){
         Swal.fire({
        title: 'Account Not Verified',
        text: 'To access our services, please visit your profile, click the "Verify" button, and complete all required information.',
        imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1675391010/PENDING_2_kymv51.gif',
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

      }else if(response.data.user.account_verified == "pending"){
        Swal.fire({
          title: 'Pending Account Verification',
          text: 'Your account verification is currently being reviewed by our team.',
          imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1675390864/PENDING_1_fvshlc.gif',
          imageWidth: 300,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#EF3A47',
          footer: '<a href="/#/client/profile/information" style="color:orange;" id="view-status-link">View Verification Status</a>',
          allowOutsideClick: false,
          allowEscapeKey: false
          
        });
        document.getElementById('view-status-link').addEventListener('click', function() {
                  Swal.close();
                });

      }else if(response.data.user.status == "restricted"){
        Swal.fire({
          title: 'Your account has been restricted',
          html: 
          '<p style="font-size: 1rem; text-align: justify; text-indent: 20px; " >We regret to inform you that your account has been temporarily restricted due to repeated instances of not attending to your bookings. As a result, you will not be able to access certain features of our platform for the next 7 days. However, we want to assure you that your account will be automatically reactivated after this period, and you will be able to resume using all of our services as usual. We understand that unforeseen circumstances can arise, and we hope that this temporary restriction will encourage you to be more mindful of your future bookings.</p>'
          +
          '<p>Expected Reactivation: ' 
          + new Date(response.data.user.restrictionExpiration).toLocaleDateString() 
          + 
          '</p>'
          ,
          // text: 'Expected Reactivation: ' + new Date(response.data.user.restrictionExpiration).toLocaleDateString(),
          imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1676713230/restricted_tmt80l.gif',
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: 'Custom image',
          confirmButtonColor: '#EF3A47',
          footer: '<a href="/#/client/profile/information" style="color:red;" id="view-status-link">View Account Status</a>',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        
        document.getElementById('view-status-link').addEventListener('click', function() {
          Swal.close();
        });
    }
      else{
        navigate("/client/appointment");
      }
      // Swal.close()
      // handleEditClose()
      // // // setLoadingss(true)
      // fetchUser();
      // Swal.fire({
      //   title: 'Success!',
      //   text: 'Sucessfully Updated.',
      //   imageUrl: 'https://media0.giphy.com/media/dYmYhn4OXI1aOpVpFO/giphy.gif?cid=ecf05e479ym4epjp1orghtshgvg92nc27cty98jbg9rfzfdr&rid=giphy.gif&ct=s',
      //   imageWidth: 200,
      //   imageHeight: 200,
      //   imageAlt: 'Custom image',
      //   confirmButtonColor: '#EF3A47',
      // })
      // //   setLoadingss(false)
      // // // console.log(response.data.user);
      // // // setgetUser(response.data.user);
      // // // setAllHealth(response.data.health);
      // // // setProfilePreview(response.data.user.profile_picture.url)

      // setError({
      //   first_name: '',
      //   middle_name: '',
      //   last_name: '',
      //   birth_date: '',
      //   age: '',
      //   gender: '',
      //   house_purok_no: '',
      //   street: '',
      //   barangay: '',
      //   profile_picture: '',
      //   valid_id: '',
      //   user_name: '',
      //   email: '',
      //   phone: '',
      //   password: '',
      //   confirmPassword: ''
      // });

    }).catch(error => {
      Swal.close()
      console.log(error.response.data)
      
    });

  }

  return (
    <>
      <Fade left duration={2000} distance="40px">
      <ServicesContainer id="services">
        <ServicesH1>Hi, {getName()} 😊 How may I help you?</ServicesH1>
        <ServicesWrapper>
        <LinkR to="#" onClick={() => submitEdiUser()}>
          <ServicesCard>
            <ServicesIcon src={image2} />
            <ServicesH2>Book a schedule</ServicesH2>
            <ServicesP>
            You can book a schedule of center services such as recreational activities, dialysis, and multipurpose hall here.
            </ServicesP>
          </ServicesCard>
          </LinkR>
          <LinkR to="/client/activities">  
            <ServicesCard>
            <ServicesIcon src={image3} />
            <ServicesH2>Schedule</ServicesH2>
            <ServicesP>
            You can monitor or check your present and future schedule here.
            </ServicesP>
          </ServicesCard>
          </LinkR>
          <LinkR to="/client/history">  
          <ServicesCard>
            <ServicesIcon src={image4} />
            <ServicesH2>History</ServicesH2>
            <ServicesP>
            You can check your past schedule here.
            </ServicesP>
          </ServicesCard>
          </LinkR>
          <LinkR to="/client/donation"> 
            <ServicesCard>
              <ServicesIcon src={image1} />
              <ServicesH2>Donation</ServicesH2>
              <ServicesP>
              You can view your donation here.
              </ServicesP>
            </ServicesCard>
            </LinkR>
        </ServicesWrapper>
      </ServicesContainer>
      </Fade>

      <style>
        {`

        @media only screen and (max-width: 600px) {
          .swal2-popup {
            width: 90%;
          }
          .swal2-image {
            max-width: 100%;
            margin-top: 20px;
          }
          .swal2-title {
            font-size: 22px;
          }
          .swal2-html-container {
            font-size: 14px;
          }
          .swal2-footer {
            margin-top: 10px;
          }
        }

        `}
      </style>

    </>
  );
};

export default Services;
