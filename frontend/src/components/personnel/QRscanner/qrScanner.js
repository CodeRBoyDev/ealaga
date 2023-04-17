import React from "react";
import Img from "../../../images/forgot.png";
import {TextField, InputLabel} from "@material-ui/core/";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useState } from 'react';
import axios from 'axios';
import Navbar from "../../../layouts/HeaderNav";
import SideBar from "../../../layouts/SideBarNav";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Button } from 'reactstrap';
import {
  HeroImageContainer,
  AppWrapper,
  App,
  TextWrapper,
  AppTitle,
  AppPara
} from "./QRElements";
import { QrReader } from 'react-qr-reader';
import SuccessAnimation from 'actually-accessible-react-success-animation';

const HeroImage = () => {

    
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

  let navigate = useNavigate();

  const [error, setError] = useState({  
    email: '',
    password: '',
    });

  const [usersss, setUser] = useState({
    email: '',
  })

  const onChange = e => {
        setUser({ ...usersss, [e.target.name]: e.target.value })
  }


  const submitLogin = ()=>{
   
console.log(usersss);
  
    let formData = new FormData();

    formData.set("email", usersss.email);
   
    axios({
        method: "post",
        url: `/api/password/forgot`,
        data: formData,
      }).then(response => {
        console.log(response.data.message)
        
        if(response.data.message === 'reset link sent to email'){
      
          Swal.fire({
            title: 'We have emailed your password reset link!',
            text: 'Please click on the link that has been sent to your email account to reset your password.',
            imageUrl: 'https://media1.giphy.com/media/YRE5lkyWvuOdj469ul/giphy.gif?cid=ecf05e47yem71lb0lupcox6qkbd55qna1u1hh2olk1awg5nh&rid=giphy.gif&ct=s',
            imageWidth: 350,
            imageHeight: 250,
            imageAlt: 'Custom image',
            confirmButtonColor: '#EF3A47',
          })
          document.querySelector("#emailfield").value = "";
          setError({ 
            email: '',
          });
  
          setUser({ 
            email: '',
          });
        }
        
       

       
       
      }).catch(error => {
                        console.log(error.response.data)
                            setError(error.response.data);
                    });   
}

const [data, setData] = useState('');

const QRapprove = _id => {
  console.log(_id);
}

  return (
    <>
    <div id="live" aria-live="polite" style={{opacity: 0,marginTop:"200px;"}} />
     <SideBar  isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle} />
    <Container style={{ minHeight: "45vh" }}>
    <HeroImageContainer>
  
      <TextWrapper>
        <AppTitle>
          <h1>SCAN QR CODE</h1>
          <h1><i className="fas fa-arrow-down"></i><i className="fas fa-arrow-down"></i><i className="fas fa-arrow-down"></i></h1>
        </AppTitle>
        <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            QRapprove(result?.text)
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <>{!data ? "" : 
      <>
         <SuccessAnimation
          text="ATTENDED"
          color="#5cb85c"
          liveRegion="live"
        />
          <h3>ID: {data}</h3>
      </>
          }</>    
      </TextWrapper>
      <style>
        {`
        
        .MuiFormLabel-root.Mui-focused {
          color: red !important;
        }
        .MuiFormLabel-root.Mui {
          color: red !important;
          font-size: 2rem;
        }
        .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
          border-color: red !important;
        }
        
        `}
      </style>
    </HeroImageContainer>
    </Container>
    </>
  );
};

export default HeroImage;
