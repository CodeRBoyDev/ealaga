import React from "react";

import {
  LinkR,
  ServicesCard,
  ServicesContainer,
  ServicesH1,
  ServicesH2,
  ServicesIcon,
  ServicesP,
  ServicesWrapper, BtnWrap,ServicesH3
} from "./ServicesElements";
import image1 from "../../../images/defultteam.jpg";
import image2 from "../../../images/cristeam.png";
import image3 from "../../../images/rickyteam.png";
import image4 from "../../../images/nathteam.png";
import image5 from "../../../images/russelteam.png";
import image6 from "../../../images/mayor.png";
import image7 from "../../../images/vmayor.png";
import image8 from "../../../images/hosca.png";
import image9 from "../../../images/hcenter.png";

import { Button } from 'reactstrap';
import { MDBGallery, MDBGalleryList} from 'mdbreact';
import PhotoAlbum from "react-photo-album";

const Services = () => {

  const dataImg = [
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675560885/services/center%20for%20the%20elderly/317672809_6181318178567287_2307220198436322039_n_h35bjw.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675560885/services/center%20for%20the%20elderly/317620694_6181319025233869_3782006162965932850_n_msgob9.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675560886/services/center%20for%20the%20elderly/317780795_6181319191900519_4564184643448138464_n_alaerk.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675560885/services/center%20for%20the%20elderly/317660151_6181317898567315_3732251984190770286_n_yy6eqc.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675560887/services/center%20for%20the%20elderly/317356318_6181317885233983_2982127987494422916_n_usgwsy.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675560887/services/center%20for%20the%20elderly/317074211_6181317738567331_8112764310105826557_n_wzn0fh.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675560886/services/center%20for%20the%20elderly/317810392_6181318275233944_1503913422845022158_n_bzvqlu.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675560886/services/center%20for%20the%20elderly/317725579_6181319021900536_2401903112066089129_n_bkx4y9.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675560886/services/center%20for%20the%20elderly/317722312_6181317511900687_5031623696429122360_n_fdnlhp.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675560885/services/center%20for%20the%20elderly/317687078_6181318321900606_7440452843755585822_n_zd2iib.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675560884/services/center%20for%20the%20elderly/317633063_6181318565233915_7945823965762461486_n_nlpnwe.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675560884/services/center%20for%20the%20elderly/317658426_6181316711900767_6302352960291387767_n_rcavg9.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1681312700/Untitled_design_2_lzyqpn.png",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1681312453/Untitled_design_kdtlii.png",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1681312482/Untitled_design_1_qcmwce.png",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1681312003/IMG_20230328_153134_bmcgqg.jpg",
      width: 5,
      height: 3.5
    },
    {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675562131/services/center%20for%20the%20elderly/3_acxqhu.jpg",
      width: 5,
      height: 3.5
    }, {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675562130/services/center%20for%20the%20elderly/4_oemmu8.jpg",
      width: 5,
      height: 3.5
    }, {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675562130/services/center%20for%20the%20elderly/5_twvmwl.jpg",
      width: 5,
      height: 3.5
    }, {
      src: "https://res.cloudinary.com/du7wzlg44/image/upload/v1675562131/services/center%20for%20the%20elderly/6_p5b3fp.jpg",
      width: 5,
      height: 3.5
    },

    
  ];


  const styles = {
    container: {
      margin: '20px',
      marginTop: '10px',
      textAlign: 'center'
    },
    smallContainer: {
      margin: '10px',
      marginTop: '10px',
      textAlign: 'center'
    }
  }


  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const style = width <= 576 ? styles.smallContainer : styles.container;


  

  return (
    <>
      <ServicesContainer id="services">
        <ServicesH1>Meet the Team</ServicesH1>
        {/* <ServicesH2>Center For Elderly’s Team</ServicesH2> */}
        <ServicesWrapper>
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
        </ServicesWrapper>

        {/* <ServicesH2>eAlaga’s Development Team</ServicesH2> */}
        <ServicesWrapper>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossorigin="anonymous" />
<div class="container mt-100 mt-60">

<div class="row">
        <div class="col-12 text-center">
            <div class="section-title">
                <h4 class="title mb-4">eAlaga’s Development Team</h4>
                <p class="text-muted para-desc mx-auto mb-0">The eAlaga Developer Team is a skilled and passionate group of TUP-Taguig BSIT students dedicated to developing and maintaining a user-friendly platform that delivers healthcare services to the elderly community in Taguig City.</p>
            </div>
        </div>
    </div>


    <div class="row">
        <div class="col-lg-3 col-md-6 col-12 mt-4 pt-2">
            <div class="mt-4 pt-2">
                <div class="team position-relative d-block text-center">
                    <div class="image position-relative d-block overflow-hidden">
                        <img src={image2} style={{height: "19.2rem", width: "20rem"}} class="img-fluid rounded" alt="" />
                        <div class="overlay rounded bg-dark"></div>
                    </div>
                    <div class="content py-2 member-position bg-white border-bottom overflow-hidden rounded d-inline-block">
                        <h4 class="title mb-0">Cris Bermundo</h4>
                        <small class="text-muted">QA engineer</small>
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
                        <img src={image3} style={{height: "19.2rem", width: "20rem"}} class="img-fluid rounded" alt="" />
                        <div class="overlay rounded bg-dark"></div>
                    </div>
                    <div class="content py-2 member-position bg-white border-bottom overflow-hidden rounded d-inline-block">
                        <h4 class="title mb-0">Ricky Boy Donadillo</h4>
                        <small class="text-muted">Full-stack Developer</small>
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
                        <img src={image4} style={{height: "19.2rem", width: "20rem"}} class="img-fluid rounded" alt="" />
                        <div class="overlay rounded bg-dark"></div>
                    </div>
                    <div class="content py-2 member-position bg-white border-bottom overflow-hidden rounded d-inline-block">
                        <h4 class="title mb-0">Nathaniel Montano</h4>
                        <small class="text-muted">UI/UX Designer</small>
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
                        <img src={image5} style={{height: "19.2rem", width: "20rem"}} class="img-fluid rounded" alt="" />
                        <div class="overlay rounded bg-dark"></div>
                    </div>
                    <div class="content py-2 member-position bg-white border-bottom overflow-hidden rounded d-inline-block">
                        <h4 class="title mb-0">Russel Solleza</h4>
                        <small class="text-muted">Full-stack Developer</small>
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
        </ServicesWrapper>
     
  
       
       
      

      </ServicesContainer>
     
    <div style={style}>
      <ServicesH3>Our Work</ServicesH3>
      <PhotoAlbum layout="rows" photos={dataImg} />
      </div>


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
position: absolute;
bottom: -35px;
right: 0;
left: 0;
margin: auto 10%;
z-index: 1;
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
