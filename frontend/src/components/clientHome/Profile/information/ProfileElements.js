import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const HeroImageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;

  margin-top: 130px;
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

export const LinkR = styled(Link)`
  text-decoration: none;
`;
export const ServicesH1 = styled.h1`
  font-size: 2.5rem;
  color: #EF3A47;
  font-weight: bold;
  margin-bottom: 50px;
  margin-top: 10px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
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
  flex: 0.8;
  animation: ${float} 3s ease-in-out infinite;

  @media screen and (max-width: 768px) {
    margin-bottom: 14px;
    height: 100%;
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

export const App = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    border-radius: 50%;
    height: 150px;
    width: 150px;
 

  border:10px solid white;
  border-radius: 500px;
  -webkit-border-radius: 500px;
  -moz-border-radius: 500px;
  box-shadow: 0 5px 10px rgba(100, 100, 100, 0.3);

  @media screen and (max-width: 768px) {
    max-width: 80%;
    height: auto;
    margin-top: 0;
  }
  @media screen and (max-width: 1024px) {
    max-width: 100%;
    height: auto;
    margin-top: 0;
  }
`;

export const TextWrapper = styled.div`
text-align: center;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const AppTitle = styled.div`

  h1 {
    color: #EF3A47;
    font-size: 1.5rem;
    text-align: center;
    line-height: 60px;
    font-weight: bold;
    @media screen and (max-width: 768px) {
      font-size: 2rem;
      line-height: 36px;
      text-align: center;
      margin: 0;
    }
    @media screen and (max-width: 480px) {
      font-size: 1.2rem;
    }
  }

  h2 {
    color: black;
    font-size: 0.9rem;
    text-align: center;
    font-weight: bold;
    margin-bottom: 15px;
    margin-top: 15px;

    @media screen and (max-width: 768px) {
      font-size: 0.9rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  h6 {
    font-size: 1rem;
    text-align: center;
    line-height: 60px;
    font-weight: bold;
    margin-bottom: -10px;
    margin-top: -30px;

    @media screen and (max-width: 768px) {
      font-size: 2rem;
      line-height: 36px;
      text-align: center;
      margin: 0;
    }
    @media screen and (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
`;

export const AppPara = styled.p`
  color: #414b52;
  font-size: 1.3rem;
  margin-left: 40px;
  ${"" /* text-align: center; */}
  line-height: 54px;
  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 36px;
  }
`;


