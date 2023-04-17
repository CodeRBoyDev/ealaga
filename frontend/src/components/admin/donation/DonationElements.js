import styled from "styled-components";

export const AcheivementsContainerWave = styled.div`
  background: #f1f4f5;
`;
export const AcheivementsContainer = styled.div`
height: 400px;
display: flex;
flex-direction: column;
justify-content: center;
background: #FFBABA;
align-items: center;
margin-top: -5px;
margin-bottom: 5px;
font-size: 0;
  @media screen and (max-width: 1024px) {
    height: 800px;
  }

  @media screen and (max-width: 768px) {
    height: 1000px;
  }

  @media screen and (max-width: 480px) {
    height: 900px;
  }
`;
export const ServicesCard3 = styled.div`
  background: linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%));
  display: flex;
  border: 1px solid #FFFFFF;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 50px;
  max-height: 15vh;
  min-height: 15vh;
  max-width: 20vh;
  min-width: 20vh;
  padding: 30px;
  margin-bottom: 20px;
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
    max-height: 25vh;
  min-height: 25vh;
  max-width: 30vh;
  min-width: 30vh;
  }
  @media screen and (max-width: 480px) {
    max-height: 25vh;
    min-height: 25vh;
    max-width: 30vh;
    min-width: 30vh;
    padding: 10px;
  }
`;
export const BtnWrap2 = styled.div`
    align-items: center;
    justify-content: center;
    display: grid;
    grid-gap: 100px;
    padding: 0 50px;
    margin-top: 30px;
    margin-bottom: 20px;
    @media screen and (max-width: 480px) {
      font-size: 2.5rem;
    }
`;
export const ServicesIcon = styled.img`
  height: 6vh;
  width: 6vh;
  margin-bottom: 10px;
  border-radius: 10px;

  @media screen and (max-width: 1340px) {
    height: 90px;
    width: 100px;
  }



  @media screen and (max-width: 780px) {
   
  }
  @media screen and (max-width: 480px) {
   
  }
`;

export const ServicesH2 = styled.h2`
  font-size: 2vh;
  color: #EF3A47;
  font-weight: bold;



`;


export const ServicesWrappers3 = styled.div`
        max-width: 20vh;
        margin: auto;
        display: flex;
        justify-content: center;

     
`;
export const TextWrapper = styled.div`
text-align: center;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const ServicesH1 = styled.h1`
  font-size: 2.5rem;
  color: #EF3A47;
  font-weight: bold;
  margin-bottom: 50px;
  margin-top: 30px;

  @media screen and (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export const AcheivementsText = styled.div`
color: #EF3A47;
font-size: 2rem;
text-align: center;
font-weight: bold;
  h1 {
    margin-top: 0;
    align-items: top;
    font-size: 2rem;
    margin-bottom: 0px;
    font-weight: bold;
  }
  h2 {
    font-size: 2.8rem;
  }

  @media screen and (max-width: 768px) {
    h1 {
      margin-top: 0;
      font-size: 2.8rem;
    }
    h2 {
      font-size: 1.8rem;
    }
  }
`;
