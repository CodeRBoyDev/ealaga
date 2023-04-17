import React from "react";
import Container from "react-bootstrap/Container";
import Play from "../../../images/play.png";
import WaveHero from "../Wave";
import { HeroBlob } from "./Blob/Blobs";
import { Fade } from "react-reveal";
import {
  Background,
  HeroContainer,
  HeroWrapper,
  HeroText,
  AppStoreContainer,
  AppStore,
  AppImage
} from "./HeroElements";

import HeroImage from "./HeroImage";

const Hero = () => {
  return (
    <>
      <Fade bottom duration={2000} distance="40px">
      <Container style={{ minHeight: "45vh" }}>
    
        <HeroImage />
      </Container>
      </Fade>
    </>
  );
};

export default Hero;
