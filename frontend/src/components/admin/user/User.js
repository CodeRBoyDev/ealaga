import React from "react";
import { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';
import SideBar from "../../../layouts/adminSideBarNav";
import {
  TextField, createTheme,
  InputLabel,
  InputAdornment, FormControl, NativeSelect, FormLabel, FormControlLabel, RadioGroup, Radio

} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import download from 'downloadjs';
import { Circles } from 'react-loader-spinner'
import {
  HeroImageContainer,
  AppWrapper,
  App,
  TextWrapper,
  AppTitle,
  BtnWrap2,
  ServicesH1,
  ServicesWrappers3,
  ServicesCard3,
  ServicesIcon,
  ServicesH2
} from "./UserElements.js";
import Swal from 'sweetalert2'
import { ThemeProvider } from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import { Button } from 'reactstrap';
import { Carousel, Card, Modal, Form } from 'react-bootstrap';
import image3 from "../../../images/administrator.png";
import image2 from "../../../images/personnel.png";
import image1 from "../../../images/userelder.png";
import { ControlBox } from "@chakra-ui/react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Navbar from "../../../layouts/adminHeaderBarNav";
import AdminSideBar from "../../../layouts/adminHeaderSide";
import { Scrollbars } from 'react-custom-scrollbars-2';




const LoadingScreen = () => {

  const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '-10vh'
  };
  const divStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '-8vh'
  };

  return (
      <>
          <div className="loading-screen">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "-250px", height: "100vh" }}>

                  <div class="loader">
                      <div class="bounce1"></div>
                      <div class="bounce2"></div>
                      <div class="bounce3"></div>
                      <div class="logo">
                          <img src="https://res.cloudinary.com/du7wzlg44/image/upload/v1668318630/logovector_xbhcca.png" alt="" />
                      </div>
                  </div>
              </div>
              <div style={divStyles}>

                  <h4>Ease. Access. Care.</h4>
              </div>
              <div style={divStyle}>
                  <img style={{ width: "15vh" }} src="https://res.cloudinary.com/du7wzlg44/image/upload/v1674437022/logos_jwwfrz.png" alt="" />
              </div>
          </div>


          <style>
              {`
     .loader {
  width: 150px;
  height: 150px;
  position: relative;
  margin: 220px auto;

}
.logo{
  width:45%;
  position:absolute;
  left:27.5%;
  top: 27.5%;
  
}
img{
  width:100%;
  border-radius: 5%;
  z-index:5;
}
.bounce1, .bounce2, .bounce3 {
  width: 100%;
  height: 100%;
  border-radius: 30%;
  background-color: #F56565;
  opacity: 0.7;
  position: absolute;
  top: 0;
  left: 0;
   
  -webkit-animation: spreadout 2.7s infinite ease-in-out;
  animation: spreadout 2.7s infinite ease-in-out;
}

.bounce2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.bounce3 {
  -webkit-animation-delay: -1.8s;
  animation-delay: -1.8s;
}


@-webkit-keyframes spreadout {
  0% { -webkit-transform: scale(0.3) }
 
  100% {
    opacity: 0;
  }
}

@keyframes spreadout {
  0% { 
    -webkit-transform: scale(0.3);
    transform: scale(0.3);
  }
 
  100% {
    opacity: 0;
  }
}
      
      `}
          </style>
      </>
  );
}






