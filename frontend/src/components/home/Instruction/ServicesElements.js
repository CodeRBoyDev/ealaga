import styled from "styled-components";
import { Link } from "react-router-dom";

export const ServicesContainer = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f1f4f5;
  align-items: center;
  margin: auto;
  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
    height: 1200px;
  }

  @media screen and (max-width: 768px) {
    height: 1700px;
  }
  @media screen and (max-width: 460px) {
    height: 1700px;
  }
`;
export const LinkR = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

export const ServicesWrapper = styled.div`
  max-width: 80%;
  margin-top: 80px;
  margin-bottom: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  justify-content: center;
  grid-gap: 30px;
  padding: 0 0px;

  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 0px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 0px;
    margin-bottom: 80px;
  }
`;

export const ServicesCard = styled.div`
  background: #FFFFFF;
  display: flex;
  border: 1px solid #FFFFFF;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  max-height: 100%;
  padding: 30px;
  box-shadow: 0 5px 10px rgba(255, 0, 0, 0.6);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2 ease-in-out;
    cursor: pointer;
  }
  @media screen and (max-width: 1280px) {
    max-height: auto;
    max-width: auto;
  }
  @media screen and (max-width: 768px) {
    max-height: auto;
    max-width: auto;
    padding: 20px;
  }
  @media screen and (max-width: 460px) {
    max-height: auto;
    max-width: auto;
    padding: 10px;
  }
`;

export const ServicesIcon = styled.img`
  min-height: 0px;
  width: 10vh;
  margin-bottom: 10px;
  border-radius: 10px;
`;
export const ServicesH1 = styled.h1`
  font-size: 3.5rem;
  color: #EF3A47;
  font-weight: bold;
  margin-top: 50px;

  @media screen and (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export const ServicesH2 = styled.h2`
  font-size: 1rem;
  color: #000000;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const ServicesP = styled.p`
  color: #000000;
  font-size: 1rem;
  text-align: justify;
  line-height: 25px;
`;
