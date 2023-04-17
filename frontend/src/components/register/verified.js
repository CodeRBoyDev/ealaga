import { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useNavigate,useParams } from "react-router-dom";
import axios from '../../axiosConfig';
import Img1 from "../../images/error.png";
import {
  HeroImageContainer,
  AppWrapper,
  App,
  TextWrapper,
  AppTitle,
  AppPara
} from "./VerifiedElements";
import Navbar from "../../layouts/HeaderNav";
import SideBar from "../../layouts/SideBarNav";
import { Scrollbars } from 'react-custom-scrollbars-2';
import Container from "react-bootstrap/Container";
import { Circles } from  'react-loader-spinner'

const Hero = () => {

  
    
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

//===================================================================================

    let navigate = useNavigate();
    let { token } = useParams();
    
    const [resetStatus, setResetStatus] = useState();

    useEffect(() => {
        axios.get(`/api/verify/${token}`).then(response => {
          // console.log(response.data.message);
          setResetStatus(response.data.message);
      }).catch((err) => console.log(err));

    },[]);
  

  return (
    <>
     <SideBar  isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle} />

       <style>
       {`
          body {
            text-align: center;
            padding: 0px 0;
          }
            h1 {
              color: #EF3A47;
              font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
              font-weight: 900;
              font-size: 40px;
              margin-bottom: 10px;
            }
            p {
              color: #000000;
              font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
              font-size:20px;
              margin: 0;
            }
          i {
            color: #fff;
            font-size: 100px;
            line-height: 200px;
            margin-left:-15px;
          }
          .card {
            background: white;
            padding: 20px;
            border-radius: 4px;
            box-shadow: 0 2px 3px #C8D0D8;
            display: inline-block;
            margin: 0 auto;
            display: flex;
flex-direction: column;
align-items: center;
          }
      
        `}
    </style>
    <Container style={{ minHeight: "45vh" }}>
    <HeroImageContainer>
     
    <body>
   
    {
      !resetStatus ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
      alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
      :
      resetStatus == "tokenExpired"
      ?
  
    <div className="card">
         <App src={Img1} 
        alt="" />
         <h1>Email Verification link has been expired</h1>
         <p>We apologize, but you need to register again and enter valid email.</p>
           <br/> 
           <Button outline color="danger" onClick={()  => navigate('/register')}>🔗 Go to registration page</Button>
         </div>

     :
     
         <div className="card">
         <div style={{"border-radius":"200px", height:"200px", width:"200px", background: "#EF3A47", margin:"0 auto"}}>
           <i className="checkmark">✓</i>
         </div>
           <h1>Success</h1> 
           <p>Your email has been verified.<br/> 
           You can now login with your new account!</p>
           <br/> 
           <Button outline color="danger" onClick={()  => navigate('/login')}>🔗 Go to login page</Button>
         </div>
        
      }
    </body>
     
    </HeroImageContainer>
    </Container>
    </>
  );
};

export default Hero;
