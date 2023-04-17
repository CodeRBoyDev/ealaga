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
  TopLine,ServicesIcon
} from "./InfoSectionElements";
import { Fade } from "react-reveal";
import mission from "../../../images/mission.png";
import vision from "../../../images/vision.png";

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
        <InfoWrapper>
        <Fade bottom duration={2000} distance="40px">
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading lightText={lightText}>Vision</Heading>
                <ServicesIcon src={vision} />
                <Subtitle darkText={darkText}>To be a leading hub for senior citizens in promoting healthy aging and providing opportunities for leisure, learning and socialization.</Subtitle>
            
              </TextWrapper>
            </Column1>
            <Column2>
             
            <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading lightText={lightText}>Mission</Heading>
                <ServicesIcon src={mission} />
                <Subtitle darkText={darkText}>To provide a comfortable, safe and accessible space for senior citizens to engage in physical and social activities, fostering a sense of community and well-being.</Subtitle>
                
              </TextWrapper>
            </Column2>
            
          </InfoRow>
          </Fade>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
