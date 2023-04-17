import React from "react";
import { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';
import SideBar from "../../../layouts/adminSideBarNav";
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'reactstrap';
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { Pie, Line, Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Card, Carousel } from "react-bootstrap";
import Chart from 'chart.js/auto'
import {
  TextField, createTheme,
  InputLabel,
  Select,
  MenuItem, FormControl, NativeSelect, FormLabel, FormControlLabel, RadioGroup, Radio

} from "@material-ui/core";
import Navbar from "../../../layouts/adminHeaderBarNav";
import AdminSideBar from "../../../layouts/adminHeaderSide";
import { Scrollbars } from 'react-custom-scrollbars-2';
import RecreationalServicesList from './services.json';


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




function Dashboard() {

  let navigate = useNavigate();

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
    marginLeft: sideNavExpanded ? "260px" : "90px", // arbitrary values
    marginTop: sideNavExpanded ? "90px" : "90px", // arbitrary values
    transition: "margin 0.2s ease"
  };


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

  const [getTotalAttendees, setTotalAttendees] = useState([]);
  const [getAllAttendees, setAllAttendees] = useState([]);
  const [getTotalApplicant, setTotalApplicant] = useState([]);
  const [getTotalUser, setTotalUser] = useState([]);
  const [getTotalReview, setTotalReview] = useState([]);
  const [getAllServices, setAllServices] = useState([]);
  const [getAllComment, setAllComment] = useState([]);
  const [getalluser, setalluser] = useState([]);
  const [getAllDonation, setAllDonation] = useState([]);

  console.log(getAllServices);
  
  const fetchAttendees = () => {
    axios({
      method: "get",
      url: `/api/dashboard/total`,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    }).then(response => {

      // console.log(response)
      setTotalAttendees(response.data.totalAttendees);
      setAllAttendees(response.data.allAttendees);
      setTotalApplicant(response.data.totalApplicant);
      setTotalUser(response.data.totalUser);
      setalluser(response.data.alluser);
      setTotalReview(response.data.totalReviews);
      setAllComment(response.data.allReviews);
      setAllServices(response.data.allServices);
      setAllDonation(response.data.allDonation);
      setIsLoadingsss(false);

    }).catch((err) => console.log(err));
  };
  // console.log(AllHealthProblem)
  useEffect(() => {
    fetchAttendees();
    const interval = setInterval(fetchAttendees, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);




  
  const [startDateSelected, setStartDateSelected] = useState(false);

  const [startDate, setStartDate] = useState(moment().startOf('year'));
  const [endDate, setEndDate] = useState(moment().endOf('day'));

  const startMonth = moment(startDate).format('MMMM');
  const endMonth = moment(endDate).format('MMMM');
  const startDay = moment(startDate).format('DD');
  const endDay = moment(endDate).format('DD');



  //userrrr filter

  const [getUserFilter, setUserFilter] = useState({ field: "role" });

    const onFilter = e => {
    setUserFilter({ field: e.target.value });
    };

    // const filteredAllUsers = getalluser.filter(users => {
    //   console.log(users[getUserFilter.field])
    // return users[getUserFilter.field] === getUserFilter.value;
    // });

    // const totalPerField = filteredAllUsers.reduce((acc, user) => {
    // if (!acc[user[getUserFilter.field]]) {
    // acc[user[getUserFilter.field]] = 1;
    // } else {
    // acc[user[getUserFilter.field]] += 1;
    // }
    // return acc;
    // }, {});

    console.log(getUserFilter);

  ////



  const handleStartDateChange = date => {
    setStartDate(date);
    setStartDateSelected(true);

  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };


  const filteredAllAttendees = getAllAttendees.filter(attendees => {
    const attendeeDate = moment(attendees?.date_schedule);
    if (startDate && !endDate) {
      return attendeeDate.isSame(moment(startDate).startOf('day'), 'day');
    } else if (startDate && endDate) {
      return attendeeDate.isBetween(moment(startDate).startOf('day'), moment(endDate).endOf('day'), 'day', '[]');
    }
    return true;
  });

  

  let AllAttendeesmyObject = {};
  const groupBy = filteredAllAttendees.reduce((acc, currentValue) => {
    const key = startDate && endDate && moment(startDate).format("MMMM") === moment(endDate).format("MMMM")
      ? moment(currentValue.date_schedule).format("DD")
      : moment(currentValue.date_schedule).format("MMMM");
    if (!acc[key]) {
      acc[key] = { "month": key, total: 1 };
    } else {
      acc[key].total += 1;
    }
    return acc;
  }, {});
  AllAttendeesmyObject.result = Object.values(groupBy);

  AllAttendeesmyObject.result.sort((a, b) => {
    if (a.month !== b.month) {
      return a.month > b.month ? 1 : -1;
    }
    return a.total - b.total;
  });

  let labelsAllAttendeesmyObject = AllAttendeesmyObject.result.map(obj => obj.month);
  let dataAllAttendeesmyObject = AllAttendeesmyObject.result.map(obj => obj.total);

  const getalluserTotals = getUserFilter.field === "gender" ? getalluser.reduce((totals, alluser) => {
    if (alluser?.gender) {
      if (!totals[alluser?.gender]) {
        totals[alluser?.gender] = {
          name: alluser?.gender,
          total: 0
        };
      }
      totals[alluser?.gender].total++;
    }
    return totals;
  }, {})
  :
  getUserFilter.field === "status" ? getalluser.reduce((totals, alluser) => {
    if (alluser?.status) {
      if (!totals[alluser?.status]) {
        totals[alluser?.status] = {
          name: alluser?.status,
          total: 0
        };
      }
      totals[alluser?.status].total++;
    }
    return totals;
  }, {})
  :
  getUserFilter.field === "account_verified" ? getalluser.reduce((totals, alluser) => {
    if (alluser?.account_verified) {
      if (!totals[alluser?.account_verified]) {
        totals[alluser?.account_verified] = {
          name: alluser?.account_verified,
          total: 0
        };
      }
      totals[alluser?.account_verified].total++;
    }
    return totals;
  }, {})
  : getalluser.reduce((totals, alluser) => {
    if (alluser?.role) {
      if (!totals[alluser.role]) {
        totals[alluser.role] = {
          name: alluser.role,
          total: 0
        };
      }
      totals[alluser.role].total++;
    }
    return totals;
  }, {})

  
  
  


  const totalsOnly = Object.values(getalluserTotals).map(({name, total}) => ({name, total}));



  const sortedtotalsOnly = totalsOnly.sort((a, b) => a.total - b.total);


  // console.log(getalluserTotals);

  // ================= donation
  const donationTotals = getAllDonation?.reduce((totals, donation) => {
    if (!totals[donation.category]) {
      totals[donation.category] = {
        name: donation.category,
        total: 0
      };
    }
    totals[donation.category].total++;
    return totals;
  }, {});
  
  const totalsDonationOnly = Object.values(donationTotals).map(({name, total}) => ({name, total}));



  const sortedDonationTotalsOnly = totalsDonationOnly.sort((a, b) => a.total - b.total);

  

  //----------------------------------
  


    const categoryTotals = getAllServices?.reduce((totals, service) => {
      if (!totals[service.category]) {
        totals[service.category] = {
          name: service.category,
          total: 0
        };
      }
      totals[service.category].total++;
      return totals;
    }, {});
    
    const totalsServiceOnly = Object.values(categoryTotals).map(({name, total}) => ({name, total}));



    const sortedServiceTotalsOnly = totalsServiceOnly.sort((a, b) => a.total - b.total);

    //----------------------------------
  



    const recreationalTotals = RecreationalServicesList?.reduce((totals, service) => {
      totals[service] = getAllServices?.reduce((count, item) => {
        if (item.recreational_services.includes(service)) {
          return count + 1;
        }
        return count;
      }, 0);
      return totals;
    }, {});
    
    // Create an array of objects with field name and total value
const recreationalChartData = Object.entries(recreationalTotals).map(([field, total]) => ({
  field,
  total
}));

// Sort the chart data by total value in ascending order
recreationalChartData.sort((a, b) => a.total - b.total);

 

  //CHART===================================================================================

  const totalAll = sortedtotalsOnly.reduce((sum, {total}) => sum + total, 0);

const datadonut = {
  labels: sortedtotalsOnly.map(({name, total}) => `${name} (${total} or ${(total / totalAll * 100).toFixed(2)}%)`),
  datasets: [
    {
      data: sortedtotalsOnly.map(({total}) => total),
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#db3d44",
        "#4257b2",
        "#FFCE56"
      ],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#db3d44",
        "#4257b2",
        "#36A2EB"
      ]
    }
  ]
};




  const dataline = {
    labels: labelsAllAttendeesmyObject,
    datasets: [
      {
        label: startMonth + " "+ startDay + " - " + endMonth + " " + endDay,
        lineTension: 0.1,
        backgroundColor: "rgb(239, 58, 71)",
        borderColor: "rgb(249, 58, 30)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(239, 58, 71)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        borderWidth: -20,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(269, 58, 71)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: dataAllAttendeesmyObject,
        datalabels: {
          display: false
        }
      },

    ]
  };
  const databar = {
    labels: labelsAllAttendeesmyObject,
    datasets: [
      {
        label: startMonth + " "+ startDay + " - " + endMonth + " " + endDay,
        type: 'bar',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dataAllAttendeesmyObject,
        datalabels: {
          display: true
        }
      }
    ]
  };

  const databarDonation = {
    labels: sortedDonationTotalsOnly.map(({ name }) => name),
    datasets: [
      {
        label: "Popular Services",
        type: "bar",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: sortedDonationTotalsOnly.map(({ total }) => total),
        datalabels: {
          display: true,
        },
      },
    ],
  };

  const databarServices = {
    labels: sortedServiceTotalsOnly.map(({ name }) => name),
    datasets: [
      {
        label: "Popular Services",
        type: "bar",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: sortedServiceTotalsOnly.map(({ total }) => total),
        datalabels: {
          display: true,
        },
      },
    ],
  };

  const databarRecreational = {
    labels: recreationalChartData?.map((service) => service.field),
    datasets: [
      {
        label: "Popular Recrational Services",
        type: "bar",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: recreationalChartData?.map((service) => service.total),
        datalabels: {
          display: true,
        },
      },
    ],
  };
  
  
  const options = {
    plugins: {
      datalabels: {
        display: false
      }
    },
    scales: {
      xAxes: [
        {
          stacked: true
        }
      ],
      yAxes: [
        {
          stacked: true
        }
      ]
    }
  };
  const rates = getAllComment.map(comment => comment.review.rate);
  const totalrates = rates.reduce((sum, rate) => sum + rate, 0);
  const averageReview = totalrates / rates.length;

  const [isLoadingss, setIsLoadingsss] = useState(true);
        
  if(isLoadingss){
    return <>
     <Navbar toggle={toggle} />
       <AdminSideBar  isOpen={isOpen} toggle={toggle}/>
       
    <div style={contentStyle}>

   

      <br />
      <h1 style={{ color: "rgb(239, 58, 71)" }}><i class="fas fa-chart-bar"></i>&nbsp;Dashboard</h1>
      <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
      <hr />
      <SideBar setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} />

    <LoadingScreen />
    </div>
    </>
}


  return (
    <>
       <Navbar toggle={toggle} />
       <AdminSideBar  isOpen={isOpen} toggle={toggle}/>
       
    <div style={contentStyle}>

   

      <br />
      <h1 style={{ color: "rgb(239, 58, 71)" }}><i class="fas fa-chart-bar"></i>&nbsp;Dashboard</h1>
      <h5>{moment(new Date()).format("MMMM DD, YYYY dddd ")}</h5>
      <hr />
      <SideBar setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} />


      

      <div class="container-fluid" style={{ marginBottom: "-50px" }}>
       <div class="row g-3 mb-3">
          <div class="col" id="thumb">
            <div class="thumbBox">
              <p style={{ fontWeight: "bold" }}>Total Attendees Today</p>
              <h1 style={{ marginTop: "-30px", fontWeight: "bold" }}>
                <CountUp end={getTotalAttendees == 0 ? 0 : getTotalAttendees} duration={0.5} delay={0.5} />
                <i style={{ float: "right" }} class="fas fa-calendar-alt"></i>
              </h1>
              <a href="javascript:void(0)" onClick={() => navigate('/personnel/attendees')}>More</a>
            </div>
          </div>
          <div class="col" id="thumb">
            <div class="thumbBox">
              <p style={{ fontWeight: "bold" }}>Total User</p>
              <h1 style={{ marginTop: "-30px", fontWeight: "bold" }}><CountUp end={getTotalUser == 0 ? 0 : getTotalUser} duration={0.5} delay={0.5} />
                <i style={{ float: "right" }} class="fas fa-users"></i>
              </h1>
              <a href="javascript:void(0)" onClick={() => navigate('/personnel/user')}>More</a>
            </div>
          </div>
          <div class="col" id="thumb">
            <div class="thumbBox">
              <p style={{ fontWeight: "bold" }}>Total Applicant</p>
              <h1 style={{ marginTop: "-30px", fontWeight: "bold" }}><CountUp end={getTotalApplicant == 0 ? 0 : getTotalApplicant} duration={0.5} delay={0.5} />
                <i style={{ float: "right" }} class="fas fa-user-tie"></i>
              </h1>
              <a href="javascript:void(0)" onClick={() => navigate('/personnel/applicant')}>More</a>
            </div>
          </div>
         
          <div class="col" id="thumb">
            <div class="thumbBox">
              <p style={{ fontWeight: "bold" }}>Total Donation</p>
              <h1 style={{ marginTop: "-30px", fontWeight: "bold" }}><CountUp end={getAllDonation.length == 0 ? 0 : getAllDonation.length} duration={0.5} delay={0.5} />
                <i style={{ float: "right" }} class="fas fa-box"></i>
              </h1>
              <a href="javascript:void(0)" onClick={() => navigate('/personnel/attendees')}>More</a>
            </div>
          </div>
          <div class="col" id="thumb">
            <div class="thumbBox">
              <p style={{ fontWeight: "bold" }}>Ratings</p>
              <h1 style={{ marginTop: "-30px", fontWeight: "bold" }}>
                <CountUp end={averageReview == 0 ? 0 : averageReview} duration={0.5} delay={0.5} decimals={1}
                  decimal="."
                  prefix=""
                  suffix="" />/<CountUp end={5} duration={0.5} delay={0.5} />
                <i style={{ float: "right" }} class="fas fa-star"></i>
              </h1>
              <a href="javascript:void(0)" onClick={() => navigate('/personnel/attendees')}>More</a>
            </div>
          </div>
        </div>
      </div>
      <br></br>

      <div class="container-fluid">

        <div class="row">

          <div class="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 chart-container" id="thumb" >
            <Card>
              <h5><i class="fas fa-chart-line" style={{ float: "right" }}></i> Attendees</h5>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>

                <TextField color="secondary" style={{ marginTop: "1vh", marginRight: "2vh" }} InputLabelProps={{ shrink: true, required: true }} type="date" placeholder="Start Date" onChange={e => handleStartDateChange(e.target.value)} label="Start Date" />
                <TextField color="secondary" style={{ marginTop: "1vh", marginRight: "2vh" }} disabled={!startDateSelected} InputLabelProps={{ shrink: true, required: true }} type="date" placeholder="End Date" onChange={e => handleEndDateChange(e.target.value)} label="End Date" />

              </div>
              <Line data={dataline} options={options}/>
              <Bar data={databar} options={options} plugins={[ChartDataLabels]}/>
            </Card>
          </div>
          <div class="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 chart-container" id="thumb" >
            <Card >
              <h5><i style={{ float: "right" }} class="fas fa-users"></i>Total User</h5>

            <FormControl fullWidth={false} style={{ width: "17vh", marginLeft: "2vh" }}>
                  <InputLabel color="secondary" shrink="true" variant="standard" htmlFor="uncontrolled-native">
                  Select Filter
                  </InputLabel>
                  <NativeSelect
                    onChange={onFilter}
                    inputProps={{
                      name: 'filter',
                      id: 'uncontrolled-native',
                    }}
                    color="secondary"
                    // defaultValue={getUserFilter}
                  >
                    <option value="" selected disabled> <em>Select Filter</em></option>
                    <option value="gender">Gender</option>
                    <option value="status">Account Status</option>
                    <option value="account_verified">Verification Status</option>
                    <option value="role">Role</option>
                  </NativeSelect>
                </FormControl>
        
              <Pie data={datadonut} />
            </Card>
          </div>
          <div class="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 chart-container" id="thumb" >
            <Card>
           
              <h5><i style={{ float: "right" }} class="fas fa-hot-tub"></i>Popular Services</h5>
              <Bar data={databarServices} options={options} plugins={[ChartDataLabels]}/>
              <br></br> <br></br>
              <Bar data={databarRecreational} options={options} plugins={[ChartDataLabels]}/>
              
            </Card>
          </div>


          <div class="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 " id="thumb">
          <Card>
              <h5>Donation</h5>
              <Bar data={databarDonation} options={options} plugins={[ChartDataLabels]}/>
            

            </Card>
            
            <Card>
              <h5>Comment Feedback</h5>

              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Carousel style={{ width: 750 }}>
                  {
              getAllComment && getAllComment.length > 0 ? (
                    getAllComment?.map(comment => {

                      return <Carousel.Item>
                        <img
                          style={{ height: 200 }}
                          className="d-block w-100"
                          src="https://res.cloudinary.com/du7wzlg44/image/upload/v1674848158/boarder_ixoyex.jpg"
                          alt="First slide"
                        />
                        <Carousel.Caption>

                          {Array(comment?.review?.rate).fill().map((_, i) => <i key={i} style={{ color: "#EF3A47" }} className="fas fa-star"></i>)}
                          <p style={{ color: "#EF3A47" }}>{comment?.review?.comment}</p>
                          <h6 style={{ color: "#EF3A47" }}>by {comment?.user_id?.first_name} {comment?.user_id?.last_name}</h6>
                        </Carousel.Caption>
                      </Carousel.Item>

                    })
                  )

                  : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200 }}>
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>No comments available.</p>
                  </div>
                  )}
                </Carousel>


              </div>

            </Card>

          

          </div>

        </div>


      </div>



      <style>
        {`
  
      .colStyle{
        margin-right: -115px;
      }

      .card {
        margin-bottom: 30px;
        padding-bottom: 15px;
      }
      .card h5 {
        color: white;
        padding: 15px;
        background: #EF3A47;
        border-radius: 4px 4px 0 0;
      }
      
      .addUser .card form {
        padding: 15px 30px;
      }
      .kwRiGp {
        background-color: #fafbff !important;
      }
      .gIMaKV {
        background-color: #fafbff !important;
      }
      .cTEQON {
        background-color: #4257b2 !important;
      }
      .HWHoi {
        font-size: 15px !important;
        color: rgb(255, 255, 255) !important;
      }
      .lgkeMn {
        color: #fff !important;
      }
      .jHsXUi:hover {
        color: rgb(255, 255, 255) !important;
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

    .thumbBox {
      padding: 15px 0 0;
      color: #fff;
      border-radius: 4px;
      margin-bottom: 30px;
      float: left;
      width: 100%;
    }
    .thumbBox h4,
    .thumbBox h1,
    .thumbBox p {
      padding: 10px 15px;
    }
    .thumbBox a {
      color: #fff;
      width: 100%;
      background: rgba(255, 255, 255, 0.3);
      float: left;
      padding: 10px 15px;
    }
    
    #thumb:nth-child(1) .thumbBox {
      background: #00a900 !important;
      border-color: #04f500;
    }
    #thumb:nth-child(2) .thumbBox {
      background-color: #20a8d8 !important;
      border-color: #187da0;
    }
    #thumb:nth-child(3) .thumbBox {
      background-color: #ffc107 !important;
      border-color: #c69500;
    }
    #thumb:nth-child(4) .thumbBox {
      background-color: rgb(108 48 53) !important;
      border-color: #f5302e;
    }
    #thumb:nth-child(5) .thumbBox {
      background-color: rgb(239, 58, 71) !important;
      border-color: #f5302e;
    }
  
  
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
          display: flex;
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

        .DisablegreenBgButton {
          background-color: rgba(0, 255, 0, 0.2);
          opacity: 0.2;
          color: green;
          padding: 10px;
          margin: 0.5em;
          display: flex;
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
        `}
      </style>

    </div>
    </>
  );

}

export default Dashboard;