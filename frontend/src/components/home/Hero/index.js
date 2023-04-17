import React from "react";
import Container from "react-bootstrap/Container";
import Play from "../../../images/play.png";
import WaveHero from "../Wave";
import { HeroBlob } from "./Blob/Blobs";

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
      <Container style={{ minHeight: "45vh" }}>
        <HeroBlob />
        <HeroImage />
      </Container>
      <WaveHero />
    </>
  );
};

export default Hero;
