import React, {useState} from "react";
import Play from "../../../../images/google-play-soon.png";
import Img from "../../../../images/center.png";
import { AppStore } from "../HeroElements";
import Logo from "../../../../images/logos.png";
import LogoVector from "../../../../images/logovector.png";
import TupLogo from "../../../../images/tup.png";
import OscaLogo from "../../../../images/osca.png";
import TaguigLogo from "../../../../images/taguig.png";

import {
  HeroImageContainer,
  AppWrapper,
  App,
  TextWrapper,
  AppTitle,
  AppPara
} from "./HeroImageElements";

const HeroImage = () => {

  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    setPlaying(true);
  };

  return (
    <HeroImageContainer>
    <AppWrapper>
       {/* <App src={Img} 
        style={{ width: "100%", height: "auto", alignContent: "left" }}
        alt="" /> */}
    <iframe
  src="https://player.vimeo.com/video/795953189?autoplay=1&loop=1&controls=0&title=0&byline=0&portrait=0"
  frameBorder="0" 
  controls={false}
  loop={true}
  autoPlay={true}
  allow="autoplay; loop; controls;" 
  allwLoop={true}
  width="100%"
  height={window.innerHeight <= 768 ? '700px' : '450px'}
  style={{
    marginTop:"-60px",
    border: 'none',
    overflow: 'hidden',
    maxWidth: window.innerWidth <= 768 ? '100%' : '700px',
  }}
  scrolling={false}
  allowFullScreen={false}
  onClick={handleClick}
/>

    </AppWrapper>
    <TextWrapper>
      <AppTitle>
        <h1>Taguig City Center for the Elderly</h1>
      </AppTitle>
      <AppPara>
        <p>The five-storey wellness hub for Taguigeño senior citizens was opened last April, and features a therapy pool, a massage room, two saunas, a yoga room, a gym, and cinema for relaxation purposes. It also comes with a dialysis center to accommodate 14 patients at a time, and a multi-purpose hall for city programs and recreational activities.</p>
      </AppPara>
    </TextWrapper>
  </HeroImageContainer>
  );
};

export default HeroImage;
