import React from "react";
import { Button } from 'reactstrap'

import Container from "react-bootstrap/Container";
import Stepper from "react-stepper-horizontal";


import {
  ServicesWrapper,  ServicesH1, ServicesCard,
  ServicesH2,
  ServicesIcon,
  ServicesP,
  ServicesWrappers, BtnWrap
} from "./HeroImageElements";
import image3 from "../../../../images/massage.png";
import image4 from "../../../../images/dialysis.png";
import { useNavigate } from "react-router-dom";

const HeroImage = () => {

  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };
  let navigate = useNavigate();
  function refreshPage() {
    window.location.reload();
  }


  return (
    <Container style={{ minHeight: "45vh" }}>
    <div style={styles}>
      
    <ServicesWrapper>
     <Stepper
        steps={[
          {
            title: "Pick a services",
          },
          { title: "Set a Schedule and Confirm" },
        ]}
        activeStep={0}
        activeColor="#EF3A47"
        completeColor="#EF3A47"
        activeTitleColor="#EF3A47"
        completeTitleColor="#EF3A47"
        circleFontColor="#FFF"
        defaultBorderColor="#EF3A47"
        defaultBorderStyle="#EF3A47"
        completeBarColor="#EF3A47"
      />
      <ServicesH1>Pick a Services
        <h6 style={{color:"black"}}>Pick a services you want to avail</h6>
        </ServicesH1>
        <ServicesWrappers>
          <ServicesCard onClick={()  => {navigate('/client/activity/schedule'); refreshPage();}}>
            <ServicesIcon src={image3} />
            <ServicesH2>Recreational Activities</ServicesH2>
            <ServicesP>
           ipsum sumpi oewqo dwqdwqipsum sumpi oewqo dwqdwqipsum sumpi oewqo dwqdwq
            </ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={image4} />
            <ServicesH2>Dialysis</ServicesH2>
            <ServicesP>
            ipsum sumpi oewqo dwqdwqipsum sumpi oewqo dwqdwqipsum sumpi oewqo dwqdwq
            </ServicesP>
          </ServicesCard>
        </ServicesWrappers>
        <BtnWrap>
        <Button outline color="danger" onClick={()  => navigate('/client/dashboard')}>← Back</Button>
        </BtnWrap>

      </ServicesWrapper>
     
    </div>
    </Container>
  );
};

export default HeroImage;
