import React from "react";
import Img from "../../../../images/profile.jpg";
import {TextField,
  InputLabel,
  Select,
  MenuItem, FormControl, NativeSelect,FormLabel,FormControlLabel ,RadioGroup ,Radio

} from "@material-ui/core";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../../../layouts/clientHeaderNav";
import SideBar from "../../../../layouts/clientSideBarNav";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Button } from 'reactstrap';
import { Carousel, Card, Modal,Form } from 'react-bootstrap';
import {
  HeroImageContainer,
  AppWrapper,
  App,
  TextWrapper,
  AppTitle,
  BtnWrap2,
  ServicesH1
} from "./ProfileElements.js";
import { getUser } from '../../../login/helpers';
import { Circles } from  'react-loader-spinner'

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
    first_name: '',
    middle_name: '',
    last_name: '',
    birth_date: '',
    age: '',
    gender: '',
    house_purok_no: '',
    street: '',
    barangay: '',
    profile_picture: '',
    valid_id: '',
    confirm: ''
    });

  const [usersss, setUser] = useState({
    email: '',
  })

  ///////user update information

  const [AllHealth, setAllHealth] = useState([]);
  const [AllHealthUser, setAllHealthUser] = useState({edithealth_id: []});
  const [checkededitItems, seteditCheckedItems] = useState({edithealth_id: []});
  const [AllHealthProblem, setAllHealthProblem] = useState({health_problem:[]});
  const [profilePreview, setProfilePreview] = useState('profile_picture/jttdi63mt8a6e4ndt3icdsads')
  const [profileeditPreview, seteditProfilePreview] = useState('')

  const [profileeditData, seteditProfileData] = useState('')

  const [profileDataID, seteditProfileDataID] = useState('')
  
  const [geteditMedicalCert, seteditMedicalCert] = useState('')

  const [editIdPreview, seteditIdPreview] = useState('')
  

  const [getUserssss, setgetUser] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    birth_date: '',
    age: '',
    gender: '',
    address:{house_purok_no: '',
    street: '',
    barangay: ''},
    profile_picture: '',
    valid_id: '',
    user_name: '',
    email: '',
    phone: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }); 



    

      //  console.log(getUserssss.address?.house_purok_no);

      const fetchUser= () => {
        axios({
          method: "get",
          url: `/api/user/profile/edit/${getUser()}`,
          headers: {
            "Content-Type" : "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
        }).then(response => {
          // console.log(response.data.user);
          setgetUser(response.data.user);
          setAllHealth(response.data.health);
          setAllHealthUser(response.data.checkhealth_user);
          setProfilePreview(response.data.user.profile_picture.url)

          const AllHealthProblems = AllHealthProblem.health_problem;
          const selectedCheckboxes = checkededitItems.edithealth_id;

          const healthList = response.data.checkhealth_user.map(function(checkhealth_users){
            return checkhealth_users._id
            })
            setAllHealthProblem({
              health_problem: healthList
            });

            seteditCheckedItems({
              edithealth_id: healthList
            });



       
      }).catch((err) => console.log(err));
    };
    // console.log(AllHealthProblem)
    useEffect(() => {
      fetchUser();
    },[]);

    const onChangeedit = e => {
      const {name, value} = e.target;
      if (e.target.name === 'profile_picture') {

        seteditProfileData(e.target.files[0])

          const reader = new FileReader();

          reader.onload = () => {
              if (reader.readyState === 2) {
                seteditProfilePreview(reader.result)
              }
          }
          reader.readAsDataURL(e.target.files[0])
      }else if(e.target.name === 'valid_id') {

        seteditProfileDataID(e.target.files[0])

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
              seteditIdPreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

      }
      else {
        
        setgetUser({ ...getUserssss, [e.target.name]: e.target.value, address:{
          ...getUserssss.address, [e.target.name]: e.target.value
        } })
        
    }
  }
  

  const onChangeeditProfile = e => {
    const {name, value} = e.target;
    if (e.target.name === 'profile_picture') {

      seteditProfileData(e.target.files[0])
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
              seteditProfilePreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    } else {
    
     setgetUser({ ...getUserssss, [e.target.name]: e.target.value, address:{
        ...getUserssss.address, [e.target.name]: e.target.value
      } })
      
  }
}


      const onChangeeditCredential = e => {
       
        
        setgetUser({ ...getUserssss, [e.target.name]: e.target.value })
        setError(error.response.data);
     
      }



//============================================================================
  const [isLoading, setLoading] = useState(false);


  const submitEdit = () => {
   
    // console.log(getUserssss.address?.house_purok_no);
    if(profileeditData == ""){
      setError({profile_picture: "Please upload your new profile picture"})
    }
    else{

      let formData = new FormData();

      
    formData.set("profile_picture", profileeditData);
    formData.set("valid_id", editIdPreview);
    formData.set("first_name", getUserssss.first_name);
    formData.set("middle_name", getUserssss.middle_name);
    formData.set("last_name", getUserssss.last_name);
    formData.set("age", getUserssss.age);
    formData.set("gender", getUserssss.gender);
    formData.set("birth_date",getUserssss.birth_date);
    formData.set("house_purok_no",getUserssss.address?.house_purok_no);
    formData.set("street",getUserssss.address?.street);
    formData.set("barangay",getUserssss.address?.barangay);
    formData.set("confirm", VerifyInformation);

    for (var i = 0; i < checkedItems?.health_id.length; i++) {
          formData.append('health_id', checkedItems.health_id[i]);
        }

        if(!isLoading) {
          Swal.fire({
            title: 'Loading!',
            text: 'Please wait while processing your data.',
            imageUrl: 'https://media2.giphy.com/media/4hVUoT5cdyjWRWlZc3/giphy.gif?cid=ecf05e47xglkm9xa6j4ukbge65fg47tfunliqhc5aza0dwmi&rid=giphy.gif&ct=s',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#EF3A47',
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false
            })
          }   

    axios({
      method: "put",
      url: `/api/user/profile/update/${getUser()}`,
      headers: {
        "Content-Type" : "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      data: formData
    }).then(response => {
      Swal.close()
      setLoading(true)
      setShow(false);
      fetchUser();
      Swal.fire({
        title: 'Success!',
        text: 'Please wait for the admin to verified your account.',
        imageUrl: 'https://media0.giphy.com/media/dYmYhn4OXI1aOpVpFO/giphy.gif?cid=ecf05e479ym4epjp1orghtshgvg92nc27cty98jbg9rfzfdr&rid=giphy.gif&ct=s',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonColor: '#EF3A47',
        })
        setLoading(false)
      // console.log(response.data.user);
      // setgetUser(response.data.user);
      // setAllHealth(response.data.health);
      // setProfilePreview(response.data.user.profile_picture.url)

      setError({ 
        first_name: '',
        middle_name: '',
        last_name: '',
        birth_date: '',
        age: '',
        gender: '',
        house_purok_no: '',
        street: '',
        barangay: '',
        profile_picture: '',
        valid_id: '',
        confirm: ''
      });
      
  }).catch(error => {
    Swal.close()
    console.log(error.response.data)
        setError(error.response.data);
});  



    }
    
  };

  //============================================
  const [isLoadings, setLoadings] = useState(false);

// console.log(isLoadings);
  const submitUpdate = () => {
    // console.log(getUserssss.address?.street)

    if(profileeditData == ""){
      setError({profile_picture: "Please upload your new profile picture"})
    }
    else{

    let formData = new FormData();

      
    formData.set("profile_picture", profileeditData);
    formData.set("first_name", getUserssss.first_name);
    formData.set("middle_name", getUserssss.middle_name);
    formData.set("last_name", getUserssss.last_name);
    formData.set("age", getUserssss.age);
    formData.set("gender", getUserssss.gender);
    formData.set("birth_date",getUserssss.birth_date);
    formData.set("house_purok_no",getUserssss.address?.house_purok_no);
    formData.set("street",getUserssss.address?.street);
    formData.set("barangay",getUserssss.address?.barangay);

  
      Swal.fire({
        title: 'Loading!',
        text: 'Please wait while processing your new data.',
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
      method: "put",
      url: `/api/user/profile/updateSubmit/${getUser()}`,
      headers: {
        "Content-Type" : "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      data: formData
    }).then(response => {
      Swal.close()
      fetchUser();
      Swal.fire({
        title: 'Success!',
        text: 'Sucessfully Updated.',
        imageUrl: 'https://media0.giphy.com/media/dYmYhn4OXI1aOpVpFO/giphy.gif?cid=ecf05e479ym4epjp1orghtshgvg92nc27cty98jbg9rfzfdr&rid=giphy.gif&ct=s',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonColor: '#EF3A47',
        })
      // console.log(response.data.user);
      // setgetUser(response.data.user);
      // setAllHealth(response.data.health);
      // setProfilePreview(response.data.user.profile_picture.url)

      setError({ 
        first_name: '',
        middle_name: '',
        last_name: '',
        birth_date: '',
        age: '',
        gender: '',
        house_purok_no: '',
        street: '',
        barangay: '',
        profile_picture: '',
      });
      
      }).catch(error => {
        Swal.close()
        console.log(error.response.data)
            setError(error.response.data);
    });  
  }
  };

  //=====================================================
  

  const [isLoadingss, setLoadingss] = useState(false);

  // console.log(isLoadingss);
    const submitEditCredential = () => {
    
  
      let formData = new FormData();
  
      formData.set("user_name", getUserssss.user_name);
      formData.set("phone", getUserssss.phone);
      formData.set("email", getUserssss.email);
      formData.set("oldPassword", getUserssss.oldPassword);
      formData.set("newPassword", getUserssss.newPassword);
      formData.set("confirmPassword", getUserssss.confirmPassword);

      Swal.fire({
        title: 'Loading!',
        text: 'Please wait while processing your new data.',
        imageUrl: 'https://media2.giphy.com/media/4hVUoT5cdyjWRWlZc3/giphy.gif?cid=ecf05e47xglkm9xa6j4ukbge65fg47tfunliqhc5aza0dwmi&rid=giphy.gif&ct=s',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonColor: '#EF3A47',
        showCancelButton: false,
        showConfirmButton: false
        })
        
      axios({
        method: "put",
        url: `/api/user/profile/updateCredential/${getUser()}`,
        headers: {
          "Content-Type" : "application/json",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        data: formData
      }).then(response => {
        Swal.close()
        // setLoadingss(true)
        fetchUser();
        Swal.fire({
          title: 'Success!',
          text: 'Sucessfully Updated.',
          imageUrl: 'https://media0.giphy.com/media/dYmYhn4OXI1aOpVpFO/giphy.gif?cid=ecf05e479ym4epjp1orghtshgvg92nc27cty98jbg9rfzfdr&rid=giphy.gif&ct=s',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#EF3A47',
          })
        //   setLoadingss(false)
        // // console.log(response.data.user);
        // // setgetUser(response.data.user);
        // // setAllHealth(response.data.health);
        // // setProfilePreview(response.data.user.profile_picture.url)
  
        setError({ 
          user_name: '',
          email: '',
          phone: '',
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
    }).catch(error => {
      Swal.close()
      console.log(error.response.data)
          setError(error.response.data);
  });  
  
    };

  //checkbox--------------------------------------

  const [checkedItems, setCheckedItems] = useState({health_id: []});
  const { health_id } = checkedItems;
  const [VerifyInformation, setVerifyInformation] = useState(false);

  const [VerifyMedicalInformation, setVerifyMedicalInformation] = useState(false);

  const handleChangess = id => {
    const selectedCheckboxes = checkedItems.health_id;

    // Find index
    const findIdx = selectedCheckboxes.indexOf(id);


    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }

    setCheckedItems({
      health_id: selectedCheckboxes
    });
  };

  // edit health =======================================================
  
  
  const edithandleChangess = e => {
    const { value, checked } = e.target;
  
    const selectedCheckboxes = checkededitItems.edithealth_id;

    if (checked){
      selectedCheckboxes.push(value);
     
      seteditCheckedItems({
        edithealth_id: selectedCheckboxes
      });
      // console.log(true);
    }else{
      seteditCheckedItems({
        edithealth_id: selectedCheckboxes.filter((e) => e !== value)
      });
      // console.log(false);
    }
    seteditMedicalCert(e.target.files[0])
  };
  // console.log(checkededitItems);


  
  const submitHealthEdit = () => {
    // console.log(checkedItems)
    // console.log(getUserssss.address?.house_purok_no);
    let formData = new FormData();

      
    formData.set("medical_certificate", geteditMedicalCert);
    formData.set("confirm", VerifyMedicalInformation);
    // formData.set("valid_id", editIdPreview);
    // formData.set("first_name", getUserssss.first_name);

    for (var i = 0; i < checkededitItems?.edithealth_id.length; i++) {
          formData.append('health_id', checkededitItems.edithealth_id[i]);
        }

        if(!isLoading) {
          Swal.fire({
            title: 'Loading!',
            text: 'Please wait while processing your data.',
            imageUrl: 'https://media2.giphy.com/media/4hVUoT5cdyjWRWlZc3/giphy.gif?cid=ecf05e47xglkm9xa6j4ukbge65fg47tfunliqhc5aza0dwmi&rid=giphy.gif&ct=s',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#EF3A47',
            showCancelButton: false,
            showConfirmButton: false
            })
          }   

    axios({
      method: "put",
      url: `/api/user/profile/updateHealth/${getUser()}`,
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
      fetchUser();
      Swal.fire({
        title: 'Success!',
        text: 'Please wait for the admin to verified your account.',
        imageUrl: 'https://media0.giphy.com/media/dYmYhn4OXI1aOpVpFO/giphy.gif?cid=ecf05e479ym4epjp1orghtshgvg92nc27cty98jbg9rfzfdr&rid=giphy.gif&ct=s',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonColor: '#EF3A47',
        })
        
        setError({ 
          confirm: ''
        });
      //   setLoading(false)
      // console.log(response.data.user);
      // setgetUser(response.data.user);
      // setAllHealth(response.data.health);
      // setProfilePreview(response.data.user.profile_picture.url)

      
  }).catch(error => {
    Swal.close()
    // console.log(error.response.data)
        setError(error.response.data);
  });  

  };
  //profile NavBar State ------------------------------------------------------
  
  const [NavBarSides, setNavBarSide] = useState({NavBarSide:"Personal Information"});
 

// console.log(NavBarSides.NavBarSide);

  const [show, setShow] = useState(false);
  const handleClose =() => {
          setShow(false);
          // setAnimalComment([]);
          // setAnimalImage([]);
        } 
  const handleShow = () => setShow(true);



  return (
    <>
     <SideBar  isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle} />
    <Container style={{ minHeight: "45vh" }}>
    <HeroImageContainer>
   
            <div className="container light-style flex-grow-1 container-p-y">
          
            <ServicesH1>
            &nbsp;&nbsp;<a href="#" onClick={()  => navigate('/client/dashboard')}><i className="fas fa-arrow-left"></i></a>&nbsp;&nbsp;Profile Settings
        </ServicesH1>
              <div className="card overflow-hidden">
                <div className="row no-gutters row-bordered row-border-light">
                  <div className="col-md-3 pt-0">
                {profilePreview ? 
                 <App src={profilePreview}  alt="" />
                  :  <div style={{ width: "50%",height: "50",display: "flex",justifyContent: "center",
                  alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div> }
                  <TextWrapper>
                    <AppTitle>
                      <h1>{getUserssss.user_name}</h1>
                      {getUserssss.account_verified === "not verified" ? <><h6 style={{color: "red"}}>(<i class="fas fa-user-times"></i>&nbsp;Not Verified)</h6></>
                      : getUserssss.account_verified === "pending" ? <><h6 style={{color: "rgb(246 200 145)"}}>(<i class="fas fa-user-clock"></i>&nbsp;Pending)</h6></>
                      : getUserssss.account_verified === "verified" ? <><h6 style={{color: "#35c835"}}>(<i class="fas fa-user-check"></i>&nbsp;Verified)</h6></>
                      : <div style={{ width: "50%",height: "50",display: "flex",justifyContent: "center",
                      alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
                    }
                      
                    </AppTitle>
                  </TextWrapper>
                  {getUserssss.account_verified === "not verified" ? 
                   (NavBarSides.NavBarSide === "Personal Information" ?  <div className="list-group list-group-flush account-settings-links">
                   <a className="list-group-item list-group-item-action active" data-toggle="list" href="#"  onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Personal Information"})}}><i className="far fa-user"></i>&nbsp;&nbsp;Personal Information</a>
                   <a className="list-group-item list-group-item-action" style={{opacity: 0.3, pointerEvents: "none"}} data-toggle="list" href="#" onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Health Information"})}}><i className="fas fa-notes-medical"></i>&nbsp;&nbsp;Health Information</a>
                   <a className="list-group-item list-group-item-action" data-toggle="list" href="#" onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Credentials"})}}><i className="fas fa-hockey-puck"></i>&nbsp;&nbsp;Credentials</a>
                 </div> : <div className="list-group list-group-flush account-settings-links">
                   <a className="list-group-item list-group-item-action" data-toggle="list" href="#"  onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Personal Information"})}}><i className="far fa-user"></i>&nbsp;&nbsp;Personal Information</a>
                   <a className="list-group-item list-group-item-action" style={{opacity: 0.3, pointerEvents: "none"}} data-toggle="list" href="#" onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Health Information"})}}><i className="fas fa-notes-medical"></i>&nbsp;&nbsp;Health Information</a>
                   <a className="list-group-item list-group-item-action active" data-toggle="list" href="#" onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Credentials"})}}><i className="fas fa-hockey-puck"></i>&nbsp;&nbsp;Credentials</a>
                 </div>

                   )
                  : 
                (NavBarSides.NavBarSide === "Personal Information" ? <div className="list-group list-group-flush account-settings-links">
                <a className="list-group-item list-group-item-action active" data-toggle="list" href="#"  onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Personal Information"})}}><i className="far fa-user"></i>&nbsp;&nbsp;Personal Information</a>
                <a className="list-group-item list-group-item-action" data-toggle="list" href="#" onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Health Information"})}}><i className="fas fa-notes-medical"></i>&nbsp;&nbsp;Health Information</a>
                <a className="list-group-item list-group-item-action" data-toggle="list" href="#" onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Credentials"})}}><i className="fas fa-hockey-puck"></i>&nbsp;&nbsp;Credentials</a>
              </div>
               : 
               NavBarSides.NavBarSide === "Health Information" ? <div className="list-group list-group-flush account-settings-links">
               <a className="list-group-item list-group-item-action" data-toggle="list" href="#"  onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Personal Information"})}}><i className="far fa-user"></i>&nbsp;&nbsp;Personal Information</a>
               <a className="list-group-item list-group-item-action active" data-toggle="list" href="#" onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Health Information"})}}><i className="fas fa-notes-medical"></i>&nbsp;&nbsp;Health Information</a>
               <a className="list-group-item list-group-item-action" data-toggle="list" href="#" onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Credentials"})}}><i className="fas fa-hockey-puck"></i>&nbsp;&nbsp;Credentials</a>
             </div>
             : <div className="list-group list-group-flush account-settings-links">
             <a className="list-group-item list-group-item-action" data-toggle="list" href="#"  onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Personal Information"})}}><i className="far fa-user"></i>&nbsp;&nbsp;Personal Information</a>
             <a className="list-group-item list-group-item-action" data-toggle="list" href="#" onClick={()  => {fetchUser(); setVerifyMedicalInformation(false); setNavBarSide({NavBarSide: "Health Information"})}}><i className="fas fa-notes-medical"></i>&nbsp;&nbsp;Health Information</a>
             <a className="list-group-item list-group-item-action active" data-toggle="list" href="#" onClick={()  => {fetchUser(); setVerifyMedicalInformation(false);  setNavBarSide({NavBarSide: "Credentials"})}}><i className="fas fa-hockey-puck"></i>&nbsp;&nbsp;Credentials</a>
           </div>
               )

                
                }
                    
                  </div>
                  <div className="col-md-9">
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="account-general">


                        <div className="card-body">
                        <br></br>
                        {
                          NavBarSides.NavBarSide === "Personal Information" ?
                          <Container>
                          
                    {getUserssss.account_verified === "not verified" ? 
                    <InputLabel style={{color: "black", "font-size": "1rem", "padding-top": "5px"}}>
                      Click here to verifiy your acccount →
                      <a href="#" onClick={() => handleShow()} style={{color: "red", "font-size": "1rem", "text-decoration": "none"}}>&nbsp;Verify your account!</a>
                      </InputLabel>   
                      : getUserssss.account_verified === "pending" || getUserssss.account_verified === "verified" ? 
                      <>
                      <Row>
                            <Col>  <TextField fullWidth color="secondary"  InputLabelProps={{ shrink: true }} onChange={onChangeeditProfile} name="first_name"  value= {getUserssss.first_name} label="Firstname" /> </Col>
                            <Col>  <TextField fullWidth color="secondary"  InputLabelProps={{ shrink: true }} onChange={onChangeeditProfile} name="middle_name"  value= {getUserssss.middle_name} label="Middlename" /> </Col>
                            <Col>  <TextField fullWidth color="secondary"  InputLabelProps={{ shrink: true }} onChange={onChangeeditProfile} name="last_name"  value= {getUserssss.last_name} label="Lastname" /> </Col>
                          </Row>
                          <br></br>
                          <Row>
                            <Col>  <TextField fullWidth color="secondary" type="date"  InputLabelProps={{ shrink: true }} onChange={onChangeeditProfile} name="birth_date"   value={getUserssss.birth_date?.substring(0, 10)} label="Birthdate" /> </Col>
                            <Col>  <TextField fullWidth color="secondary"  InputLabelProps={{ shrink: true }} onChange={onChangeeditProfile} name="age"  value= {getUserssss.age} label="Age" /> </Col>
                            <Col>   <FormControl>
                                      <FormLabel id="demo-row-radio-buttons-group-label">Gender*</FormLabel>
                                      <RadioGroup
                                      defaultValue={getUserssss.gender}
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="gender"
                                        onChange={onChangeeditProfile}
                                      >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                       
                                      </RadioGroup>
                                    </FormControl> 
                                    <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.gender}</InputLabel> 
                                    </Col>

                          </Row>
                    <br></br>
                    <Row>
                            <Col>  <TextField fullWidth color="secondary"  InputLabelProps={{ shrink: true }} onChange={onChangeeditProfile} name="house_purok_no"  value= {getUserssss.address?.house_purok_no} label="House No/ Purok No" /> </Col>
                            <Col>  <TextField fullWidth color="secondary"  InputLabelProps={{ shrink: true }} onChange={onChangeeditProfile} name="street"  value= {getUserssss.address?.street} label="Street" /> </Col>
                            <Col>   <FormControl fullWidth>
                                      <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                                       Barangay
                                      </InputLabel>
                                      <NativeSelect
                                      key={getUserssss.address?.barangay ? 'notLoadedYet' : 'loaded'}
                                      
                                      defaultValue={getUserssss.address?.barangay}
                                        onChange={onChangeeditProfile}
                                        inputProps={{
                                          name: 'barangay',
                                          id: 'uncontrolled-native',
                                        }}
                                        color="secondary"
                                      >
                                         <option value="" selected disabled> <em>Select Barangay</em></option>
                                      <option value="Bagumbayan">Bagumbayan</option>
                                      <option value="Bambang">Bambang</option>
                                      <option value="Calzada">Calzada</option>
                                      <option value="Central Bicutan">Central Bicutan</option>
                                      <option value="Central Signal Village">Central Signal Village (Signal Village)</option>
                                      <option value="Fort Bonifacio">Fort Bonifacio</option>
                                      <option value="Hagonoy">Hagonoy</option>
                                      <option value="Ibayo-tipas">Ibayo-tipas</option>
                                      <option value="Lower Bicutan">Lower Bicutan</option>
                                      <option value="Maharlika Village">Maharlika Village</option>
                                      <option value="Napindan">Napindan</option>
                                      <option value="New Lower Bicutan">New Lower Bicutan</option>
                                      <option value="North Daang Hari">North Daang Hari</option>
                                      <option value="North Signal Village">North Signal Village</option>
                                      <option value="Palingon">Palingon</option>
                                      <option value="Pinagsama">Pinagsama</option>
                                      <option value="San Miguel">San Miguel</option>
                                      <option value="Santa Ana">Santa Ana</option>
                                      <option value="South Daang Har">South Daang Hari</option>
                                      <option value="South Signal Villag">South Signal Village</option>
                                      <option value="Tanyag">Tanyag</option>
                                      <option value="Tuktukan">Tuktukan</option>
                                      <option value="Upper Bicutan">Upper Bicutan</option>
                                      <option value="Ususan">Ususan</option>
                                      <option value="Wawa">Wawa</option>
                                      <option value="Western Bicutan">Western Bicutan</option>
                                    </NativeSelect>
                                  </FormControl> </Col>
                          </Row>
                          <br></br>
                          <Row>
                            <Col>  
                            <InputLabel>Upload New Profile Pic</InputLabel>
                            <TextField type="file"  onChange={onChangeeditProfile} name="profile_picture" color="secondary" fullWidth id="fullName"  /> 
                            {!profileeditPreview ? <div className="image-frameProfile2">
                             <img src={profilePreview} title="Night-life" alt="Night-life"/>
                             </div>:
                             <div className="image-frameProfile2">
                             <img src={profileeditPreview} title="Night-life" alt="Night-life"/>
                             </div>
                            }
                           
                            </Col>
                            <Col>  
                            {/* <InputLabel>Upload Valid ID</InputLabel>
                            <TextField type="file" color="secondary" fullWidth id="fullName" />  */}
                            {/* {!editIdPreview ? "": 
                            <div className="image-frame">
                            <img src={editIdPreview} title="Night-life" alt="Night-life"/>
                            </div>
                            } */}
                            
                            </Col>
                            <Col>  
                            
                            </Col>
                        
                          </Row>
                    <br></br>
                      <Button onClick={() => submitUpdate()} outline color="danger" >Update</Button>
                      </>
                    :<div style={{ width: "50%",height: "50",display: "flex",justifyContent: "center",
                    alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
                    }
                          
                        </Container>
                        : NavBarSides.NavBarSide === "Health Information" ? <Container>
                          <Row>
                      <Col  className="d-flex justify-content-center">
                        <div className='conditionscrollsss'> 
                        <TextWrapper>
                          <AppTitle>
                          <h1>Health Condition</h1>
                          </AppTitle>
                        </TextWrapper>  
                       
                        <div className='conditionscroll'> 
                        <ol>
                        {AllHealthProblem.health_problem == "" ? <><br></br><h3>NONE</h3> </> : 
                        AllHealthUser?.map(health => {
                          return <li style={{fontSize:"1.5rem", fontWeight: "bold",marginTop:"10px"}}>{health.health_problem}</li>
                        })
                        }
                        </ol>  

                      
                        </div>
                        </div>
                        </Col>
                        <Col  className="d-flex justify-content-center">
                        <div className='scrolls'> 
                        <TextWrapper>
                          <AppTitle>
                            <h1>Health Disclosure</h1>
                          </AppTitle>
                        </TextWrapper>  
                        <div className="searchHealth">
                        <TextField fullWidth color="secondary"  name="first_name"   InputProps={{ disableUnderline: true }} label="Search here..." /> 
                        </div>
                        <div className='scroll'> 
                        <TextWrapper>
                          <AppTitle>
                            <h2>Leave if none</h2>
                          </AppTitle>
                        </TextWrapper>  
                        {AllHealth?.map(health => (
                            <Form.Check
                           key={health._id}
                           inline1
                           label={health.health_problem}
                           name={health._id}
                           type="checkbox"
                           style={{fontSize:"1.5rem"}}
                           value={health._id}
                           defaultChecked={
                            AllHealthProblem.health_problem.includes(health._id)
                            // console.log(AllHealthProblem.health_problem)
                     } 
                           onChange={edithandleChangess}
                           />
                        ))}
                     
                        </div>
                        <div className="medicalUpload">
                        <InputLabel>Upload your medical certificate here:</InputLabel>
                        <TextField type="file"  onChange={edithandleChangess} name="medical_certificate" color="secondary" fullWidth id="fullName"  /> 
                        </div>
                        <Form.Check
                        inline1
                        className="d-flex justify-content-center"
                        label="&nbsp; I verify all the information"
                        name="none"
                        type="checkbox"
                        style={{fontSize:"1rem",  marginBottom: "-10px", marginTop: "20px"}}
                        onChange={e => setVerifyMedicalInformation(e.target.checked)}
                        value={VerifyMedicalInformation}
                        // defaultChecked={editcheckAllDisease[index]}
                        // onChange={edithandleChangess}
                        // selected={edithealth_id.includes(disease._id)}
                        />
                        <InputLabel className="d-flex justify-content-center" style={{color: "red", "font-size": "0.8rem",marginBottom: "0px", marginTop: "20px"}}>{error.confirm}</InputLabel>  
                      <BtnWrap2 >
                        <Button onClick={() => submitHealthEdit()} outline color="danger"  style={{fontSize:"1.1rem",  marginBottom: "0px", marginTop: "-20px"}}><i class="fas fa-file"></i>&nbsp;SUBMIT</Button>
                        </BtnWrap2>
                        </div>
                       
                        </Col>
                      
                      </Row> 
                        </Container>

                        : NavBarSides.NavBarSide === "Credentials" ?  <Container>
                        <Row>
                          <Col>  <TextField fullWidth color="secondary"  name="user_name"  onChange={onChangeeditCredential} InputLabelProps={{ shrink: true }} value={getUserssss.user_name} label="Username" /> 
                          <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.user_name}</InputLabel> 
                          </Col>
                          <Col>   {
                            !getUserssss.oldPassword ? <TextField fullWidth color="secondary"  name="oldPassword"  onChange={onChangeeditCredential} value="" label="OldPassword" /> 
                             : <TextField fullWidth color="secondary"  name="oldPassword"  onChange={onChangeeditCredential} value={getUserssss.oldPassword} label="OldPassword" />}
                            <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.oldPassword}</InputLabel> 
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                          <Col>  {
                            !getUserssss.phone ? <TextField fullWidth color="secondary"  type="number" name="phone"  onChange={onChangeeditCredential} value="" label="ContactNumber" />
                            : <TextField fullWidth color="secondary" type="number"  name="phone"  onChange={onChangeeditCredential} InputLabelProps={{ shrink: true }} value={getUserssss.phone} label="ContactNumber" />
                          } </Col>
                          <Col>
                           {
                            !getUserssss.newPassword ?    <TextField fullWidth color="secondary"  name="newPassword"  onChange={onChangeeditCredential} value="" label="NewPassword" /> 
                            :   <TextField fullWidth color="secondary"  name="newPassword"  onChange={onChangeeditCredential} value={getUserssss.newPassword} label="NewPassword" /> 
                           }
                         </Col>
                        </Row>
                  <br></br>
                  <Row>
                          <Col>  <TextField fullWidth color="secondary"  name="email"  onChange={onChangeeditCredential} value={getUserssss.email} label="Email Address" /> 
                                  <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.email}</InputLabel> 
                          </Col>
                          <Col>  {
                            !getUserssss.confirmPassword ? <TextField fullWidth color="secondary"  name="confirmPassword"  onChange={onChangeeditCredential} value="" label="ConfirmNewPassword" /> 
                        : <TextField fullWidth color="secondary"  name="confirmPassword"  onChange={onChangeeditCredential} value={getUserssss.confirmPassword} label="ConfirmNewPassword" />} 
                         <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.confirmPassword}</InputLabel> 
                        </Col>
                        
                        </Row>
                        <br></br>
                        <Button onClick={() => submitEditCredential()} outline color="danger" >Update</Button>
                      </Container>
                      
                        : <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
                        alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
                        }
                       
                        </div>

                      </div>
              
            
                    </div>
                  </div>
                </div>
              </div>

           
            </div>






            <Modal size='xl' show={show} onHide={handleClose} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}>Fillup all fields to verify your account</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>
            <TextWrapper>
                    <AppTitle>
                      <h1>Personal Information</h1>
                    </AppTitle>
                  </TextWrapper>      
            <Row>
                              <Col>  <TextField fullWidth color="secondary"  InputLabelProps={{ required: true }} onChange={onChangeedit} name="first_name"  value= {getUserssss.first_name} label="Firstname" /> 
                              <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.first_name}</InputLabel> 
                              </Col>
                              <Col>  <TextField fullWidth color="secondary" id="middle_name" InputLabelProps={{ required: true }} onChange={onChangeedit} name="middle_name"  value= {getUserssss.middle_name} label="Middlename" /> 
                              <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.middle_name}</InputLabel> 
                              </Col>
                              <Col>  <TextField fullWidth color="secondary" id="last_name" InputLabelProps={{ required: true }} onChange={onChangeedit} name="last_name"  value= {getUserssss.last_name} label="Lastname" /> 
                              <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.last_name}</InputLabel> 
                              </Col>
                            </Row>
                            <br></br>
                            <Row>
                              <Col>  <TextField fullWidth color="secondary" InputLabelProps={{ shrink: true, required:true }} type="date" id="birth_date" onChange={onChangeedit} name="birth_date"  value= {getUserssss.birth_date} label="Birthdate" />
                              <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.birth_date}</InputLabel> 
                               </Col>
                              <Col>  
                              <TextField fullWidth color="secondary" type="number" id="age" InputLabelProps={{ required: true }}  onChange={onChangeedit} name="age"  value= {getUserssss.age} label="Age" /> 
                              <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.age}</InputLabel> 
                              </Col>
                              
                              <Col>   <FormControl>
                                      <FormLabel id="demo-row-radio-buttons-group-label">Gender*</FormLabel>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="gender"
                                        onChange={onChangeedit}
                                      >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                       
                                      </RadioGroup>
                                    </FormControl> 
                                    <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.gender}</InputLabel> 
                                    </Col>
                            </Row>
                      <br></br>
                      <Row>
                              <Col>  <TextField fullWidth color="secondary" id="house_purok_no" InputLabelProps={{ required: true }} onChange={onChangeedit} name="house_purok_no"  value= {getUserssss.address?.house_purok_no} label="House No/ Purok No" /> 
                              <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.house_purok_no}</InputLabel> 
                              </Col>
                              <Col>  <TextField fullWidth color="secondary" id="street" InputLabelProps={{ required: true }} onChange={onChangeedit} name="street"  value= {getUserssss.address?.street} label="Street" /> 
                              <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.street}</InputLabel> 
                              </Col>
                              <Col>    <FormControl fullWidth>
                                        <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                                         Barangay*
                                        </InputLabel>
                                        <NativeSelect
                                          onChange={onChangeedit}
                                          inputProps={{
                                            name: 'barangay',
                                            id: 'uncontrolled-native',
                                            required:true
                                          }}
                                          color="secondary"
                                        >
                                           <option value="" selected disabled> <em>Select Barangay</em></option>
                                        <option value="Bagumbayan">Bagumbayan</option>
                                        <option value="Bambang">Bambang</option>
                                        <option value="Calzada">Calzada</option>
                                        <option value="Central Bicutan">Central Bicutan</option>
                                        <option value="Central Signal Village">Central Signal Village (Signal Village)</option>
                                        <option value="Fort Bonifacio">Fort Bonifacio</option>
                                        <option value="Hagonoy">Hagonoy</option>
                                        <option value="Ibayo-tipas">Ibayo-tipas</option>
                                        <option value="Lower Bicutan">Lower Bicutan</option>
                                        <option value="Maharlika Village">Maharlika Village</option>
                                        <option value="Napindan">Napindan</option>
                                        <option value="New Lower Bicutan">New Lower Bicutan</option>
                                        <option value="North Daang Hari">North Daang Hari</option>
                                        <option value="North Signal Village">North Signal Village</option>
                                        <option value="Palingon">Palingon</option>
                                        <option value="Pinagsama">Pinagsama</option>
                                        <option value="San Miguel">San Miguel</option>
                                        <option value="Santa Ana">Santa Ana</option>
                                        <option value="South Daang Har">South Daang Hari</option>
                                        <option value="South Signal Villag">South Signal Village</option>
                                        <option value="Tanyag">Tanyag</option>
                                        <option value="Tuktukan">Tuktukan</option>
                                        <option value="Upper Bicutan">Upper Bicutan</option>
                                        <option value="Ususan">Ususan</option>
                                        <option value="Wawa">Wawa</option>
                                        <option value="Western Bicutan">Western Bicutan</option>
                                      </NativeSelect>
                                    </FormControl> 
                                    <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.barangay}</InputLabel> 
                                    </Col>
                            </Row>
                            <br></br>
                            <Row>
                              <Col>  
                              <InputLabel>Upload New Profile Pic*</InputLabel>
                              <TextField type="file"  onChange={onChangeedit} name="profile_picture" color="secondary" fullWidth id="fullName"  /> 
                              {!profileeditPreview ? "":
                               <div className="image-frameProfile">
                               <img src={profileeditPreview} title="Night-life" alt="Night-life"/>
                               </div>
                              }
                              <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.profile_picture}</InputLabel> 
                              </Col>
                              <Col>  
                              <InputLabel>Upload Valid ID*</InputLabel>
                              <TextField type="file" onChange={onChangeedit} name="valid_id" color="secondary" fullWidth id="fullName" /> 
                              {!editIdPreview ? "": 
                              <div className="image-frame">
                              <img src={editIdPreview} title="Night-life" alt="Night-life"/>
                              </div>
                              }
                               <InputLabel style={{color: "red", "font-size": "0.8rem"}}>{error.valid_id}</InputLabel> 
                              </Col>
                          
                            </Row>
                      <br></br>
                      {/* <TextWrapper>
                    <AppTitle>
                      <h1>Health Information</h1>
                    </AppTitle>
                  </TextWrapper>   */}

                      <Row>
                      {/* <Col  className="d-flex justify-content-center">
                        <div className='scrollssss'> 
                        <TextWrapper>
                          <AppTitle>
                            <h2>Health Condition</h2>
                          </AppTitle>
                        </TextWrapper>  
                        <div className='scrollsss'> 
                        <Form.Check
                        inline
                        label="dwadwadwadwa"
                        name="none"
                        type="checkbox"
                        style={{fontSize:"1.5rem"}}
                        // value={disease._id}
                        // defaultChecked={editcheckAllDisease[index]}
                        // onChange={edithandleChangess}
                        // selected={edithealth_id.includes(disease._id)}
                        />

                        </div>
                        </div>
                        </Col> */}
                        <Col  className="d-flex justify-content-center">
                        <div className='scrollssss'> 
                        <TextWrapper>
                          <AppTitle>
                            <h1>Health Disclosure</h1>
                          </AppTitle>
                        </TextWrapper>  
                        <div className='scrollsss'> 
                        <TextWrapper>
                          <AppTitle>
                            <h2>Leave if none</h2>
                          </AppTitle>
                        </TextWrapper>  
                        { AllHealth?.map(health => {
                          return <Form.Check
                          key={health._id}
                          inline1
                          label={health.health_problem}
                          name='_id'
                          type="checkbox"
                          style={{fontSize:"1.5rem"}}
                          value={health._id}
                          onChange={() => handleChangess(health._id)}
                          selected={health_id.includes(health._id)}
                          />
                        })
                        }
                        

                        </div>
                        </div>
                        </Col>
                      </Row> 
                      <Form.Check
                        inline1
                        className="d-flex justify-content-center"
                        label="&nbsp; I verify all the information"
                        name="none"
                        type="checkbox"
                        style={{fontSize:"1.1rem",  marginBottom: "-10px", marginTop: "20px"}}
                        onChange={e => setVerifyInformation(e.target.checked)}
                        value={VerifyInformation}
                        // defaultChecked={editcheckAllDisease[index]}
                        // onChange={edithandleChangess}
                        // selected={edithealth_id.includes(disease._id)}
                        />
                        <InputLabel className="d-flex justify-content-center" style={{color: "red", "font-size": "0.8rem",marginBottom: "-10px", marginTop: "20px"}}>{error.confirm}</InputLabel>  
                      <BtnWrap2 >
                <Button onClick={() => submitEdit()} outline color="danger"><i class="fas fa-file"></i>&nbsp;SUBMIT</Button>
                </BtnWrap2>

            </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


      <style>
        {`
        .form-check-input:checked {
          background-color: #EF3A47;
          border-color: #EF3A47;
        }
        .scrollsss {
          border: 1px solid #EF3A47;
          width: 320px;
          height: 280px;
          overflow: auto;
          display: flex;
          flex-direction: column;
          align-items: left;
          padding: 0 50px;
        }
        .scrollssss {
          border: 1px solid #EF3A47;
          width: 420px;
          height: 400px;
          overflow: auto;
          display: flex;
          border-radius: 10%;
          flex-direction: column;
          align-items: center;
        }

        .conditionscroll {
          border: 1px solid #EF3A47;
          width: 320px;
          height: 370px;
          overflow: auto;
          display: flex;
          flex-direction: column;
          align-items: left;
          padding: 0px 20px;
        }
        .conditionscrollsss{
          border: 2px solid #EF3A47;
          width: 420px;
          height: 500px;
          overflow: auto;
          display: flex;
          border-radius: 10%;
          flex-direction: column;
          align-items: center;
        }

        .scroll {
          border: 1px solid #EF3A47;
          width: 320px;
          height: 300px;
          overflow: auto;
          display: flex;
          flex-direction: column;
          align-items: left;
          padding: 0px 20px;
        }
        .scrolls{
          border: 2px solid #EF3A47;
          width: 420px;
          height: 500px;
          overflow: auto;
          display: flex;
          border-radius: 10%;
          flex-direction: column;
          align-items: center;
        }

        .searchHealth{
          border: 2px solid #EF3A47;
          width: 320px;
          height: 50px;
          display: flex;
          flex-direction: column;
          align-items: left;
          padding: 0 5px;
        }
        .medicalUpload{
          width: 320px;
          height: 40px;
          align-items: left;
          padding: 0px 0px;
          margin-top: 10px;
          margin-bottom: 0px;
        }

        .image-frame{
          position:relative;
          z-index:1;
          display:inline-block;
          border-radius: 10%;
        }
        
        .image-frame img{
          height:250px;
          width:420px;
          padding:4px;
          background-color:#fff;
          border-radius: 10%;
          border: 1px solid #b2b2b2;
        -webkit-box-shadow: 3px 3px 4px rgba(50, 50, 50, 0.75);
        -moz-box-shadow:    3px 3px 4px rgba(50, 50, 50, 0.75);
        box-shadow:         3px 3px 4px rgba(50, 50, 50, 0.75);
        }

        .image-frameProfile{
          position:relative;
          z-index:1;
          display:inline-block;
          border-radius: 10%;
        }

        .image-frameProfile2{
          position:relative;
          z-index:1;
          display:inline-block;
          border-radius: 10%;
        }
        
        .image-frameProfile img{
          height:250px;
          width:420px;
          padding:4px;
          border-radius: 10%;
          background-color:#fff;
          border: 1px solid #b2b2b2;
        -webkit-box-shadow: 3px 3px 4px rgba(50, 50, 50, 0.75);
        -moz-box-shadow:    3px 3px 4px rgba(50, 50, 50, 0.75);
        box-shadow:         3px 3px 4px rgba(50, 50, 50, 0.75);
        }

        .image-frameProfile2 img{
          height:200px;
          width:250px;
          padding:4px;
          border-radius: 10%;
          background-color:#fff;
          border: 1px solid #b2b2b2;
        -webkit-box-shadow: 3px 3px 4px rgba(50, 50, 50, 0.75);
        -moz-box-shadow:    3px 3px 4px rgba(50, 50, 50, 0.75);
        box-shadow:         3px 3px 4px rgba(50, 50, 50, 0.75);
        }
       

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
            margin-bottom: 50px;
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
