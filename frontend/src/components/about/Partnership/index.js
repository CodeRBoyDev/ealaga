import React from "react";
import image1 from "../../../images/logovector.png";
import image2 from "../../../images/tup.png";
import image3 from "../../../images/osca.png";
import image4 from "../../../images/taguig.png";
import {
  ServicesCard,
  ServicesIcon,
  ServicesWrapper,
  AcheivementsContainer
} from "./InfoSectionElements";
const InfoSection = ({

}) => {
  return (
    <>
         <AcheivementsContainer>
         
        <ServicesWrapper>
          <ServicesCard>
            <ServicesIcon src={image1} />
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={image2} />
          </ServicesCard>
            <ServicesCard>
            <ServicesIcon src={image3} />
          </ServicesCard>
            <ServicesCard>
              <ServicesIcon src={image4} />
            </ServicesCard>   
        </ServicesWrapper>

     
        </AcheivementsContainer>
    </>
  );
};

export default InfoSection;
