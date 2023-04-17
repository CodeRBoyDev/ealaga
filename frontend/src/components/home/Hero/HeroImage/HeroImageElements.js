import styled, { keyframes } from "styled-components";

export const HeroImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 170px;
  margin-bottom: -60px;
  justify-content: center;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    margin-top: 170px;
    margin-bottom: -70px;
   
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-top: 170px;
    margin-bottom: -70px;
  }
`;

const float = keyframes`
    from { transform: translate(0,  0px); }
    65%  { transform: translate(0, 10px); }
    to   { transform: translate(0, -0px); } 
`;

export const AppWrapper = styled.div`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -100px;
  flex: 0.8;
  animation: ${float} 3s ease-in-out infinite;

  @media screen and (max-width: 1024px) {
    height: auto;
    margin-top: 0;
  }

  @media screen and (max-width: 768px) {
    height: auto;
  }
`;

export const App = styled.img`
  max-width: auto;
  height: 120%;
  margin-top: 5vh;

  @media screen and (max-width: 1024px) {
    max-width: 50%;
    height: auto;
    margin-top: 0;
  }
  @media screen and (max-width: 768px) {
    max-width: 50%;
    height: auto;
    margin-top: -10%;
  }

  @media only screen and (max-width: 480px) {
    max-width: 50%;
    height: auto;
    margin-top: -10%;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  margin-bottom: 36px;
  flex-direction: column;
  justify-content: center;
  flex: 0.8;

  @media screen and (max-width: 1024px) {
    height: auto;
    margin-top: 0;
  }

  @media screen and (max-width: 768px) {
    height: auto;
  }
`;
export const AppTitle = styled.div`
  h1 {
    color: #414b52;
    font-size: 3rem;
    text-align: left;
    line-height: 40px;
    font-weight: bold;
    @media screen and (max-width: 768px) {
      font-size: 2rem;
      line-height: 36px;
      text-align: center;
      margin: 0;
    }
    @media screen and (max-width: 1024px) {
      font-size: 2.2rem;
      line-height: 40px;
    }
  }

  h2 {
    color: #414b52;
    font-size: 1.7rem;
    text-align: left;
    line-height: 50px;
    @media screen and (max-width: 768px) {
      font-size: 2rem;
      line-height: 36px;
      text-align: center;
      margin: 0;
    }
    @media screen and (max-width: 1024px) {
      font-size: 1.7rem;
      line-height: 36px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 1.7rem;
      line-height: 36px;
      text-align: center;
      margin: 0;
    }
  }
`;

export const AppPara = styled.p`
  color: #414b52;
  font-size: 1.2rem;
  text-indent: 50px;
  text-align: justify; 
  line-height: 30px;
  @media screen and (max-width: 1024px) {
    font-size: 0.9rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    text-align: center;
  }
  @media only screen and (max-width: 480px) {
    font-size: 1.2rem
    margin: 5%;
    
  }
`;

export const AppStore = styled.div`
  width: 50%;
  vertical-align: left;
  @media screen and (max-width: 768px) {
    vertical-align: center;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    align-self: center;
  }
  @media only screen and (max-width: 480px) {
    width: 50%;
    vertical-align: left;
  }
`;