function User() {


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

  const theme = createTheme({
    overrides: {
      MUIDataTable: {
        root: {
          marginRight: '50px',
        },
      },
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
          marginRight: '80px',
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

  const [getUsers, setgetUser] = useState();
  const [AllHealth, setAllHealth] = useState([]);
  const [checkededitItems, seteditCheckedItems] = useState({ edithealth_id: [] });

  const [AllHealthProblem, setAllHealthProblem] = useState({ health_problem: [] });

  const [statuss, setStatus] = useState({ status: "" });
  const [roless, setRole] = useState({ role: "" });
  const [barangayss, setBarangay] = useState({ barangay: "" });
  const [searchss, setSearch] = useState({ search: "" });
  const [accountss, setAccount] = useState({ account: "" });

  const [getSelectUser, setSelectUser] = useState({ user_type: "" });

  const [profileeditPreview, seteditProfilePreview] = useState('https://res.cloudinary.com/du7wzlg44/image/upload/v1674065259/images_qselpk.jpg')
  const [profileeditData, seteditProfileData] = useState('')

  const [editIdPreview, seteditIdPreview] = useState('https://res.cloudinary.com/du7wzlg44/image/upload/v1674065259/images_qselpk.jpg')
  const [profileValidDataID, seteditProfileDataID] = useState('')

  const [profilePreview, setProfilePreview] = useState({ profile_preview: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1674065259/images_qselpk.jpg' })
  const [profileData, setProfileData] = useState('')


  const [IdPreview, setIdPreview] = useState({ id_preview: 'https://res.cloudinary.com/du7wzlg44/image/upload/v1674065259/images_qselpk.jpg' })
  const [profileDataID, setProfileDataID] = useState('')


  const sixtyYearsAgo = new Date();
  sixtyYearsAgo.setFullYear(sixtyYearsAgo.getFullYear() - 60);
  const pastDate = sixtyYearsAgo.toISOString();

  const age = calculateAge(pastDate.substring(0, 10));

  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  const pasteighteenDate = eighteenYearsAgo.toISOString();

  const eighteenAge = calculateAge(pasteighteenDate.substring(0, 10));

  const [getUserssss, setgetUserssss] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    birth_date: pastDate.substring(0, 10),
    age: age,
    gender: '',
    address: {
      house_purok_no: '',
      street: '',
      barangay: ''
    },
    profile_picture: '',
    valid_id: '',
    user_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });


  const [getEditUserssss, setgetEditUserssss] = useState({
    password: '',
    confirmPassword: ''
  });



  const onAll = () => {
    setStatus({ status: "" });
    setRole({ role: "" });
    setBarangay({ barangay: "" });
    setSearch({ search: "" });
    setAccount({ account: "" });
  };

  const onChangeStatus = e => {
    setStatus({ status: e.target.value });
  };
  const onChangeRole = e => {
    setRole({ role: e.target.value });
  };

  const onChangeBarangay = e => {
    setBarangay({ barangay: e.target.value });
  };

  const onChangeSearch = e => {
    setSearch({ search: e.target.value });
  };


  const onChangeAccount = e => {
    setAccount({ account: e.target.value });
  };



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
    user_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });



  /////////////////////////////////=---- add user

  const onChangeAddUser = e => {
    const { name, value } = e.target;
    if (e.target.name === 'profile_picture') {

      seteditProfileData(e.target.files[0])

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          seteditProfilePreview(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else if (e.target.name === 'valid_id') {

      seteditProfileDataID(e.target.files[0])

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          seteditIdPreview(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])

    } else if (e.target.name === 'birth_date') {
      const birthdate = e.target.value;
      const age = calculateAge(birthdate);
      setgetUserssss({ ...getUserssss, [e.target.name]: e.target.value, age });
    }
    else {

      setgetUserssss({
        ...getUserssss, [e.target.name]: e.target.value, address: {
          ...getUserssss.address, [e.target.name]: e.target.value
        }
      })

    }
  }

  const submitAddUser = () => {


    let formData = new FormData();

    formData.set("profile_picture", profileeditData);
    formData.set("valid_id", profileValidDataID);
    formData.set("first_name", getUserssss.first_name);
    formData.set("middle_name", getUserssss.middle_name);
    formData.set("last_name", getUserssss.last_name);
    formData.set("age", getUserssss.age);
    formData.set("gender", getUserssss.gender);
    formData.set("birth_date", getUserssss.birth_date);
    formData.set("house_purok_no", getUserssss.address?.house_purok_no);
    formData.set("street", getUserssss.address?.street);
    formData.set("barangay", getUserssss.address?.barangay);
    formData.set("user_name", getUserssss.user_name);
    formData.set("phone", getUserssss.phone);
    formData.set("email", getUserssss.email);
    formData.set("password", getUserssss.password);
    formData.set("confirmPassword", getUserssss.confirmPassword);
    formData.set("user_type", getSelectUser.user_type);

    for (var i = 0; i < checkedItems?.health_id.length; i++) {
      formData.append('health_id', checkedItems.health_id[i]);
    }


    Swal.fire({
      title: 'Loading!',
      text: 'Please wait while processing your new data.',
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
      url: `/api/user/add`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      data: formData
    }).then(response => {

      Swal.close()
      // setLoading(true)
      setShow(false);
      fetchUser();
      Swal.fire({
        title: 'Success!',
        // text: 'Please wait for the admin to verified your account.',
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

      setgetUserssss({
        first_name: '',
        middle_name: '',
        last_name: '',
        birth_date: '',
        age: '',
        gender: '',
        address: {
          house_purok_no: '',
          street: '',
          barangay: ''
        },
        profile_picture: '',
        valid_id: '',
        user_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });

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
        user_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });

    }).catch(error => {
      Swal.close()
      console.log(error.response.data)
      setError(error.response.data);
    });

  }

  function calculateAge(birthdate) {
    const today = new Date();
    const birthdateArr = birthdate.split('-');
    const birthdateDate = new Date(
      birthdateArr[0],
      birthdateArr[1] - 1,
      birthdateArr[2]
    );
    let age = today.getFullYear() - birthdateDate.getFullYear();
    const m = today.getMonth() - birthdateDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdateDate.getDate())) {
      age--;
    }
    return age;
  }



  const deleteUser = _id => {
    // console.log(_id);

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
          url: `/api/user/delete/${_id}`,
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
              fetchUser();
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

  const editUser = _id => {
    console.log(_id);
    Swal.fire({
      title: 'Loading!',
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
      method: "get",
      url: `/api/user/edit/${_id}`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    }).then(response => {
      Swal.close()
      setAllHealth(response.data.health);

      const healthList = response.data.checkhealth_user.map(function (checkhealth_users) {
        return checkhealth_users._id
      })
      setAllHealthProblem({
        health_problem: healthList
      });
      seteditCheckedItems({
        edithealth_id: healthList
      });


      setgetEditUserssss(response.data.user);
      // setProfilePreview({profile_preview: response.data.user.profile_picture.url == "" ? "https://res.cloudinary.com/du7wzlg44/image/upload/v1674065259/images_qselpk.jpg" : response.data.user.profile_picture.url})

      setProfilePreview({
        profile_preview: response.data.user && response.data.user.profile_picture && response.data.user.profile_picture.url
          ? response.data.user.profile_picture.url
          : "https://res.cloudinary.com/du7wzlg44/image/upload/v1674076161/No_valid_identification_has_been_submitted_1_azci4u.png"
      })


      setIdPreview({
        id_preview: response.data.user && response.data.user.valid_id && response.data.user.valid_id.url
          ? response.data.user.valid_id.url
          : "https://res.cloudinary.com/du7wzlg44/image/upload/v1674076161/No_valid_identification_has_been_submitted_1_azci4u.png"
      })
      // seteditHealth(response.data.health);

      handleeditShow()

    }).catch((err) => console.log(err));

  }


  const onChangeEditUser = e => {
    const { name, value } = e.target;
    if (e.target.name === 'profile_picture') {

      setProfileData(e.target.files[0])
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfilePreview({ profile_preview: reader.result })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else if (e.target.name === 'valid_id') {

      setProfileDataID(e.target.files[0])

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setIdPreview({ id_preview: reader.result })
        }
      }
      reader.readAsDataURL(e.target.files[0])

    } else if (e.target.name === 'birth_date') {
      const birthdate = e.target.value;
      const age = calculateAge(birthdate);
      setgetEditUserssss({ ...getEditUserssss, [e.target.name]: e.target.value, age });
    }
    else {
      setgetEditUserssss({
        ...getEditUserssss, [e.target.name]: e.target.value, address: {
          ...getEditUserssss.address, [e.target.name]: e.target.value
        }
      })

    }
  }


  const submitEdiUser = (_id) => {


    let formData = new FormData();

    formData.set("valid_id", profileDataID);
    formData.set("profile_picture", profileData);
    formData.set("first_name", getEditUserssss.first_name);
    formData.set("middle_name", getEditUserssss.middle_name);
    formData.set("last_name", getEditUserssss.last_name);
    formData.set("age", getEditUserssss.age);
    formData.set("gender", getEditUserssss.gender);
    formData.set("birth_date", getEditUserssss.birth_date);
    formData.set("house_purok_no", getEditUserssss.address?.house_purok_no);
    formData.set("street", getEditUserssss.address?.street);
    formData.set("barangay", getEditUserssss.address?.barangay);

    formData.set("user_name", getEditUserssss.user_name);
    formData.set("phone", getEditUserssss.phone);
    formData.set("email", getEditUserssss.email);
    formData.set("password", getEditUserssss.password);
    formData.set("confirmPassword", getEditUserssss.confirmPassword);
    formData.set("status", getEditUserssss.status);
    formData.set("account_verified", getEditUserssss.account_verified);

    for (var i = 0; i < checkededitItems?.edithealth_id.length; i++) {
      formData.append('health_id', checkededitItems.edithealth_id[i]);
    }

    Swal.fire({
      title: 'Loading!',
      text: 'Please wait while processing your new data.',
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
      method: "put",
      url: `/api/user/updateUser/${_id}`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      data: formData
    }).then(response => {
      Swal.close()
      handleEditClose()
      // // setLoadingss(true)
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
        user_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });

    }).catch(error => {
      Swal.close()
      console.log(error.response.data)
      setError(error.response.data);
    });

  };









  const { status } = statuss;
  const { role } = roless;
  const { barangay } = barangayss;
  const { account } = accountss;
  const { search } = searchss;

  // console.log(search);


  var pat = status === "" ? "" : '^' + status + '$';
  // var rolefilter = role === "" ? "" : role ;
  var accountfilter = account === "" ? "" : '^' + account + '$';
  // var accountbarangay = barangay === "" ? "" : barangay ;

  // console.log(accountfilter)

  const filteredUsers = getUsers?.filter(filterusers => {
    if (typeof filterusers.account_verified === "string"
      && typeof filterusers.first_name === "string" && typeof filterusers.last_name === "string"
    ) {
      const fullName = filterusers.first_name + ' ' + filterusers.last_name;
      if (barangay !== "" && filterusers.address?.barangay !== barangay) {
        return false
      }

      if (role !== "" && filterusers?.role !== role) {
        return false
      }


      return filterusers.account_verified.match(pat) && filterusers.role?.indexOf(role) !== -1
        && filterusers.status?.match(accountfilter) 
        && filterusers.address?.barangay.indexOf(barangay) !== -1
        && fullName.toLowerCase().indexOf(search) !== -1;
    }
  });



  const [pdfSrc, setPdfSrc] = useState(null);

  const downloadPDF = () => {
    PDFhandleShow()
    axios({
      method: "post",
      url: `/api/user/downloadPDF`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      data: JSON.stringify({ downloadPdf: filteredUsers }),
      responseType: 'blob'
    }).then(response => {
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(file);
      setPdfSrc(fileUrl);

      // download(response.data, 'USER.pdf', 'application/pdf');

    }).catch(error => {

      // console.log(error.response.data)
      //     setError(error.response.data);
    });
  };

  // const downloadPDF = () => {
  //   PDFhandleShow()
  //   setLoading({ loading: true})
  //   axios({
  //     method: "post",
  //     url: `/api/user/downloadPDF`,
  //     headers: {
  //       "Content-Type": "application/json",
  //             'Access-Control-Allow-Origin': '*',
  //             'Access-Control-Allow-Headers': '*',
  //     },
  //     data: JSON.stringify({ downloadPdf: filteredUsers }),
  //   }).then(response => {
  //     console.log(response)
  //     setPdfSrc(response.data.fileUrl);
  //     setLoading({ loading: false})
  //     // download(response.data, 'USER.pdf', 'application/pdf');

  //   }).catch(error => {

  //     // console.log(error.response.data)
  //     //     setError(error.response.data);
  //   });



  // };


  const [getLoading, setLoading] = useState({
    loading: true
  });

  const hideSpinner = () => {
    setLoading({
      loading: false
    });
  };





  //================================================================================================================





  const fetchUser = () => {
    axios({
      method: "get",
      url: `/api/user/read`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    }).then(response => {

      setgetUser(response.data.user);
      setAllHealth(response.data.health);
      setIsLoadingsss(false);
      
    }).catch((err) => console.log(err));
  };
  // console.log(AllHealthProblem)
  useEffect(() => {
    fetchUser();
  }, []);


  var data = {
    columns: ["ID", "Full Name", "Barangay", "Gender", "Email", "Role", "Verification Status", "Action"],
    rows: []
  }
  filteredUsers?.forEach(user => {
    data.rows.push([
      user._id,
      [user.last_name, ", ", user.first_name, ", ", user.middle_name]
      , user.address?.barangay ? user.address?.barangay : "none",
      user?.gender ? user?.gender : "none",
      user.email,
      user.role,
      user.account_verified == "not verified" ? <div className="redBg">
        <span>{user.account_verified}</span>
      </div>
        : user.account_verified == "pending" ? <div className="yellowBg">
          <span>{user.account_verified}</span>
        </div>
          : <div className="greenBg">
            <span>{user.account_verified}</span>
          </div>,


      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* <button className="btn btn-secondary py-1 px-2 ml-2" >
                        <i className="fas fa-eye"></i>
                        </button>&nbsp; */}
        <button onClick={() => editUser(user._id)} style={{ background: "orange", color: "#fff" }} className="btn btn-warning py-1 px-2 ml-2" >
          <i className="fas fa-pencil-alt"></i></button>&nbsp;
        <button onClick={() => deleteUser(user._id)} className="btn btn-danger py-1 px-2 ml-2" >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    ])
  })



  //checkbox--------------------------------------

  const [checkedItems, setCheckedItems] = useState({ health_id: [] });
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


  const editHealthhandleChangess = e => {
    const { value, checked } = e.target;

    const selectedCheckboxes = checkededitItems.edithealth_id;

    if (checked) {
      selectedCheckboxes.push(value);

      seteditCheckedItems({
        edithealth_id: selectedCheckboxes
      });
      // console.log(true);
    } else {
      seteditCheckedItems({
        edithealth_id: selectedCheckboxes.filter((e) => e !== value)
      });
      // console.log(false);
    }
    // seteditMedicalCert(e.target.files[0])
  };
  // console.log(checkededitItems);




  ////---------------- modal

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSelectUser({ user_type: "" })
    // setAnimalComment([]);
    // setAnimalImage([]);
  }
  const handleShow = () => setShow(true);

  const [editShow, seteditShow] = useState(false);
  const handleEditClose = () => {
    seteditShow(false);

    // setAnimalImage([]);
  }
  const handleeditShow = () => seteditShow(true);

  const [PDFshow, setPDFShow] = useState(false);
  const PDFhandleClose = () => {
    setPDFShow(false);
    setPdfSrc("")
    setLoading({
      loading: true
    });
  }
  const PDFhandleShow = () => setPDFShow(true);



  useEffect(() => {
    return () => {
      URL.revokeObjectURL(pdfSrc);
    };
  }, [pdfSrc]);

  const [isLoadingss, setIsLoadingsss] = useState(true);

  if(isLoadingss){
    return <>
    <Navbar toggle={toggle} />
    <AdminSideBar  isOpen={isOpen} toggle={toggle}/>

    <div class="container-fluid">
    <div style={contentStyle}>
      <br />
      <h1 style={{ color: "rgb(239, 58, 71)" }}><i class="fas fa-users"></i>&nbsp;User</h1>

      <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
      <hr />

      <SideBar setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} />

    <LoadingScreen />
    </div>
    </div>
    </>
   }  

  return (
    <>
    <Navbar toggle={toggle} />
    <AdminSideBar  isOpen={isOpen} toggle={toggle}/>

    <div class="container-fluid">
    <div style={contentStyle}>
      <br />
      <h1 style={{ color: "rgb(239, 58, 71)" }}><i class="fas fa-users"></i>&nbsp;User</h1>

      <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
      <hr />

      <SideBar setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} />

   
        <Button style={{ marginBottom: "10px" }} onClick={() => handleShow()}
          color="danger"><i className="fas fa-plus"></i>&nbsp;&nbsp;User</Button>
        {/* <Col>
         <button style={{marginTop: "10px", marginBottom: "10px"}} onClick={() => handleShow()} color="secondary" >&nbsp;&nbsp;
                                          <i className="fas fa-plus"></i>&nbsp;&nbsp; ADD USER</button>
        </Col> */}
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={<>
              {/* <h3>USER LIST</h3> */}
              <div style={{ display: "flex", flexDirection: "row" }}>

                <Button color="danger" onClick={downloadPDF} style={{ marginTop: "1vh", marginRight: "2vh" }}>&nbsp;<i class="fas fa-file-pdf"></i> Download &nbsp;</Button>

                <Button outline color="danger" onClick={onAll} style={{ marginTop: "1vh", marginRight: "2vh" }}>&nbsp;Reset&nbsp;</Button>

                <FormControl fullWidth={false} style={{ width: "17vh", marginRight: "2vh" }}>
                  <InputLabel color="secondary" shrink="true" variant="standard" htmlFor="uncontrolled-native">
                    Select Verification Status
                  </InputLabel>
                  <NativeSelect
                    onChange={onChangeStatus}
                    inputProps={{
                      name: 'status',
                      id: 'uncontrolled-native',
                    }}
                    color="secondary"
                    value={status}
                  >
                    <option value="" selected disabled> <em>Verification Status</em></option>
                    <option value="verified">Verified</option>
                    <option value="not verified">Not Verified</option>
                    <option value="pending">Pending</option>
                  </NativeSelect>
                </FormControl>
                <FormControl fullWidth={false} style={{width: "17vh", marginRight: "2vh"}}> 
                                      <InputLabel color="secondary" shrink="true"  variant="standard" htmlFor="uncontrolled-native">
                                       Select Activation Status
                                      </InputLabel>
                                      <NativeSelect
                                        onChange={onChangeAccount}
                                        inputProps={{
                                          name: 'account',
                                          id: 'uncontrolled-native',
                                        }}
                                        color="secondary"
                                        value={account}
                                      >
                                         <option value="" selected disabled> <em>Activation Status</em></option>
                                      <option value="active">Active</option>
                                      <option value="inactive">Not Active</option>
                                      <option value="restricted">Restricted</option>
                                    </NativeSelect>
                                  </FormControl>
                <FormControl fullWidth={false} style={{ width: "17vh", marginRight: "2vh" }}>
                  <InputLabel color="secondary" shrink="true" variant="standard" htmlFor="uncontrolled-native">
                    Select Role
                  </InputLabel>
                  <NativeSelect
                    onChange={onChangeRole}
                    inputProps={{
                      name: 'role',
                      id: 'uncontrolled-native',
                    }}
                    color="secondary"
                    value={role}
                  >
                    <option value="" selected disabled> <em>Role</em></option>
                    <option value="client">Client</option>
                    <option value="personnel">Personnel</option>
                    <option value="admin">Admin</option>
                  </NativeSelect>
                </FormControl>
                <FormControl fullWidth={false} style={{ width: "17vh", marginRight: "2vh" }}>
                  <InputLabel color="secondary" shrink="true" variant="standard" htmlFor="uncontrolled-native">
                    Select Barangay
                  </InputLabel>
                  <NativeSelect
                    onChange={onChangeBarangay}
                    inputProps={{
                      name: 'barangay',
                      id: 'uncontrolled-native',
                    }}
                    color="secondary"
                    value={barangay}
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

              </div>

            </>}
            data={data.rows}
            columns={data.columns}
            options={{
              filterType: "dropdown",
              responsive: "scroll",
              search: false,
              selectableRows: 'none',
              print: false,
              viewColumns: false,
              download: false,
              filter: false,
              customToolbar: () => (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <TextField
                    color="secondary"
                    label="Search Account Name"
                    onChange={onChangeSearch}
                    name='search'
                    value={search}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              ),

            }}
          />
        </ThemeProvider>




        <Modal size='xl' show={show} onHide={handleClose} animation={true}>
          <Modal.Header style={{ background: '#CE3043' }}>
            <Modal.Title style={{ color: '#ffff' }}>Create eAlaga Account</Modal.Title>
          </Modal.Header>
          {getSelectUser.user_type == "" ?
            <>
              <TextWrapper>
                <ServicesH1>Select a User
                  <h6 style={{ color: "black" }}>Choose from a list of Clients, Personnel, or Administrator</h6>
                </ServicesH1>
              </TextWrapper>
              <ServicesWrappers3>
                <ServicesCard3
                  onClick={() => { setSelectUser({ user_type: "client" }); }}
                >
                  <ServicesIcon src={image1} />
                  <ServicesH2>Client/Elderly</ServicesH2>
                </ServicesCard3>
                <ServicesCard3
                  onClick={() => { setSelectUser({ user_type: "personnel" }); }}
                >
                  <ServicesIcon src={image2} />
                  <ServicesH2>Personnel</ServicesH2>
                </ServicesCard3>

                <ServicesCard3
                  onClick={() => { setSelectUser({ user_type: "administrator" }); }}
                >
                  <ServicesIcon src={image3} />
                  <ServicesH2>Administrator</ServicesH2>
                </ServicesCard3>
              </ServicesWrappers3>
            </>
            : getSelectUser.user_type == "client" ? <>
              <Modal.Body style={{ background: '#ffff' }}>
                <TextWrapper>
                  <AppTitle>
                    <h1>Client / Elderly Personal Information</h1>
                  </AppTitle>
                </TextWrapper>

                <Row>
                  <Col>  <TextField fullWidth color="secondary" InputLabelProps={{ required: true }} name="first_name" onChange={onChangeAddUser} value={getUserssss.first_name} label="Firstname" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.first_name}</InputLabel>
                  </Col>
                  <Col>  <TextField fullWidth color="secondary" id="middle_name" InputLabelProps={{ required: true }} name="middle_name" onChange={onChangeAddUser} value={getUserssss.middle_name} label="Middlename" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.middle_name}</InputLabel>
                  </Col>
                  <Col>  <TextField fullWidth color="secondary" id="last_name" InputLabelProps={{ required: true }} name="last_name" onChange={onChangeAddUser} value={getUserssss.last_name} label="Lastname" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.last_name}</InputLabel>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col>  <TextField fullWidth color="secondary" InputLabelProps={{ shrink: true, required: true }} type="date" id="birth_date" name="birth_date" onChange={onChangeAddUser} value={getUserssss.birth_date} label="Birthdate" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.birth_date}</InputLabel>
                  </Col>
                  <Col>
                    <TextField fullWidth color="secondary" type="number" id="age"
                      InputLabelProps={{ disabled: true, shrink: true, required: true }} disabled name="age" onChange={onChangeAddUser} value={!getUserssss.age ? 0 : getUserssss.age} label="Age" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.age}</InputLabel>
                  </Col>

                  <Col>   <FormControl>
                    <FormLabel color="secondary" id="demo-row-radio-buttons-group-label">Gender*</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="gender"
                      onChange={onChangeAddUser}
                    >
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />

                    </RadioGroup>
                  </FormControl>
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.gender}</InputLabel>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col>  <TextField fullWidth color="secondary" id="house_purok_no" InputLabelProps={{ required: true }} name="house_purok_no" onChange={onChangeAddUser} value={getUserssss.address?.house_purok_no} label="House No/ Purok No" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.house_purok_no}</InputLabel>
                  </Col>
                  <Col>  <TextField fullWidth color="secondary" id="street" InputLabelProps={{ required: true }} name="street" onChange={onChangeAddUser} value={getUserssss.address?.street} label="Street" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.street}</InputLabel>
                  </Col>
                  <Col>    <FormControl fullWidth>
                    <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                      Barangay*
                    </InputLabel>
                    <NativeSelect
                      onChange={onChangeAddUser}
                      inputProps={{
                        name: 'barangay',
                        id: 'uncontrolled-native',
                        required: true
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
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.barangay}</InputLabel>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col>
                    <InputLabel>Upload New Profile Pic*</InputLabel>
                    <TextField type="file" onChange={onChangeAddUser} inputProps={{ accept: "image/*" }} name="profile_picture" color="secondary" fullWidth id="fullName" />
                    {!profileeditPreview ? "" :
                      <div className="image-frameProfile2">
                        <img src={profileeditPreview} title="Night-life" alt="Night-life" />
                      </div>
                    }
                    <br></br><br></br>
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.profile_picture}</InputLabel>
                  </Col>
                  <Col>
                    <InputLabel>Upload Valid ID*</InputLabel>
                    <TextField type="file" onChange={onChangeAddUser} inputProps={{ accept: "image/*" }} name="valid_id" color="secondary" fullWidth id="fullName" />
                    {!editIdPreview ? "" :
                      <div className="image-frameProfile2">
                        <img src={editIdPreview} title="Night-life" alt="Night-life" />
                      </div>
                    }
                    <br></br><br></br>
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.valid_id}</InputLabel>
                  </Col>

                </Row>
                <br></br>
                <TextWrapper>
                  <AppTitle>
                    <h1>Credentials</h1>
                  </AppTitle>
                </TextWrapper>

                <Row>
                  <Col>  <TextField fullWidth color="secondary" onChange={onChangeAddUser} InputLabelProps={{ required: true }} name="email" value={getUserssss.email} label="Email" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.email}</InputLabel>
                  </Col>
                  <Col>  <TextField fullWidth color="secondary" onChange={onChangeAddUser} id="user_name" InputLabelProps={{ required: true }} name="user_name" value={getUserssss.user_name} label="Username" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.user_name}</InputLabel>
                  </Col>
                  <Col>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h1 style={{ color: "red", "font-size": "1.05rem", marginTop: "20.4px" }}>+63</h1>&nbsp;
                      <TextField fullWidth color="secondary" type="number" onChange={onChangeAddUser} id="phone" inputProps={{ maxLength: 10 }} InputLabelProps={{ required: true }} name="phone" value={getUserssss.phone} label="ContactNumber" />

                    </div>
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.phone}</InputLabel>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col>  <TextField fullWidth color="secondary" onChange={onChangeAddUser} InputLabelProps={{ required: true }} name="password" value={getUserssss.password} label="Password" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.password}</InputLabel>
                  </Col>
                  <Col>  <TextField fullWidth color="secondary" onChange={onChangeAddUser} id="middle_name" InputLabelProps={{ required: true }} name="confirmPassword" value={getUserssss.confirmPassword} label="ConfirmPassword" />
                    <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.confirmPassword}</InputLabel>
                  </Col>

                </Row>
                <br></br>

                {/* <TextWrapper>
                              <AppTitle>
                                <h1>Health Information</h1>
                              </AppTitle>
                            </TextWrapper>   */}

                <Row>
                  <Col className="d-flex justify-content-center">
                    <div className='scrolls'>
                      <TextWrapper>
                        <AppTitle>
                          <h1>Health Disclosure</h1>
                        </AppTitle>
                      </TextWrapper>
                      <div className="searchHealth">
                        <TextField fullWidth color="secondary" name="first_name" InputProps={{ disableUnderline: true }} label="Search here..." />
                      </div>
                      <div className='scroll'>
                        <TextWrapper>
                          <AppTitle>
                            <h2>Leave if none</h2>
                          </AppTitle>
                        </TextWrapper>
                        {AllHealth?.map(health => {
                          return <Form.Check
                            key={health._id}
                            inline1
                            label={health.health_problem}
                            name='_id'
                            type="checkbox"
                            style={{ fontSize: "1.1rem" }}
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

                <InputLabel className="d-flex justify-content-center" style={{ color: "red", "font-size": "0.8rem", marginBottom: "-10px", marginTop: "20px" }}>{error.confirm}</InputLabel>
                <BtnWrap2 >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button outline onClick={() => { setSelectUser({ user_type: "" }); }} color="danger"><i class="fas fa-arrow-left"></i>&nbsp;Back</Button> &nbsp; &nbsp;
                    <Button outline onClick={() => submitAddUser()} color="danger"><i class="fas fa-file"></i>&nbsp;SUBMIT</Button>
                  </div>
                </BtnWrap2>

              </Modal.Body>
            </>
              : getSelectUser.user_type == "personnel" ? <>
                <Modal.Body style={{ background: '#ffff' }}>
                  <TextWrapper>
                    <AppTitle>
                      <h1>Personnel Personal Information</h1>
                    </AppTitle>
                  </TextWrapper>

                  <Row>
                    <Col>  <TextField fullWidth color="secondary" InputLabelProps={{ required: true }} name="first_name" onChange={onChangeAddUser} value={getUserssss.first_name} label="Firstname" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.first_name}</InputLabel>
                    </Col>
                    <Col>  <TextField fullWidth color="secondary" id="middle_name" InputLabelProps={{ required: true }} name="middle_name" onChange={onChangeAddUser} value={getUserssss.middle_name} label="Middlename" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.middle_name}</InputLabel>
                    </Col>
                    <Col>  <TextField fullWidth color="secondary" id="last_name" InputLabelProps={{ required: true }} name="last_name" onChange={onChangeAddUser} value={getUserssss.last_name} label="Lastname" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.last_name}</InputLabel>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>  <TextField fullWidth color="secondary" InputLabelProps={{ shrink: true, required: true }} type="date" id="birth_date" name="birth_date" onChange={onChangeAddUser} value={getUserssss.birth_date} label="Birthdate" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.birth_date}</InputLabel>
                    </Col>
                    <Col>
                      <TextField fullWidth color="secondary" type="number" id="age"
                        InputLabelProps={{ disabled: true, shrink: true, required: true }} disabled name="age" onChange={onChangeAddUser} value={!getUserssss.age ? 0 : getUserssss.age} label="Age" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.age}</InputLabel>
                    </Col>

                    <Col>   <FormControl>
                      <FormLabel color="secondary" id="demo-row-radio-buttons-group-label">Gender*</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                        onChange={onChangeAddUser}
                      >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />

                      </RadioGroup>
                    </FormControl>
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.gender}</InputLabel>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>  <TextField fullWidth color="secondary" id="house_purok_no" InputLabelProps={{ required: true }} name="house_purok_no" onChange={onChangeAddUser} value={getUserssss.address?.house_purok_no} label="House No/ Purok No" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.house_purok_no}</InputLabel>
                    </Col>
                    <Col>  <TextField fullWidth color="secondary" id="street" InputLabelProps={{ required: true }} name="street" onChange={onChangeAddUser} value={getUserssss.address?.street} label="Street" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.street}</InputLabel>
                    </Col>
                    <Col>    <FormControl fullWidth>
                      <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                        Barangay*
                      </InputLabel>
                      <NativeSelect
                        onChange={onChangeAddUser}
                        inputProps={{
                          name: 'barangay',
                          id: 'uncontrolled-native',
                          required: true
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
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.barangay}</InputLabel>
                    </Col>
                  </Row>


                  <br></br>
                  <TextWrapper>
                    <AppTitle>
                      <h1>Credentials</h1>
                    </AppTitle>
                  </TextWrapper>

                  <Row>
                    <Col>
                      <InputLabel>Upload New Profile Pic*</InputLabel>
                      <TextField type="file" onChange={onChangeAddUser} inputProps={{ accept: "image/*" }} name="profile_picture" color="secondary" fullWidth id="fullName" />
                      {!profileeditPreview ? "" :
                        <div className="image-frameProfile2">
                          <img src={profileeditPreview} title="Night-life" alt="Night-life" />
                        </div>
                      }
                      <br></br><br></br>
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.profile_picture}</InputLabel>
                    </Col>

                    <Col>  <TextField fullWidth color="secondary" onChange={onChangeAddUser} InputLabelProps={{ required: true }} name="email" value={getUserssss.email} label="Email" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.email}</InputLabel>
                    </Col>
                    <Col>  <TextField fullWidth color="secondary" onChange={onChangeAddUser} id="user_name" InputLabelProps={{ required: true }} name="user_name" value={getUserssss.user_name} label="Username" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.user_name}</InputLabel>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h1 style={{ color: "red", "font-size": "1.05rem", marginTop: "20.4px" }}>+63</h1>&nbsp;
                        <TextField fullWidth color="secondary" type="number" onChange={onChangeAddUser} id="phone" inputProps={{ maxLength: 10 }} InputLabelProps={{ required: true }} name="phone" value={getUserssss.phone} label="ContactNumber" />

                      </div>
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.phone}</InputLabel>
                    </Col>
                    <Col>  <TextField fullWidth color="secondary" onChange={onChangeAddUser} InputLabelProps={{ required: true }} name="password" value={getUserssss.password} label="Password" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.password}</InputLabel>
                    </Col>
                    <Col>  <TextField fullWidth color="secondary" onChange={onChangeAddUser} id="middle_name" InputLabelProps={{ required: true }} name="confirmPassword" value={getUserssss.confirmPassword} label="ConfirmPassword" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.confirmPassword}</InputLabel>
                    </Col>

                  </Row>

                  <InputLabel className="d-flex justify-content-center" style={{ color: "red", "font-size": "0.8rem", marginBottom: "-10px", marginTop: "20px" }}>{error.confirm}</InputLabel>
                  <BtnWrap2 >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Button outline onClick={() => { setSelectUser({ user_type: "" }); }} color="danger"><i class="fas fa-arrow-left"></i>&nbsp;Back</Button> &nbsp; &nbsp;
                      <Button outline onClick={() => submitAddUser()} color="danger"><i class="fas fa-file"></i>&nbsp;SUBMIT</Button>
                    </div>
                  </BtnWrap2>

                </Modal.Body>
              </>
                :
                <>
                  <Modal.Body style={{ background: '#ffff' }}>
                    <TextWrapper>
                      <AppTitle>
                        <h1>Administrator Personal Information</h1>
                      </AppTitle>
                    </TextWrapper>

                    <Row>
                      <Col>  <TextField fullWidth color="secondary" InputLabelProps={{ required: true }} name="first_name" onChange={onChangeAddUser} value={getUserssss.first_name} label="Firstname" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.first_name}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" id="middle_name" InputLabelProps={{ required: true }} name="middle_name" onChange={onChangeAddUser} value={getUserssss.middle_name} label="Middlename" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.middle_name}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" id="last_name" InputLabelProps={{ required: true }} name="last_name" onChange={onChangeAddUser} value={getUserssss.last_name} label="Lastname" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.last_name}</InputLabel>
                      </Col>
                    </Row>
                    <br></br>

                    <TextWrapper>
                      <AppTitle>
                        <h1>Credentials</h1>
                      </AppTitle>
                    </TextWrapper>

                    <Row>
                      <Col>  <TextField fullWidth color="secondary" onChange={onChangeAddUser} InputLabelProps={{ required: true }} name="email" value={getUserssss.email} label="Email" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.email}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" onChange={onChangeAddUser} id="user_name" InputLabelProps={{ required: true }} name="user_name" value={getUserssss.user_name} label="Username" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.user_name}</InputLabel>
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col>  <TextField fullWidth color="secondary" onChange={onChangeAddUser} InputLabelProps={{ required: true }} name="password" value={getUserssss.password} label="Password" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.password}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" onChange={onChangeAddUser} id="middle_name" InputLabelProps={{ required: true }} name="confirmPassword" value={getUserssss.confirmPassword} label="ConfirmPassword" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.confirmPassword}</InputLabel>
                      </Col>

                    </Row>

                    <InputLabel className="d-flex justify-content-center" style={{ color: "red", "font-size": "0.8rem", marginBottom: "-10px", marginTop: "20px" }}>{error.confirm}</InputLabel>
                    <BtnWrap2 >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Button outline onClick={() => { setSelectUser({ user_type: "" }); }} color="danger"><i class="fas fa-arrow-left"></i>&nbsp;Back</Button> &nbsp; &nbsp;
                        <Button outline onClick={() => submitAddUser()} color="danger"><i class="fas fa-file"></i>&nbsp;SUBMIT</Button>
                      </div>
                    </BtnWrap2>

                  </Modal.Body>
                </>
          }


          <Modal.Footer style={{ background: 'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))' }}>
            <Button style={{ background: '#EF3A47', color: 'white' }} variant="light" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>




        <Modal size='xl' show={editShow} onHide={handleEditClose} animation={true}>
          <Modal.Header style={{ background: '#CE3043' }}>
            <Modal.Title style={{ color: '#ffff' }}>Update eAlaga Account</Modal.Title>
          </Modal.Header>

          {
            getEditUserssss?.role == "client" ?
              <>
                <Modal.Body style={{ background: '#ffff' }}>
                  <TextWrapper>
                    <AppTitle>
                      <h1>Account Status</h1>
                    </AppTitle>
                  </TextWrapper>
                  {/* <Row md={3} className="justify-content-md-center"> */}
                  <Row>
                    <Col>    <FormControl fullWidth>
                      <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                        Verification Status
                      </InputLabel>
                      <NativeSelect
                        key={getEditUserssss?.account_verified ? 'notLoadedYet' : 'loaded'}
                        style={{ fontWeight: "bold", color: getEditUserssss?.account_verified == "not verified" ? 'red' : getEditUserssss?.account_verified == "pending" ? 'rgb(255 161 45)' : 'green' }}
                        defaultValue={getEditUserssss?.account_verified}
                        onChange={onChangeEditUser}
                        inputProps={{
                          name: 'account_verified',
                          id: 'uncontrolled-native',
                          required: true
                        }}
                        color="secondary"
                      >
                        <option value="" selected disabled> <em>Select Verification Status</em></option>
                        <option style={{ color: 'black' }} value="not verified">Not Verified</option>
                        <option style={{ color: 'black' }} value="pending">Pending</option>
                        <option style={{ color: 'black' }} value="verified">Verified</option>
                      </NativeSelect>
                    </FormControl>

                    </Col>
                    <Col>    <FormControl fullWidth>
                      <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                        Activation Status
                      </InputLabel>
                      <NativeSelect
                        key={getEditUserssss?.status ? 'notLoadedYet' : 'loaded'}
                        style={{ fontWeight: "bold", color: getEditUserssss?.status == "active" ? 'green' : 'red' }}
                        defaultValue={getEditUserssss?.status}
                        onChange={onChangeEditUser}
                        inputProps={{
                          name: 'status',
                          id: 'uncontrolled-native',
                          required: true
                        }}
                        color="secondary"
                      >
                        <option value="" selected disabled> <em>Select Activation Status</em></option>
                        <option style={{ color: 'black' }} value="active">Active</option>
                        <option style={{ color: 'black' }} value="restricted">Restricted</option>
                        <option style={{ color: 'black' }} value="inactive">Not Active</option>
                      </NativeSelect>
                    </FormControl>
                    </Col>
                    <Col>  <TextField fullWidth disabled color="secondary" name="first_name" onChange={onChangeEditUser} value={getEditUserssss?.role} label="Role" />

                    </Col>
                  </Row>
                  <br></br>  <br></br>

                  <TextWrapper>
                    <AppTitle>
                      <h1>Personal Information</h1>
                    </AppTitle>
                  </TextWrapper>

                  <Row>
                    <Col>  <TextField fullWidth color="secondary" InputLabelProps={{ required: true }} name="first_name" onChange={onChangeEditUser} value={getEditUserssss?.first_name} label="Firstname" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.first_name}</InputLabel>
                    </Col>
                    <Col>  <TextField fullWidth color="secondary" id="middle_name" InputLabelProps={{ required: true }} name="middle_name" onChange={onChangeEditUser} value={getEditUserssss?.middle_name} label="Middlename" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.middle_name}</InputLabel>
                    </Col>
                    <Col>  <TextField fullWidth color="secondary" id="last_name" InputLabelProps={{ required: true }} name="last_name" onChange={onChangeEditUser} value={getEditUserssss?.last_name} label="Lastname" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.last_name}</InputLabel>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>  <TextField fullWidth color="secondary" InputLabelProps={{ shrink: true, required: true }} type="date" id="birth_date" name="birth_date" onChange={onChangeEditUser} value={!getEditUserssss?.birth_date ? "" : getEditUserssss?.birth_date.substring(0, 10)} label="Birthdate" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.birth_date}</InputLabel>
                    </Col>
                    <Col>
                      <TextField fullWidth color="secondary" type="number" id="age"
                        InputLabelProps={{ disabled: true, shrink: true, required: true }} disabled name="age" onChange={onChangeEditUser} value={!getEditUserssss?.age ? 0 : getEditUserssss?.age} label="Age" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.age}</InputLabel>
                    </Col>

                    <Col>   <FormControl>
                      <FormLabel color="secondary" id="demo-row-radio-buttons-group-label">Gender*</FormLabel>
                      <RadioGroup
                        defaultValue={getEditUserssss?.gender}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                        onChange={onChangeEditUser}
                      >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />

                      </RadioGroup>
                    </FormControl>
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.gender}</InputLabel>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>  <TextField fullWidth color="secondary" id="house_purok_no" InputLabelProps={{ required: true }} name="house_purok_no" onChange={onChangeEditUser} value={getEditUserssss?.address?.house_purok_no} label="House No/ Purok No" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.house_purok_no}</InputLabel>
                    </Col>
                    <Col>  <TextField fullWidth color="secondary" id="street" InputLabelProps={{ required: true }} name="street" onChange={onChangeEditUser} value={getEditUserssss?.address?.street} label="Street" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.street}</InputLabel>
                    </Col>
                    <Col>    <FormControl fullWidth>
                      <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                        Barangay*
                      </InputLabel>
                      <NativeSelect
                        key={getEditUserssss?.address?.barangay ? 'notLoadedYet' : 'loaded'}

                        defaultValue={getEditUserssss?.address?.barangay}
                        onChange={onChangeEditUser}
                        inputProps={{
                          name: 'barangay',
                          id: 'uncontrolled-native',
                          required: true
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
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.barangay}</InputLabel>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>
                      <InputLabel>Upload New Profile Pic*</InputLabel>
                      <TextField type="file" onChange={onChangeEditUser} inputProps={{ accept: "image/*" }} name="profile_picture" color="secondary" fullWidth id="fullName" />
                      {!profilePreview.profile_preview ? "" :
                        <div className="image-frameProfile2">
                          <img src={profilePreview?.profile_preview} title="profile-picture" alt="profile-picture" />
                        </div>
                      }
                      <br></br><br></br>
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.profile_picture}</InputLabel>
                    </Col>
                    <Col>
                      <InputLabel>Upload Valid ID*</InputLabel>
                      <TextField type="file" onChange={onChangeEditUser} inputProps={{ accept: "image/*" }} name="valid_id" color="secondary" fullWidth id="fullName" />
                      {!IdPreview?.id_preview ? "" :
                        <div className="image-frameProfile2">
                          <Zoom>
                            <img src={IdPreview?.id_preview} title="valid-id" alt="valid-id" />
                          </Zoom>
                        </div>
                      }
                      <br></br><br></br>
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.valid_id}</InputLabel>
                    </Col>

                  </Row>
                  <br></br>
                  <TextWrapper>
                    <AppTitle>
                      <h1>Credentials</h1>
                    </AppTitle>
                  </TextWrapper>

                  <Row>
                    <Col>  <TextField fullWidth color="secondary" onChange={onChangeEditUser} InputLabelProps={{ required: true }} name="email" value={getEditUserssss?.email} label="Email" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.email}</InputLabel>
                    </Col>
                    <Col>  <TextField fullWidth color="secondary" onChange={onChangeEditUser} id="user_name" InputLabelProps={{ required: true }} name="user_name" value={getEditUserssss?.user_name} label="Username" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.user_name}</InputLabel>
                    </Col>
                    <Col>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h1 style={{ color: "red", "font-size": "1.05rem", marginTop: "20.4px" }}>+63</h1>&nbsp;
                        <TextField fullWidth color="secondary" type="number" onChange={onChangeEditUser} id="phone" inputProps={{ maxLength: 10 }} InputLabelProps={{ required: true }} name="phone" value={getEditUserssss?.phone} label="ContactNumber" />

                      </div>
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.phone}</InputLabel>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>  <TextField fullWidth color="secondary" onChange={onChangeEditUser} InputLabelProps={{ required: true }} name="password" value={getEditUserssss.password} label="Password" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.password}</InputLabel>
                    </Col>
                    <Col>  <TextField fullWidth color="secondary" onChange={onChangeEditUser} id="middle_name" InputLabelProps={{ required: true }} name="confirmPassword" value={getEditUserssss.confirmPassword} label="ConfirmPassword" />
                      <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.confirmPassword}</InputLabel>
                    </Col>

                  </Row>
                  <br></br>

                  {/* <TextWrapper>
                              <AppTitle>
                                <h1>Health Information</h1>
                              </AppTitle>
                            </TextWrapper>   */}

                  <Row>
                    <Col className="d-flex justify-content-center">
                      <div className='scrolls'>
                        <TextWrapper>
                          <AppTitle>
                            <h1>Health Problem</h1>
                          </AppTitle>
                        </TextWrapper>
                        <div className="searchHealth">
                          <TextField fullWidth color="secondary" name="first_name" InputProps={{ disableUnderline: true }} label="Search here..." />
                        </div>
                        <div className='scroll'>
                          <TextWrapper>
                            <AppTitle>
                              <h2>Leave if none</h2>
                            </AppTitle>
                          </TextWrapper>
                          {AllHealth?.map(health => {
                            return <Form.Check
                              key={health._id}
                              inline1
                              label={health.health_problem}
                              name={health._id}
                              type="checkbox"
                              style={{ fontSize: "1.1rem" }}
                              value={health._id}
                              defaultChecked={
                                AllHealthProblem.health_problem.includes(health._id)
                                // console.log(AllHealthProblem.health_problem)
                              }
                              onChange={editHealthhandleChangess}
                            />
                          })
                          }


                        </div>
                      </div>
                    </Col>
                  </Row>

                  <InputLabel className="d-flex justify-content-center" style={{ color: "red", "font-size": "0.8rem", marginBottom: "-10px", marginTop: "20px" }}>{error.confirm}</InputLabel>
                  <BtnWrap2 >
                    <Button outline onClick={() => submitEdiUser(getEditUserssss._id)} color="danger"><i class="fas fa-file"></i>&nbsp;SUBMIT</Button>
                  </BtnWrap2>

                </Modal.Body>
              </>
              :
              getEditUserssss?.role == "personnel" ?
                <>
                  <Modal.Body style={{ background: '#ffff' }}>
                    <TextWrapper>
                      <AppTitle>
                        <h1>Account Status</h1>
                      </AppTitle>
                    </TextWrapper>
                    {/* <Row md={3} className="justify-content-md-center"> */}
                    <Row>
                      <Col>    <FormControl fullWidth>
                        <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                          Verification Status
                        </InputLabel>
                        <NativeSelect
                          key={getEditUserssss?.account_verified ? 'notLoadedYet' : 'loaded'}
                          style={{ fontWeight: "bold", color: getEditUserssss?.account_verified == "not verified" ? 'red' : getEditUserssss?.account_verified == "pending" ? 'rgb(255 161 45)' : 'green' }}
                          defaultValue={getEditUserssss?.account_verified}
                          onChange={onChangeEditUser}
                          inputProps={{
                            name: 'account_verified',
                            id: 'uncontrolled-native',
                            required: true
                          }}
                          color="secondary"
                        >
                          <option value="" selected disabled> <em>Select Verification Status</em></option>
                          <option style={{ color: 'black' }} value="not verified">Not Verified</option>
                          <option style={{ color: 'black' }} value="pending">Pending</option>
                          <option style={{ color: 'black' }} value="verified">Verified</option>
                        </NativeSelect>
                      </FormControl>

                      </Col>
                      <Col>    <FormControl fullWidth>
                        <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                          Activation Status
                        </InputLabel>
                        <NativeSelect
                          key={getEditUserssss?.status ? 'notLoadedYet' : 'loaded'}
                          style={{ fontWeight: "bold", color: getEditUserssss?.status == "inactive" ? 'red' : 'green' }}
                          defaultValue={getEditUserssss?.status}
                          onChange={onChangeEditUser}
                          inputProps={{
                            name: 'status',
                            id: 'uncontrolled-native',
                            required: true
                          }}
                          color="secondary"
                        >
                          <option value="" selected disabled> <em>Select Activation Status</em></option>
                          <option style={{ color: 'black' }} value="active">Active</option>
                          <option style={{ color: 'black' }} value="inactive">Not Active</option>
                        </NativeSelect>
                      </FormControl>
                      </Col>
                      <Col>  <TextField fullWidth disabled color="secondary" name="first_name" onChange={onChangeEditUser} value={getEditUserssss?.role} label="Role" />

                      </Col>
                    </Row>
                    <br></br>  <br></br>

                    <TextWrapper>
                      <AppTitle>
                        <h1>Personal Information</h1>
                      </AppTitle>
                    </TextWrapper>

                    <Row>
                      <Col>  <TextField fullWidth color="secondary" InputLabelProps={{ required: true }} name="first_name" onChange={onChangeEditUser} value={getEditUserssss?.first_name} label="Firstname" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.first_name}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" id="middle_name" InputLabelProps={{ required: true }} name="middle_name" onChange={onChangeEditUser} value={getEditUserssss?.middle_name} label="Middlename" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.middle_name}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" id="last_name" InputLabelProps={{ required: true }} name="last_name" onChange={onChangeEditUser} value={getEditUserssss?.last_name} label="Lastname" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.last_name}</InputLabel>
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col>  <TextField fullWidth color="secondary" InputLabelProps={{ shrink: true, required: true }} type="date" id="birth_date" name="birth_date" onChange={onChangeEditUser} value={!getEditUserssss?.birth_date ? "" : getEditUserssss?.birth_date.substring(0, 10)} label="Birthdate" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.birth_date}</InputLabel>
                      </Col>
                      <Col>
                        <TextField fullWidth color="secondary" type="number" id="age"
                          InputLabelProps={{ disabled: true, shrink: true, required: true }} disabled name="age" onChange={onChangeEditUser} value={!getEditUserssss?.age ? 0 : getEditUserssss?.age} label="Age" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.age}</InputLabel>
                      </Col>

                      <Col>   <FormControl>
                        <FormLabel color="secondary" id="demo-row-radio-buttons-group-label">Gender*</FormLabel>
                        <RadioGroup
                          defaultValue={getEditUserssss?.gender}
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="gender"
                          onChange={onChangeEditUser}
                        >
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="female" control={<Radio />} label="Female" />

                        </RadioGroup>
                      </FormControl>
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.gender}</InputLabel>
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col>  <TextField fullWidth color="secondary" id="house_purok_no" InputLabelProps={{ required: true }} name="house_purok_no" onChange={onChangeEditUser} value={getEditUserssss?.address?.house_purok_no} label="House No/ Purok No" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.house_purok_no}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" id="street" InputLabelProps={{ required: true }} name="street" onChange={onChangeEditUser} value={getEditUserssss?.address?.street} label="Street" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.street}</InputLabel>
                      </Col>
                      <Col>    <FormControl fullWidth>
                        <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                          Barangay*
                        </InputLabel>
                        <NativeSelect
                          key={getEditUserssss?.address?.barangay ? 'notLoadedYet' : 'loaded'}

                          defaultValue={getEditUserssss?.address?.barangay}
                          onChange={onChangeEditUser}
                          inputProps={{
                            name: 'barangay',
                            id: 'uncontrolled-native',
                            required: true
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
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.barangay}</InputLabel>
                      </Col>
                    </Row>
                    <br></br>
                    <TextWrapper>
                      <AppTitle>
                        <h1>Credentials</h1>
                      </AppTitle>
                    </TextWrapper>

                    <Row>
                      <Col>
                        <InputLabel>Upload New Profile Pic*</InputLabel>
                        <TextField type="file" onChange={onChangeEditUser} inputProps={{ accept: "image/*" }} name="profile_picture" color="secondary" fullWidth id="fullName" />
                        {!profilePreview.profile_preview ? "" :
                          <div className="image-frameProfile2">
                            <img src={profilePreview?.profile_preview} title="profile-picture" alt="profile-picture" />
                          </div>
                        }
                        <br></br><br></br>
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.profile_picture}</InputLabel>
                      </Col>

                      <Col>  <TextField fullWidth color="secondary" onChange={onChangeEditUser} InputLabelProps={{ required: true }} name="email" value={getEditUserssss?.email} label="Email" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.email}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" onChange={onChangeEditUser} id="user_name" InputLabelProps={{ required: true }} name="user_name" value={getEditUserssss?.user_name} label="Username" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.user_name}</InputLabel>
                      </Col>

                    </Row>
                    <br></br>
                    <Row>
                      <Col>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <h1 style={{ color: "red", "font-size": "1.05rem", marginTop: "20.4px" }}>+63</h1>&nbsp;
                          <TextField fullWidth color="secondary" type="number" onChange={onChangeEditUser} id="phone" inputProps={{ maxLength: 10 }} InputLabelProps={{ required: true }} name="phone" value={getEditUserssss?.phone} label="ContactNumber" />

                        </div>
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.phone}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" onChange={onChangeEditUser} InputLabelProps={{ required: true }} name="password" value={getEditUserssss.password} label="Password" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.password}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" onChange={onChangeEditUser} id="middle_name" InputLabelProps={{ required: true }} name="confirmPassword" value={getEditUserssss.confirmPassword} label="ConfirmPassword" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.confirmPassword}</InputLabel>
                      </Col>

                    </Row>
                    <br></br>

                    {/* <TextWrapper>
                              <AppTitle>
                                <h1>Health Information</h1>
                              </AppTitle>
                            </TextWrapper>   */}



                    <InputLabel className="d-flex justify-content-center" style={{ color: "red", "font-size": "0.8rem", marginBottom: "-10px", marginTop: "20px" }}>{error.confirm}</InputLabel>
                    <BtnWrap2 >
                      <Button outline onClick={() => submitEdiUser(getEditUserssss._id)} color="danger"><i class="fas fa-file"></i>&nbsp;SUBMIT</Button>
                    </BtnWrap2>

                  </Modal.Body>
                </>
                :
                <>
                  <Modal.Body style={{ background: '#ffff' }}>
                    <TextWrapper>
                      <AppTitle>
                        <h1>Account Status</h1>
                      </AppTitle>
                    </TextWrapper>
                    {/* <Row md={3} className="justify-content-md-center"> */}
                    <Row>
                      <Col>    <FormControl fullWidth>
                        <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                          Verification Status
                        </InputLabel>
                        <NativeSelect
                          key={getEditUserssss?.account_verified ? 'notLoadedYet' : 'loaded'}
                          style={{ fontWeight: "bold", color: getEditUserssss?.account_verified == "not verified" ? 'red' : getEditUserssss?.account_verified == "pending" ? 'rgb(255 161 45)' : 'green' }}
                          defaultValue={getEditUserssss?.account_verified}
                          onChange={onChangeEditUser}
                          inputProps={{
                            name: 'account_verified',
                            id: 'uncontrolled-native',
                            required: true
                          }}
                          color="secondary"
                        >
                          <option value="" selected disabled> <em>Select Verification Status</em></option>
                          <option style={{ color: 'black' }} value="not verified">Not Verified</option>
                          <option style={{ color: 'black' }} value="pending">Pending</option>
                          <option style={{ color: 'black' }} value="verified">Verified</option>
                        </NativeSelect>
                      </FormControl>

                      </Col>
                      <Col>    <FormControl fullWidth>
                        <InputLabel shrink="true" color="secondary" variant="standard" htmlFor="uncontrolled-native">
                          Activation Status
                        </InputLabel>
                        <NativeSelect
                          key={getEditUserssss?.status ? 'notLoadedYet' : 'loaded'}
                          style={{ fontWeight: "bold", color: getEditUserssss?.status == "inactive" ? 'red' : 'green' }}
                          defaultValue={getEditUserssss?.status}
                          onChange={onChangeEditUser}
                          inputProps={{
                            name: 'status',
                            id: 'uncontrolled-native',
                            required: true
                          }}
                          color="secondary"
                        >
                          <option value="" selected disabled> <em>Select Activation Status</em></option>
                          <option style={{ color: 'black' }} value="active">Active</option>
                          <option style={{ color: 'black' }} value="inactive">Not Active</option>
                        </NativeSelect>
                      </FormControl>
                      </Col>
                      <Col>  <TextField fullWidth disabled color="secondary" name="first_name" onChange={onChangeEditUser} value={getEditUserssss?.role} label="Role" />

                      </Col>
                    </Row>
                    <br></br>  <br></br>

                    <TextWrapper>
                      <AppTitle>
                        <h1>Personal Information</h1>
                      </AppTitle>
                    </TextWrapper>

                    <Row>
                      <Col>  <TextField fullWidth color="secondary" InputLabelProps={{ required: true }} name="first_name" onChange={onChangeEditUser} value={getEditUserssss?.first_name} label="Firstname" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.first_name}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" id="middle_name" InputLabelProps={{ required: true }} name="middle_name" onChange={onChangeEditUser} value={getEditUserssss?.middle_name} label="Middlename" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.middle_name}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" id="last_name" InputLabelProps={{ required: true }} name="last_name" onChange={onChangeEditUser} value={getEditUserssss?.last_name} label="Lastname" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.last_name}</InputLabel>
                      </Col>
                    </Row>

                    <br></br>

                    <TextWrapper>
                      <AppTitle>
                        <h1>Credentials</h1>
                      </AppTitle>
                    </TextWrapper>

                    <Row>

                      <Col>  <TextField fullWidth color="secondary" onChange={onChangeEditUser} InputLabelProps={{ required: true }} name="email" value={getEditUserssss?.email} label="Email" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.email}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" onChange={onChangeEditUser} id="user_name" InputLabelProps={{ required: true }} name="user_name" value={getEditUserssss?.user_name} label="Username" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.user_name}</InputLabel>
                      </Col>

                    </Row>
                    <br></br>
                    <Row>

                      <Col>  <TextField fullWidth color="secondary" onChange={onChangeEditUser} InputLabelProps={{ required: true }} name="password" value={getEditUserssss.password} label="Password" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.password}</InputLabel>
                      </Col>
                      <Col>  <TextField fullWidth color="secondary" onChange={onChangeEditUser} id="middle_name" InputLabelProps={{ required: true }} name="confirmPassword" value={getEditUserssss.confirmPassword} label="ConfirmPassword" />
                        <InputLabel style={{ color: "red", "font-size": "0.8rem" }}>{error.confirmPassword}</InputLabel>
                      </Col>

                    </Row>
                    <br></br>

                    {/* <TextWrapper>
                              <AppTitle>
                                <h1>Health Information</h1>
                              </AppTitle>
                            </TextWrapper>   */}



                    <InputLabel className="d-flex justify-content-center" style={{ color: "red", "font-size": "0.8rem", marginBottom: "-10px", marginTop: "20px" }}>{error.confirm}</InputLabel>
                    <BtnWrap2 >
                      <Button outline onClick={() => submitEdiUser(getEditUserssss._id)} color="danger"><i class="fas fa-file"></i>&nbsp;SUBMIT</Button>
                    </BtnWrap2>

                  </Modal.Body>
                </>
          }


          <Modal.Footer style={{ background: 'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))' }}>
            <Button style={{ background: '#EF3A47', color: 'white' }} variant="light" onClick={handleEditClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>






        <Modal size='lg' show={PDFshow} onHide={PDFhandleClose} animation={true}>
          <Modal.Header style={{ background: '#CE3043' }}>
            <Modal.Title style={{ color: '#ffff' }}><i class="fas fa-user-tie"></i>&nbsp;&nbsp;User List</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: '#ffff' }}>
            <div className="panel-activity__status" align="center">

              {getLoading.loading ? (
                <div style={{
                  display: "flex", justifyContent: "center",
                  alignItems: "center"
                }}><Circles color="#EF3A47" alignSelf='center' /></div>
              ) : null}



              <iframe src={pdfSrc} onLoad={hideSpinner} width="700" height="600"></iframe>





              {/* <div className="actions">
                <div className="btn-group">
                  <Button outline color="danger" ><i class="fas fa-download"></i>&nbsp;Download Document</Button>
                </div>
              </div> */}
            </div>


          </Modal.Body>
          <Modal.Footer style={{ background: 'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))' }}>
            <Button style={{ background: '#EF3A47', color: 'white' }} variant="light" onClick={PDFhandleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </div>


      <style>
        {`

            .Mui-disabled {
              color: rgb(0 0 0 / 100%);
            }

        .redBg {
            background-color: red;
            color: white;
            padding: 0.3em 0.5em;
            margin: 0.5em;
            display: flex;
            text-decoration: none;
            border-radius: 2em;
            font-weight: bolder;
            justify-content: center;
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
            height:220px;
            width:270px;
            padding:4px;
            border-radius: 10%;
            background-color:#fff;
            border: 1px solid #b2b2b2;
          -webkit-box-shadow: 3px 3px 4px rgba(50, 50, 50, 0.75);
          -moz-box-shadow:    3px 3px 4px rgba(50, 50, 50, 0.75);
          box-shadow:         3px 3px 4px rgba(50, 50, 50, 0.75);
          }
         
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

        `}
      </style>
    </div>
    </>
  );

}

export default User;