import CountUp from "react-countup";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import blue from "@material-ui/core/colors/blue";
import {
  AcheivementsContainer,
  AcheivementsText,
  AcheivementsContainerWave
} from "./AnnouncementElements";
import { makeStyles } from "@material-ui/core/styles";
import WaveBody from "../Wave/index2";
import { red } from "@material-ui/core/colors";
import { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';
import { Carousel, Card, Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import image1 from "../../../images/announcementss.gif";
import image2 from "../../../images/anouncebox.jpg";
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: theme.spacing(32)
    }
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
  customBorderRadius: {
    borderRadius: 25,
    border: `3px solid ${red[200]}`,
    height: 200,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    margin: 30,
    Color: "#FFBABA",
    ['@media screen and (max-width: 1024px)']: { 
      height: 200,
      display: "flex",
      justifyContent: "center",
    },
    ['@media screen and (max-width: 768px)']: {
      height: 200,
      display: "flex",
      justifyContent: "center",
      },
    ['@media screen and (max-width: 480px)']: { 
      height: "auto",
    },
  }
}));



const Acheivements = () => {
  const classes = useStyles();

  //================================================

  const [getAnnouncement, setgetAnnouncement] = useState(); 

            const fetchAnnouncement= () => {
              axios({
              method: "get",
              url: `/api/announcement/readHome`,
              headers: {
                  "Content-Type" : "application/json",
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': '*',
              },
              }).then(response => {
                  
            setgetAnnouncement(response.data.announcement);
            }).catch((err) => console.log(err));
            };
            // console.log(AllHealthProblem)
            useEffect(() => {
            fetchAnnouncement();
            },[]);

            const handleAnnouncement = () => {
              handleShow()

            }

  ///modal--------------------------

  const [show, setShow] = useState(false);
  const handleClose =() => {
          setShow(false);
          // setAnimalComment([]);
          // setAnimalImage([]);
        } 
  const handleShow = () => setShow(true);

console.log(getAnnouncement)

  return (
    <AcheivementsContainerWave>
      <AcheivementsContainer>
        <AcheivementsText>
          <h1>ANNOUNCEMENT</h1>
          <div className={classes.container} justifyContent="center">
            <Grid container spacing={16} justifyContent="center">
              <Grid item xs={100} sm={100} md={100} lg={100}>
                <Paper className={classes.customBorderRadius} elevation={15}>
                  <Box p={1}>
                      { getAnnouncement?.map(announcement => { 
                        return <Typography variant="h5">{announcement.status == "set" ? 
                        <>{announcement.title.substring(0, 57)}...
                        <hr></hr>
                        <a onClick={() => handleAnnouncement()} href="javascript:void(0)" style={{color:"#EF3A47"}}>see more</a></> 
                      
                        : ""
                        }</Typography>
                      })}
                  </Box>
                </Paper>
              </Grid>
             
            </Grid>
          </div>
        </AcheivementsText>
      </AcheivementsContainer>
      <WaveBody />

      <Modal size='lg' centered show={show} onHide={handleClose} animation={true}>
            <Modal.Header style={{background:'#CE3043', justifyContent:"center", height:"80px"}}>
              <Modal.Title style={{color:'#ffff', fontWeight:"bold", fontSize:"2rem"}}>
                {/* <i style={{ float: "right" }} class="fas fa-bullhorn"></i> */}
                &nbsp;&nbsp;ANNOUNCEMENT
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>
            {/* <img src='https://res.cloudinary.com/du7wzlg44/image/upload/v1665936961/ezgif.com-gif-maker_jd433u.gif' style={{height:"100px"}} title="Night-life" alt="Night-life"/>
            { getAnnouncement?.map(announcement => { 
                        return <Typography variant="h5">{announcement.status == "set" ? announcement.announcement : ""
                        }</Typography>
                      })} */}

{/* <Carousel >
{ getAnnouncement?.map(announcement => { 
              return <Carousel.Item>
                <img
                  style={{ height: 700 }}
                  className="d-block w-100"
                  src={image1}
                  alt="First slide"
                />

<div class="card-img-overlay d-flex linkfeat text-center">
                <div class="align-self-center">
                  <span class="badge">10/24/203</span>
                  <p class="textfeat"  style={{color:"white", padding: "20px", textAlign: "center"}} >{announcement.announcement}</p>
            
            </div>
          </div>
         
              </Carousel.Item>
                    })}
             
            </Carousel> */}



<div class="container">
   
    <div class="row">
      
    
            <div class="card right-profile-card">
                
                <div class="card-body">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                        {/* <img class="card-img img-fluid" style={{height: 80, width: 80, float: "right" }} src="https://media3.giphy.com/media/eAM3QfIOSnD0chi73X/giphy.gif?cid=ecf05e47zva0hgu86ho9z66v3q76v9mgvkbih6np4m2fh7ir&rid=giphy.gif&ct=s" alt=""/> */}
                        { getAnnouncement?.map(announcement => { 

                                     return announcement.status == "set" ? 
                                      <div class="work-container">
                                      <h3>  <img class="card-img img-fluid" style={{ marginLeft: -10, height: 50, width: 50 }} src="https://res.cloudinary.com/du7wzlg44/image/upload/v1665936961/ezgif.com-gif-maker_jd433u.gif" alt=""/> {announcement.title}</h3>
                                      <h4><i class="far fa-calendar-alt"></i>{moment(announcement.date).format("MMMM DD, YYYY, dddd ")}</h4>
                                      
                                      <p>{announcement.announcement}</p>
            
                                      </div>
                                      : ""
                                      


                       
                        })}
                        {getAnnouncement?.slice(0, 3).map(announcement => {

                          return <div class="work-container">
                             
                          <h3> <img class="card-img img-fluid" style={{ marginLeft: -10, height: 50, width: 50 }} src="https://res.cloudinary.com/du7wzlg44/image/upload/v1665936961/ezgif.com-gif-maker_jd433u.gif" alt=""/> {announcement.title}</h3>
                          <h4><i class="far fa-calendar-alt"></i>{moment(announcement.date).format("MMMM DD, YYYY, dddd ")}</h4>

                          <p>{announcement.announcement}</p>

                          </div>
                          })}

                          

                          
                           

                        </div>
                  
                    </div>
                </div>
            </div>
    
    </div>
</div>


{/* <div class="container">
<div class="row">
	
	

	<div class="col-6 py-0 px-1 d-none d-lg-block">
		<div class="row">
			<div class="col-6 pb-2 mg-1	">
				<div class="card bg-dark text-white">
		        <img class="card-img img-fluid" style={{ height: 175, width: 350 }} src={image2} alt=""/>
		        <div class="card-img-overlay d-flex">
		          <a href="#" class="align-self-end">
		        	<span class="badge">Finansial</span> 
		            <h6 class="card-title">BI Atur Standarisasi QR Code</h6>
		          </a>
		        </div>
		      	</div>
			</div>
			<div class="col-6 pb-2 mg-2	">
				<div class="card bg-dark text-white">
		        <img class="card-img img-fluid" style={{ height: 175, width: 350 }} src={image2} alt=""/>
		        <div class="card-img-overlay d-flex">
		          <a href="#" class="align-self-end">
		        	<span class="badge">Industri</span> 
		            <h6 class="card-title">PTSP BP Batam Masuk 10 Terbaik di Indonesia</h6>
		          </a>
		        </div>
		      	</div>
			</div>
			<div class="col-6 pb-2 mg-3	">
				<div class="card bg-dark text-white">
		        <img class="card-img img-fluid" style={{ height: 175, width: 350 }} src={image2}  alt=""/>
		        <div class="card-img-overlay d-flex">
		          <a href="#" class="align-self-end">
		        	<span class="badge">Ekspor</span> 
		            <h6 class="card-title">Review GSP: Amerika Ingin Perdagangan Saling Menguntungkan</h6>
		          </a>
		        </div>
		      	</div>
			</div>
			<div class="col-6 pb-2 mg-4	">
				<div class="card bg-dark text-white">
		        <img class="card-img img-fluid" style={{ height: 175, width: 350 }}  src={image2}  alt=""/>
		        <div class="card-img-overlay d-flex">
		          <a href="#" class="align-self-end">
		        	<span class="badge">Pertumbuhan Ekonomi</span> 
		            <h6 class="card-title">DPR Setujui Penambahan Anggaran BP Batam Rp565 Miliar</h6>
		          </a>
		        </div>
		      	</div>
			</div>
		</div>
	</div>
</div>
</div> */}
            </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <style>
        {`
   .left-profile-card .user-profile {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: auto;
    margin-bottom: 20px;
}

.left-profile-card h3 {
    font-size: 18px;
    margin-bottom: 0;
    font-weight: 700;
}

.left-profile-card p {
    margin-bottom: 5px;
}

.left-profile-card .progress-bar {
    background-color: var(--main-color);
}

.personal-info {
    margin-bottom: 30px;
}

.personal-info .personal-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.personal-list li {
    margin-bottom: 5px;
}

.personal-info h3 {
    margin-bottom: 10px;
}

.personal-info p {
    margin-bottom: 5px;
    font-size: 14px;
}

.personal-info i {
    font-size: 15px;
    color: var(--main-color);
    ;
    margin-right: 15px;
    width: 18px;
}

.skill {
    margin-bottom: 30px;
}

.skill h3 {
    margin-bottom: 15px;
}

.skill p {
    margin-bottom: 5px;
}

.languages h3 {
    margin-bottom: 15px;
}

.languages p {
    margin-bottom: 5px;
}

.right-profile-card .nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    color: #fff;
    background-color: var(--main-color);
}

.right-profile-card .nav>li {
    float: left;
    margin-right: 10px;
}

.right-profile-card .nav-pills .nav-link {
    border-radius: 26px;
}

.right-profile-card h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 15px;
}

.right-profile-card h4 {
    font-size: 16px;
    margin-bottom: 15px;
}

.right-profile-card i {
    font-size: 15px;
    margin-right: 10px;
}

.right-profile-card .work-container {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    padding: 10px;
}


/*timeline*/

.img-circle {
    border-radius: 50%;
}

.timeline-centered {
    position: relative;
    margin-bottom: 30px;
}

.timeline-centered:before,
.timeline-centered:after {
    content: " ";
    display: table;
}

.timeline-centered:after {
    clear: both;
}

.timeline-centered:before,
.timeline-centered:after {
    content: " ";
    display: table;
}

.timeline-centered:after {
    clear: both;
}

.timeline-centered:before {
    content: '';
    position: absolute;
    display: block;
    width: 4px;
    background: #f5f5f6;
    /*left: 50%;*/
    top: 20px;
    bottom: 20px;
    margin-left: 30px;
}

.timeline-centered .timeline-entry {
    position: relative;
    /*width: 50%;
        float: right;*/
    margin-top: 5px;
    margin-left: 30px;
    margin-bottom: 10px;
    clear: both;
}

.timeline-centered .timeline-entry:before,
.timeline-centered .timeline-entry:after {
    content: " ";
    display: table;
}

.timeline-centered .timeline-entry:after {
    clear: both;
}

.timeline-centered .timeline-entry:before,
.timeline-centered .timeline-entry:after {
    content: " ";
    display: table;
}

.timeline-centered .timeline-entry:after {
    clear: both;
}

.timeline-centered .timeline-entry.begin {
    margin-bottom: 0;
}

.timeline-centered .timeline-entry.left-aligned {
    float: left;
}

.timeline-centered .timeline-entry.left-aligned .timeline-entry-inner {
    margin-left: 0;
    margin-right: -18px;
}

.timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-time {
    left: auto;
    right: -100px;
    text-align: left;
}

.timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-icon {
    float: right;
}

.timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-label {
    margin-left: 0;
    margin-right: 70px;
}

.timeline-centered .timeline-entry.left-aligned .timeline-entry-inner .timeline-label:after {
    left: auto;
    right: 0;
    margin-left: 0;
    margin-right: -9px;
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
}

.timeline-centered .timeline-entry .timeline-entry-inner {
    position: relative;
    margin-left: -20px;
}

.timeline-centered .timeline-entry .timeline-entry-inner:before,
.timeline-centered .timeline-entry .timeline-entry-inner:after {
    content: " ";
    display: table;
}

.timeline-centered .timeline-entry .timeline-entry-inner:after {
    clear: both;
}

.timeline-centered .timeline-entry .timeline-entry-inner:before,
.timeline-centered .timeline-entry .timeline-entry-inner:after {
    content: " ";
    display: table;
}

.timeline-centered .timeline-entry .timeline-entry-inner:after {
    clear: both;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-time {
    position: absolute;
    left: -100px;
    text-align: right;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-time>span {
    display: block;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-time>span:first-child {
    font-size: 15px;
    font-weight: bold;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-time>span:last-child {
    font-size: 12px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon {
    background: #fff;
    color: #737881;
    display: block;
    width: 40px;
    height: 40px;
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding;
    background-clip: padding-box;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    text-align: center;
    -moz-box-shadow: 0 0 0 5px #f5f5f6;
    -webkit-box-shadow: 0 0 0 5px #f5f5f6;
    box-shadow: 0 0 0 5px #f5f5f6;
    line-height: 40px;
    font-size: 15px;
    float: left;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-primary {
    background-color: #303641;
    color: #fff;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-secondary {
    background-color: #ee4749;
    color: #fff;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-success {
    background-color: #00a651;
    color: #fff;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-info {
    background-color: #21a9e1;
    color: #fff;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-warning {
    background-color: #fad839;
    color: #fff;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-danger {
    background-color: #cc2424;
    color: #fff;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label {
    position: relative;
    background: #f5f5f6;
    padding: 1em;
    margin-left: 60px;
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding;
    background-clip: padding-box;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label:after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 9px 9px 9px 0;
    border-color: transparent #f5f5f6 transparent transparent;
    left: 0;
    top: 10px;
    margin-left: -9px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2,
.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label p {
    color: #737881;
    font-size: 12px;
    margin: 0;
    line-height: 1.428571429;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label p+p {
    margin-top: 15px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 {
    font-size: 16px;
    margin-bottom: 10px;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 a {
    color: #303641;
}

.timeline-centered .timeline-entry .timeline-entry-inner .timeline-label h2 span {
    -webkit-opacity: .6;
    -moz-opacity: .6;
    opacity: .6;
    -ms-filter: alpha(opacity=60);
    filter: alpha(opacity=60);
}

        `}
      </style>

    </AcheivementsContainerWave>
  );
};

export default Acheivements;
