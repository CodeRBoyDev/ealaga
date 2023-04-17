import React from "react";
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from '../../../axiosConfig';
import SideBar from "../../../layouts/adminSideBarNav";
import moment from 'moment';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import { Card, Modal, ListGroup } from 'react-bootstrap';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2'
import {
  TextField,
  InputLabel,
  Select,
  MenuItem, FormControl, NativeSelect, FormLabel, FormControlLabel, RadioGroup, Radio

} from "@material-ui/core";
import CountUp from "react-countup";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import red from "@material-ui/core/colors/blue";
import { makeStyles } from "@material-ui/core/styles";
import {
  AcheivementsContainer,
  AcheivementsText,
  AcheivementsContainerWave,
  TextWrapper,
  AppTitle,
  BtnWrap2,
  ServicesH1,
  ServicesWrappers3,
  ServicesCard3,
  ServicesIcon,
  ServicesH2,


} from "./DonationElements";
import UserListItem from "./UserListItem";
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImageCapture from 'react-image-data-capture';

import image2 from "../../../images/nonexist.png";
import image1 from "../../../images/boy.png";

import { getUser } from '../../login/helpers';

import Navbar from "../../../layouts/adminHeaderBarNav";
import AdminSideBar from "../../../layouts/adminHeaderSide";
import { Scrollbars } from 'react-custom-scrollbars-2';


