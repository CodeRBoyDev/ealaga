import React, { useState } from "react";
import {
  UncontrolledAccordion, AccordionHeader,
  AccordionBody, AccordionItem, Card, CardBody, CardTitle, CardSubtitle, CardText, Button
} from 'reactstrap'
import { Link } from 'react-router-dom';
import DataServices from './DataServices.json';
import { Carousel, Modal } from 'react-bootstrap';
import {
  HeroImageContainer,
  ServicesWrapper, ServicesH1
} from "./HeroImageElements";

import yoga from "../../../../images/yogaelder.jpg";
import { Fade } from "react-reveal";

const HeroImage = () => {

  const [getServices, setServices] = useState({floor:"first_floor", name: "Reception / Lobby"});

const floorData = DataServices[getServices.floor].find(floorData => floorData.name === getServices.name);



  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    // setAnimalComment([]);
    // setAnimalImage([]);
  }

  console.log(getServices)
  const handleShow = () => setShow(true);

  return (
    <HeroImageContainer>
      <ServicesH1>Our Services</ServicesH1>
      <Fade bottom duration={2000} distance="40px">
        <UncontrolledAccordion
          defaultOpen={[
            '1',
          ]}
          stayOpen
        >
          <AccordionItem>
            <AccordionHeader targetId="1">
              <h2>First Floor</h2>
            </AccordionHeader>
            <AccordionBody accordionId="1">
            {DataServices.first_floor.map(first_floor => (
        
          <div class="row">
          <div class="col-xl-12">
            <Link to="" onClick={() => {handleShow(); setServices({floor:"first_floor", name: first_floor.name})} }>

              <div class="card mb-3 card-body hover-shadow-color">
                <div class="row align-items-center">
                  <div class="col-auto">

                    <img style={{ width: "10vh" }} src={first_floor.images[0]} class="width-90 rounded-3" alt="" />

                  </div>
                  <div class="col">
                    <div class="overflow-hidden flex-nowrap">
                      <CardTitle style={{fontSize: "2rem",
                    color: "#EF3A47",
                    fontWeight: "bold",
                    }} tag="h3">
                        {first_floor.name}
                      </CardTitle>
                      <span class="text-muted d-block mb-2 medium">
                      {first_floor.description.substring(0, 280)}...
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </Link>
          </div>
        </div>

            ))}
             


            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="2">
              <h2>Second Floor</h2>
            </AccordionHeader>
            <AccordionBody accordionId="2">
            
            {DataServices.second_floor.map(second_floor => (
        
        <div class="row">
        <div class="col-xl-12">
          <Link to=""  onClick={() => {handleShow(); setServices({floor:"second_floor", name: second_floor.name})} }>

            <div class="card mb-3 card-body hover-shadow-color">
              <div class="row align-items-center">
                <div class="col-auto">

                  <img style={{ width: "10vh" }} src={second_floor.images[0]} class="width-90 rounded-3" alt="" />

                </div>
                <div class="col">
                  <div class="overflow-hidden flex-nowrap">
                    <CardTitle style={{fontSize: "2rem",
                  color: "#EF3A47",
                  fontWeight: "bold",
                  }} tag="h3">
                      {second_floor.name}
                    </CardTitle>
                    <span class="text-muted d-block mb-2 medium">
                    {second_floor.description.substring(0, 280)}...
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </Link>
        </div>
      </div>

          ))}

            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="3">
              <h2>Third Floor</h2>
            </AccordionHeader>
            <AccordionBody accordionId="3">
             
            {DataServices.third_floor.map(third_floor => (
        
        <div class="row">
        <div class="col-xl-12">
          <Link to=""  onClick={() => {handleShow(); setServices({floor:"third_floor", name: third_floor.name})} }>

            <div class="card mb-3 card-body hover-shadow-color">
              <div class="row align-items-center">
                <div class="col-auto">

                  <img style={{ width: "10vh" }} src={third_floor.images[0]} class="width-90 rounded-3" alt="" />

                </div>
                <div class="col">
                  <div class="overflow-hidden flex-nowrap">
                    <CardTitle style={{fontSize: "2rem",
                  color: "#EF3A47",
                  fontWeight: "bold",
                  }} tag="h3">
                      {third_floor.name}
                    </CardTitle>
                    <span class="text-muted d-block mb-2 medium">
                    {third_floor.description.substring(0, 280)}...
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </Link>
        </div>
      </div>

          ))}

            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="4">
              <h2>Fourth Floor</h2>
            </AccordionHeader>
            <AccordionBody accordionId="4">
             
            {DataServices.fourth_floor.map(fourth_floor => (
        
        <div class="row">
        <div class="col-xl-12">
          <Link to=""  onClick={() => {handleShow(); setServices({floor:"fourth_floor", name: fourth_floor.name})} }>

            <div class="card mb-3 card-body hover-shadow-color">
              <div class="row align-items-center">
                <div class="col-auto">

                  <img style={{ width: "10vh" }} src={fourth_floor.images[0]} class="width-90 rounded-3" alt="" />

                </div>
                <div class="col">
                  <div class="overflow-hidden flex-nowrap">
                    <CardTitle style={{fontSize: "2rem",
                  color: "#EF3A47",
                  fontWeight: "bold",
                  }} tag="h3">
                      {fourth_floor.name}
                    </CardTitle>
                    <span class="text-muted d-block mb-2 medium">
                    {fourth_floor.description.substring(0, 280)}...
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </Link>
        </div>
      </div>

          ))}

            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="5">
              <h2>Fifth Floor</h2>
            </AccordionHeader>
            <AccordionBody accordionId="5">
           
            {DataServices.fifth_floor.map(fifth_floor => (
        
        <div class="row">
        <div class="col-xl-12">
          <Link to=""  onClick={() => {handleShow(); setServices({floor:"fifth_floor", name: fifth_floor.name})} }>

            <div class="card mb-3 card-body hover-shadow-color">
              <div class="row align-items-center">
                <div class="col-auto">

                  <img style={{ width: "10vh" }} src={fifth_floor.images[0]} class="width-90 rounded-3" alt="" />

                </div>
                <div class="col">
                  <div class="overflow-hidden flex-nowrap">
                    <CardTitle style={{fontSize: "2rem",
                  color: "#EF3A47",
                  fontWeight: "bold",
                  }} tag="h3">
                      {fifth_floor.name}
                    </CardTitle>
                    <span class="text-muted d-block mb-2 medium">
                    {fifth_floor.description.substring(0, 280)}...
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </Link>
        </div>
      </div>

          ))}

            </AccordionBody>
          </AccordionItem>
        </UncontrolledAccordion>
      </Fade>

      <Modal size='lg' centered show={show} onHide={handleClose} animation={true}>
        <Modal.Header style={{ background: '#CE3043' }}>
          <Modal.Title style={{ color: '#ffff' }}>&nbsp;&nbsp;RECEPTION</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#ffff' }}>

              <>
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Carousel style={{ width: 750 }}>
            {floorData.images.map((image, index) => (
           <Carousel.Item>
           <img
             style={{ height: 500 }}
             className="d-block w-100"
             src={image}
             alt="Third slide"
           />

           {/* <Carousel.Caption>
               <h3>Third slide label</h3>
               <p>
                 Praesent commodo cursus magna, vel scelerisque nisl consectetur.
               </p>
             </Carousel.Caption> */}
         </Carousel.Item>
           ))}

              
            </Carousel>


          </div>

          <div style={{ marginTop:"10px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h3 style={{fontSize: "2.5rem",
            color: "#EF3A47",
            fontWeight: "bold",
            marginBottom: "20px",
            marginTop: "20px"
            }}>{floorData.name}</h3></div>
                  <div id="info">
                    <p style={{ textAlign: 'justify', textIndent: '2em' }}>{floorData.description}</p>
                  
                  </div>
              </> 
          
        
        </Modal.Body>
        <Modal.Footer style={{ background: 'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))' }}>
          <Button style={{ background: '#EF3A47', color: 'white' }} variant="light" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <style>
        {`
        
      
        .card {
          box-shadow: 0 10px 10px rgba(100, 100, 100, 0.6);
          border-radius: 20px;
          transition: all 0.3s ease-in-out ;
        }
        
        .card:hover {
          transform: scale(1.02);
          transition: all 0.4 ease-in-out;
          box-shadow: 0 5px 10px rgba(255, 0, 0, 0.6);
    cursor: pointer;
        }

        .accordion-icon {
          color: red;
        }
        .btn-link.collapsed {
          color: red;
      }
      .accordion-button:not(.collapsed) {
        color: #ffffff;
        background-color: #EF3A47;
        box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
      }
      h2, .h2 {
        font-size: 2rem;
      }
      h5, .h5 {
        color: #EF3A47;
      }

      h3, .h3 {
        color: #EF3A47;
      }
      .accordion-button:not(.collapsed) {
        color: white;
    }
        .card {
            box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
        }
        
        .width-90 {
            width: 150px!important;
        }
        .rounded-3 {
            border-radius: 0.5rem !important;
        }
        
        a {
        text-decoration:none;    
        }
        
        `}
      </style>
    </HeroImageContainer>
  );
};

export default HeroImage;