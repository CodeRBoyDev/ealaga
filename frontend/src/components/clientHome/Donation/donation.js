import React from "react";
import Img from "../../../images/farmers.jpg";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import downloadjs from 'downloadjs';
import clothes from "../../../images/clothes-hanger.png";
import hygienic from "../../../images/hygienic.png";
import bedliners from "../../../images/bedliners.png";
import booksen from "../../../images/booksen.png";
import fooooods from "../../../images/fooooods.png";
import furniture from "../../../images/furniture.png";
import medicalequip from "../../../images/medicalequip.png";
import electronics from "../../../images/electronics.png";
import homedecor from "../../../images/homedecor.png";
import other from "../../../images/other.png";

import { ListGroup, Card, Modal } from 'react-bootstrap';
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
  ServicesWrapper,ServicesIcon2,ServicesIcon3,LinkR
} from "./ActivityElements.js";
import { getUser } from '../../login/helpers';
import { useState, useEffect } from 'react';
import { Circles } from  'react-loader-spinner'
import Pagination from "../../../layouts/Pagination";
import moment from 'moment';
import ReactStarRating from "react-star-ratings-component";
import { Fade } from "react-reveal";

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
  
      const [fetchDonation, setFetchDonation] = useState();


console.log(fetchDonation);
          const fetchHistories= () => {
            axios({
              method: "get",
              url: `/api/client/donation/${getUser()}`,
              headers: {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
              },
            }).then(response => {

              // console.log(response.data.filter);
              setFetchDonation(response.data.donation);
          }).catch((err) => console.log(err.response.data));
        };
        
        useEffect(() => {
          fetchHistories();
        },[]);
      // console.log(fetchHistory);
        // console.log(fetchSchedule);

        //pagination itoooooo---------------------------

        const filteredfetchDonation= fetchDonation?.filter(fetchDonation => {
  
          return fetchDonation._id.toLowerCase()
          
        });

        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(8);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const filteredfilteredfetchDonation = filteredfetchDonation?.slice(indexOfFirstPost, indexOfLastPost);
        console.log(filteredfilteredfetchDonation)
        const paginate = pageNumber => setCurrentPage(pageNumber);


        ///view review---------------

        const [reviewId, setReviewId] = useState();
        const [commentReview, setCommentReview] = useState({comment:""});
        const [starNum, setStarNum] = useState(3);
        
        const [FetchDonationView, setFetchDonationView] = useState();

        // console.log(FetchDonationView);
        const handleViewSched = _id => {
          handleShow()
          setReviewId(_id)

          axios({
            method: "get",
            url: `/api/client/clientDonationRead/${_id}`,
            headers: {
              "Content-Type" : "application/json",
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            },
          }).then(response => {

            // console.log(response.data.filter);
            setFetchDonationView(response.data.donation);
        }).catch((err) => console.log(err.response.data));


        }

        const onChange = e => {
          setCommentReview({ ...commentReview, [e.target.name]: e.target.value })
        }

        const submitReview = _id => {

          const newSelectedReview= {
            rate: starNum,
            comment: commentReview.comment,
          }
          
          console.log(newSelectedReview);
          axios({
            method:"put",
            url:`/api/review/${_id}`, 
            data: newSelectedReview,
            headers: {
              "Content-Type" : "application/json",
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
        const handleClose =() => {
                setShow(false);
                // setAnimalComment([]);
                // setAnimalImage([]);
              } 
        const handleShow = () => setShow(true);

        moment.locale('en');
        
  return (
    <>
     <SideBar  isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle} />
    <Container style={{ minHeight: "45vh" }}>
    <HeroImageContainer>
  
            <div className="container light-style flex-grow-1 container-p-y">
          
            <ServicesH1>
            &nbsp;&nbsp;<LinkR to='/client/dashboard'><i class="fas fa-arrow-left"></i></LinkR>&nbsp;&nbsp;My Donation
        </ServicesH1>
        <Fade left duration={2000} distance="40px">
        <ServicesWrapper>
        {!filteredfilteredfetchDonation ? <div style={{ width: "100%",height: "100",display: "flex",justifyContent: "center",
        alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center' height={80} width={80}/></div>
        : filteredfilteredfetchDonation == "" ? <ServicesH21>No Donation</ServicesH21>
        :
        
        filteredfilteredfetchDonation?.map(donations => { 
            // console.log(schedules);
            return <ServicesCard>
              {donations.category == "Clothing" ? <ServicesIcon src={clothes} /> : donations.category == "Personal Hygiene Items" ? <ServicesIcon src={hygienic} /> 
              : 
              donations.category == "Bed Linens" ? <ServicesIcon src={bedliners} /> : 
              donations.category == "Books and Entertainment" ? <ServicesIcon src={booksen} /> : 
              donations.category == "Food" ? <ServicesIcon src={fooooods} /> : 
              donations.category == "Furniture" ? <ServicesIcon src={furniture} /> : 
              donations.category == "Medical Supplies" ? <ServicesIcon src={medicalequip} /> : 
              donations.category == "Electronics" ? <ServicesIcon src={electronics} /> : 
              donations.category == "Home Decor" ? <ServicesIcon src={homedecor} /> :
              <ServicesIcon src={other} />

              }
            
            <ServicesH2>{donations.category}</ServicesH2>

            <div className="colll">
                <ServicesH21>Quantity&nbsp;:
              </ServicesH21>
             <ServicesP style={{ color: "black" }}>
             &nbsp;&nbsp;{donations.quantity}
              </ServicesP> 
         
              </div>


            <div className="colll">
                <ServicesH21>Date&nbsp;:
              </ServicesH21>
             <ServicesP style={{ color: "black" }}>
             &nbsp;&nbsp;{moment(donations.donatedAt).format("MM/DD/YYYY")}
              </ServicesP> 
         
              </div>

            <ServicesH2></ServicesH2>
           
    
          
            <BtnWrap>
          <Button outline color="danger" onClick={() => handleViewSched(donations._id)}><i class="far fa-eye"></i>&nbsp;View</Button>
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
                  totalPosts={filteredfetchDonation?.length}
                  paginate={paginate}
                />
                  </Paginate>
    </HeroImageContainer>
   
    </Container>




    <Modal size='md' show={show} onHide={handleClose} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}>Donation</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>
            <Card style={{ width: '27rem', margin: '0 auto' }}>
              {
                FetchDonationView?.image ? <Card.Img style={{ width: '27rem', height: "24rem"}} variant="top" src={FetchDonationView?.image?.url} /> :
                <Card.Img variant="top" style={{ width: '27rem', height: "24rem"}} src="https://res.cloudinary.com/du7wzlg44/image/upload/v1675574530/Untitled_design_voefwk.jpg" /> 
                
              }
          
              <Card.Body>
                <Card.Title>{FetchDonationView?.category}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Quantity: {FetchDonationView?.quantity}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handleClose}>
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
