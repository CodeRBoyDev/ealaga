
import '../App.css';
import React, { useState } from 'react';

import Navbar from "../layouts/HeaderNav";
import SideBar from "../layouts/SideBarNav";

import { Scrollbars } from 'react-custom-scrollbars-2';

import Footer from '../components/home/Footer'

import Hero from '../components/joinus'

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
      <Hero />
      <Footer />
  </div>
  );
}

export default App;
