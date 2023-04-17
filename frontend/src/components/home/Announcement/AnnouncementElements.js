import styled from "styled-components";

export const AcheivementsContainerWave = styled.div`
  background: #f1f4f5;
`;
export const AcheivementsContainer = styled.div`
  height: 500px;
  display: flex;
    align-items: center;
    justify-content: center;
  background: #FFBABA;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 0;
  @media screen and (max-width: 1024px) {
    height: 800px;
  }

  @media screen and (max-width: 768px) {
    height: 500px;
  }

  @media screen and (max-width: 480px) {
    height: 500px;
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
    font-size: 3.8rem;
    margin-bottom: 50px;
    font-weight: bold;
    @media screen and (max-width: 1024px) {
    font-size: 2.5rem;
    }
    @media screen and (max-width: 768px) {
    font-size: 2rem;
    }
    @media screen and (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 25px;
    }
    }
  h2 {
    font-size: 2.8rem;
    @media screen and (max-width: 1024px) {
      font-size: 2.5rem;
      }
      @media screen and (max-width: 768px) {
      font-size: 2rem;
      }
      @media screen and (max-width: 480px) {
      font-size: 1.5rem;
      margin-bottom: 25px;
      }
  }


  }
`;
