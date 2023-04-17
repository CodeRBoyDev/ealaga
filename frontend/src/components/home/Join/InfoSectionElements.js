import styled from "styled-components";

export const InfoContainer = styled.div`
  color: #f1f4f5;
  position: relative;
  background: ${({ lightBg }) => (lightBg ? "#fff" : "#EF3A47")};
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    min-height: 700px;
  }
  @media screen and (max-width: 460px) {
    height: auto;
  }
`;
export const InfoWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: 600px;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 50px;
  padding: 0 24px;
  justify-content: center;

  @media screen and (max-width: 460px) {
    height: 1000px;
  }

`;
export const InfoRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgStart }) =>
    imgStart
      ? `'col2
    col1'`
      : `'col1 col2'`};

  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart }) =>
      imgStart
        ? `'col1'
    'col2'`
        : `'col1 col1' 'col2 col2'`};
  }
`;
export const Column1 = styled.div`
  margin: 15px;
  padding: 15px;
  grid-area: col1;
  text-align: center;
  align-items: center;
`;
export const Column2 = styled.div`
  margin: 15px;
  padding: 15px;
  grid-area: col2;
  text-align: center;
  align-items: center;
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 30px;
  @media screen and (max-width: 768px) {
    padding: 0px;
  }
  @media screen and (max-width: 460px) {
    padding: 0px;
  }
`;

export const TopLine = styled.p`
  color: #74a4c5;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-botton: 16px;
`;

export const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 3.5rem;
  line-height: 1.4;
  font-weight: bold;
  color: ${({ lightText }) => (lightText ? "#f1f4f5" : "#EF3A47")};
  @media screen and (max-width: 1024px) {
    font-size: 36px;
  }
  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;
export const Subtitle = styled.p`
  max-width: 600px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 25px;
  justify-content: center;
  align-text: center;
  color: ${({ darkText }) => (darkText ? "#2c2c2c" : "#f1f4f5")};
`;
export const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;
export const ImgWrap = styled.div`
  max-width: 555px;
  height: 100%;
`;
export const Img = styled.img`
  width: 600px;
  display: block;
  margin-left: -50px;
  border-radius: 10px;
  margin-right: auto;
  padding-right: 0;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 460px) {
    width: 100%;
  }
`;
