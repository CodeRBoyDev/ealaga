import styled, { keyframes } from "styled-components";

export const HeroImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 170px;
  margin-bottom: 30px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
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

  @media screen and (max-width: 768px) {
    height: auto;
    display: block;
    text-align: center;
    padding: 14px;
  }
`;

export const App = styled.img`
  max-width: auto;
  height: 120%;
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
  display: flex;
  margin-bottom: 36px;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;
export const AppTitle = styled.div`
  h1 {
    color: #EF3A47;
    font-size: 2.5rem;
    text-align: left;
    line-height: 60px;
    margin-left: 40px;
    font-weight: bold;
    @media screen and (max-width: 768px) {
      font-size: 2rem;
      line-height: 36px;
      text-align: center;
      margin: 0;
    }
    @media screen and (max-width: 1024px) {
      font-size: 2.2rem;
      line-height: 48px;
    }
  }

  h2 {
    color: #414b52;
    font-size: 2rem;
    text-align: left;
    line-height: 50px;
    margin-left: 40px;
    @media screen and (max-width: 768px) {
      font-size: 2rem;
      line-height: 36px;
      text-align: center;
      margin: 0;
    }
    @media screen and (max-width: 1024px) {
      font-size: 2.2rem;
      line-height: 48px;
    }
  }
`;

export const AppPara = styled.p`
  color: #414b52;
  font-size: 1.2rem;
  margin-left: 40px;
  text-align: justify;
  text-indent: 2em;
  ${"" /* text-align: center; */}
  line-height: 45px;
  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 36px;
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
`;
