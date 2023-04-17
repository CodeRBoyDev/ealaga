import React from "react";
import Img from "../../../../images/profile.jpg";
import {TextField,
  InputLabel,
  Select,
  MenuItem, FormControl, NativeSelect

} from "@material-ui/core";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useState } from 'react';
import axios from 'axios';
import Navbar from "../../../../layouts/clientHeaderNav";
import SideBar from "../../../../layouts/clientSideBarNav";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Button } from 'reactstrap';
import {
  HeroImageContainer,
  AppWrapper,
  App,
  TextWrapper,
  AppTitle,
  AppPara,
  ServicesH1
} from "./ProfileElements.js";

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



  return (
    <>
     <SideBar  isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle} />
    <Container style={{ minHeight: "45vh" }}>
    <HeroImageContainer>
   
            <div className="container light-style flex-grow-1 container-p-y">
          
            <ServicesH1>
            &nbsp;&nbsp;<a href="#" onClick={()  => navigate('/client/dashboard')}><i class="fas fa-arrow-left"></i></a>&nbsp;&nbsp;Profile Settings
        </ServicesH1>
              <div className="card overflow-hidden">
                <div className="row no-gutters row-bordered row-border-light">
                  <div className="col-md-3 pt-0">

                  <App src={Img}  alt="" />  
                  <TextWrapper>
                    <AppTitle>
                      <h1>Username</h1>
                    </AppTitle>
                  </TextWrapper>
                    
                    <div className="list-group list-group-flush account-settings-links">
                      <a className="list-group-item list-group-item-action" data-toggle="list" href="#" onClick={()  => navigate('/client/profile/information')}><i class="far fa-user"></i>&nbsp;&nbsp;Personal Information</a>
                      <a className="list-group-item list-group-item-action" data-toggle="list" href="#"><i class="fas fa-notes-medical"></i>&nbsp;&nbsp;Health Information</a>
                      <a className="list-group-item list-group-item-action active" data-toggle="list" href="#"><i class="fas fa-hockey-puck"></i>&nbsp;&nbsp;Credentials</a>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="account-general">


                        <div className="card-body">
                        <br></br>
                        <Container>
                            <Row>
                              <Col>  <TextField fullWidth color="secondary" id="first_name" name="first_name"  value="dwadwa" label="Username" /> </Col>
                              <Col>  <TextField fullWidth color="secondary" id="first_name" name="first_name"  value="dwadwa" label="OldPassword" /> </Col>
                             
                            </Row>
                            <br></br>
                            <Row>
                              <Col>  <TextField fullWidth color="secondary" id="first_name" name="first_name"  value="dwadwa" label="ContactNumber" /> </Col>
                              <Col>  <TextField fullWidth color="secondary" id="first_name" name="first_name"  value="dwadwa" label="NewPassword" /> </Col>
                            </Row>
                      <br></br>
                      <Row>
                              <Col>  <TextField fullWidth color="secondary" id="first_name" name="first_name"  value="dwadwa" label="Email Address" /> </Col>
                              <Col>  <TextField fullWidth color="secondary" id="first_name" name="first_name"  value="dwadwa" label="ConfirmNewPassword" /> </Col>
                            
                            </Row>
                            <br></br>
                            <Button outline color="danger" >Update</Button>
                          </Container>
                        </div>

                      </div>
              
            
                    </div>
                  </div>
                </div>
              </div>

           
            </div>
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
        a {
          color: #EF3A47;
          text-decoration: underline;
      }
      a:hover {
        color: #F58890;
        transition: all 0.2s ease-in-out ;
        font-weight: bold !important;

      }

          .list-group-item.active {
            background-color: #328cc1;
            border-color: #328cc1;
            font-weight: bold;
            color: #fff;
          }

          .list-group-item {
            color: gray;
            font-weight: bold !important;
          }

          .list-group-item:hover {
            color: #fff;
            transition: all 0.4s ease-in-out ;
            font-weight: bold !important;
            background-color: #F3757E;

          }

        .ui-w-80 {
            width: 80px !important;
            height: auto;
        }

        .btn-default {
            border-color: rgba(24,28,33,0.1);
            background: rgba(0,0,0,0);
            color: #4E5155;
        }

        label.btn {
            margin-bottom: 0;
        }

        .btn-outline-primary {
            border-color: #26B4FF;
            background: transparent;
            color: #26B4FF;
        }

        .btn {
            cursor: pointer;
        }

        .text-light {
            color: #babbbc !important;
        }

        .btn-facebook {
            border-color: rgba(0,0,0,0);
            background: #3B5998;
            color: #fff;
        }

        .btn-instagram {
            border-color: rgba(0,0,0,0);
            background: #000;
            color: #fff;
        }

        .card {
            box-shadow: 0 5px 10px rgba(100, 100, 50, 0.2);
        }

        .row-bordered {
            overflow: hidden;
        }

        .account-settings-fileinput {
            position: absolute;
            visibility: hidden;
            width: 1px;
            height: 1px;
            opacity: 0;
        }
        .account-settings-links .list-group-item.active {
            font-weight: bold !important;
            background-color: red;
        }
        .account-settings-links .list-group-item.active {
            background: #EF3A47 !important;
        }
        .account-settings-multiselect ~ .select2-container {
            width: 100% !important;
            
        }
        .light-style .account-settings-links .list-group-item {
            padding: 0.85rem 1.5rem;
            border-color: red !important;
        }
        .light-style .account-settings-links .list-group-item.active {
            color: #ffffff  !important;
            
        }
        .material-style .account-settings-links .list-group-item {
            padding: 0.85rem 1.5rem;
            border-color: red !important;
        }
        .material-style .account-settings-links .list-group-item.active {
            color: red !important;
        }
     
     
        .light-style .account-settings-links .list-group-item {
            padding: 0.85rem 1.5rem;
            border-color: rgba(24,28,33,0.2) !important;
        }
        
        `}
      </style>
    </HeroImageContainer>
    </Container>
    </>
  );
};

export default HeroImage;
