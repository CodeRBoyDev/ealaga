import styled from "styled-components";



export const AcheivementsContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #EF3A47;
  align-items: center;
  margin-top: -5px;
  margin-bottom: -3px;
  font-size: 0;
  @media screen and (max-width: 1024px) {
    height: 1000px;
  }

  @media screen and (max-width: 768px) {
    height: 1000px;
  }

  @media screen and (max-width: 480px) {
    height: 900px;
  }
`;


export const ServicesWrapper = styled.div`
  max-width: 1750px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 10px;
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
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 0 0px;
    width: 80%;
  }

`;


export const ServicesCard = styled.div`
  background: #FFFFFF;
  display: flex;
  border: 1px solid #FFFFFF;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 50px;
  max-height: 50px;
  min-height: 50px;
  padding: 90px;
  box-shadow: 0 5px 10px rgba(255, 0, 0, 0.6);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2 ease-in-out;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    height: 180px;
    padding: 100px;
  }
  @media screen and (max-width: 480px) {
    height: 50px !important;
    padding: 80px !important;
  }
`;

export const ServicesIcon = styled.img`
  min-height: 150px;
  width: 150px;
  margin-bottom: 10px;
  margin-top: -75px;
  border-radius: 10px;
  @media screen and (max-width: 480px) {
    min-height: 100px;
  width: 100px;
  }
`;



