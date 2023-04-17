import styled, { keyframes } from "styled-components";

export const HeroImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 100px;
  @media screen and (max-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    ${"" /* background: #C3E0E5; */}
    background: none;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ServicesWrapper = styled.div`
 max-width: 100%;
    height: auto;


  @media screen and (max-width: 1024px) {
    max-width: 100%;
  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ServicesH1 = styled.h1`
  font-size: 3.5rem;
  color: #EF3A47;
  font-weight: bold;
  margin-bottom: 50px;
  margin-top: 50px;
  @media screen and (max-width: 1024px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;