import styled from "styled-components";
import { Link } from "react-router-dom";

export const ServicesContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f1f4f5;
  align-items: center;
  margin-top: 0;
  padding-top: 0;
  alignitems: top;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    height: 100%;
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
  &:hover {
    text-decoration: none;
  }
`;

export const BtnWrap = styled.div`
    margin-bottom: 50px;
    margin-top: 50px;

    @media screen and (max-width: 480px) {
      font-size: 2.5rem;
    }
`;

export const ServicesWrapper = styled.div`
;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 30px;
  padding: 0 0px;

  @media only screen and (max-width: 1480px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 0px;
}

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 0px;
    width: 80%;
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 0 0px;
    width: 100%;
  }
`;

export const ServicesCard = styled.div`
  background: #FFFFFF;
  display: flex;
  border: 1px solid #FFFFFF;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 360px;
  max-height: 90%;
  padding: 90px;
  box-shadow: 0 5px 10px rgba(255, 0, 0, 0.6);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2 ease-in-out;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    height: auto;
    padding: auto;
  }
  @media screen and (max-width: 480px) {
    min-height: auto;
    min-width: auto;
  }
`;

export const ServicesIcon = styled.img`
  min-height: 15vh;
  width: 15vh;
  margin-bottom: 10px;
  margin-top: -50px;
  border-radius: 10px;
`;
export const ServicesH1 = styled.h1`
  font-size: 3.5rem;
  color: #EF3A47;
  font-weight: bold;
  margin-bottom: 50px;
  margin-top: 50px;

  @media screen and (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export const ServicesH2 = styled.h2`
  font-size: 2rem;
  color: #000000;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const ServicesP = styled.p`
  color: #000000;
  font-size: 1.2rem;
  text-align: center;
  line-height: 24px;
  letter-spacing: 1.2px;
`;
