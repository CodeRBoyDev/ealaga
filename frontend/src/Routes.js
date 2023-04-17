import { BrowserRouter, Router, Routes, Route, HashRouter } from 'react-router-dom';
import App from './App';
import About from "./pages/about";
import Services from "./pages/services";
import Login from "./pages/login";
import Register from "./pages/register";
import Joinus from "./pages/joinus";
import Privacy from "./pages/privacy.js";
import Terms from "./pages/terms.js";

import Verified from "./components/register/verified.js";
import ForgotPassword from "./components/login/forgotPassword.js";
import ResetPassword from "./components/login/resetPassword.js";
import ClientHome from "./pages/clientHome";
import ClientAppointment from "./pages/clientAppointment";
import ClientActivitySchedule from "./pages/clientActivitySchedule";
import ChatPage from "./pages/ChatPage";
import AdminChatPage from "./pages/AdminChatPage";
import PersonnelChatPage from "./pages/PersonnelChatPage";
import ProfileInformation from "./components/clientHome/Profile/information/profile.js";
import ProfileCredential from "./components/clientHome/Profile/credential/credential.js";
import Activity from "./components/clientHome/Activity/activity";
import History from "./components/clientHome/History/history";
import DonationClient from "./components/clientHome/Donation/donation";

import QRscanner from "./components/personnel/QRscanner/qrScanner.js";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Applicant from "./components/admin/applicant/Applicant";
import Health from "./components/admin/health/Health";
import Donation from "./components/admin/donation/Donation";
import Attendees from "./components/admin/attendees/Attendees";
import User from "./components/admin/user/User";
import Announcement from "./components/admin/announcement/Announcement";
import Logs from "./components/admin/logs/Logs";
import AdminProfileInformation from "./components/admin/Profile/information/profile.js";

import Personnel_Dashboard from "./components/personnel/dashboard/Dashboard";
import Personnel_Applicant from "./components/personnel/applicant/Applicant";
import Personnel_Health from "./components/personnel/health/Health";
import Personnel_Dialysis from "./components/personnel/dialysis/dialysis.js";
import Personnel_Donation from "./components/personnel/donation/Donation";
import Personnel_Attendees from "./components/personnel/attendees/Attendees";
import Personnel_User from "./components/personnel/user/User";
import Personnel_Announcement from "./components/personnel/announcement/Announcement";
import Personnel_Report from "./components/personnel/report/Report";

import Personnel_ProfileInformation from "./components/personnel/Profile/information/profile.js";

import PrivateRoute from './PrivateRoute';

