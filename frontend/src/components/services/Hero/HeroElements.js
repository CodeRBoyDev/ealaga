import styled from "styled-components";
import Container from 'react-bootstrap/Container';


export const WaveContainer =styled(Container) `
    height: 100vh;
    width: 100%;
    top: 0;
    zIndex: 2;
`
export const HeroContainer = styled(Container)`
    height: 90vh;
    width: 100%;
    top: 0;
    padding: 4em;
    position: relative;
    display: flex;
    @media screen and (max-width: 768px) {
        height: auto;
    }
`

export const Background = styled.div`
    position: absolute;
    /*margin: 0 20vw;
    background: linear-gradient(#C3E0E5, #5885AF);*/
    border-radius: 5px;
    align-self: center;
    z-index: 1;
    @media screen and (max-width: 1024px) {
        display: none;
    }
`

export const HeroWrapper = styled.div`
    padding-top: 54px;
    z-index: 2;
    display: flex;
    align-items: center;
    @media screen and (max-width: 1024px) {
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
    }
`
export const AppImage = styled.div `

    margin-right:25px;
    z-index: 1;
    width: 25%;
    height: auto;
    @media screen and (max-width: 1024px) {
        align-self: center;
        justify-content: center;
        width: 50%;
        height: 50%;
    }
`


export const HeroText = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    font-weight: 700;
    color: #1a3008;
    margin-left: 10vw;
    margin-bottom: 50px;
    h1 {
        margin: -12px 0;
        font-size: 5.8rem;
    }
    h2 {
        margin: -8px 0;
        font-size: 2.8rem;
    }
    @media screen 
    and (min-width: 768px)
    and (max-width: 1024px) {
        margin-bottom: 0px;
        justify-content: center;
        align-items: center;
        margin-left: 0;
        
        h1 {
            margin: -28px 0;
            font-size: 6rem;
        }
        h2 {
            margin: -12px 0;
            font-size: 3rem;
        }
    }
    @media screen and (max-width: 768px) {
        justify-content: center;
        align-items: center;
        margin-left: 0;
        h1 {
            margin: -16px 0;
            font-size: 4rem;
        }
        h2 {
            margin: -8px 0;
            font-size: 2.2rem;
        }
    }
    
`
export const AppStoreContainer = styled.div`
    display: flex;
    max-width: 100%;
    margin-left: -12px;
    margin-top: 12px;
    @media screen 
    and (max-width: 1024px)
    and (min-width: 768px) {
        max-width: 50%;
        margin-left: 0;
    }
    @media screen and (max-width: 768px)  and (max-width: 1024px)  {
        max-width: 50%;
        margin-left: 0;
    }
`

export const AppStore = styled.div`
    width: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
`