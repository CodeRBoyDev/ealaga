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
  BtnWrap, BtnWrap2,
  ServicesH1,
  ServicesH2,
  ServicesIcon,
  ServicesP, ServicesP1, ServicesH25, ServicesP5, ServicesP2,
  ServicesCardModal, ServicesH21,
  ServicesWrapper, ServicesIcon2, ServicesIcon3, LinkR
} from "./ActivityElements.js";
import { getUser } from '../../login/helpers';
import { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner'
import Pagination from "../../../layouts/Pagination";
import moment from 'moment';
import ReactStarRating from "react-star-ratings-component";
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

  const [fetchHistory, setFetchHistory] = useState();


  // console.log(getUser());
  const fetchHistories = () => {
    axios({
      method: "get",
      url: `/api/history/${getUser()}`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    }).then(response => {

      // console.log(response.data.filter);
      setFetchHistory(response.data.filter);
    }).catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    fetchHistories();
  }, []);
  // console.log(fetchHistory);
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


  const filteredfetchHistory = fetchHistory?.filter(attendees => {

    return attendees.status.toLowerCase().match(pat) && attendees.category.match(category) && attendees.time.match(time)

  });

  //pagination itoooooo---------------------------

  const filteredfetchSchedules = filteredfetchHistory?.filter(fetchHistory => {

    return fetchHistory._id.toLowerCase()

  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const filteredfetchSchedule = filteredfetchSchedules?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);


  ///view review---------------

  const [reviewId, setReviewId] = useState();
  const [commentReview, setCommentReview] = useState({ comment: "" });
  const [starNum, setStarNum] = useState(3);

  // console.log(starNum);
  const handleViewSched = _id => {
    handleShow()
    setReviewId(_id)
  }

  const onChange = e => {
    setCommentReview({ ...commentReview, [e.target.name]: e.target.value })
  }

  const submitReview = _id => {

    const newSelectedReview = {
      rate: starNum,
      comment: commentReview.comment,
    }

    console.log(newSelectedReview);
    axios({
      method: "put",
      url: `/api/review/${_id}`,
      data: newSelectedReview,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      }
    })
      .then(response => {
        navigate('/client/history')
        handleClose();
        Swal.fire({
          title: 'Thank You!',
          text: 'You have successfully created your review.',
          imageUrl: 'https://media1.giphy.com/media/FzGA7dqPQefRGucFOO/giphy.gif?cid=ecf05e47i0lzlct89eg370hg6nev13omyvlypf283yd99jat&rid=giphy.gif&ct=s',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#EF3A47',
        })
        fetchHistories();
      })
      .catch(error => {
        console.log(error.response);
        // setError(error.response.data);

      });

  }



  ///modal--------------------------

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    // setAnimalComment([]);
    // setAnimalImage([]);
  }
  const handleShow = () => setShow(true);

  moment.locale('en');





  return (
    <>
      <SideBar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Container style={{ minHeight: "45vh" }}>
        <HeroImageContainer>

          <div className="container light-style flex-grow-1 container-p-y">

            <ServicesH1>
              &nbsp;&nbsp;<LinkR to='/client/dashboard'><i class="fas fa-arrow-left"></i></LinkR>&nbsp;&nbsp;My History
            </ServicesH1>
            <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
              {/* <ServicesH21>Filter: </ServicesH21> */}

              <Button outline color="danger" onClick={onAll} style={{marginTop: "1vh", marginRight: "2vh"}}>&nbsp;Reset&nbsp;</Button>

              <FormControl style={{ width: "17vh", marginRight: "2vh" }} fullWidth>
                <InputLabel color="secondary" shrink="true" variant="standard" htmlFor="uncontrolled-native">
                  Select Status
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
                  <option value="" selected disabled> <em>Select Status</em></option>
                  <option value="attended">Attended</option>
                  <option value="not attended">Not Attended</option>
                </NativeSelect>
              </FormControl>

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
                {!filteredfetchSchedule ? <div style={{
                  width: "100%", height: "100", display: "flex", justifyContent: "center",
                  alignItems: "center"
                }}><Circles color="#EF3A47" alignSelf='center' height={80} width={80} /></div>
                  : filteredfetchSchedule == "" ? <ServicesH21>No History</ServicesH21>
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
                            &nbsp;&nbsp;{schedules._id}
                          </ServicesP></div>

                        <div className="colll">
                          <ServicesH21><i class="far fa-calendar"></i>&nbsp;:
                          </ServicesH21>
                          <ServicesP>
                            {/* &nbsp;&nbsp;{moment(schedules.date_schedule).subtract(1, "days").format("dddd MMMM DD YYYY")} */}
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
                          {schedules.status == "attended" ? <ServicesP style={{ color: "green" }}>
                            &nbsp;&nbsp;{schedules.status}
                          </ServicesP> 
                          : schedules.status == "reserved" ? <ServicesP style={{ color: "black" }}>
                          &nbsp;&nbsp;{schedules.status}
                        </ServicesP>
                        :
                          <ServicesP style={{ color: "red" }}>
                            &nbsp;&nbsp;{schedules.status}
                          </ServicesP>}

                        </div>

                        {schedules.status == "attended" && !schedules.review ? <BtnWrap>
                          <Button outline color="danger" onClick={() => handleViewSched(schedules._id)}><i class="far fa-star"></i>&nbsp;Review</Button>
                        </BtnWrap> : ""}

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
        <Modal.Header style={{ background: '#CE3043' }}>
          <Modal.Title style={{ color: '#ffff' }}>Create a review</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#ffff' }}>

          <ServicesH25>How was your experience?</ServicesH25>
          <div className="centerss">
            <ReactStarRating
              numberOfStar={5}
              numberOfSelectedStar={3}
              colorFilledStar="red"
              colorEmptyStar="black"
              starSize="50px"
              spaceBetweenStar="10px"
              disableOnSelect={false}
              onSelectStar={val => {
                setStarNum(val);
              }}
            />

          </div>
          <ServicesP5>Click on a star to change your rating 1 - 5, where 5 = Excellent! 4 = Very Good! 3 = Good! 2 = Bad! 1 = Very Bad!</ServicesP5>
          <div className="panel-activity__status">

            <textarea name="comment" onChange={onChange} id="commentfield" placeholder="Write a short review of your experience..." className="form-control"></textarea>


            <div className="actions">
              <div className="btn-group">
                <Button outline color="danger" onClick={() => submitReview(reviewId)}><i class="far fa-grin-stars"></i>&nbsp;Submit Review</Button>
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer style={{ background: 'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))' }}>
          <Button style={{ background: '#EF3A47', color: 'white' }} variant="light" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>





      <style>
        {`
    
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
    </>
  );
};

export default HeroImage;