import NotFound from './notfound';
import React, { useState, useEffect } from 'react';

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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100vh" }}>

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
const RoutedApp = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div>
             <HashRouter>
            {/* <Router> */}
            <Routes>
                {/* <Routes> */}
                    <Route path="/" exact="true" element={<App />} />
                    <Route path="/about" exact="true" element={<About />} />
                    <Route path="/services" exact="true" element={<Services />} />
                    <Route path="/joinus" exact="true" element={<Joinus />} />
                    <Route path="/login" exact="true" element={<Login />} />
                    <Route path="/register" exact="true" element={<Register />} />
                    <Route path="/verified/:token" exact="true" element={<Verified />} />
                    <Route path="/password/forgot" exact="true" element={<ForgotPassword />} />
                    <Route path="/password/reset/:token" exact="true" element={<ResetPassword />} />

                    <Route path="/faqs/privacy-policy" exact="true" element={<Privacy />} />
                    <Route path="/faqs/terms-condition" exact="true" element={<Terms />} />


                    <Route path="/client/dashboard" exact="true" element={<PrivateRoute allowedRoles={['client']}><ClientHome /></PrivateRoute>} />
                    <Route path="/client/appointment" exact="true" element={<PrivateRoute allowedRoles={['client']}><ClientActivitySchedule /></PrivateRoute>} />
                    {/* <Route path="/client/activity/schedule" exact="true" element={<ClientActivitySchedule />} /> */}
                    <Route path="/client/profile/information" exact="true" element={<PrivateRoute allowedRoles={['client']}><ProfileInformation /></PrivateRoute>} />
                    <Route path="/client/profile/credential" exact="true" element={<PrivateRoute allowedRoles={['client']}><ProfileCredential /></PrivateRoute>} />
                    <Route path="/client/activities" exact="true" element={<PrivateRoute allowedRoles={['client']}><Activity /></PrivateRoute>} />
                    <Route path="/client/history" exact="true" element={<PrivateRoute allowedRoles={['client']}><History /></PrivateRoute>} />
                    <Route path="/client/donation" exact="true" element={<PrivateRoute allowedRoles={['client']}><DonationClient /></PrivateRoute>} />
                    <Route path="/client/chats" exact="true" element={<PrivateRoute allowedRoles={['client']}><ChatPage /></PrivateRoute>} />

                    <Route path="/personnel/scanner" exact="true" element={<QRscanner />} />
                    

                    <Route path="/admin/dashboard" exact="true" element={<PrivateRoute allowedRoles={['admin']}><Dashboard /></PrivateRoute>} />
                    <Route path="/admin/attendees" exact="true" element={<PrivateRoute allowedRoles={['admin']}><Attendees /></PrivateRoute>} />
                    <Route path="/admin/applicant" exact="true" element={<PrivateRoute allowedRoles={['admin']}><Applicant /></PrivateRoute>} />
                    <Route path="/admin/user" exact="true" element={<PrivateRoute allowedRoles={['admin']}><User /></PrivateRoute>} />
                    <Route path="/admin/announcement" exact="true" element={<PrivateRoute allowedRoles={['admin']}><Announcement /></PrivateRoute>} />
                    <Route path="/admin/health" exact="true" element={<PrivateRoute allowedRoles={['admin']}><Health /></PrivateRoute>} />
                    <Route path="/admin/donation" exact="true" element={<PrivateRoute allowedRoles={['admin']}><Donation /></PrivateRoute>} />
                    <Route path="/admin/profile/information" exact="true" element={<PrivateRoute allowedRoles={['admin']}><AdminProfileInformation /></PrivateRoute>} />
                    <Route path="/admin/chats" exact="true" element={<PrivateRoute allowedRoles={['admin']}><AdminChatPage /></PrivateRoute>} />
                    <Route path="/admin/logs" exact="true" element={<PrivateRoute allowedRoles={['admin']}><Logs /></PrivateRoute>} />

                    <Route path="/personnel/dashboard" exact="true" element={<PrivateRoute allowedRoles={['personnel']}><Personnel_Dashboard /></PrivateRoute>} />
                    <Route path="/personnel/attendees" exact="true" element={<PrivateRoute allowedRoles={['personnel']}><Personnel_Attendees /></PrivateRoute>} />
                    <Route path="/personnel/applicant" exact="true" element={<PrivateRoute allowedRoles={['personnel']}><Personnel_Applicant /></PrivateRoute>} />
                    <Route path="/personnel/user" exact="true" element={<PrivateRoute allowedRoles={['personnel']}><Personnel_User /></PrivateRoute>} />
                    <Route path="/personnel/announcement" exact="true" element={<PrivateRoute allowedRoles={['personnel']}><Personnel_Announcement /></PrivateRoute>} />
                    <Route path="/personnel/health" exact="true" element={<PrivateRoute allowedRoles={['personnel']}><Personnel_Health /></PrivateRoute>} />
                    <Route path="/personnel/dialysis" exact="true" element={<PrivateRoute allowedRoles={['personnel']}><Personnel_Dialysis /></PrivateRoute>} />
                    
                    <Route path="/personnel/donation" exact="true" element={<PrivateRoute allowedRoles={['personnel']}><Personnel_Donation /></PrivateRoute>} />
                    <Route path="/personnel/report" exact="true" element={<PrivateRoute allowedRoles={['personnel']}><Personnel_Report /></PrivateRoute>} />
                    <Route path="/personnel/profile/information" exact="true" element={<PrivateRoute allowedRoles={['personnel']}><Personnel_ProfileInformation /></PrivateRoute>} />
                    <Route path="/personnel/chats" exact="true" element={<PrivateRoute allowedRoles={['personnel']}><PersonnelChatPage /></PrivateRoute>} />

                    <Route path="*" element={<NotFound />} />
                {/* </Routes> */}
                </Routes>
            {/* </Router> */}
            </HashRouter>
        </div>
    );
};

export default RoutedApp;