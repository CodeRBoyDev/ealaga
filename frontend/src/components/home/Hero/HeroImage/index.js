import React from "react";
import Play from "../../../../images/download.png";
import Img from "../../../../images/app.png";
import { AppStore } from "../HeroElements";
import Logo from "../../../../images/logos.png";
import LogoVector from "../../../../images/logovector.png";
import TupLogo from "../../../../images/tup.png";
import OscaLogo from "../../../../images/osca.png";
import TaguigLogo from "../../../../images/taguig.png";
import MobileQr from "../../../../images/mobileqr.png";

import {
  HeroImageContainer,
  AppWrapper,
  App,
  TextWrapper,
  AppTitle,
  AppPara
} from "./HeroImageElements";

const HeroImage = () => {
  return (
  
    <HeroImageContainer>
      <AppWrapper>
      <img
          className="qr-img"
              src={MobileQr}
              style={{ width: "30%", height: "auto", alignContent: "left", animationPlayState: "paused !important" }}
              alt="/"
            />
        <App src={Img} alt="" />
      </AppWrapper>
      <TextWrapper>
        <AppTitle>
          <h2>A Web and Mobile App</h2>
          <h1>
          <img
              src={Logo}
              style={{ width: "30%", height: "auto", alignContent: "left" }}
              alt="/"
            /><br />
             <img
              src={LogoVector}
              style={{ width: "8%", height: "auto", alignContent: "left" }}
              alt="/"
            />&nbsp;          
            <img
              src={TupLogo}
              style={{ width: "8%", height: "auto", alignContent: "left" }}
              alt="/"
            />&nbsp;          
            <img
              src={OscaLogo}
              style={{ width: "8%", height: "auto", alignContent: "left" }}
              alt="/"
            />&nbsp;          
            <img
              src={TaguigLogo}
              style={{ width: "8%", height: "auto", alignContent: "left" }}
              alt="/"
            />
           
           
          </h1>
          {/* <h2>dwadwadwadwadw</h2> */}
        </AppTitle>
        <AppPara>
          <p>eAlaga is a mobile and web application designed to make it easier for the elderly community in Taguig City to book health care services. Our platform prioritizes the needs of our clients, offering a range of services including recreational activities, dialysis, and a multipurpose hall, all at the touch of a button. You can pick a service, schedule, and confirm your appointment with ease, with our fast and secure confirmation process generating a proof of booking in the form of QR codes and text. At eAlaga, we believe that your health is of utmost importance, which is why we provide a user-friendly platform that puts your needs first. Book a schedule today and experience the convenience of eAlaga.</p>
        </AppPara>
        {/* <AppStore>
          <a
            href="https://google.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src={Play}
              style={{ width: "50%", height: "auto", alignContent: "left" }}
              alt="/"
            />
          </a>
        </AppStore> */}
        <AppStore>
          <a
            href="https://expo.dev/artifacts/eas/ok29rqfcsoM4VFiJDg4X8s.apk"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              src={Play}
              style={{ width: "70%", height: "auto", alignContent: "left", marginTop: "-30%", marginLeft:"-50%"
              ,['@media screen and (max-width: 768px)']: { 
                width: "100%", height: "auto", alignContent: "center", marginTop: "-100px", marginLeft:"-100px"
              }
            }}
              alt="/"
            />
          </a>
        </AppStore>
      </TextWrapper>


      <style>
        {`

        .qr-img {
          animation: none !important;
        }
        `}
      </style>


    </HeroImageContainer>

  );
};

export default HeroImage;
