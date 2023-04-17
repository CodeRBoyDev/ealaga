import React, { useContext } from "react";
import Img from "../../images/activeelder.gif";
import { TextField, InputLabel } from "@material-ui/core/";
import { InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios, { updateToken } from '../../axiosConfig';
import { authenticate } from './helpers';
import Swal from 'sweetalert2'
import { Button } from 'reactstrap';
import No_internet from "../../images/no_internet.gif";
import Pendingsrunning from "../../images/pendingsrunning.gif";

import {
  HeroImageContainer,
  AppWrapper,
  App,
  TextWrapper,
  AppTitle,
  AppPara
} from "./HeroImageElements";
import ChatContext from "../chat/Context/chat-context";
import { Fade } from "react-reveal";

const HeroImage = () => {

  let navigate = useNavigate();
  const { selectedChat, setSelectedChat, user, setUser, chats, setChats } = useContext(ChatContext);

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const [usersss, setUserss] = useState({
    email: '',
    password: '',
  })

  const onChange = e => {
    setUserss({ ...usersss, [e.target.name]: e.target.value })
  }


  const submitLogin = () => {



    let formData = new FormData();

    formData.set("email", usersss.email);
    formData.set("password", usersss.password);

    Swal.fire({
      text: 'Please wait while processing your account.',
      imageUrl: Pendingsrunning,
      imageWidth: 400,
      imageHeight: 325,
      imageAlt: 'Custom image',
      confirmButtonColor: '#EF3A47',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    })


    axios({
      method: "post",
      url: `api/signin`,
      data: formData,
    }).then(response => {
      Swal.close()

      console.log(response.data.message)

      if (response.data.message === 'verifyEmail') {
        setError({
          email: '',
          password: ''
        });
        Swal.fire({
          title: 'A verification link has been sent to your email account.',
          text: 'Please click on the link that has been sent to your email account to verify your email and continue the registration process',
          imageUrl: 'https://media1.giphy.com/media/YRE5lkyWvuOdj469ul/giphy.gif?cid=ecf05e47yem71lb0lupcox6qkbd55qna1u1hh2olk1awg5nh&rid=giphy.gif&ct=s',
          imageWidth: 350,
          imageHeight: 250,
          imageAlt: 'Custom image',
          confirmButtonColor: '#EF3A47',
        })
      } else if (response.data.message === 'inactive') {
        setError({
          email: '',
          password: ''
        });
        Swal.fire({
          title: 'Your account is temporary deactivated!',
          imageUrl: 'https://media2.giphy.com/media/LkV0XjZTGlGDJtOZSB/giphy.gif?cid=ecf05e47w1kpkv2yjynvcsrkygfj1t0qww18jfjvk0js3v6y&rid=giphy.gif&ct=s',
          icon: 'error',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#EF3A47',
        })
      } else {
        setError({
          email: '',
          password: ''
        });


        if (response.data.user.role === 'admin') {
          let dataUser = {
            "first_name": response.data.user.first_name,
            "last_name": response.data.user.last_name,
            "_id": response.data.user._id,
            "token": response.data.token,
            "email": response.data.user.email,
          };
          setUser(dataUser);
          updateToken(response.data.token);

          authenticate(response, () => navigate("/admin/dashboard"));
          Swal.fire({
            title: 'Well done!',
            text: 'You have successfully logged in.',
            imageUrl: 'https://media4.giphy.com/media/Hnl23o6SHL21d8kmcB/giphy.gif?cid=ecf05e479vhp0mku8nm5hfyfom7ojy3cxm1y444jm9lavw6u&rid=giphy.gif&ct=s',

            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#EF3A47',
          })
        } else if ((response.data.user.role === 'client')) {
          let dataUser = {
            "first_name": response.data.user.first_name,
            "last_name": response.data.user.last_name,
            "_id": response.data.user._id,
            "token": response.data.token,
            "email": response.data.user.email,
            "profile_pic": response.data.user?.profile_picture.url
          };
          setUser(dataUser);

          updateToken(response.data.token);
          authenticate(response, () => navigate("/client/dashboard"));

          Swal.fire({
            title: 'Well done!',
            text: 'You have successfully logged in.',
            imageUrl: 'https://media4.giphy.com/media/Hnl23o6SHL21d8kmcB/giphy.gif?cid=ecf05e479vhp0mku8nm5hfyfom7ojy3cxm1y444jm9lavw6u&rid=giphy.gif&ct=s',

            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#EF3A47',
          })
        } else if ((response.data.user.role === 'personnel')) {
          let dataUser = {
            "first_name": response.data.user.first_name,
            "last_name": response.data.user.last_name,
            "_id": response.data.user._id,
            "token": response.data.token,
            "email": response.data.user.email,
          };

          updateToken(response.data.token);
          setUser(dataUser);

          authenticate(response, () => navigate("/personnel/dashboard"));
          Swal.fire({
            title: 'Well done!',
            text: 'You have successfully logged in.',
            imageUrl: 'https://media4.giphy.com/media/Hnl23o6SHL21d8kmcB/giphy.gif?cid=ecf05e479vhp0mku8nm5hfyfom7ojy3cxm1y444jm9lavw6u&rid=giphy.gif&ct=s',

            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#EF3A47',
          })
        }


      }



    }).catch(error => {

      if (error.message === "Network Error") {
        Swal.close()
        Swal.fire({
          imageUrl: No_internet,
          imageWidth: 500,
          imageHeight: 375,
          imageAlt: 'Custom image',
          confirmButtonColor: '#EF3A47',
        })
        console.log("No internet connection")
        // Handle no internet connection error here
      } else {
        console.log(error)
        Swal.close()
        console.log(error.response.data)
        setError(error.response.data);
      }


    });
  }


  ////////////////////////// show and hide password

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <Container style={{ minHeight: "50vh" }}>
      <HeroImageContainer>
        <Fade bottom duration={2000} distance="40px">
          <App src={Img}
            style={{ marginLeft: "11%", marginTop: "-27%", width: "120%", height: "auto", alignContent: "left" }}
            alt="" />

          <TextWrapper style={{ marginTop: "6%" }}>
            <AppTitle>
              <h1>Login</h1>
              {/* <h2>dwadwadwadwadw</h2> */}
            </AppTitle>
            <AppPara>
              <form onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  submitLogin();
                }
              }}>

                <TextField fullWidth style={{ width: '40vh' }} color="secondary" name="email" onChange={onChange} id="fullName" label="Email / Username" />
                <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.email}</InputLabel>

                <TextField style={{ width: '40vh' }} type={showPassword ? 'text' : 'password'} InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }} color="secondary" name="password" onChange={onChange} fullWidth id="fullName" label="Password" />

                <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.password}</InputLabel>
                <InputLabel><Link to="/password/forgot" style={{ color: "red", "font-size": "1rem", "text-decoration": "none" }}>Forgot password?</Link> </InputLabel>
                <div style={{ color: "black", "font-size": "1rem", "padding-top": "8px" }}>
                  <Button outline color="danger" onClick={() => submitLogin()} >Login</Button>
                </div>
                <InputLabel style={{ color: "black", "font-size": "1rem", "padding-top": "5px" }}>
                  Don't have an account?
                  <Link to="/register" style={{ color: "red", "font-size": "1rem", "text-decoration": "none" }}>&nbsp;Signup here!</Link>
                </InputLabel>
              </form>
            </AppPara>

          </TextWrapper>
        </Fade>
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
  );
};

export default HeroImage;
