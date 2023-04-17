import React from "react";
import Img from "../../images/reset.png";
import Img1 from "../../images/error.png";
import {TextField, InputLabel} from "@material-ui/core/";
import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import Navbar from "../../layouts/HeaderNav";
import SideBar from "../../layouts/SideBarNav";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Button } from 'reactstrap';
import {
  HeroImageContainer,
  AppWrapper,
  App,
  TextWrapper,
  AppTitle,
  AppPara
} from "./ResetPassElements";
import { authenticate } from './helpers';


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


  const [error, setError] = useState({  
    newPassword: '',
    newConfirmPassword: '',
    });

  const [usersss, setUser] = useState({
    newPassword: '',
    newConfirmPassword: '',
  })

  let { token } = useParams();


  const [resetStatus, setResetStatus] = useState();

console.log(resetStatus)

      const fetchResetStatus= () => {
        axios.put(`/api/password/reset/${token}`).then(response => {
          console.log(response.data.message);
          setResetStatus(response.data.message);
      }).catch((err) => console.log(err));
    };
    fetchResetStatus();
    
    useEffect(() => {
      fetchResetStatus();
    },[]);

// console.log(resetStatus)
  const onChange = e => {
        setUser({ ...usersss, [e.target.name]: e.target.value })
  }
  let navigate = useNavigate();

  const submitLogin = ()=>{
   
    // console.log(usersss);
  
    let formData = new FormData();

    formData.set("newPassword",usersss.newPassword);
    formData.set("newConfirmPassword",usersss.newConfirmPassword);

    axios({
        method: "put",
        url: `/api/password/reset/${token}`,
        data: formData,
      }).then(response => {
        // console.log(response.data.message)
        authenticate(response, () => navigate("/client/dashboard"));
      
          Swal.fire({
            title: 'You have successfully reset your password.',
            imageUrl: 'https://media2.giphy.com/media/J5B00esp0BoiCrqdCe/giphy.gif?cid=ecf05e475ckwb5dtv9jqufxmfkzpdcmrsulhc70uwmkdm5fo&rid=giphy.gif&ct=s',
            imageWidth: 275,
            imageHeight: 250,
            imageAlt: 'Custom image',
            confirmButtonColor: '#EF3A47',
          })
    
       
       
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
    {resetStatus === "tokenExpired" ?  <> 
    <AppTitle>
    <h1>Password reset link has been expired</h1>
        </AppTitle>
    <App src={Img1} 
        alt="" />

        </>
            :
<>
        <App src={Img} 
        alt="" />
   
      <TextWrapper>
        <AppTitle>
          <h1>Reset Password</h1>
        </AppTitle>
        <AppPara>

          <TextField type="password" fullWidth color="secondary" name="newPassword" id="password" onChange={onChange} label="New Password" />
          <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.newPassword}</InputLabel> 

          <TextField type="password" fullWidth color="secondary" name="newConfirmPassword" id="password" onChange={onChange} label="Confirm New Password" />
          <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.newConfirmPassword}</InputLabel> 
          <Button outline color="danger" onClick={()=>submitLogin()} >Reset Password</Button>
   
        
        </AppPara>
       
      </TextWrapper>
      </>
}
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
