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
