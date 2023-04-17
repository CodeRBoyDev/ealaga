import React from "react";
import { Link } from "react-router-dom";
import {
  FooterContainer,
  FooterWrapper,
  FooterColumn,
  FooterBlock,
  CopyrightWrapper
} from "./FooterElements";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterColumn>
          <FooterBlock>
            <h1>Contact us</h1>
            <h2>ealaga.taguig@gmail.com</h2>
            <h2>+639508111016</h2>
            <h2>Available Monday to Friday</h2>
            <h2>from 8am to 5pm.</h2>
          </FooterBlock>
        </FooterColumn>
        <FooterColumn>
          <FooterBlock>
            <h1>Head Office</h1>
            <h2>
              Office of Senior Citizen Affair
              <br />
              (OSCA)
            </h2>
          </FooterBlock>
          <FooterBlock>
            <h1>Locations</h1>
            <h2>13, 1639 Ipil-Ipil Street</h2>
            <h2>North Signal Village, Taguig City.</h2>
          </FooterBlock>
        </FooterColumn>
        <FooterColumn>
          <FooterBlock>
            <h1>FAQs</h1>
            <h2>
              <Link to="/faqs/terms-condition" rel="noopener noreferrer" target="_blank">
                Terms and Conditions
              </Link>
            </h2>
            <h2>
              <Link to="/faqs/privacy-policy" rel="noopener noreferrer" target="_blank">
                Privacy Policy
              </Link>
            </h2>
          </FooterBlock>
        </FooterColumn>
        <FooterColumn>
          <FooterBlock>
            <h1>Follow us</h1>
            <h2>
              <a href="https://www.facebook.com/taguigcity" rel="noopener noreferrer" target="_blank">
                Facebook
              </a>
            </h2>
          </FooterBlock>
        </FooterColumn>
      </FooterWrapper>
      <CopyrightWrapper>
        Copyright 2022. eAlaga. All rights reserved.
      </CopyrightWrapper>
    </FooterContainer>
  );
};

export default Footer;
