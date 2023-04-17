import styled from "styled-components";
import { Link } from "react-router-dom";

export const ServicesContainer = styled.div`
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: none;
  align-items: center;
  margin-top: 0;
  margin: auto;
  padding-top: 0;
  align-items: top;

  @media screen and (max-width: 1024px) {
    height: auto;
  }

  @media screen and (max-width: 768px) {
    height: auto;
    padding-top: 90px;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 460px) {
    height: auto;
    padding-top: 90px;
  }
`;
export const LinkR = styled(Link)`
  text-decoration: none;
`;

export const ServicesWrapper = styled.div`
  max-width: 175vh;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 50px;
  padding: 0 0px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 0px;
    width: 80%;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 0px;
    max-width: 125vh;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 0 0px;
    grid-gap: 15px;
    max-width: 125vh;
  }
`;

export const ServicesCard = styled.div`
  background: linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%));
  display: flex;
  border: 1px solid #FFFFFF;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 50px;
  min-height: 300px;
  max-height: 600px;
  margin-top: 15px;
  margin: auto;
  padding: 30px;
  box-shadow: 0 5px 10px rgba(100, 100, 100, 0.6);
  transition: all 0.3s ease-in-out ;

  &:hover {
    transform: scale(1.02);
    transition: all 0.4 ease-in-out;
    box-shadow: 0 5px 10px rgba(255, 0, 0, 0.6);
    cursor: pointer;
    h2 {
      transition: all 0.4s ease-in-out ;
      color: #EF3A47;
    }
  }
  
  @media screen and (max-width: 768px) {
    height: 200px;
    padding: 20px;
  }
  @media screen and (max-width: 460px) {
    max-height: 200px;
    min-height: 200px;
  }
`;

export const ServicesIcon = styled.img`
  height: 10vh;
  width: 10vh;
  margin-bottom: 10px;
  border-radius: 10px;
  @media screen and (max-width: 480px) {
    height: 8vh;
    width: 8vh;
  }
`;
export const ServicesH1 = styled.h1`
  font-size: 2rem;
  color: #EF3A47;
  font-weight: bold;
  margin-bottom: 0px;
  margin-top: 10px;

  @media screen and (max-width: 480px) {
    margin-top: -60px;
    margin-bottom: 10px;
    font-size: 1.25rem;
  }
`;

export const ServicesH2 = styled.h2`
  font-size: 1.5rem;
  color: #000000;
  font-weight: bold;
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const ServicesP = styled.p`
  color: #000000;
  font-size: 1rem;
  text-align: center;
  letter-spacing: 0.5px;
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
