import React from "react";

import {
  LinkR,
  ServicesCard,
  ServicesContainer,
  ServicesH1,
  ServicesH2,
  ServicesIcon,
  ServicesP,
  ServicesWrapper, BtnWrap
} from "./ServicesElements";
import image1 from "../../../images/defultteam.jpg";
import image6 from "../../../images/mayor.png";
import image7 from "../../../images/vmayor.png";
import image8 from "../../../images/hosca.png";
import image9 from "../../../images/hcenter.png";

import { Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";


const Services = () => {

  let navigate = useNavigate();

  return (
    <>
      <ServicesContainer id="services">
        <ServicesH1>Meet the Team</ServicesH1>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossorigin="anonymous" />
        <div class="container mt-100 mt-60">

<div class="row">
        <div class="col-12 text-center">
            <div class="section-title">
                <h4 class="title mb-4">Center for the Elderly’s Team</h4>
                <p class="text-muted para-desc mx-auto mb-0">The Center for Elderly's team is a group of dedicated individuals who provide care and support to the elderly community, aiming to improve their well-being and quality of life.</p>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-3 col-md-6 col-12 mt-4 pt-2">
            <div class="mt-4 pt-2">
                <div class="team position-relative d-block text-center">
                    <div class="image position-relative d-block overflow-hidden">
                        <img src={image6} style={{height: "19.2rem", width: "20rem"}} class="img-fluid rounded" alt="" />
                        <div class="overlay rounded bg-dark"></div>
                    </div>
                    <div class="content py-2 member-position bg-white border-bottom overflow-hidden rounded d-inline-block">
                        <h4 class="title mb-0">Hon. Lani Cayetano</h4>
                        <small class="text-muted">City Mayor</small>
                    </div>
                    <ul class="list-unstyled team-social social-icon social mb-0">
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-facebook" title="Facebook"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-instagram" title="Instagram"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-twitter" title="Twitter"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-google-plus" title="Google +"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-linkedin" title="Linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="col-lg-3 col-md-6 col-12 mt-4 pt-2">
            <div class="mt-4 pt-2">
                <div class="team position-relative d-block text-center">
                    <div class="image position-relative d-block overflow-hidden">
                        <img src={image7} style={{height: "19.2rem", width: "20rem"}} class="img-fluid rounded" alt="" />
                        <div class="overlay rounded bg-dark"></div>
                    </div>
                    <div class="content py-2 member-position bg-white border-bottom overflow-hidden rounded d-inline-block">
                    <h4 class="title mb-0">Hon. Arvin Alit</h4>
                        <small class="text-muted">City Vice Mayor</small>
                    </div>
                    <ul class="list-unstyled team-social social-icon social mb-0">
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-facebook" title="Facebook"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-instagram" title="Instagram"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-twitter" title="Twitter"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-google-plus" title="Google +"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-linkedin" title="Linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="col-lg-3 col-md-6 col-12 mt-4 pt-2">
            <div class="mt-4 pt-2">
                <div class="team position-relative d-block text-center">
                    <div class="image position-relative d-block overflow-hidden">
                        <img src={image8} style={{height: "19.2rem", width: "20rem"}}  class="img-fluid rounded" alt="" />
                        <div class="overlay rounded bg-dark"></div>
                    </div>
                    <div class="content py-2 member-position bg-white border-bottom overflow-hidden rounded d-inline-block">
                    <h4 class="title mb-0">Ramonita Jordan</h4>
                        <small class="text-muted">Head of OSCA</small>
                    </div>
                    <ul class="list-unstyled team-social social-icon social mb-0">
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-facebook" title="Facebook"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-instagram" title="Instagram"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-twitter" title="Twitter"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-google-plus" title="Google +"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-linkedin" title="Linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="col-lg-3 col-md-6 col-12 mt-4 pt-2">
            <div class="mt-4 pt-2">
                <div class="team position-relative d-block text-center">
                    <div class="image position-relative d-block overflow-hidden">
                        <img src={image9} style={{height: "19.2rem", width: "20rem"}} class="img-fluid rounded" alt="" />
                        <div class="overlay rounded bg-dark"></div>
                    </div>
                    <div class="content py-2 member-position bg-white border-bottom overflow-hidden rounded d-inline-block">
                    <h4 class="title mb-0">Jeanette Reynoso</h4>
                        <small class="text-muted">Head of Center for the Elderly</small>
                    </div>
                    <ul class="list-unstyled team-social social-icon social mb-0">
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-facebook" title="Facebook"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-instagram" title="Instagram"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-twitter" title="Twitter"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-google-plus" title="Google +"></i></a></li>
                        <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-linkedin" title="Linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
        <BtnWrap>
        <Button outline color="danger" onClick={()  => navigate('/about')}>Learn more</Button>
        </BtnWrap>
      </ServicesContainer>


      <style>
        {`


.team-list img {
width: 50%;
}

.team-list .content {
width: 50%;
}

.team-list .content .follow {
position: absolute;
bottom: 24px;
}

.team-list:hover {
-webkit-transform: scale(1.05);
        transform: scale(1.05);
}

.team, .team-list {
-webkit-transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
}

.team .content .title, .team-list .content .title {
font-size: 18px;
}

.team .overlay {
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
opacity: 0;
-webkit-transition: all 0.5s ease;
transition: all 0.5s ease;
}

.team .member-position, .team .team-social {
z-index: 1;
position: absolute;
bottom: -35px;
right: 0;
left: 0;
margin: auto 10%;
}

.team .team-social {
bottom: 40px;
opacity: 0;
-webkit-transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
}

.team:hover {
-webkit-transform: translateY(-7px);
        transform: translateY(-7px);
-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}

.team:hover .overlay {
opacity: 0.6;
}

.team:hover .team-social {
opacity: 1;
}

@media (max-width: 768px) {
.team-list img,
.team-list .content {
  width: 100%;
  float: none !important;
}
.team-list img .follow,
.team-list .content .follow {
  position: relative;
  bottom: 0;
}
}

.list-inline-item:not(:last-child) {
  margin-right: 0px;
  margin-bottom: 0px;
}

.rounded {
border-radius: 5px !important;
}

.social-icon.social li a {
  color: #adb5bd;
  border-color: #adb5bd;
}

.social-icon li a {
  color: #35404e;
  border: 1px solid #35404e;
  display: inline-block;
  height: 32px;
  text-align: center;
  font-size: 15px;
  width: 32px;
  line-height: 30px;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
  overflow: hidden;
  position: relative;
}

a {
  text-decoration: none !important;
}

      
        `}
      </style>

    </>
  );
};

export default Services;
