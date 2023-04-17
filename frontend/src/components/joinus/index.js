import React from "react";
import Img from "../../images/Rectangle.png";
import {TextField,
  InputLabel,
  Select,
  MenuItem, FormControl, NativeSelect

} from "@material-ui/core";
import { Button } from 'reactstrap';
import {
  HeroImageContainer,
  AppWrapper,
  App,
  TextWrapper,
  AppTitle,
  AppPara
} from "./HeroImageElements";
import Container from "react-bootstrap/Container";
import { useState } from 'react';
import Swal from 'sweetalert2'
import axios from '../../axiosConfig';
import { Fade } from "react-reveal";

const HeroImage = () => {

  const [error, setError] = useState({  
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    document: ""
    });

  const [getApplicant, setApplicant] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    position: 'Position 1',
    
})
const [getDocument, setDocument] = useState('')

  const onChange = e => {

    if (e.target.name === 'document') {
      setDocument(e.target.files[0])
    }
    setApplicant({ ...getApplicant, [e.target.name]: e.target.value })

  }

  const submitApplicant = ()=>{ 
    console.log(getApplicant);

  //   if(getApplicant.first_name == "" && getApplicant.middle_name == "" && getApplicant.last_name == ""
  //   && getApplicant.email == "" && getApplicant.contact_number == "" && getDocument == ""){
  //     setError({first_name: "Please enter your first name",middle_name: "Please enter your middle_name"
  //   ,last_name: "Please enter your last_namee",email: "Please enter your email"
  // ,contact_number: "Please enter your contact_number", document: "Please upload your document"})
  //   }else 
    if(getDocument == ""){
      setError({document: "Please upload your document"})
    }
    else{

  
    let formData = new FormData();

    formData.set("first_name", getApplicant.first_name);
    formData.set("middle_name", getApplicant.middle_name);
    formData.set("last_name", getApplicant.last_name);
    formData.set("email", getApplicant.email);
    formData.set("contact_number", getApplicant.contact_number);
    formData.set("position", getApplicant.position);
    formData.set("document", getDocument);

    Swal.fire({
      title: 'Loading!',
      text: 'Please wait while processing your application.',
      imageUrl: 'https://media2.giphy.com/media/4hVUoT5cdyjWRWlZc3/giphy.gif?cid=ecf05e47xglkm9xa6j4ukbge65fg47tfunliqhc5aza0dwmi&rid=giphy.gif&ct=s',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
      confirmButtonColor: '#EF3A47',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
      })

      axios({
        method: "post",
        url: `/api/applicant/new`,
        headers: {
          "Content-Type" : "application/json",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        data: formData
      }).then(response => {
        Swal.close()
        // setLoading(true)
        // setShow(false);
        // fetchUser();
        Swal.fire({
          title: 'Success!',
          text: 'Please wait for the admin to verified your account.',
          imageUrl: 'https://media0.giphy.com/media/dYmYhn4OXI1aOpVpFO/giphy.gif?cid=ecf05e479ym4epjp1orghtshgvg92nc27cty98jbg9rfzfdr&rid=giphy.gif&ct=s',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#EF3A47',
          })
        //   setLoading(false)
        // console.log(response.data.user);
        // setgetUser(response.data.user);
        // setAllHealth(response.data.health);
        // setProfilePreview(response.data.user.profile_picture.url)
  
        setError({ 
          first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    document: ""
        });

      setApplicant({
          first_name: '',
          middle_name: '',
          last_name: '',
          email: '',
          contact_number: '',
          position: 'Position 1',
          
      })
      setDocument("")
        
    }).catch(error => {
      Swal.close()
      // console.log(error.response.data)
          setError(error.response.data);
  });  

  }

  }

  
  return (

    <Container style={{ minHeight: "45vh" }}>
    <HeroImageContainer>
    <Fade bottom duration={2000} distance="40px">
        <App src={Img} 
        style={{ width: "100%", height: "auto", alignContent: "left" }}
        alt="" />
   
      <TextWrapper>
        <AppTitle>
          <h1>Join Us</h1>
          {/* <h2>dwadwadwadwadw</h2> */}
        </AppTitle>
        <AppPara>
          <TextField fullWidth color="secondary" onChange={onChange} id="fullName" name="first_name" value ={getApplicant.first_name} label="Firstname" />
          <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.first_name}</InputLabel>
          
          <TextField fullWidth color="secondary" onChange={onChange} id="fullName" name="middle_name" value ={getApplicant.middle_name} label="Middlename" />
          <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.middle_name}</InputLabel>

          <TextField fullWidth color="secondary" onChange={onChange} id="fullName" name="last_name" value ={getApplicant.last_name} label="Lastname" />
          <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.last_name}</InputLabel>

          <TextField fullWidth color="secondary" onChange={onChange} id="fullName" name="email" value ={getApplicant.email} label="Email Address" />
          <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.email}</InputLabel>

          <TextField fullWidth color="secondary" onChange={onChange} id="fullName" name="contact_number" value ={getApplicant.contact_number} label="Contact number" />
          <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.contact_number}</InputLabel>
          <FormControl fullWidth>
            <InputLabel variant="standard" color="secondary" htmlFor="uncontrolled-native">
              Position
            </InputLabel>
            <NativeSelect
              value ={getApplicant.position}
              color="secondary"
              inputProps={{
                name: 'position',
                id: 'uncontrolled-native',
              }}
              onChange={onChange}
            >
              <option value="Position 1">Position 1</option>
              <option value="Position 2">Position 2</option>
              <option value="Position 3">Position 3</option>
              <option value="Position 4">Position 4</option>
            </NativeSelect>
          </FormControl>

          <TextField type="file" onChange={onChange} value ={getApplicant.document} name="document" inputProps={{accept:"application/pdf"}}  InputLabelProps={{shrink: true }}color="secondary" fullWidth id="fullName" label="Upload your document here*" />
          <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.document}</InputLabel>
          
          <Button onClick={()=>submitApplicant()} outline color="danger" to='home'>Register</Button>
                       
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
