import React from "react";

import {
  Column1,
  Column2,
  Img,
  ImgWrap,
  InfoContainer,
  InfoRow,
  InfoWrapper,
  TextWrapper,
  Subtitle,
  Heading,
  TopLine, BtnWrap, ServicesIcon
} from "./InfoSectionElements";
import values from "../../../images/values.png";
import { Button } from 'reactstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const InfoSection = ({
  lightBg,
  id,
  imgStart,
  topLine,
  lightText,
  headLine,
  darkText,
  description,
  img,
  alt, buttonLabel
}) => {
  return (
    <>
      <InfoContainer lightBg={lightBg} id={id}>
       
      <div style={{textAlign: "center", margin:100}}>
  <h1 style={{color: "#EF3A47", fontSize: "3.5rem", fontWeight: "bold", marginBottom: 30, marginTop: 0}}> <ServicesIcon src={values} />&nbsp;Core Values</h1>
 
  <Row>
    <Col xs={12} sm={6}>
      <Col xs={12}>
        <p style={{color: "black", textAlign:"left", fontSize: "1.5rem"}}><b>Inclusivity:</b> To accommodate the diverse needs and preferences of senior citizens in the community.</p>
      </Col>
      <Col xs={12}>
        <p style={{color: "black", textAlign:"left", fontSize: "1.5rem"}}> <b>Respect:</b> To treat all seniors with dignity and respect, valuing their contributions and experiences.</p>
      </Col>
      <Col xs={12}>
        <p style={{color: "black", textAlign:"left", fontSize: "1.5rem"}}><b>Accessibility:</b> To ensure the building is accessible and accommodating to seniors of all abilities.</p>
      </Col>
    </Col>
    <Col xs={12} sm={6}>
      <Col xs={12}>
        <p style={{color: "black", textAlign:"left", fontSize: "1.5rem"}}><b>Health and Wellness:</b> To promote healthy aging through physical and mental activities, and to provide quality health services.</p>
      </Col>
      <Col xs={12}>
        <p style={{color: "black", textAlign:"left", fontSize: "1.5rem"}}> <b>Community:</b> To foster a sense of community, encouraging social interaction and friendship among seniors.</p>
      </Col>
    </Col>
  </Row>
</div>

<style>
        {`
       
        `}
      </style>
            
      </InfoContainer>
    </>
  );
};

export default InfoSection;
