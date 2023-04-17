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



export const ServicesContainer = styled.div`
  height: 450px;
  display: flex;
  flex-direction: column;
  background: none;
  margin-top: 0;
  padding-top: 0;
  alignitems: top;
  @media screen and (max-width: 1024px) {
    height: auto;
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
  text-decoration: none;
`;

export const ServicesWrapper = styled.div`
  max-width: 1500px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 50px;
  padding: 0 0px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 0px;
    width: 80%;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 0px;
    width: 80%;
  }
`;


export const ServicesCardModal = styled.div`
background: linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%));
  border: 0.2px solid black;
  border-radius: 2px;
  max-height: 360px;
  min-height: 360px;
  padding: 30px;

  @media screen and (max-width: 768px) {
    height: 300px;
    padding: 20px;
  }
  @media screen and (max-width: 460px) {
    min-height: 300px;
    padding: 10px;
  }
`;

export const ServicesCard = styled.div`
  background: linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%));
  display: flex;
  border: 1px solid #FFFFFF;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 50px;
  max-height: 310px;
  min-height: 310px;
  padding: 30px;
  box-shadow: 0 5px 10px rgba(100, 100, 100, 0.6);
  transition: all 0.3s ease-in-out ;

  @media screen and (max-width: 768px) {
    height: 300px;
    padding: 20px;
  }
  @media screen and (max-width: 460px) {
    min-height: 300px;
    padding: 10px;
  }
`;
export const BtnWrap = styled.div`
    margin-bottom: 0px;
    margin-top: 3px;

    @media screen and (max-width: 480px) {
      font-size: 2.5rem;
    }
`;
export const BtnWrap2 = styled.div`
    margin-bottom: 0px;
    margin-top: 3px;
    display: grid;
    grid-gap: 100px;
    padding: 0 50px;
    margin:5px;
    @media screen and (max-width: 480px) {
      font-size: 2.5rem;
    }
`;


export const Paginate = styled.div`
    margin-bottom: 0px;
    margin-top: 20px;

    @media screen and (max-width: 480px) {
      font-size: 2.5rem;
    }
`;
export const ServicesIcon = styled.img`
  height: 70px;
  width: 70px;
  margin-bottom: 0px;
  margin-top: -10px;
`;

export const ServicesIcon2 = styled.img`

  height: auto;
  width: auto;
  margin-bottom: 0px;
  margin-top: 5px;
  @media screen and (max-width: 480px) {
    height: 60%;
    width: 95%;
  }
`;

export const ServicesIcon3 = styled.img`
  height: 27%;
  width: 100%;
  margin-bottom: 0px;
  margin-top: 5px;
  @media screen and (max-width: 480px) {
    height: 23%;
    width: 90%;
  }

  @media screen and (max-width: 375px) {
    height: 20%;
    width: 87%;
  }
 

`;


export const ServicesH2 = styled.h2`
  font-size: 1.1rem;
  color: #EF3A47;
  font-weight: bold;
  margin-bottom: 0px;
  margin-top: 2px;
  display: flex; 
`;

export const ServicesH21 = styled.h2`
  font-size: 1rem;
  color: #EF3A47;
  font-weight: bold;
  margin-bottom: 0px;
  margin-top: 2px;
`;

export const ServicesH25 = styled.h2`
font-size: 0.9rem;
color: #000000;
font-weight: bold;
margin-bottom: 0px;
margin-top: 2px;
display: flex; 

@media screen and (max-width: 480px) {
  font-size: 0.8rem;
}


@media screen and (max-width: 375px) {
  font-size: 0.75rem;
}

// @media screen and (max-width: 392px) {
//   font-size: 0.9rem;
// }


`;

export const ServicesP = styled.p`
  color: #000000;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  margin-bottom: 0px;
  margin-top: 2px;

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }

`;
export const ServicesP5 = styled.p`
  color: #EF3A47;
  font-weight: bold;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  margin-bottom: 0px;
  margin-top: 2px;
 
  @media screen and (max-width: 375px) {
    font-size: 0.8rem;
  }

`;
export const ServicesP1 = styled.p`
  color: #000000;
  font-size: 0.7rem;
  margin-bottom: 0px;
  margin-top: 5px;
  text-align: center;

  @media screen and (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

export const ServicesP2 = styled.p`
  color: #000000;
  font-size: 0.87rem;
  margin-bottom: 0px;
  margin-top: 5px;
  text-align: left;
  @media screen and (max-width: 480px) {
    font-size: 0.87rem;
  }
  @media screen and (max-width: 440px) {
    font-size: 0.75rem;
  }
`;




