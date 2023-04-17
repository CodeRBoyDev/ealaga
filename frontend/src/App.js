import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Container, Jumbotron, Row, Col,  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption } from 'reactstrap'
import Navbar from "./layouts/HeaderNav";
import SideBar from "./layouts/SideBarNav";
import Hero from './components/home/Hero'
import Announcement from './components/home/Announcement'
import Instruction from './components/home/Instruction'
import Team from './components/home/Team'
import About from './components/home/About'
import Join from './components/home/Join'
import { homeObjOne } from './components/home/About/Data'
import { homeObjTwo } from './components/home/Join/Data'
import { Scrollbars } from 'react-custom-scrollbars-2';
import Sec1 from './section1'
import Footer from './components/home/Footer'
import { Fade } from "react-reveal";


function App() {
  

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: 'rgba(35, 49, 86, 0.8)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

    const CustomScrollbars = props => (
        <Scrollbars
          renderThumbHorizontal={renderThumb}
          renderThumbVertical={renderThumb}
          {...props}
        />
      );

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const mystyle = {
        background: 'none'
      };

  return (
    <div>
     <SideBar  isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle} />
      <Fade bottom duration={2000} distance="40px">
      <Hero />
      </Fade>
      <Announcement />
      <Instruction />
      <About {... homeObjOne} />
      <Team />
      <Join {... homeObjTwo} />
      
      <Footer />
   
  </div>
  );
}

export default App;
