import React, { useState } from "react";
import {
  UncontrolledAccordion, AccordionHeader,
  AccordionBody, AccordionItem, Card, CardBody, CardTitle, CardSubtitle, CardText, Button
} from 'reactstrap'
import { Link } from 'react-router-dom';

import { Carousel, Modal } from 'react-bootstrap';
import {
  HeroImageContainer,
  ServicesWrapper, ServicesH1, ServicesH2, ServicesH3
} from "./HeroImageElements";
import Container from "react-bootstrap/Container";

import { Fade } from "react-reveal";

const Terms = () => {

  

  return (
    <Container style={{ minHeight: "45vh" }}>
    <HeroImageContainer>
    <Fade left duration={2000} distance="40px">
      <ServicesH1>Terms and Condition</ServicesH1>
      <ServicesH3>As a user of our web and mobile application, it is important that you agree to the following terms and conditions before using our services.</ServicesH3>
      {/* <br></br> */}
      <ServicesH2>Acceptance of Terms and Conditions</ServicesH2>
      <ServicesH3>By accessing and using the eAlaga application, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you must not use the eAlaga application.</ServicesH3>

      <ServicesH2>Registration and Account Information</ServicesH2>
      <ServicesH3>In order to use the eAlaga application, you must register and create an account with a valid email address. Upon registration, an email confirmation will be sent to activate your account. If you are an existing user, you can log in using your registered email and password.</ServicesH3>

      <ServicesH2>Services Offered by eAlaga</ServicesH2>
<ServicesH3>Our platform offers a range of services including recreational activities, dialysis, and a multipurpose hall. You can select a service from the options available, pick a date and time, and confirm your schedule with ease. We generate a proof of booking in the form of QR codes and text to ensure the security of your information.</ServicesH3>

      <ServicesH2>User Responsibilities</ServicesH2>
      <ServicesH3>As a user of eAlaga, it is your responsibility to provide accurate and up-to-date information about yourself and your health condition. You must upload the required documents and complete your profile account before scheduling any services. You are also responsible for keeping your account information confidential and secure.</ServicesH3>

      <ServicesH2>Feedback and Reviews</ServicesH2>
      <ServicesH3>We value your feedback and reviews on our services. We have provided a review platform to collect user feedback and to help us improve our services. We reserve the right to use your feedback for marketing purposes and to improve our application and services.</ServicesH3>

      <ServicesH2>Donations</ServicesH2>
      <ServicesH3>We appreciate your donations to support the center's services. We have provided a donation platform through our web and mobile applications for your convenience.</ServicesH3>

      <ServicesH2>User Restrictions and Agreement Violations</ServicesH2>
      <ServicesH3>We reserve the right to restrict or terminate your account if you violate any of the terms and conditions outlined in this agreement. This includes any fraudulent or illegal activity, misuse of our application, and violation of our user policies.</ServicesH3>

      <ServicesH2>Availability and Security</ServicesH2>
      <ServicesH3>We make every effort to ensure that our application is available to you at all times. However, we cannot guarantee uninterrupted or error-free access. We also take the security of your information seriously and have implemented measures to protect your personal and health information.</ServicesH3>

      <ServicesH2>Limitation of Liability</ServicesH2>
      <ServicesH3>In no event shall eAlaga or its affiliates be liable for any damages arising out of the use or inability to use our application or services, including but not limited to damages for loss of data, loss of profits, or other intangible losses.</ServicesH3>

      <ServicesH2>Changes to Terms and Conditions</ServicesH2>
      <ServicesH3>We reserve the right to modify or update these terms and conditions at any time without prior notice. Your continued use of our application after any changes indicates your acceptance of the updated terms and conditions.</ServicesH3>


      <ServicesH3>In conclusion, we at eAlaga are committed to providing a user-friendly and convenient platform for the elderly community in Taguig City to book health care services. We appreciate your agreement to our terms and conditions and hope that you find our application helpful and beneficial.</ServicesH3>
       
      </Fade>
      <style>
        {`
        
      
        .card {
          box-shadow: 0 10px 10px rgba(100, 100, 100, 0.6);
          border-radius: 20px;
          transition: all 0.3s ease-in-out ;
        }
        
        .card:hover {
          transform: scale(1.02);
          transition: all 0.4 ease-in-out;
          box-shadow: 0 5px 10px rgba(255, 0, 0, 0.6);
    cursor: pointer;
        }

        .accordion-icon {
          color: red;
        }
        .btn-link.collapsed {
          color: red;
      }
      .accordion-button:not(.collapsed) {
        color: #ffffff;
        background-color: #EF3A47;
        box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
      }
      h2, .h2 {
        font-size: 2rem;
      }
      h5, .h5 {
        color: #EF3A47;
      }

      h3, .h3 {
        color: #EF3A47;
      }
      .accordion-button:not(.collapsed) {
        color: white;
    }
        .card {
            box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
        }
        
        .width-90 {
            width: 150px!important;
        }
        .rounded-3 {
            border-radius: 0.5rem !important;
        }
        
        a {
        text-decoration:none;    
        }
        
        `}
      </style>
    </HeroImageContainer>
    </Container>
  );
};

export default Terms;