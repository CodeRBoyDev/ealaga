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
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading lightText={lightText}>Vision</Heading>
                <ServicesIcon src={vision} />
                <Subtitle darkText={darkText}>{description}</Subtitle>
            
              </TextWrapper>
            </Column1>
            <Column2>
             
            <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading lightText={lightText}>Mission</Heading>
                <ServicesIcon src={mission} />
                <Subtitle darkText={darkText}>{description}</Subtitle>
                
              </TextWrapper>
            </Column2>
            
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
