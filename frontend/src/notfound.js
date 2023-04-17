import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Navbar from "./layouts/HeaderNav";
import SideBar from "./layouts/SideBarNav";
import { Scrollbars } from 'react-custom-scrollbars-2';
import Footer from './components/home/Footer'
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Fade } from "react-reveal";

const NotFound = () => {
    const location = useLocation();
    let navigate = useNavigate();

    const renderThumb = ({ style, ...props }) => {
        const thumbStyle = {
            borderRadius: 6,
            backgroundColor: 'rgba(35, 49, 86, 0.😎'
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

            <SideBar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100vh" }}>

                <Fade bottom duration={2000} distance="40px">
                    <section class="page_404">
                        <div class="container">

                            <div class="col-sm-12 ">
                                <div class="text-center">

                                    <div class="logo">
                                        <img style={{ width: "60vh" }} src="https://res.cloudinary.com/du7wzlg44/image/upload/v1674439691/404_Error_zcpgnh.gif" alt="" />
                                    </div>

                                    <h3 class="h2">
                                        Look like you're lost
                                    </h3>

                                    <p>Sorry, the page <b>{location.pathname}</b> could not be found.</p>
                                    <Button style={{ height: "50px" }} onClick={() => navigate('/')} color="danger"><i class="fas fa-home"></i>&nbsp;Go to Home</Button>

                                </div>

                            </div>
                        </div>
                    </section>
                </Fade>
            </div>
            <Footer />


        </div>
    );
};


export default NotFound;