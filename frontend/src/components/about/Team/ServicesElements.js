import styled from "styled-components";
import { Link } from "react-router-dom";

export const ServicesContainer = styled.div`
  height: 1300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f1f4f5;
  align-items: center;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    height: 1700px;
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

  margin-bottom: 100px;
`;

export const ServicesCard = styled.div`
  background: #FFFFFF;
  display: flex;
  border: 1px solid #FFFFFF;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 360px;
  max-height: 360px;
  min-height: 360px;
  padding: 90px;
  box-shadow: 0 5px 10px rgba(255, 0, 0, 0.6);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2 ease-in-out;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    height: 360px;
    padding: 100px;
  }
  @media screen and (max-width: 460px) {
    min-height: 360px;
    padding: 100px;
  }
`;

export const ServicesIcon = styled.img`
  min-height: 20vh;
  width: 20vh;
  margin-bottom: 10px;
  margin-top: -50px;
  border-radius: 200px;
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

export const ServicesH3 = styled.h1`
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
  font-size: 1.4rem;
  color: #000000;
  margin-bottom: 10px;
  margin-left: -30px;
  margin-right: -30px;
  font-weight: bold;
`;

export const ServicesP = styled.p`
  color: #000000;
  font-size: 1.2rem;
  text-align: center;
  line-height: 24px;
  letter-spacing: 1.2px;
`;
