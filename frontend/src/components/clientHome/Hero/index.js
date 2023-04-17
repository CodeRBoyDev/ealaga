import React from "react";
import { UncontrolledAccordion, AccordionHeader, 
  AccordionBody, AccordionItem,Card , CardBody,CardTitle ,CardSubtitle ,CardText ,Button } from 'reactstrap'

import CarouselSlider from "react-carousel-slider";


import {
  HeroImageContainer,
  ServicesWrapper,  ServicesH1
} from "./HeroImageElements";

import Container from "react-bootstrap/Container";
import { Fade } from "react-reveal";

const HeroImage = () => {

     let data = [
      {
        imgSrc:
          "https://res.cloudinary.com/du7wzlg44/image/upload/v1675576313/services/center%20for%20the%20elderly/Untitled_design_3_dxtjce.jpg",
      },
      {
        imgSrc:
          "https://res.cloudinary.com/du7wzlg44/image/upload/v1675576319/services/center%20for%20the%20elderly/Untitled_design_2_ruiapn.jpg",
      },
      {
        imgSrc:
          "https://res.cloudinary.com/du7wzlg44/image/upload/v1675576413/services/center%20for%20the%20elderly/Untitled_design_4_ondd6m.jpg",
      },
      
    ];
  


  let manner = {
    autoSliding: { interval: "3s" },
    circular: true,
  };


  let dotsSetting = {
    style: {
      dotSize: "20px",
      currDotColor: "#EF3A47",
      marginTop: "0px"
    }
  };

  let buttonSetting = {
    placeOn: "middle-inside",
    style: {
      left: {
        height: "100px",
        width: "60px",
        color: "white",
        margin: "0",
        fontSize: "30px",
        background: "#EF3A47",
        opacity: "1",
        
      },
      right: {
        height: "100px",
        width: "60px",
        color: "white",
        margin: "0",
        fontSize: "30px",
        background: "#EF3A47",
        opacity: "1",
      },
    },
  };
  
// Add media query
const breakpoint = 768; // set the breakpoint to 768px or whatever you prefer

if (window.matchMedia(`(max-width: ${breakpoint}px)`).matches) {
  buttonSetting.style.left.height = "60px";
  buttonSetting.style.left.width = "40px";
  buttonSetting.style.left.fontSize = "20px";
  
  buttonSetting.style.right.height = "60px";
  buttonSetting.style.right.width = "40px";
  buttonSetting.style.right.fontSize = "20px";
}

  return (
    <Fade top duration={2000} distance="40px">
    <>
      
    <ServicesWrapper>
    <div className="offers_container">
        <div className="offer_slider">
          <CarouselSlider
            slideItems={data}
            manner={manner}
            dotsSetting={dotsSetting}
            buttonSetting={buttonSetting}
            sliderBoxStyle={{
              width: "98.6%",
              height: "45vh",
              background: "transparent",
              margin: "0 0 0 10px",
              "@media (max-width: 480px)": {
                height: "50vh",
                margin: "0",
              }

            }}
            itemsStyle={{ padding: "0px", margin: "40px 0px 0px 0px" }}
          />
          
        </div>
        </div>
      </ServicesWrapper>
  
<style>
        {`
        @media (max-width: 480px) {
          .carousel-slider {
            height: 500vh;
            margin: 0;
          }
        }
        .rcs_sliderBox {
          z-index: 1;
        }
        .container {
    
          max-width: 100%;
      }
      
      
        
        `}
      </style>
      </>
      </Fade>
  );
};

export default HeroImage;
