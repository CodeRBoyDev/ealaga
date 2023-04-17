import React from "react";

import {
  LinkR,
  ServicesCard,
  ServicesContainer,
  ServicesH1,
  ServicesH2,
  ServicesIcon,
  ServicesP,
  ServicesWrapper
} from "./ServicesElements";
import image1 from "../../../images/registers.png";
import image2 from "../../../images/appointments.png";
import image3 from "../../../images/massage.png";
import image4 from "../../../images/confirm.png";


const Services = () => {
  return (
    <>
      <ServicesContainer id="services">
        <ServicesH1>How to use eAlaga</ServicesH1>
        <ServicesWrapper>
          <ServicesCard>
            <ServicesIcon src={image1} />
            <ServicesH2>Login or Register</ServicesH2>
            <ServicesP>
            a. If a user is new to eAlaga, they can register using their email address. An email confirmation is sent to activate the account.
        
            </ServicesP>
            <ServicesP>
          b. If a user is an existing user, they can log in using their registered email and password.
            </ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={image3} />
            <ServicesH2>Choose Healthcare service</ServicesH2>
            <ServicesP>
            a. Show a list of available services offered by eAlaga.
          
            </ServicesP>
            <ServicesP>
            b. Pick a service from the options available (e.g. recreational activities, dialysis, multipurpose hall, etc.).
            </ServicesP>
          </ServicesCard>
            <ServicesCard>
            <ServicesIcon src={image2} />
            <ServicesH2>Set a schedule</ServicesH2>
            <ServicesP>
            a. Provide options for the user to select a date and time for the service.
            </ServicesP>
            <ServicesP>
            b. Show available slots for the selected date and time and Allow the user to pick a slot that works best for them.
            </ServicesP>
          </ServicesCard>
            <ServicesCard>
              <ServicesIcon src={image4} />
              <ServicesH2>Confirm Schedule</ServicesH2>
              <ServicesP>
              a. Confirm the details of the user's selected service, date, and time, and slot.
              </ServicesP>
              <ServicesP>
              b. Generate a proof of confirmation in the form of QR codes and text.
              </ServicesP>
            </ServicesCard>
        </ServicesWrapper>
      </ServicesContainer>
    </>
  );
};

export default Services;
