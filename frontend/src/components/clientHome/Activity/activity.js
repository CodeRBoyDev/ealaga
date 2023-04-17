import React from "react";
import Img from "../../../images/farmers.jpg";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import downloadjs from 'downloadjs';
import image1 from "../../../images/gymnastics.png";
import image2 from "../../../images/dialysis2.png";
import image3 from "../../../images/conference.png";
import { Carousel, Card, Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from '../../../axiosConfig';
import Navbar from "../../../layouts/clientHeaderNav";
import SideBar from "../../../layouts/clientSideBarNav";
import { Scrollbars } from 'react-custom-scrollbars-2';
import {
  HeroImageContainer,
  Paginate,
  ServicesCard,
  BtnWrap,BtnWrap2,
  ServicesH1,
  ServicesH2,
  ServicesIcon,
  ServicesP,ServicesP1,ServicesH25,ServicesP5,ServicesP2,
  ServicesCardModal,ServicesH21,
  ServicesWrapper,ServicesIcon2,ServicesIcon3, LinkR
} from "./ActivityElements.js";
import { getUser } from '../../login/helpers';
import { useState, useEffect } from 'react';
import { Circles } from  'react-loader-spinner'
import Pagination from "../../../layouts/Pagination";
import moment from 'moment';
import { Fade } from "react-reveal";
import {
  TextField, createTheme,
  InputLabel,
  InputAdornment, FormControl, NativeSelect, FormLabel, FormControlLabel, RadioGroup, Radio

} from "@material-ui/core";

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
  
      const [fetchSchedule, setFetchSchedule] = useState();


// console.log(getUser());
          const fetchSchedules= () => {
            axios({
              method: "get",
              url: `/api/activity/${getUser()}`,
              headers: {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
              },
            }).then(response => {
              // console.log(response.data.filter);
              setFetchSchedule(response.data.filter);
          }).catch((err) => console.log(err));
        };
        
        useEffect(() => {
          fetchSchedules();

             // Set an interval to fetch messages every 5 seconds
        const interval = setInterval(fetchSchedules, 2000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);

        },[]);
      
        // console.log(fetchSchedule);



          ///filter========

  const [statuss, setStatus] = useState({ status: "" });
  const [getCategory, setCategory] = useState({category:""});
  const [gettime, setTime] = useState({time:""});

  const onChangeStatus = e => {
    setStatus({ status: e.target.value });
  };

  const onChangeServices = e => {
    setCategory({ category: e.target.value});
  };

  const onChangeTime = e => {
    setTime({ time: e.target.value});
  };

  const onAll = () => {
    setStatus({ status: ""});
    setCategory({ category: ""});
    setTime({ time: ""});
  };




  const { status } = statuss;
  const { category} = getCategory;
  const { time} = gettime;

  var pat = status == "" ? "" : '^' + status + '$';


  const filteredfetchScheduless = fetchSchedule?.filter(attendees => {

    return attendees.status.toLowerCase().match(pat) && attendees.category.match(category) && attendees.time.match(time)

  });


        //pagination itoooooo---------------------------

        const filteredfetchSchedules= filteredfetchScheduless?.filter(fetchSchedules => {
  
          return fetchSchedules._id.toLowerCase()
          
        });

        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(8);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const filteredfetchSchedule = filteredfetchSchedules?.slice(indexOfFirstPost, indexOfLastPost);
        
        const paginate = pageNumber => setCurrentPage(pageNumber);


        ///view sched---------------

        const [fetchSchedData, setFetchSchedData] = useState();
        const [fetchSchedDataQr, setFetchSchedDataQr] = useState();

        const handleViewSched = _id => {
          handleShow()
         
          axios({
            method: "get",
            url: `/api/activity/view/${_id}`,
            headers: {
              "Content-Type" : "application/json",
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            },
          }).then(response => {
            // console.log(response.data.schedDataQr);
            setFetchSchedData(response.data.schedData);
            // setFetchSchedDataQr(response.data.schedDataQr);
            response.data.schedDataQr.map(function(schedDataQrs){
              return setFetchSchedDataQr(schedDataQrs)
            })

        }).catch((err) => console.log(err));

        }

        /////////cancel schedule============================================

        const cancelSched = _id => {
          console.log(_id);
         

            Swal.fire({
              title: 'Are you sure you want to cancel your schedule?',
              icon: 'warning',
              color: '#EF3A47',
              showCancelButton: true,
              confirmButtonColor: '#EF3A47',
              cancelButtonColor: '#f8bb86',
              confirmButtonText: 'Yes',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.isConfirmed) {
      
                Swal.fire({
                  title: 'Loading!',
                  text: 'Please wait while processing your message.',
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
                  url: `/api/activity/cancel/${_id}`,
                  headers: {
                    "Content-Type" : "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                  },
                }).then(response => {

                                   navigate('/client/activities')
                                   fetchSchedules();
                                   handleClose();
                                    Swal.fire({
                                      title: 'Success!',
                                      text: 'You have successfully cancelled your schedule.',
                                      imageUrl: 'https://media1.giphy.com/media/rxjNZHtke62I6Gz9mA/giphy.gif?cid=ecf05e473ser3at0y751oy413e5fqszku4ib8436jtok4cwj&rid=giphy.gif&ct=s',
                                      imageWidth: 200,
                                      imageHeight: 200,
                                      imageAlt: 'Custom image',
                                      confirmButtonColor: '#EF3A47',
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          fetchSchedules();
                                            }
                                  })
                                })
                      .catch(error => {
                                      console.log(error.response);
                                      // setError(error.response.data);
                                     
                                  });
      
               
              }
            })
          
            // console.log(response.data.schedDataQr);
            // setFetchSchedData(response.data.schedData);
            // setFetchSchedDataQr(response.data.schedDataQr);
            // response.data.schedDataQr.map(function(schedDataQrs){
            //   return setFetchSchedDataQr(schedDataQrs)
            // })


        }

        ////download to pdf ticket----------

       
        function downloadImage(event) {
          event.preventDefault();
          const input = document.getElementById('divToPrint');
          html2canvas(input,{
            allowTaint: true,
            useCORS: true
          })
            .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              downloadjs(imgData, 'e-ticket.png', 'image/png');
           
            });
        }

        function printDocument(event) {
          event.preventDefault();
          const input = document.getElementById('divToPrint');
          html2canvas(input,{
            allowTaint: true,
            useCORS: true,
            scrollY: -window.scrollY,
          })
            .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF('p', 'mm', 'a4');
              const pageWidth = pdf.internal.pageSize.getWidth();
              const pageHeight = pdf.internal.pageSize.getHeight();
              const widthRatio = pageWidth / canvas.width;
              const heightRatio = pageHeight / canvas.height;
              const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

              const canvasWidth = canvas.width * ratio;
              const canvasHeight = canvas.height * ratio;

              const marginX = (pageWidth - canvasWidth) / 2;
              const marginY = (pageHeight - canvasHeight) / 2;
              pdf.addImage(imgData, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
              // pdf.output('dataurlnewwindow');
              pdf.save("e-ticket.pdf");
            });
        }

        ///modal--------------------------

        const [show, setShow] = useState(false);
        const handleClose =() => {
                setShow(false);
                // setAnimalComment([]);
                // setAnimalImage([]);
              } 
        const handleShow = () => setShow(true);

        moment.locale('en');

        const todaysss = moment();
     

  return (
    <>
     <SideBar  isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle} />
    <Container style={{ minHeight: "45vh" }}>
    <HeroImageContainer>
  
            <div className="container light-style flex-grow-1 container-p-y">
          
            <ServicesH1>
            &nbsp;&nbsp;
            <LinkR to='/client/dashboard'><i class="fas fa-arrow-left"></i></LinkR>&nbsp;&nbsp;My Schedule
        </ServicesH1>

        <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
              {/* <ServicesH21>Filter: </ServicesH21> */}

              <Button outline color="danger" onClick={onAll} style={{marginTop: "1vh", marginRight: "2vh"}}>&nbsp;Reset&nbsp;</Button>

            
              <FormControl style={{ width: "17vh", marginRight: "2vh" }} fullWidth>
                <InputLabel color="secondary" shrink="true" variant="standard" htmlFor="uncontrolled-native">
                  Select Category
                </InputLabel>
                <NativeSelect
                  onChange={onChangeServices}
                  inputProps={{
                    name: 'category',
                    id: 'uncontrolled-native',
                  }}
                  color="secondary"
                  value={category}
                >
                  <option value="" selected disabled> <em>Select Category</em></option>
                  <option value="Recreational Activity">Recreational Activity</option>
                  <option value="Dialysis">Dialysis</option>
                  <option value="Multipurpose Hall">Multipurpose Hall</option>
                </NativeSelect>
              </FormControl>

              <FormControl style={{ width: "17vh", marginRight: "2vh" }} fullWidth>
                <InputLabel color="secondary" shrink="true" variant="standard" htmlFor="uncontrolled-native">
                  Select Time
                </InputLabel>
                <NativeSelect
                  onChange={onChangeTime}
                  inputProps={{
                    name: 'status',
                    id: 'uncontrolled-native',
                  }}
                  color="secondary"
                  value={time}
                >
                  <option value="" selected disabled> <em>Select Time</em></option>
                  <option value="am">Morning</option>
                  <option value="pm">Afternoon</option>
                  <option value="whole_day">Whole Day</option>
                </NativeSelect>
              </FormControl>


            </div>

        <Fade left duration={2000} distance="40px">
        <ServicesWrapper>
        {!filteredfetchSchedule ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
        alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
        : filteredfetchSchedule == "" ? <ServicesH21>NO Schedule</ServicesH21>
        :
        
        filteredfetchSchedule?.map(schedules => { 
            // console.log(schedules);
            return <ServicesCard>
              {schedules.category == "Recreational Activity" ? <ServicesIcon src={image1} /> : 
              schedules.category == "Multipurpose Hall" ? <ServicesIcon src={image3} /> :
              <ServicesIcon src={image2} />

              }
            
            <ServicesH2>{schedules.category}</ServicesH2>
    
              <div className="colll"><ServicesH21>ID&nbsp;:
              </ServicesH21><ServicesP>
              &nbsp;&nbsp;{schedules._id.substring(0, 18)+ '...'}
              </ServicesP></div>
           
                <div className="colll">
                <ServicesH21><i class="far fa-calendar"></i>&nbsp;:
              </ServicesH21>
             <ServicesP>
             {/* &nbsp;&nbsp;{moment(schedules.date_schedule).subtract(1, "days").format("ddd MMMM DD YYYY")} */}
             &nbsp;&nbsp;{moment(schedules.date_schedule).format("ddd MMMM DD YYYY")}
              </ServicesP> </div>
       
              <div className="colll">
              <ServicesH21><i class="far fa-clock"></i>&nbsp; :
              </ServicesH21>
              {schedules.time == "am" ?   
              <ServicesP>
                &nbsp;&nbsp; 
                AM 8:00am to 11:59am
                  </ServicesP> :
                  schedules.time == "pm" ?   
                  <ServicesP>
                  &nbsp;&nbsp; 
                  PM 1:00pm to 5:00pm
               </ServicesP> :
                  <ServicesP>
                  &nbsp;&nbsp; 
                  8:00am to 5:00pm
               </ServicesP>

              }
           
              </div>

                <div className="colll">
                <ServicesH21>Status&nbsp;:
              </ServicesH21>
             
             &nbsp;&nbsp;
             {schedules.status == "attended" ? <ServicesP style={{ color: "green" }}>
               Attended
              </ServicesP>   : <ServicesP style={{ color: "red" }}>
               Reserved
              </ServicesP>}
             
              </div>
          
              <BtnWrap>
          <Button outline color="danger" onClick={() => handleViewSched(schedules._id)}><i class="far fa-eye"></i>&nbsp;View</Button>
          </BtnWrap>
            </ServicesCard>
                })
         

        }

        </ServicesWrapper>
        </Fade>

            </div>
            <Paginate>
      <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={filteredfetchSchedules?.length}
                  paginate={paginate}
                />
                  </Paginate>
    </HeroImageContainer>
   
    </Container>




    <Modal size='md' show={show} onHide={handleClose} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}>DETAILS</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>
            
            {!fetchSchedData ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
        alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div> :
        
        fetchSchedData?.map(schedData => { 
               
          return  <><ServicesCardModal id="divToPrint" >
                <Row >
                <Col xs={6}>
                <ServicesP5>Service Type</ServicesP5>
                 {schedData.category == "Recreational Activity" ?  
                 <>
                 <ServicesH25>Recreational Activity
                 </ServicesH25> 
                  <ServicesP>→{`${schedData.recreational_services.join(", ")}${schedData.recreational_services.length > 0 ? "." : ""}`}</ServicesP>
                  </>
                 :
                 schedData.category == "Multipurpose Hall" ?  
                 <>
                 <ServicesH25>Multi-purpose Hall</ServicesH25> 
                 <ServicesP>→{schedData.purpose}</ServicesP>
                 {
                  schedData.attendees_number == "21-above" ? <ServicesP>→ 21 or more attendees</ServicesP>
                   :
                  <ServicesP>→{schedData.attendees_number} attendees</ServicesP>
                 }
                 
                 </>
                 :
             <ServicesH25>Dialysis</ServicesH25>

              }
              
               
                <ServicesP5>Date and Time</ServicesP5>
                <ServicesH25>
                  {/* {moment(schedData.date_schedule).subtract(1, "days").format("ddd MMMM DD YYYY")} */}
                  {moment(schedData.date_schedule).format("ddd MMMM DD YYYY")}
                </ServicesH25>
                {schedData.time == "am" ? 
                <>
                <ServicesP>Morning</ServicesP>
                <ServicesP>8:00am - 11:59am</ServicesP>
                </>
                :
                schedData.time == "pm" ? 
                <>
                <ServicesP>Afternoon</ServicesP>
                <ServicesP>1:00pm - 5:00pm</ServicesP>
                </>
                
                :
                <>
                <ServicesP>Wholeday</ServicesP>
                <ServicesP>8:00am - 5:00pm</ServicesP>
                </>
              }
                <ServicesP5>Location</ServicesP5>
                <ServicesH25>13, 1639 Manzanitas St, Taguig, Metro Manila</ServicesH25>
                <ServicesIcon3 src="https://res.cloudinary.com/du7wzlg44/image/upload/v1658764147/opening_2_svmbic.png" />

                </Col>

                <Col xs={6}>
                <ServicesP5>QR_ID</ServicesP5>
                <ServicesP2>{schedData._id}</ServicesP2>
                {!fetchSchedData ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
                alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div> :
                fetchSchedDataQr?.map(schedDataQr => { 
                return <ServicesIcon2 src={schedDataQr.url} />
                
                })
                }
               
                <ServicesP1><em>Print this e-ticket and go directly to the center. You won’t be able to avail the services without this. </em></ServicesP1>
                </Col>
               
                </Row>
                </ServicesCardModal>
                <BtnWrap2>
                <Button outline color="danger" onClick={printDocument}><i class="fas fa-arrow-down"></i>&nbsp;PDF</Button>
                </BtnWrap2>
                <BtnWrap2>
                <Button outline color="danger" onClick={downloadImage}><i class="fas fa-arrow-down"></i>&nbsp;Image</Button>
                </BtnWrap2>
                {schedData.status == "attended" ? <BtnWrap2>
                <Button outline color="success" disabled><i class="fas fa-smile"></i>&nbsp;Attended</Button>
                </BtnWrap2>
                 : <BtnWrap2>

                        {todaysss.isSameOrAfter(moment(schedData.date_schedule).subtract(1, "days"), "day") 
                        && todaysss.isSameOrBefore(schedData.date_schedule, "day") && schedData.category == "Multipurpose Hall"
                        ?
                       <Button outline color="dark" disabled onClick={() => cancelSched(schedData._id)}><i class="fas fa-ban"></i>&nbsp;Cancel Schedule</Button>
                       :
                       <Button outline color="dark" onClick={() => cancelSched(schedData._id)}><i class="fas fa-ban"></i>&nbsp;Cancel Schedule</Button>
                        }
              
                
                
                
                </BtnWrap2>}
                
                
                </>
        })
            
        }
            

            </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>




          
    <style>
        {`
    
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

        `}
      </style>
    </>
  );
};

export default HeroImage;
