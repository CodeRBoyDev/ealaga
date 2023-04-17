import styled, { keyframes } from "styled-components";

export const HeroImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 100px;
  margin-bottom: 50px;
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
  max-width: 1750px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 30px;
  padding: 0 0px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 0px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 0px;
    width: 80%;
  }
`;

export const ServicesH1 = styled.h1`
  font-size: 3.5rem;
  color: #EF3A47;
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 50px;

  @media screen and (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export const ServicesH2 = styled.h1`
  font-size: 1.5rem;
  color: black;
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 5px;

  @media screen and (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export const ServicesH3 = styled.h1`
  font-size: 1.2rem;
  color: black;
  margin-bottom: 5px;
  margin-top: 5px;
  text-align: justify;
  text-indent: 50px;
  
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;