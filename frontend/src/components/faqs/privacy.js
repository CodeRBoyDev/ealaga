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

const Privacy = () => {

  

  return (
    <Container style={{ minHeight: "45vh" }}>
    <HeroImageContainer>
    <Fade left duration={2000} distance="40px">
      <ServicesH1>Privacy Policy</ServicesH1>
      <ServicesH3>This Privacy Policy explains how eAlaga collects, uses, and protects the personal information you provide us when you use our mobile and web application. We take your privacy seriously and are committed to ensuring that your personal information is secure and protected.</ServicesH3>
      {/* <br></br> */}
      <ServicesH2>Collection and Use of Personal Information</ServicesH2>
      <ServicesH3>We collect personal information when you register for an account, book a service, or message us through our chat feature. Personal information may include your name, email address, phone number, date of birth, and other identifying information. We may also collect information about your health condition, as necessary to provide you with the appropriate services.</ServicesH3>

      <ServicesH2>Use of Personal Information</ServicesH2>
      <ServicesH3>We use personal information to provide and improve our services, to communicate with you, and to comply with legal obligations. We may use your information to schedule services, to send confirmation and reminder notifications. We may also use your information to improve our platform and to conduct research and analysis.</ServicesH3>

      <ServicesH2>Disclosure of Personal Information</ServicesH2>
<ServicesH3>We may disclose personal information to our personnel and service providers, as necessary to provide our services. We may also disclose information as required by law or in response to legal process, or to protect our rights, property, or safety. We do not sell or rent personal information to third parties for marketing purposes.</ServicesH3>

      <ServicesH2>Data Security</ServicesH2>
      <ServicesH3>We take reasonable measures to protect personal information against unauthorized access, alteration, disclosure, or destruction. We use encryption and secure server technology to protect your information during transmission. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</ServicesH3>

      <ServicesH2>Access and Correction</ServicesH2>
      <ServicesH3>You may access and update your personal information by logging into your account. You may also request that we correct or delete inaccurate information. We will respond to requests within a reasonable time frame.</ServicesH3>

      <ServicesH2>Retention</ServicesH2>
      <ServicesH3>We retain personal information for as long as necessary to provide our services and to comply with legal obligations. We may also retain information for research or analysis purposes, in which case we will anonymize or de-identify the information.</ServicesH3>

      <ServicesH2>Changes to this Privacy Policy</ServicesH2>
      <ServicesH3>We may update this Privacy Policy from time to time, in response to changing legal, technical, or business developments. We will post the updated policy on our website and notify you of any material changes.</ServicesH3>

      <ServicesH2>Contact Us</ServicesH2>
      <ServicesH3>If you have any questions or concerns about this Privacy Policy, or about our collection, use, or disclosure of personal information, please contact us at ealaga.taguig@gmail.com.</ServicesH3>
      <ServicesH3>By using our web and mobile application, you agree to the terms of this Privacy Policy. If you do not agree with any part of this Policy, please do not use our platform.</ServicesH3>
       
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

export default Privacy;