function Donation() {


  const [sideNavExpanded, setSideNavExpanded] = React.useState(true);

  function handleResize() {

    if (window.innerWidth <= 375) {
      setSideNavExpanded(false);

    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize(); // on-component-mount, check already to see if user has a small device

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // initialize event listeners on-mount & clean on-unmount

  const contentStyle = {
    marginLeft: sideNavExpanded ? "250px" : "90px", // arbitrary values
    marginTop: sideNavExpanded ? "92px" : "90px", // arbitrary values
    transition: "margin 0.2s ease"
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(3),
        width: theme.spacing(32)
      }
    },
    container: {
      display: "flex"
    },

    customBorderRadius: {
      borderRadius: 25,
      border: `3px solid #EF3A47`,
      height: 200,
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      elevation: 5,
      margin: 30,
      minWidth: 200,
      Color: "#FFBABA",
    }
  }));
  const classes = useStyles();
  const theme = createTheme({
    overrides: {
      MuiTableCell: {
        root: {
          border: [[1, 'solid', 'rgb(239, 58, 71)']],
          borderColor: '#d3d3d3',

        },
        head: {
          fontWeight: "bold",
          background: 'rgb(239, 58, 71) !important',
          color: "white"
        }

      },
      MuiTableSortLabel: {
        root: {
          alignItems: 'flex-start',
        },
      },
      // MuiTableFooter: {
      //   root: {
      //     background: 'rgb(239, 58, 71)',
      //   },
      // },
      // MUIDataTableToolbar: {
      //   root: {
      //     background: 'rgb(239, 58, 71)',
      //     boxShadow:"0 3px 5px rgb(255 0 0 / 60%)"
      //   },
      // },

      // MUIDataTable
      MUIDataTableHeadCell: {
        sortLabelRoot: {
          // height: undefined,
        },
      },
    },
  });

  ////////////====header nav

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


  //================================================================================================================

  const [getDonation, setgetDonation] = useState();

  const [getTotalUser, setTotalUser] = useState();


  const [getaddDonation, setaddDonation] = useState({ category: "", quantity: "" });
  const [error, setError] = useState({
    user_name: '',
    quantity: '',
    category: '',
  });

  // console.log(error);
  const fetchDonation = () => {
    axios({
      method: "get",
      url: `/api/donation/getDonation`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    }).then(response => {

      setgetDonation(response.data.donation);
    }).catch((err) => console.log(err));
  };
  // console.log(AllHealthProblem)
  useEffect(() => {
    fetchDonation();
    handleSearch();
  }, []);


  var data = {
    columns: ["ID", "Donator Name", "Category", "Quantity" , "Action"],
    rows: []
  }
  getDonation?.forEach(donation => {
    data.rows.push([
      donation._id,
      donation.donator_name,
      donation.category,
      donation.quantity,
        <>
      <Link to=""  onClick={() => viewDonation(donation._id)} className="yellowBgButton">
      &nbsp;&nbsp;
      {/* <i class="fas fa-eye"></i> */}
      Edit
      &nbsp;&nbsp;
      </Link> 
    
         <Link to="" onClick={() => deleteDonation(donation._id)} className="redBgButton">
          {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
         {/* <i class="fas fa-times"></i> */}
            Delete
         {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
         </Link> 
         
         </>

    ])
  })


  const onChange = e => {

    if (e.target.name === 'profile_picture') {

    
      // read as file
      setImgFile(e.target.files[0]);

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImgSrc(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } 
    else {

      setaddDonation({ ...getaddDonation, [e.target.name]: e.target.value })

    }

   
  }



  const [geteditDonation, seteditDonation] = useState();

  console.log(geteditDonation?.category);

  const viewDonation = _id => {
    console.log(_id);
    handleviewShow()

    axios({
      method: "get",
      url: `/api/donation/edit/${_id}`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    }).then(response => {
      setTotalUser(response.data.totalUser)
      seteditDonation(response.data.donation);
      setImgSrc(response.data.donation?.image?.url)
      

    }).catch((err) => console.log(err));

  }



  const onChangeedit = e => {
    if (e.target.name === 'profile_picture') {

    
      // read as file
      setImgFile(e.target.files[0]);

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImgSrc(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else{
      seteditDonation({ ...geteditDonation, [e.target.name]: e.target.value })
    }
   

  }

  const submitEdit = (_id) => {

    // console.log(geteditDonation?.category)

    let formData = new FormData();


    formData.set("image", imgFile);
    formData.set("user_id", geteditDonation.user_id);
    formData.set("donator_name", geteditDonation.donator_name);
    formData.set("category", geteditDonation.category);
    formData.set("quantity", geteditDonation.quantity);

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
      url: `/api/donation/update/${_id}`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      data: formData
    }).then(response => {
      Swal.close()
      handleViewClose();
      fetchDonation();
      Swal.fire({
        title: 'Success!',
        text: 'Sucessfully Updated.',
        imageUrl: 'https://media0.giphy.com/media/dYmYhn4OXI1aOpVpFO/giphy.gif?cid=ecf05e479ym4epjp1orghtshgvg92nc27cty98jbg9rfzfdr&rid=giphy.gif&ct=s',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonColor: '#EF3A47',
      })
        // setLoadingss(false)
      // console.log(response.data.user);
      // setgetUser(response.data.user);
      // setAllHealth(response.data.health);
      // setProfilePreview(response.data.user.profile_picture.url)



    }).catch(error => {
      Swal.close()
      console.log(error.response.data)
      setError(error.response.data);
    });

  };


  // console.log(geteditHealth)

  const deleteDonation = _id => {
    console.log(_id);

    Swal.fire({
      title: 'Are you sure you want to delete this health problem?',
      icon: 'warning',
      color: '#EF3A47',
      showCancelButton: true,
      confirmButtonColor: '#EF3A47',
      cancelButtonColor: '#f8bb86',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {

        axios({
          method: "delete",
          url: `/api/donation/delete/${_id}`,
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
        }).then(response => {

          Swal.fire({
            title: 'Success!',
            text: 'Deleted successfully.',
            imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1665937703/ezgif.com-gif-maker_2_h7h5ey.gif',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonColor: '#EF3A47',
          }).then((result) => {
            if (result.isConfirmed) {
              fetchDonation();
            }
          })

        })
          .catch(error => {
            console.log(error.response);
            // setError(error.response.data);

          });


      }
    })

  }


  ///modal--------------------------

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);

    setError({
      health_problem: "",
      description: ""
    })
    setsearchUserName({ "user_name": "" });
    setSelectDonator({ donator_type: "" })
    setSearch("");
    setSearchResult([]);
    setImageOption(""); 
    setImgSrc("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"); 
    setImgFile(null);

    // setAnimalImage([]);
  }
  const handleShow = () => setShow(true);


  const [editShow, seteditShow] = useState(false);
  const handleEditClose = () => {
    seteditShow(false);

    // setAnimalImage([]);
  }
  const handleeditShow = () => seteditShow(true);

  const [viewShow, setviewShow] = useState(false);
  const handleViewClose = () => {
    setviewShow(false);

    // setAnimalImage([]);
  }
  const handleviewShow = () => setviewShow(true);



  //imageeeeeeeeeee
  const [imgSrc, setImgSrc] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [imgFile, setImgFile] = useState(null);
  const [ImageOption, setImageOption] = useState("");

  console.log(ImageOption);
  
  const onCapture = (imageData) => {
    setImageOption("");
    // read as webP
    setImgSrc(imageData.webP);
    // read as file
    setImgFile(new File([imageData.blob], 'image.jpeg', { type: 'image/jpeg' }));
    // read as blob
    // imageData.blob
  };

  // Use useCallback to avoid unexpected behaviour while rerendering
  const onError = useCallback((error) => { console.log(error) }, []);

  // Use useMemo to avoid unexpected behaviour while rerendering
  const config = useMemo(() => ({ video: true }), []);
  /*
    { video: true } - Default Camera View
    { video: { facingMode: environment } } - Back Camera
    { video: { facingMode: "user" } } - Front Camera
  */
  // console.log(imgFile)
  // imgFile can be used as a file upload field form submission
  const formData = new FormData();
  formData.append("file", imgFile);


  const [getSelectDonator, setSelectDonator] = useState({ donator_type: "" });
  const [loading, setLoading] = useState(false);

  console.log(getSelectDonator)

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [getsearchUserId, setsearchUserId] = useState({ user_id: "" });
  const [getsearchUserName, setsearchUserName] = useState({ user_name: "" });

console.log(getsearchUserName)

  const handleSearch = async (query) => {

    setsearchUserName({ ...getsearchUserName, "user_name": query });
    if (!query) {
      return;
    }



    try {

      setLoading(true);
      const { data } = await axios.get(`/api/donation/allUsers`,);
      // console.log(data, 'users search response from server');

      const filteredUsers = data?.filter(filterusers => {
        if (typeof filterusers.first_name === "string" && typeof filterusers.last_name === "string"
        ) {
          const fullName = filterusers.first_name + ' ' + filterusers.last_name;
    
          return fullName.toLowerCase().indexOf(query) !== -1;
        }
      });


      setLoading(false);
      setSearchResult(filteredUsers);

    } catch (error) {

      console.error(error.message);

    }
  };

  const handleSearchs = async (query) => {

    setsearchUserName({ ...getsearchUserName, "user_name": query });
    
  };

  console.log(getsearchUserName.user_name)


  const accessUser = async (userId, first_name, last_name) => {
    setSearch("");
    setSearchResult([]);

    setsearchUserId({ user_id: userId });
    setsearchUserName({ user_name: first_name + " " + last_name });

  };


  const submitaddDonation = () => {

    console.log(getsearchUserName.user_name, getaddDonation)

    let formData = new FormData();


    formData.set("image", imgFile);
    formData.set("user_id", getsearchUserId.user_id);
    formData.set("donator_name", getsearchUserName.user_name);
    formData.set("category", getaddDonation.category);
    formData.set("quantity", getaddDonation.quantity);

    Swal.fire({
      title: 'Loading!',
      text: 'Please wait while processing the donation.',
      imageUrl: 'https://media3.giphy.com/media/jtFds4dHM4bXUOnHAU/giphy.gif?cid=ecf05e475is9ul1rls0lk34lqv2myv5dwhbaptp7xbpkwh42&rid=giphy.gif&ct=s',
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
      url: `/api/donation/new`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      }
    })
      .then(response => {

        Swal.close()
        handleClose();
        setaddDonation({ category: "", quantity: "" })
        setsearchUserName({ "user_name": "" });
        setSelectDonator({ donator_type: "" })
        setSearch("");
        setSearchResult([]);
        setImageOption(""); setImgSrc("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"); setImgFile(null);
        
        fetchDonation();
        Swal.fire({
          title: 'Success!',
          text: 'Successfully created a health problem.',
          imageUrl: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1666086805/giphy_15_l7eulx.gif',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#EF3A47',
        })

      })
      .catch(error => {
        Swal.close()
        console.log(error.response);
        setError(error.response.data);

      });

  }



  return (
    <>
    <Navbar toggle={toggle} />
    <AdminSideBar  isOpen={isOpen} toggle={toggle}/>
    <div style={contentStyle}>


      <div class="container-fluid">
        <br />
        <h1 style={{ color: "rgb(239, 58, 71)" }}><i class="fas fa-box"></i>&nbsp;Donation</h1>

        <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
        <hr />
        <SideBar setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} />


        <Button style={{ marginBottom: "10px" }} onClick={() => handleShow()}
          color="danger"><i className="fas fa-plus"></i>&nbsp;&nbsp;Donation</Button>

        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={<>
              {/* <h3>USER LIST</h3> */}
              {/* <button  onClick={() => handleShow()} className="btn btn-dark py-1 px-2 ml-2" >&nbsp;&nbsp;
                        <i className="fas fa-plus"></i>&nbsp;&nbsp;</button> */}
            </>}
            data={data.rows}
            columns={data.columns}
            options={{
              filterType: "dropdown",
              responsive: "scroll",
              selectableRows: 'none',
              print: false,
              download: false,
              filter: false,


            }}
          />
        </ThemeProvider>
      </div>


      <Modal size='md' show={show} onHide={handleClose} animation={true}>
        <Modal.Header style={{ background: '#CE3043' }}>
          <Modal.Title style={{ color: '#ffff' }}><i class="fas fa-box"></i>&nbsp;&nbsp;Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#ffff' }}>

          {getSelectDonator.donator_type == "" ?
            <>
              <TextWrapper>
                <ServicesH1>Select a Donator
                  <h6 style={{ color: "black" }}>Choose between Exist and Non exists user</h6>
                </ServicesH1>
              </TextWrapper>
              <ServicesWrappers3>
                <ServicesCard3
                  onClick={() => { setSelectDonator({ donator_type: "exist" }); }}
                >
                  <ServicesIcon src={image1} />
                  <ServicesH2>Existing</ServicesH2>
                </ServicesCard3>
              </ServicesWrappers3>
              <ServicesWrappers3>

                <ServicesCard3
                  onClick={() => { setSelectDonator({ donator_type: "non exist" }); }}
                >
                  <ServicesIcon src={image2} />
                  <ServicesH2>Non-Existing</ServicesH2>
                </ServicesCard3>


              </ServicesWrappers3>
            </>
            :
            getSelectDonator.donator_type == "exist" ?
              <>
                <TextWrapper>
                  <ServicesH2>Existing User
                  </ServicesH2>
                </TextWrapper>
                {ImageOption == "take" ? 
                <>
          
                  <>
                  <div style={{display: "flex", justifyContent: "center"}}>
                      <ImageCapture
                        onCapture={onCapture}
                        onError={onError}
                        width={500}
                        userMediaConfig={config}
                      />
                           </div>
                  </>
                  <Button outline onClick={() => {setImageOption(""); setImgSrc("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"); setImgFile(null); }} color="danger"><i class="fas fa-arrow-left"></i>&nbsp;Back</Button>
        
                </> 
                
                
                : 
                <>
                 <div style={{display: "flex", justifyContent: "center"}}>
                  <Card style={{ width: '14rem' }}>
                    <Card.Img variant="top" src={imgSrc} />
                  
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item style={{ textAlign: 'center' }} onClick={() => {setImageOption("take"); setImgSrc("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"); setImgFile(null);}}>
                      <Link to="">Take a Photo</Link>
                      </ListGroup.Item>
                      <ListGroup.Item><TextField type="file"   onChange={onChange} inputProps={{ accept: "image/*" }} name="profile_picture" color="secondary" fullWidth id="fullName" /></ListGroup.Item>  
                    </ListGroup>
                  </Card>
                </div>
                <Col>
                  <TextField fullWidth color="secondary" id="health_problem" value={getsearchUserName?.user_name} onChange={(e) => handleSearch(e.target.value)} InputLabelProps={{ required: true }} name="name" label="Donator Name" />
                  <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.donator_name}</InputLabel>
                </Col>
             
                  {loading ? (
                    // <ChatLoading />
                    <div>Loading...</div>
                  ) : ( //top 4 results
                    searchResult
                      ?.slice(0, 4)
                      .map((user) => (
                        <UserListItem
                          key={user._id}
                          user={user}
                          handleFunction={() => accessUser(user._id, user.first_name, user.last_name)}
                        />
                      ))
                  )}
             
                <br />
                <Row>
                  <Col>    <FormControl fullWidth>
                    <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                      Category*
                    </InputLabel>
                    <NativeSelect
                      onChange={onChange}
                      inputProps={{
                        name: 'category',
                        id: 'uncontrolled-native',
                        required: true
                      }}
                      color="secondary"
                    >
                      <option value="" selected disabled> <em>Select Category</em></option>
                      <option value="Clothing">Clothing</option>
                      <option value="Personal Hygiene Items">Personal Hygiene Items</option>
                      <option value="Bed Linens">Bed Linens</option>
                      <option value="Books and Entertainment">Books and Entertainment</option>
                      <option value="Food">Food</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Medical Supplies">Medical Supplies</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Home Decor">Home Decor</option>
                      <option value="Other">Other</option>
                    </NativeSelect>
                  </FormControl>
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.category}</InputLabel>
                  </Col>

                  <Col>
                    <TextField fullWidth color="secondary" type="number" id="health_problem" onChange={onChange} InputLabelProps={{ required: true }} name="quantity" label="Quantity" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.quantity}</InputLabel>
                  </Col>

                </Row>
                <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.health_problem}</InputLabel>
                <br></br>


                <BtnWrap2 >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button outline onClick={() => { setSelectDonator({ donator_type: "" }); }} color="danger"><i class="fas fa-arrow-left"></i>&nbsp;Back</Button> &nbsp; &nbsp;
                    <Button outline onClick={() => submitaddDonation()} color="danger"><i class="fas fa-file"></i>&nbsp;SUBMIT</Button>
                  </div>
                </BtnWrap2>
                </>
                }

              </>

              :


              <>
              <TextWrapper>
                <ServicesH2>Non-Existing User
                </ServicesH2>
              </TextWrapper>
              {ImageOption == "take" ? 
              <>
        
                <>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <ImageCapture
                      onCapture={onCapture}
                      onError={onError}
                      width={500}
                      userMediaConfig={config}
                    />
                         </div>
                </>
                <Button outline onClick={() => {setImageOption(""); setImgSrc("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"); setImgFile(null); }} color="danger"><i class="fas fa-arrow-left"></i>&nbsp;Back</Button>
      
              </> 
              
              
              : 
              <>
               <div style={{display: "flex", justifyContent: "center"}}>
                <Card style={{ width: '14rem' }}>
                  <Card.Img variant="top" src={imgSrc} />
                
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item style={{ textAlign: 'center' }} onClick={() => {setImageOption("take"); setImgSrc("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"); setImgFile(null);}}>
                    <Link to="">Take a Photo</Link>
                    </ListGroup.Item>
                    <ListGroup.Item><TextField type="file"   onChange={onChange} inputProps={{ accept: "image/*" }} name="profile_picture" color="secondary" fullWidth id="fullName" /></ListGroup.Item>  
                  </ListGroup>
                </Card>
              </div>
              <Col>
              <TextField fullWidth color="secondary" id="health_problem" value={geteditDonation?.donator_name} onChange={(e) => handleSearchs(e.target.value)}  InputLabelProps={{ shrink: true, required: true }} name="name" label="Donator Name" />
                <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.donator_name}</InputLabel>
              </Col>
           
                {loading ? (
                  // <ChatLoading />
                  <div>Loading...</div>
                ) : ( //top 4 results
                  searchResult
                    ?.slice(0, 4)
                    .map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => accessUser(user._id, user.first_name, user.last_name)}
                      />
                    ))
                )}
           
              <br />
              <Row>
                <Col>    <FormControl fullWidth>
                  <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                    Category*
                  </InputLabel>
                  <NativeSelect
                    onChange={onChange}
                    inputProps={{
                      name: 'category',
                      id: 'uncontrolled-native',
                      required: true
                    }}
                    color="secondary"
                  >
                    <option value="" selected disabled> <em>Select Category</em></option>
                    <option value="Clothing">Clothing</option>
                    <option value="Personal Hygiene Items">Personal Hygiene Items</option>
                    <option value="Bed Linens">Bed Linens</option>
                    <option value="Books and Entertainment">Books and Entertainment</option>
                    <option value="Food">Food</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Medical Supplies">Medical Supplies</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Other">Other</option>
                  </NativeSelect>
                </FormControl>
                  <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.category}</InputLabel>
                </Col>

                <Col>
                  <TextField fullWidth color="secondary" type="number" id="health_problem" onChange={onChange} InputLabelProps={{ required: true }} name="quantity" label="Quantity" />
                  <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.quantity}</InputLabel>
                </Col>

              </Row>
              <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.health_problem}</InputLabel>
              <br></br>


              <BtnWrap2 >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button outline onClick={() => { setSelectDonator({ donator_type: "" }); }} color="danger"><i class="fas fa-arrow-left"></i>&nbsp;Back</Button> &nbsp; &nbsp;
                  <Button outline onClick={() => submitaddDonation()} color="danger"><i class="fas fa-file"></i>&nbsp;SUBMIT</Button>
                </div>
              </BtnWrap2>
              </>
              }

            </>

            
          }

        </Modal.Body>
        <Modal.Footer style={{ background: 'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))' }}>
          <Button style={{ background: '#EF3A47', color: 'white' }} variant="light" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal size='md' show={viewShow} onHide={handleViewClose} animation={true}>
        <Modal.Header style={{ background: '#CE3043' }}>
          <Modal.Title style={{ color: '#ffff' }}><i class="fas fa-medkit"></i>&nbsp;&nbsp;EDIT DONATION</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#ffff' }}>

        <>
                <TextWrapper>
                  <ServicesH2>Edit Donation
                  </ServicesH2>
                </TextWrapper>
                {ImageOption == "take" ? 
                <>
          
                  <>
                  <div style={{display: "flex", justifyContent: "center"}}>
                      <ImageCapture
                        onCapture={onCapture}
                        onError={onError}
                        width={500}
                        userMediaConfig={config}
                      />
                           </div>
                  </>
                  <Button outline onClick={() => {setImageOption(""); setImgSrc("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"); setImgFile(null); }} color="danger"><i class="fas fa-arrow-left"></i>&nbsp;Back</Button>
        
                </> 
                
                
                : 
                <>
                 <div style={{display: "flex", justifyContent: "center"}}>
                  <Card style={{ width: '14rem' }}>
                    <Card.Img variant="top" src={imgSrc} />
                  
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item style={{ textAlign: 'center' }} onClick={() => {setImageOption("take"); setImgSrc("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"); setImgFile(null);}}><Card.Link href="#">Take a Photo</Card.Link></ListGroup.Item>
                      <ListGroup.Item><TextField type="file"   onChange={onChangeedit} inputProps={{ accept: "image/*" }} name="profile_picture" color="secondary" fullWidth id="fullName" /></ListGroup.Item>  
                    </ListGroup>
                  </Card>
                </div>
                <Col>
                  <TextField fullWidth color="secondary" id="health_problem" value={geteditDonation?.donator_name} onChange={(e) => handleSearch(e.target.value)}  InputLabelProps={{ shrink: true, required: true }} name="name" label="Donator Name" />
                  <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.donator_name}</InputLabel>
                </Col>
             
                  {/* {loading ? (
                    // <ChatLoading />
                    <div>Loading...</div>
                  ) : ( //top 4 results
                    searchResult
                      ?.slice(0, 4)
                      .map((user) => (
                        <UserListItem
                          key={user._id}
                          user={user}
                          handleFunction={() => accessUser(user._id, user.first_name, user.last_name)}
                        />
                      ))
                  )} */}
             
                <br />
                <Row>
                  <Col>    <FormControl fullWidth>
                    <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                      Category*
                    </InputLabel>
                    <NativeSelect
                       key={geteditDonation?.category ? 'notLoadedYet' : 'loaded'}
                       defaultValue={geteditDonation?.category}
                      onChange={onChangeedit}
                      inputProps={{
                        name: 'category',
                        id: 'uncontrolled-native',
                        required: true
                      }}
                      color="secondary"
                    >
                      <option value="" selected disabled> <em>Select Category</em></option>
                      <option value="Clothing">Clothing</option>
                      <option value="Personal Hygiene Items">Personal Hygiene Items</option>
                      <option value="Bed Linens">Bed Linens</option>
                      <option value="Books and Entertainment">Books and Entertainment</option>
                      <option value="Food">Food</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Medical Supplies">Medical Supplies</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Home Decor">Home Decor</option>
                      <option value="Other">Other</option>
                    </NativeSelect>
                  </FormControl>
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.category}</InputLabel>
                  </Col>

                  <Col>
                    <TextField InputLabelProps={{ shrink: true, required: true }}  fullWidth color="secondary" type="number" id="health_problem" value={geteditDonation?.quantity} onChange={onChangeedit} name="quantity" label="Quantity" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.quantity}</InputLabel>
                  </Col>

                </Row>
                <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.health_problem}</InputLabel>
                <br></br>


                <BtnWrap2 >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button outline color="danger" onClick={() => submitEdit(geteditDonation?._id)}><i class="fas fa-file"></i>&nbsp;Update</Button>
                  </div>
                </BtnWrap2>
                </>
                }

              </>


        </Modal.Body>
        <Modal.Footer style={{ background: 'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))' }}>
          <Button style={{ background: '#EF3A47', color: 'white' }} variant="light" onClick={handleViewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <style>
        {`
        .vl {
          border-left: 2px solid #EF3A47;
          height: 50px;
        }

        .redBg {
          background-color: rgba(255, 0, 0, 0.2);
          color: red;
          padding: 0.3em 0.5em;
          margin: 0.5em;
          display: flex;
          text-decoration: none;
          border-radius: 2em;
          font-weight: bolder;
          justify-content: center;
        }
        .greenBgButton {
          background-color: rgba(0, 255, 0, 0.2);
          color: green;
          padding: 10px;
          margin: 0.5em;
          text-decoration: none;
          border-radius: 2em;
          font-weight: bolder;
          justify-content: center;
          box-shadow: 0 5px 10px rgba(100, 100, 100, 0.6);
          
        }
        .greenBgButton:hover {
          text-decoration: none;
          color: white;
          background-color: green;
          box-shadow: 0 5px 10px rgba(0, 255, 0, 0.6);
        }

        .yellowBgButton {
          background-color: rgba(0, 0, 255, 0.2);
          color: #8146FF;
          padding: 10px;
          margin: 0.5em;
          text-decoration: none;
          border-radius: 2em;
          font-weight: bolder;
          justify-content: center;
          box-shadow: 0 5px 10px rgba(100, 100, 100, 0.6);
          
        }
        .yellowBgButton:hover {
          text-decoration: none;
          color: white;
          background-color: #8146FF;
          box-shadow: 0 5px 10px rgba(0, 0, 255, 0.6);
        }


        .redBgButton {
          background-color: rgba(255, 0, 0, 0.2);
          color: red;
          padding: 10px;
          margin: 0.5em;
          text-decoration: none;
          border-radius: 2em;
          font-weight: bolder;
          justify-content: center;
          box-shadow: 0 5px 10px rgba(100, 100, 100, 0.6);
          
        }
        .redBgButton:hover {
          text-decoration: none;
          color: white;
          background-color: red;
          box-shadow: 0 5px 10px rgba(255, 0, 0, 0.2);
        }

        .DisablegreenBgButton {
          background-color: rgba(0, 255, 0, 0.2);
          opacity: 0.2;
          color: green;
          padding: 10px;
          margin: 0.5em;
          text-decoration: none;
          border-radius: 2em;
          font-weight: bolder;
          justify-content: center;
          box-shadow: 0 5px 10px rgba(100, 100, 100, 0.6);
          
        }

        .DisableredBgButton {
          background-color: rgba(255, 0, 0, 0.2);
          opacity: 0.2;
          color: red;
          padding: 10px;
          margin: 0.5em;
          text-decoration: none;
          border-radius: 2em;
          font-weight: bolder;
          justify-content: center;
          box-shadow: 0 5px 10px rgba(100, 100, 100, 0.6);
          
        }

      .greenBg {
          background-color: green;
          color: white;
          padding: 0.3em 0.5em;
          margin: 0.5em;
          display: flex;
          text-decoration: none;
          border-radius: 2em;
          font-weight: bolder;
          justify-content: center;
        }

      .yellowBg {
          background-color: orange;
          color: white;
          padding: 0.3em 0.5em;
          margin: 0.5em;
          display: flex;
          text-decoration: none;
          border-radius: 2em;
          font-weight: bolder;
          justify-content: center;
        }
        
          .form-control {
            height: 150px;
          
        }
      
          .centerss{
            padding-left: 100px;
          }
              a {
                color: #EF3A47;
                text-decoration: underline;
            }
            a:hover {
              color: #F58890;
              transition: all 0.2s ease-in-out ;
      
            }
            .colll{
              display: flex; 
              float:left;
              width:200px;
              margin:5px;
              
            }
      
            .page-link {
              position: relative;
              display: block;
              color: #ff0000;
              text-decoration: none;
              background-color: #fff;
              border: 1px solid #dee2e6;
              transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
          .panel-activity__status > .actions {
            display: -ms-flexbox;
            display: -webkit-box;
            display: flex;
            padding: 10px 20px;
            background-color: #ebebea;
            border-style: solid;
            border-width: 0 1px 1px;
            border-color: #ccc;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }
      
            .panel-activity__status > .actions > .btn-group > .btn-link:not(:last-child) {
              margin-right: 25px;
          }
      
          .panel-activity__status > .actions > .btn-group > .btn-link {
              padding-left: 0;
              padding-right: 0;
              color: #9c9c9c;
          }
      
          .panel-activity__status > .actions > .btn-group {
            -ms-flex: 1;
            -webkit-box-flex: 1;
            flex: 1;
            font-size: 16px;
        }
      
              .btn-group,
            .btn-group-vertical {
                position: relative;
                display: -ms-inline-flexbox;
                display: inline-flex;
                vertical-align: middle;
            }
      
            .panel-activity__status > .actions > .btn-group > .btn-link:not(:last-child) {
              margin-right: 25px;
            }
      
            .btn-link {
              display: inline-block;
              color: inherit;
              font-weight: inherit;
              cursor: pointer;
              background-color: transparent;
            }
      
            button.btn-link {
              border-width: 0;
            }
        `}
      </style>

    </div>
    </>
  );

}

export default Donation;