import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "../../../layouts/adminSideBarNav";
import { Card, Modal} from 'react-bootstrap';
import moment from 'moment';
import {TextField,createTheme,
    InputLabel,
    Select,
    MenuItem, FormControl, NativeSelect,FormLabel,FormControlLabel ,RadioGroup ,Radio
  
  } from "@material-ui/core";
  import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ThemeProvider } from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import { Button } from 'reactstrap';
import { Circles } from  'react-loader-spinner'
import Swal from 'sweetalert2'

function Applicant() {
 

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
  marginLeft: sideNavExpanded ? "250px" : "70px", // arbitrary values
  transition: "margin 0.2s ease"
};

const theme = createTheme({
    overrides: {
      MuiTableCell: {
        root: {
          border: [[1, 'solid', 'rgb(239, 58, 71)']],
          borderColor: '#d3d3d3',
          
        },
        head: {
          fontWeight:"bold",
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

//================================================================================================================



             const [getApplicant, setApplicant] = useState(); 
             const [getViewApplicant, setViewApplicant] = useState(); 

             //---------------------------filter

                    const [statuss, setStatus] = useState({status:""});
                    const [positionss, setPosition] = useState({position:""});

                    const onAll = () => {
                        setStatus({ status: ""});
                        setPosition({
                            position: ""
                        });
                      };

                    const onChangeStatus = e => {
                        setStatus({ status: e.target.value});
                    };

                    const onChangePosition = e => {
                        setPosition({ position: e.target.value});
                    };



                    const { status} = statuss;
                    const { position} = positionss;

                    var pat = position == "" ? "" : '^'+position+'$';
                    console.log(pat)

                    const filteredAllApplicant= getApplicant?.filter(applicant => {

                        return applicant.status.match(status) && applicant.position.match(pat)
                        
                    });
                    
                    console.log(filteredAllApplicant)


            const fetchApplicant = () => {
                axios({
                method: "get",
                url: `/api/applicant/get`,
                headers: {
                    "Content-Type" : "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
                }).then(response => {
                    
                    setApplicant(response.data.applicant);
            }).catch((err) => console.log(err));
            };
            // console.log(AllHealthProblem)
            useEffect(() => {
                fetchApplicant();
            },[]);


            var data = {
                columns: ["ID","Name","Email","Contact#","Position","Status","Action"],
                rows: []
            }
            filteredAllApplicant?.forEach(applicant => {
                    data.rows.push([
                        applicant._id,
                        [applicant.last_name,", ",applicant.first_name,", ",applicant.middle_name],
                        applicant.email,
                        applicant.contact_number,
                        applicant.position,
                        <>
                        {
                            applicant.status == "denied" ? 
                            <div className="redBg">
                            <span>denied</span>
                            </div>  : 

                            applicant.status == "pending"?  <div className="yellowBg">
                            <span>pending</span>
                            </div>

                            :<div className="greenBg">
                            <span>accepted</span>
                            </div>
                        }
                        

                        

                       
                        </>
                        ,
                      <>
                      <a href="#"  onClick={() => handleViewApplicant(applicant._id)} className="yellowBgButton">
                      {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                      {/* <i class="fas fa-eye"></i> */}
                      View
                      {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                      </a> 
                      {
                        applicant.status == "pending" ?  <>
                        <a href="#"  onClick={() => handleAcceptApplicant(applicant._id)} className="greenBgButton">
                        {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                        {/* <i class="fas fa-check"></i> */}
                        Accept
                        {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                        </a> 
                        <a href="#"  onClick={() => handleDeniedApplicant(applicant._id)} className="redBgButton">
                     {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                        {/* <i class="fas fa-times"></i> */}
                        Denied
                      {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                        </a> 
                        </> :
                         <>
                         <a href="#"  style={{pointerEvents: "none"}} onClick={() => handleAcceptApplicant(applicant._id)} className="DisablegreenBgButton">
                      {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                         {/* <i class="fas fa-check"></i> */}
                         Accept
                       {/* &nbsp;&nbsp;&nbsp;&nbsp; */};
                         </a> 
                         <a href="#"  style={{pointerEvents: "none"}} onClick={() => handleDeniedApplicant(applicant._id)} className="DisableredBgButton">
                          {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                         {/* <i class="fas fa-times"></i> */}
                            Denied
                         {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                         </a> 
                         </>
                      }
                     
                      </>
                    ])
            })


            const handleViewApplicant = (_id) => {
                handleShow()
                console.log(_id);

                axios({
                    method: "get",
                    url: `/api/applicant/view/${_id}`,
                    headers: {
                      "Content-Type" : "application/json",
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Headers': '*',
                    },
                  }).then(response => {
                    setViewApplicant(response.data.applicant);
                                  })
                        .catch(error => {
                                        console.log(error.response);
                                        // setError(error.response.data);
                                       
                                    });

              }

              const handleAcceptApplicant = (_id) => {
           
                console.log(_id);

                Swal.fire({
                    title: 'Are you sure you want to accept this applicant?',
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
                    method: "put",
                    url: `/api/applicant/accept/${_id}`,
                    headers: {
                      "Content-Type" : "application/json",
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Headers': '*',
                    },
                  }).then(response => {
                    fetchApplicant();
                                  })
                        .catch(error => {
                                        console.log(error.response);
                                        // setError(error.response.data);
                                       
                                    });
                    }
                    })

              }

              const handleDeniedApplicant = (_id) => {
           
                console.log(_id);

                Swal.fire({
                    title: 'Are you sure you want to denied this applicant?',
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
                    method: "put",
                    url: `/api/applicant/denied/${_id}`,
                    headers: {
                      "Content-Type" : "application/json",
                      'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Headers': '*',
                    },
                  }).then(response => {
                    fetchApplicant();
                                  })
                        .catch(error => {
                                        console.log(error.response);
                                        // setError(error.response.data);
                                       
                                    });
                    }
                    })

              }



              const downloadDocument = (_id) => {
               
                console.log(_id);
                let path = `https://drive.google.com/uc?id=${_id}&export=download`;
                window.location.href = path; 


              }

             
              const [getLoading, setLoading] = useState({
                loading: true
              }); 

              const hideSpinner = () => {
                setLoading({
                  loading: false
                });
              };


 ///modal--------------------------

    const [show, setShow] = useState(false);
    const handleClose =() => {
            setShow(false);
            setLoading({
                loading: true
              });
        } 
    const handleShow = () => setShow(true);

    return (
        <div style={contentStyle}>
        <br />
        <h1 style={{color:"rgb(239, 58, 71)"}}>Applicant</h1>
        <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
        <hr />
        <SideBar  setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} /> 

        <div class="container-fluid">
         
        <ThemeProvider theme={theme}> 

        <MUIDataTable
        title={<Row>

            <Col className="colStyle" >
            <Button outline color="danger"  onClick={onAll} style={{marginTop: "10px"}}>&nbsp;Reset&nbsp;</Button>
            </Col>

<Col>
<FormControl fullWidth> 
                          <InputLabel color="secondary" shrink="true"  variant="standard" htmlFor="uncontrolled-native">
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
                          <option value="accepted">Accepted</option>
                          <option value="pending">Pending</option>
                          <option value="denied">Denied</option>
                        </NativeSelect>
                      </FormControl>
            </Col>

            <Col> <FormControl fullWidth> 
                          <InputLabel color="secondary" shrink="true"  variant="standard" htmlFor="uncontrolled-native">
                          Select Position
                          </InputLabel>
                          <NativeSelect
                          onChange={onChangePosition}
                            inputProps={{
                              name: 'category',
                              id: 'uncontrolled-native',
                            }}
                            color="secondary"
                            value={position}
                          >
                             <option value="" selected disabled> <em>Select Position</em></option>
                          <option value="Position 1">Position 1</option>
                          <option value="Position 2">Position 2</option>
                          <option value="Position 3">Position 3</option>
                        </NativeSelect>
                      </FormControl></Col>

            <Col>
            
            
            </Col>
          
            
           <Col></Col>

           
            </Row>}
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

       <Modal size='lg' show={show} onHide={handleClose} animation={true}>
            <Modal.Header style={{background:'#CE3043'}}>
              <Modal.Title style={{color:'#ffff'}}><i class="fas fa-user-tie"></i>&nbsp;&nbsp;Applicant Document</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:'#ffff'}}>
            <div  className="panel-activity__status" align="center">
                
            {getLoading.loading ? (
               <div style={{ display: "flex",justifyContent: "center",
               alignItems: "center"}}><Circles color="#EF3A47" alignSelf='center'/></div>
        ) : null}
        
       

                    <iframe src={`https://drive.google.com/file/d/${getViewApplicant?.document.public_id}/preview`} onLoad={hideSpinner} width="700" height="600"></iframe>
                
            
           
                
               
                 <div className="actions">
                         <div className="btn-group">
                         <Button outline color="danger" onClick={() => downloadDocument(getViewApplicant?.document.public_id)}><i class="fas fa-download"></i>&nbsp;Download Document</Button>
                         </div>
                     </div>
                 </div>

                        
            </Modal.Body>
            <Modal.Footer style={{background:'linear-gradient(to bottom, rgba(255,186,186,50%), rgba(255,186,186,0%))'}}>
              <Button style={{background:'#EF3A47', color:'white'}} variant="light" onClick={handleClose}>
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


        .colStyle{
            margin-right: -100px;
          }
  
          @media screen and (max-width : 1500px) {
            .colStyle{
              margin-right: 0px;
            
            }
        }
        
        @media screen and (min-width : 768px) and (max-width : 1024px) {
          .colStyle{
            margin-right: 0px;
          
          }
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
    );

}

export default Applicant;