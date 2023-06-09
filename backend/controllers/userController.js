const User = require("../models/user");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const emailvalidator = require("email-validator");
const crypto = require("crypto");
const Health = require("../models/health");
const ActivityLogs = require("../models/activitylogs");
const cloudinary = require("cloudinary");
const Schedule = require("../models/schedule");
const { google } = require("googleapis");
const CLIENT_ID = '245985647212-17ekq9p43o5e2u9iei49tmlhqaqqdouh.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const stream = require("stream");
const REFRESH_TOKEN = '1//04sTDhftwMYhLCgYIARAAGAQSNwF-L9Ir2gMbL1h39Mxidzg7hCQCbSAKJ84BVCNX9sGai1j8ojVbIsrfpi2jVjjmf1FqAp8g1Ds';
const Readable = require("stream").Readable;
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const Log = require("../models/log");
const Notification = require("../models/notification");

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const url_server = "https://staging-ealaga.vercel.app";

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  // const emailValid = emailvalidator.validate(email)

  // console.log(emailValid);

  if (!email) {
    return res.status(400).send({
      email: "Please enter email / username",
    });
  }

  // if (!emailValid) {
  //   return res.status(400).send({
  //     'email':'Please enter valid email'
  // });
  // }

  try {
    // Step 1 - Verify a user with the email exists
    let user;

    if (email.includes("@")) {
      user = await User.findOne({ email: email }).select("+password");
    } else {
      user = await User.findOne({ user_name: email }).select("+password");
    }

    // const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(400).send({
        email: "User not found",
      });
    }

    if (!password) {
      return res.status(400).send({
        password: "Please enter password",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).send({
        password: "Incorrect password",
      });
    }

    if (!user.email_verified) {
      return res.status(201).json({
        message: "verifyEmail",
      });
    }

    if (user.status === "inactive") {
      return res.status(201).json({
        message: "inactive",
      });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // console.log(token);

    const activitylogs = await ActivityLogs.create({
      user_id: user._id,
      description: "Logged In"
    });

    await Log.create({
      date: new Date(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: Date.now() - req._startTime,
      referrer: req.headers.referer || '',
      userAgent: req.headers['user-agent'] || '',
      platform:"web",
    });

    console.log(activitylogs)

    return res.json({ token: token, user });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.verify = async (req, res) => {
  const emailVerificationToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  // console.log(emailVerificationToken);

  const user = await User.findOne({
    emailVerificationToken,
  });

  if (!user) {
    return res.status(201).json({
      message: "tokenExpired",
    });
  }
  user.email_verified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpire = undefined;
  user.expire_at = undefined;


  const activitylogs = await ActivityLogs.create({
    user_id: user._id,
    description: "Verified the email"
  });

  await Log.create({
    date: new Date(),
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: Date.now() - req._startTime,
    referrer: req.headers.referer || '',
    userAgent: req.headers['user-agent'] || '',
    platform:"web",
  });
  

  console.log(activitylogs)

  await user.save();
  return res.status(201).json({
    message: "Success",
  });

  // Check we have an id
  // if (!token) {
  //     return res.status(422).send({
  //          message: "Missing Token"
  //     });
  // }
  // // Step 1 -  Verify the token from the URL
  // let payload = null
  // try {
  //     payload = jwt.verify(
  //        token,
  //        process.env.USER_VERIFICATION_TOKEN_SECRET
  //     );
  // } catch (err) {
  //     return res.status(500).send(err);
  // }
  // try{
  //     // Step 2 - Find user with matching ID
  //     const user = await User.findOne({ _id: payload.ID }).exec();

  //     if (!user) {
  //       return res.status(422).send({
  //         message: "Missing"
  //    });
  //     }

  //     user.email_verified = true;
  //     await user.save();
  //     return res.status(422).send({
  //       message: "Success"
  //  });
  //  } catch (err) {
  //     return res.status(500).send(err);
  //  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "ealaga.taguig@gmail.com",
    pass: "vvdieymyrlrpbzhn",
  },
  // from: 'ealaga.taguig@gmail.com',
  tls: {
    ciphers: "SSLv3",
  },
});

// const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       host: 'smtp.gmail.com',
//       auth: {
//         user: "ealaga.taguig@gmail.com",
//         pass: "dhzvprtbluhuccxy"
//       },
//       from: 'ealaga.taguig@gmail.com'
// });

exports.signup = catchAsyncErrors(async (req, res, next) => {
  // console.log(transporter);
  // console.log(req.body);
  try {
    const {
      first_name,
      middle_name,
      last_name,
      user_name,
      email,
      password,
      confirmPassword,
      role,
      status,
  
    } = req.body;

    const existingUser = await User.findOne({ email }).exec();
    const existingUsername = await User.findOne({ user_name }).exec();

    if (existingUser) {
      return res.status(400).send({
        email: "Email is already in use.",
      });
    }
    if (existingUsername) {
      return res.status(400).send({
        user_name: "Username is already in use.",
      });
    }

    if (password != confirmPassword) {
      return res.status(400).send({
        confirmPassword: "Confirm password is not matched.",
      });
    }

    const confirm = req.body.confirm;
    

    const user = await User.create({
      first_name,
      middle_name,
      last_name,
      user_name,
      email,
      password,
      role,
      status,
      profile_picture: {
        public_id: "profile_picture/jttdi63mt8a6e4ndt3icdsadsada",
        url: "https://pbs.twimg.com/media/Cqny3hKWAAADr8z.jpg",
      },
      role: role,
      status: status,
    });

  if (confirm === "false") {
      await user.remove();
      return res.status(400).send({
          confirm: "Please check this box if you want to proceed",
      });
  }

    const emailToken = user.getEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    const notification = await Notification.create({
      user_id: user._id,
      type: "welcome_message",
      description: "Thank you for registering at eAlaga! We're thrilled to have you join our platform designed to make booking health care services easier for the elderly community in Taguig City. To verify your account and ensure smooth service booking, please visit your profile and fill up all the required information. At eAlaga, we prioritize your needs and offer a range of services including recreational activities, dialysis, and a multipurpose hall, all at the touch of a button. Our fast and secure confirmation process generates proof of booking in the form of QR codes and text. Your health is our priority, and we strive to provide a user-friendly platform that puts you first. Book a schedule today and experience the convenience of eAlaga!"
    });

    // Create local url
    // const url = `${req.protocol}://${req.get('host')}/#/verified/${emailToken}`;

    // Create live url
    const url = `${url_server}/#/verified/${emailToken}`;

    // const url = `${process.env.FRONTEND_URL}/verified/${emailToken}`;

    transporter.sendMail({
      from: "eAlaga <ealaga.taguig@gmail.com>",
      to: email,
      subject: "Verify Email",
      html: `<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="width:100% ;-webkit-text-size-adjust:none;margin:0;padding:0;background-color:#FAFAFA;">
            <center>
              <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable" style="height:100% ;margin:0;padding:0;width:100% ;background-color:#FAFAFA;">
                <tr>
                  <td align="center" valign="top" style="border-collapse:collapse;">
                    <!-- // Begin Template Preheader \\ -->
                    <table border="0" cellpadding="10" cellspacing="0" width="450" id="templatePreheader" style="background-color:#FAFAFA;">
                      <tr>
                        <td valign="top" class="preheaderContent" style="border-collapse:collapse;">
                          <!-- // Begin Module: Standard Preheader \\ -->
                          <table border="0" cellpadding="10" cellspacing="0" width="100%">
                            <tr>
                              <td valign="top" style="border-collapse:collapse;">
                                <!-- <div mc:edit="std_preheader_content">
                                                               Use this area to offer a short teaser of your email's content. Text here will show in the preview area of some email clients.
                                                            </div>
                                                            -->
                              </td>
                            </tr>
                          </table>
                          <!-- // End Module: Standard Preheader \\ -->
                        </td>
                      </tr>
                    </table>
                    <!-- // End Template Preheader \\ -->
                    <table border="0" cellpadding="0" cellspacing="0" width="450" id="templateContainer" style="border:1px none #DDDDDD;background-color:#FFFFFF;">
                      <tr>
                        <td align="center" valign="top" style="border-collapse:collapse;">
                          <!-- // Begin Template Header \\ -->
                          <table border="0" cellpadding="0" cellspacing="0" width="450" id="templateHeader" style="background-color:#FFFFFF;border-bottom:0;">
                            <tr>
                              <td class="headerContent centeredWithBackground" style="border-collapse:collapse;color:#202020;font-family:Arial;font-size:34px;font-weight:bold;line-height:100%;padding:0;text-align:center;vertical-align:middle;background-color:#F4EEE2;padding-bottom:20px;padding-top:20px;">
                                <!-- // Begin Module: Standard Header Image \\ -->
                                <img width="200" src="https://res.cloudinary.com/du7wzlg44/image/upload/v1658764147/opening_2_svmbic.png" style="width:130px;max-width:130px;border:0;height:auto;line-height:100%;outline:none;text-decoration:none;" id="headerImage campaign-icon">
                                <!-- // End Module: Standard Header Image \\ -->
                              </td>
                            </tr>
                          </table>
                          <!-- // End Template Header \\ -->
                        </td>
                      </tr>
                      <tr>
                        <td align="center" valign="top" style="border-collapse:collapse;">
                          <!-- // Begin Template Body \\ -->
                          <table border="0" cellpadding="0" cellspacing="0" width="450" id="templateBody">
                            <tr>
                              <td valign="top" class="bodyContent" style="border-collapse:collapse;background-color:#FFFFFF;">
                                <!-- // Begin Module: Standard Content \\ -->
                                <table border="0" cellpadding="20" cellspacing="0" width="100%" style="padding-bottom:10px;">
                                  <tr>
                                    <td valign="top" style="padding-bottom:1rem;border-collapse:collapse;" class="mainContainer">
                                      <div style="text-align:left;color:#505050;font-family:Arial;font-size:14px;line-height:150%;">
                                        <h1 class="h1" style="color:#202020;display:block;font-family:Arial;font-size:24px;font-weight:bold;line-height:100%;margin-top:20px;margin-right:0;margin-bottom:20px;margin-left:0;text-align:left;">Hey, ${first_name}!</h1>
                                        <p> Thanks for registering an account with eAlaga.</p>
                                        <p style="margin-bottom:-20px">Before we get started, Please click the button below to verify your email.</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center" style="border-collapse:collapse;">
                                      <table border="0" cellpadding="0" cellspacing="0" style="padding-bottom:10px;">
                                        <tbody>
                                          <tr align="center">
                                            <td align="center" valign="middle" style="border-collapse:collapse;">
                                              <a class="buttonText" href='${url}' target="_blank" style="color: #EF3A47;text-decoration: none;font-weight: normal;display: block;border: 2px solid #EF3A47;padding: 10px 80px;font-family: Arial;">Verify</a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                   <tr>
                                    <td valign="top" style="padding-bottom:1rem;border-collapse:collapse;" class="mainContainer">
                                      <div style="text-align:left;color:#505050;font-family:Arial;font-size:14px;line-height:150%;">
                                        <p style="margin-top:-30px">This email verification link will expire in 30 minutes.</p>
                                        <p style="margin-bottom:-15px">Regards,</p>
                                         <p>eAlaga</p>
                                      </div>
                                    </td>
                                  </tr>
                                  
                                </table>
                                <!-- // End Module: Standard Content \\ -->
                              </td>
                            </tr>
                          </table>
                          <!-- // End Template Body \\ -->
                        </td>
                      </tr>
                      <tr>
                        <td align="center" valign="top" style="border-collapse:collapse;">
                          <!-- // Begin Support Section \\ -->
                          <table border="0" cellpadding="10" cellspacing="0" width="450" id="supportSection" style="background-color:white;font-family:arial;font-size:12px;border-top:1px solid #e4e4e4;">
                            <tr>
                              <td valign="top" class="supportContent" style="border-collapse:collapse;background-color:white;font-family:arial;font-size:12px;border-top:1px solid #e4e4e4;">
                                <!-- // Begin Module: Standard Footer \\ -->
                             
                              </td>
                            </tr>
                          </table>
                          <!-- // Begin Support Section \\ -->
                        </td>
                      </tr>
                    
                    </table>
                    <br>
                  </td>
                </tr>
              </table>
            </center>
          </body>

          <style type="text/css">
    #outlook a{
        padding:0;
      }
      body{
        width:100% !important;
      }
      .ReadMsgBody{
        width:100%;
      }
      .ExternalClass{
        width:100%;
      }
      body{
        -webkit-text-size-adjust:none;
      }
      body{
        margin:0;
        padding:0;
      }
      img{
        border:0;
        height:auto;
        line-height:100%;
        outline:none;
        text-decoration:none;
      }
      table td{
        border-collapse:collapse;
      }
      #backgroundTable{
        height:100% !important;
        margin:0;
        padding:0;
        width:100% !important;
      }
    /*
    @tab Page
    @section background color
    @tip Set the background color for your email. You may want to choose one that matches your company's branding.
    @theme page
    */
      body,#backgroundTable{
        /*@editable*/background-color:#FAFAFA;
      }
    /*
    @tab Page
    @section email border
    @tip Set the border for your email.
    */
      #templateContainer{
        /*@editable*/border:1px none #DDDDDD;
      }
    /*
    @tab Page
    @section heading 1
    @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
    @style heading 1
    */
      h1,.h1{
        /*@editable*/color:#202020;
        display:block;
        /*@editable*/font-family:Arial;
        /*@editable*/font-size:24px;
        /*@editable*/font-weight:bold;
        /*@editable*/line-height:100%;
        margin-top:20px;
        margin-right:0;
        margin-bottom:20px;
        margin-left:0;
        /*@editable*/text-align:center;
      }
    /*
    @tab Page
    @section heading 2
    @tip Set the styling for all second-level headings in your emails.
    @style heading 2
    */
      h2,.h2{
        /*@editable*/color:#202020;
        display:block;
        /*@editable*/font-family:Arial;
        /*@editable*/font-size:30px;
        /*@editable*/font-weight:bold;
        /*@editable*/line-height:100%;
        margin-top:0;
        margin-right:0;
        margin-bottom:10px;
        margin-left:0;
        /*@editable*/text-align:center;
      }
    /*
    @tab Page
    @section heading 3
    @tip Set the styling for all third-level headings in your emails.
    @style heading 3
    */
      h3,.h3{
        /*@editable*/color:#202020;
        display:block;
        /*@editable*/font-family:Arial;
        /*@editable*/font-size:26px;
        /*@editable*/font-weight:bold;
        /*@editable*/line-height:100%;
        margin-top:0;
        margin-right:0;
        margin-bottom:10px;
        margin-left:0;
        /*@editable*/text-align:center;
      }
    /*
    @tab Page
    @section heading 4
    @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
    @style heading 4
    */
      h4,.h4{
        /*@editable*/color:#202020;
        display:block;
        /*@editable*/font-family:Arial;
        /*@editable*/font-size:22px;
        /*@editable*/font-weight:bold;
        /*@editable*/line-height:100%;
        margin-top:0;
        margin-right:0;
        margin-bottom:10px;
        margin-left:0;
        /*@editable*/text-align:center;
      }
    /*
    @tab Header
    @section preheader style
    @tip Set the background color for your email's preheader area.
    @theme page
    */
      #templatePreheader{
        /*@editable*/background-color:#FAFAFA;
      }
    /*
    @tab Header
    @section preheader text
    @tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
    */
      .preheaderContent div{
        /*@editable*/color:#505050;
        /*@editable*/font-family:Arial;
        /*@editable*/font-size:10px;
        /*@editable*/line-height:100%;
        /*@editable*/text-align:left;
      }
    /*
    @tab Header
    @section preheader link
    @tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
    */
      .preheaderContent div a:link,.preheaderContent div a:visited,.preheaderContent div a .yshortcuts {
        /*@editable*/color:#336699;
        /*@editable*/font-weight:normal;
        /*@editable*/text-decoration:underline;
      }
      .preheaderContent img{
        display:inline;
        height:auto;
        margin-bottom:10px;
        max-width:280px;
      }
    /*
    @tab Header
    @section header style
    @tip Set the background color and border for your email's header area.
    @theme header
    */
      #templateHeader{
        /*@editable*/background-color:#FFFFFF;
        /*@editable*/border-bottom:0;
      }
    /*
    @tab Header
    @section header text
    @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
    */
      .headerContent{
        /*@editable*/color:#202020;
        /*@editable*/font-family:Arial;
        /*@editable*/font-size:34px;
        /*@editable*/font-weight:bold;
        /*@editable*/line-height:100%;
        /*@editable*/padding:0;
        /*@editable*/text-align:left;
        /*@editable*/vertical-align:middle;
        background-color: #FAFAFA;
          padding-bottom: 14px;
      }
    /*
    @tab Header
    @section header link
    @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
    */
      .headerContent a:link,.headerContent a:visited,.headerContent a .yshortcuts {
        /*@editable*/color:#336699;
        /*@editable*/font-weight:normal;
        /*@editable*/text-decoration:underline;
      }
      #headerImage{
        height:auto;
        max-width:400px !important;
      }
    /*
    @tab Body
    @section body style
    @tip Set the background color for your email's body area.
    */
      #templateContainer,.bodyContent{
        /*@editable*/background-color:#FFFFFF;
      }
    /*
    @tab Body
    @section body text
    @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
    @theme main
    */
      .bodyContent div{
        /*@editable*/color:#505050;
        /*@editable*/font-family:Arial;
        /*@editable*/font-size:14px;
        /*@editable*/line-height:150%;
        /*@editable*/text-align:left;
      }
    /*
    @tab Body
    @section body link
    @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
    */
      .bodyContent div a:link,.bodyContent div a:visited,.bodyContent div a .yshortcuts {
        /*@editable*/color:#336699;
        /*@editable*/font-weight:normal;
        /*@editable*/text-decoration:underline;
      }
      .bodyContent img{
        display:inline;
        height:auto;
        margin-bottom:10px;
        max-width:280px;
      }
    /*
    @tab Footer
    @section footer style
    @tip Set the background color and top border for your email's footer area.
    @theme footer
    */
      #templateFooter{
        /*@editable*/background-color:#FFFFFF;
        /*@editable*/border-top:0;
      }
    /*
    @tab Footer
    @section footer text
    @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
    @theme footer
    */
      .footerContent {
        background-color: #fafafa;
      }
      .footerContent div{
        /*@editable*/color:#707070;
        /*@editable*/font-family:Arial;
        /*@editable*/font-size:11px;
        /*@editable*/line-height:150%;
        /*@editable*/text-align:left;
      }
    /*
    @tab Footer
    @section footer link
    @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
    */
      .footerContent div a:link,.footerContent div a:visited,.footerContent div a .yshortcuts {
        /*@editable*/color:#336699;
        /*@editable*/font-weight:normal;
        /*@editable*/text-decoration:underline;
      }
      .footerContent img{
        display:inline;
      }
    /*
    @tab Footer
    @section social bar style
    @tip Set the background color and border for your email's footer social bar.
    @theme footer
    */
      #social{
        /*@editable*/background-color:#FAFAFA;
        /*@editable*/border:0;
      }
    /*
    @tab Footer
    @section social bar style
    @tip Set the background color and border for your email's footer social bar.
    */
      #social div{
        /*@editable*/text-align:left;
      }
    /*
    @tab Footer
    @section utility bar style
    @tip Set the background color and border for your email's footer utility bar.
    @theme footer
    */
      #utility{
        /*@editable*/background-color:#FFFFFF;
        /*@editable*/border:0;
      }
    /*
    @tab Footer
    @section utility bar style
    @tip Set the background color and border for your email's footer utility bar.
    */
      #utility div{
        /*@editable*/text-align:left;
      }
      #monkeyRewards img{
        display:inline;
        height:auto;
        max-width:280px;
      }
  
  
    /*
    ATAVIST CUSTOM STYLES 
     */
  
    .buttonText {
      color: #4A90E2;
      text-decoration: none;
      font-weight: normal;
      display: block;
      border: 2px solid #585858;
      padding: 10px 80px;
      font-family: Arial;
    }
  
    #supportSection, .supportContent {
      background-color: white;
      font-family: arial;
      font-size: 12px;
      border-top: 1px solid #e4e4e4;
    }
  
    .bodyContent table {
      padding-bottom: 10px;
    }
  
  
    .footerContent p {
      margin: 0;
      margin-top: 2px;
    }
  
    .headerContent.centeredWithBackground {
      background-color: #F4EEE2;
      text-align: center;
      padding-top: 20px;
      padding-bottom: 20px;
    }
        
     @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
            h1 {
                font-size: 40px !important;
            }
            
            .content {
                font-size: 22px !important;
            }
            
            .bodyContent p {
                font-size: 22px !important;
            }
            
            .buttonText {
                font-size: 22px !important;
            }
            
            p {
                
                font-size: 16px !important;
                
            }
            
            .footerContent p {
                padding-left: 5px !important;
            }
            
            .mainContainer {
                padding-bottom: 0 !important;   
            }
        }
      </style>
          
          `,
    });

    res.status(201).json({
      success: true,
      message: `Sent a verification email to ${email}`,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      // console.log(errors)

      return res.status(400).send(errors);
    }
    res.status(500).send("Something went wrong");
  }
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const emailValid = emailvalidator.validate(email);

  // console.log(emailValid);

  if (!email) {
    return res.status(400).send({
      email: "Please enter email",
    });
  }

  if (!emailValid) {
    return res.status(400).send({
      email: "Please enter valid email",
    });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({
      email: "Email does not exist",
    });
  }

  // Get reset token
  const activitylogs = await ActivityLogs.create({
    user_id: user._id,
    description: "Send a password reset link to their registered email address"
  });

  await Log.create({
    date: new Date(),
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: Date.now() - req._startTime,
    referrer: req.headers.referer || '',
    userAgent: req.headers['user-agent'] || '',
    platform:"web",
  });

  console.log(activitylogs)

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // // Create reset password url
  // const url = `${req.protocol}://${req.get('host')}/#/password/reset/${resetToken}`;

  // Create live url
  const url = `${url_server}/#/password/reset/${resetToken}`;

  try {
    transporter.sendMail({
      from: "eAlaga <ealaga.taguig@gmail.com>",
      to: user.email,
      subject: "Reset Password Notification",
      html: `<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="width:100% ;-webkit-text-size-adjust:none;margin:0;padding:0;background-color:#FAFAFA;">
          <center>
            <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable" style="height:100% ;margin:0;padding:0;width:100% ;background-color:#FAFAFA;">
              <tr>
                <td align="center" valign="top" style="border-collapse:collapse;">
                  <!-- // Begin Template Preheader \\ -->
                  <table border="0" cellpadding="10" cellspacing="0" width="450" id="templatePreheader" style="background-color:#FAFAFA;">
                    <tr>
                      <td valign="top" class="preheaderContent" style="border-collapse:collapse;">
                        <!-- // Begin Module: Standard Preheader \\ -->
                        <table border="0" cellpadding="10" cellspacing="0" width="100%">
                          <tr>
                            <td valign="top" style="border-collapse:collapse;">
                              <!-- <div mc:edit="std_preheader_content">
                                                             Use this area to offer a short teaser of your email's content. Text here will show in the preview area of some email clients.
                                                          </div>
                                                          -->
                            </td>
                          </tr>
                        </table>
                        <!-- // End Module: Standard Preheader \\ -->
                      </td>
                    </tr>
                  </table>
                  <!-- // End Template Preheader \\ -->
                  <table border="0" cellpadding="0" cellspacing="0" width="450" id="templateContainer" style="border:1px none #DDDDDD;background-color:#FFFFFF;">
                    <tr>
                      <td align="center" valign="top" style="border-collapse:collapse;">
                        <!-- // Begin Template Header \\ -->
                        <table border="0" cellpadding="0" cellspacing="0" width="450" id="templateHeader" style="background-color:#FFFFFF;border-bottom:0;">
                          <tr>
                            <td class="headerContent centeredWithBackground" style="border-collapse:collapse;color:#202020;font-family:Arial;font-size:34px;font-weight:bold;line-height:100%;padding:0;text-align:center;vertical-align:middle;background-color:#F4EEE2;padding-bottom:20px;padding-top:20px;">
                              <!-- // Begin Module: Standard Header Image \\ -->
                              <img width="200" src="https://res.cloudinary.com/du7wzlg44/image/upload/v1658764147/opening_2_svmbic.png" style="width:130px;max-width:130px;border:0;height:auto;line-height:100%;outline:none;text-decoration:none;" id="headerImage campaign-icon">
                              <!-- // End Module: Standard Header Image \\ -->
                            </td>
                          </tr>
                        </table>
                        <!-- // End Template Header \\ -->
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="top" style="border-collapse:collapse;">
                        <!-- // Begin Template Body \\ -->
                        <table border="0" cellpadding="0" cellspacing="0" width="450" id="templateBody">
                          <tr>
                            <td valign="top" class="bodyContent" style="border-collapse:collapse;background-color:#FFFFFF;">
                              <!-- // Begin Module: Standard Content \\ -->
                              <table border="0" cellpadding="20" cellspacing="0" width="100%" style="padding-bottom:10px;">
                                <tr>
                                  <td valign="top" style="padding-bottom:1rem;border-collapse:collapse;" class="mainContainer">
                                    <div style="text-align:center;color:#505050;font-family:Arial;font-size:14px;line-height:150%;">
                                      <h1 class="h1" style="color:#202020;display:block;font-family:Arial;font-size:24px;font-weight:bold;line-height:100%;margin-top:20px;margin-right:0;margin-bottom:20px;margin-left:0;text-align:center;">Reset Password Request</h1>
                                      <p style="text-align:left;">Hey, ${user.first_name}!.</p>
                                      <p style="text-align:left;">You are receiving this email because we received a password reset request for your account.</p>
                                      <p style="text-align:left;">This password reset link will expire in 60 minutes.</p>
                                      <a class="buttonText" href='${url}' target="_blank" style="color: #EF3A47;text-decoration: none;font-weight: normal;display: block;border: 2px solid #EF3A47;padding: 10px 80px;font-family: Arial;">Reset Password</a>
                                      <p style="text-align:left;">Regards,</p>
                                      <p style="text-align:left;">eAlaga</p>
                                      </div>
                                  </td>
                                </tr>
                              
                              </table>
                              <!-- // End Module: Standard Content \\ -->
                            </td>
                          </tr>
                        </table>
                        <!-- // End Template Body \\ -->
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="top" style="border-collapse:collapse;">
                        <!-- // Begin Support Section \\ -->
                        <table border="0" cellpadding="10" cellspacing="0" width="450" id="supportSection" style="background-color:white;font-family:arial;font-size:12px;border-top:1px solid #e4e4e4;">
                          <tr>
                            <td valign="top" class="supportContent" style="border-collapse:collapse;background-color:white;font-family:arial;font-size:12px;border-top:1px solid #e4e4e4;">
                              <!-- // Begin Module: Standard Footer \\ -->
                           
                            </td>
                          </tr>
                        </table>
                        <!-- // Begin Support Section \\ -->
                      </td>
                    </tr>
                  
                  </table>
                  <br>
                </td>
              </tr>
            </table>
          </center>
        </body>

        <style type="text/css">
  #outlook a{
      padding:0;
    }
    body{
      width:100% !important;
    }
    .ReadMsgBody{
      width:100%;
    }
    .ExternalClass{
      width:100%;
    }
    body{
      -webkit-text-size-adjust:none;
    }
    body{
      margin:0;
      padding:0;
    }
    img{
      border:0;
      height:auto;
      line-height:100%;
      outline:none;
      text-decoration:none;
    }
    table td{
      border-collapse:collapse;
    }
    #backgroundTable{
      height:100% !important;
      margin:0;
      padding:0;
      width:100% !important;
    }
  /*
  @tab Page
  @section background color
  @tip Set the background color for your email. You may want to choose one that matches your company's branding.
  @theme page
  */
    body,#backgroundTable{
      /*@editable*/background-color:#FAFAFA;
    }
  /*
  @tab Page
  @section email border
  @tip Set the border for your email.
  */
    #templateContainer{
      /*@editable*/border:1px none #DDDDDD;
    }
  /*
  @tab Page
  @section heading 1
  @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
  @style heading 1
  */
    h1,.h1{
      /*@editable*/color:#202020;
      display:block;
      /*@editable*/font-family:Arial;
      /*@editable*/font-size:24px;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:100%;
      margin-top:20px;
      margin-right:0;
      margin-bottom:20px;
      margin-left:0;
      /*@editable*/text-align:center;
    }
  /*
  @tab Page
  @section heading 2
  @tip Set the styling for all second-level headings in your emails.
  @style heading 2
  */
    h2,.h2{
      /*@editable*/color:#202020;
      display:block;
      /*@editable*/font-family:Arial;
      /*@editable*/font-size:30px;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:100%;
      margin-top:0;
      margin-right:0;
      margin-bottom:10px;
      margin-left:0;
      /*@editable*/text-align:center;
    }
  /*
  @tab Page
  @section heading 3
  @tip Set the styling for all third-level headings in your emails.
  @style heading 3
  */
    h3,.h3{
      /*@editable*/color:#202020;
      display:block;
      /*@editable*/font-family:Arial;
      /*@editable*/font-size:26px;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:100%;
      margin-top:0;
      margin-right:0;
      margin-bottom:10px;
      margin-left:0;
      /*@editable*/text-align:center;
    }
  /*
  @tab Page
  @section heading 4
  @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
  @style heading 4
  */
    h4,.h4{
      /*@editable*/color:#202020;
      display:block;
      /*@editable*/font-family:Arial;
      /*@editable*/font-size:22px;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:100%;
      margin-top:0;
      margin-right:0;
      margin-bottom:10px;
      margin-left:0;
      /*@editable*/text-align:center;
    }
  /*
  @tab Header
  @section preheader style
  @tip Set the background color for your email's preheader area.
  @theme page
  */
    #templatePreheader{
      /*@editable*/background-color:#FAFAFA;
    }
  /*
  @tab Header
  @section preheader text
  @tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
  */
    .preheaderContent div{
      /*@editable*/color:#505050;
      /*@editable*/font-family:Arial;
      /*@editable*/font-size:10px;
      /*@editable*/line-height:100%;
      /*@editable*/text-align:left;
    }
  /*
  @tab Header
  @section preheader link
  @tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
  */
    .preheaderContent div a:link,.preheaderContent div a:visited,.preheaderContent div a .yshortcuts {
      /*@editable*/color:#336699;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    .preheaderContent img{
      display:inline;
      height:auto;
      margin-bottom:10px;
      max-width:280px;
    }
  /*
  @tab Header
  @section header style
  @tip Set the background color and border for your email's header area.
  @theme header
  */
    #templateHeader{
      /*@editable*/background-color:#FFFFFF;
      /*@editable*/border-bottom:0;
    }
  /*
  @tab Header
  @section header text
  @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
  */
    .headerContent{
      /*@editable*/color:#202020;
      /*@editable*/font-family:Arial;
      /*@editable*/font-size:34px;
      /*@editable*/font-weight:bold;
      /*@editable*/line-height:100%;
      /*@editable*/padding:0;
      /*@editable*/text-align:left;
      /*@editable*/vertical-align:middle;
      background-color: #FAFAFA;
        padding-bottom: 14px;
    }
  /*
  @tab Header
  @section header link
  @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
  */
    .headerContent a:link,.headerContent a:visited,.headerContent a .yshortcuts {
      /*@editable*/color:#336699;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    #headerImage{
      height:auto;
      max-width:400px !important;
    }
  /*
  @tab Body
  @section body style
  @tip Set the background color for your email's body area.
  */
    #templateContainer,.bodyContent{
      /*@editable*/background-color:#FFFFFF;
    }
  /*
  @tab Body
  @section body text
  @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
  @theme main
  */
    .bodyContent div{
      /*@editable*/color:#505050;
      /*@editable*/font-family:Arial;
      /*@editable*/font-size:14px;
      /*@editable*/line-height:150%;
      /*@editable*/text-align:left;
    }
  /*
  @tab Body
  @section body link
  @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
  */
    .bodyContent div a:link,.bodyContent div a:visited,.bodyContent div a .yshortcuts {
      /*@editable*/color:#336699;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    .bodyContent img{
      display:inline;
      height:auto;
      margin-bottom:10px;
      max-width:280px;
    }
  /*
  @tab Footer
  @section footer style
  @tip Set the background color and top border for your email's footer area.
  @theme footer
  */
    #templateFooter{
      /*@editable*/background-color:#FFFFFF;
      /*@editable*/border-top:0;
    }
  /*
  @tab Footer
  @section footer text
  @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
  @theme footer
  */
    .footerContent {
      background-color: #fafafa;
    }
    .footerContent div{
      /*@editable*/color:#707070;
      /*@editable*/font-family:Arial;
      /*@editable*/font-size:11px;
      /*@editable*/line-height:150%;
      /*@editable*/text-align:left;
    }
  /*
  @tab Footer
  @section footer link
  @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
  */
    .footerContent div a:link,.footerContent div a:visited,.footerContent div a .yshortcuts {
      /*@editable*/color:#336699;
      /*@editable*/font-weight:normal;
      /*@editable*/text-decoration:underline;
    }
    .footerContent img{
      display:inline;
    }
  /*
  @tab Footer
  @section social bar style
  @tip Set the background color and border for your email's footer social bar.
  @theme footer
  */
    #social{
      /*@editable*/background-color:#FAFAFA;
      /*@editable*/border:0;
    }
  /*
  @tab Footer
  @section social bar style
  @tip Set the background color and border for your email's footer social bar.
  */
    #social div{
      /*@editable*/text-align:left;
    }
  /*
  @tab Footer
  @section utility bar style
  @tip Set the background color and border for your email's footer utility bar.
  @theme footer
  */
    #utility{
      /*@editable*/background-color:#FFFFFF;
      /*@editable*/border:0;
    }
  /*
  @tab Footer
  @section utility bar style
  @tip Set the background color and border for your email's footer utility bar.
  */
    #utility div{
      /*@editable*/text-align:left;
    }
    #monkeyRewards img{
      display:inline;
      height:auto;
      max-width:280px;
    }


  /*
  ATAVIST CUSTOM STYLES 
   */

  .buttonText {
    color: #4A90E2;
    text-decoration: none;
    font-weight: normal;
    display: block;
    border: 2px solid #585858;
    padding: 10px 80px;
    font-family: Arial;
  }

  #supportSection, .supportContent {
    background-color: white;
    font-family: arial;
    font-size: 12px;
    border-top: 1px solid #e4e4e4;
  }

  .bodyContent table {
    padding-bottom: 10px;
  }


  .footerContent p {
    margin: 0;
    margin-top: 2px;
  }

  .headerContent.centeredWithBackground {
    background-color: #F4EEE2;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
      
   @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
          h1 {
              font-size: 40px !important;
          }
          
          .content {
              font-size: 22px !important;
          }
          
          .bodyContent p {
              font-size: 22px !important;
          }
          
          .buttonText {
              font-size: 22px !important;
          }
          
          p {
              
              font-size: 16px !important;
              
          }
          
          .footerContent p {
              padding-left: 5px !important;
          }
          
          .mainContainer {
              padding-bottom: 0 !important;   
          }
      }
    </style>
        
        `,
    });

    res.status(200).json({
      success: true,
      message: "reset link sent to email",
    });
    // console.log(url)
    // console.log(user)
  } catch (err) {
    res.status(200).json({
      success: false,
    });
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { newPassword, newConfirmPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select("+password");
  // console.log(user)

  if (!user) {
    return res.status(201).json({
      message: "tokenExpired",
    });
  }

  if (!newPassword) {
    return res.status(400).send({
      newPassword: "Please enter new password",
    });
  }

  if (!newConfirmPassword) {
    return res.status(400).send({
      newConfirmPassword: "Please confirm your password",
    });
  }

  if (newPassword != newConfirmPassword) {
    return res.status(400).send({
      newConfirmPassword: "Confirm password is not matched",
    });
  }

  // Setup new password
  user.password = newPassword;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  const activitylogs = await ActivityLogs.create({
    user_id: user._id,
    description: "Reset the password"
  });

  await Log.create({
    date: new Date(),
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: Date.now() - req._startTime,
    referrer: req.headers.referer || '',
    userAgent: req.headers['user-agent'] || '',
    platform:"web",
  });

  console.log(activitylogs)

  await user.save();

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  // console.log(token);

  return res.json({ token, user });
});

exports.profileEdit = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const health = await Health.find();
  const health_user = await User.findById(id).populate("health_id");
  const checkhealth_user = health_user.health_id;
  const checkrequirement_user = user.requirement_id;
  const Totalcheckrequirement_user = user.requirement_id;
  // console.log(checkrequirement_user)

  const user_idss = req?.user._id

  const activitylogs = await ActivityLogs.create({
    user_id: user_idss,
    description: "View the profile"
  });

  await Log.create({
    date: new Date(),
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: Date.now() - req._startTime,
    referrer: req.headers.referer || '',
    userAgent: req.headers['user-agent'] || '',
    platform:"web",
  });

  console.log(activitylogs)

  
  res.json({
    user,
    health,
    checkhealth_user,
    checkrequirement_user,
    Totalcheckrequirement_user,
  });
});

exports.profileUpdate = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const {
    first_name,
    middle_name,
    last_name,
    age,
    birth_date,
    house_purok_no,
    street,
    barangay,
    gender,
    confirm,
    health_id,
  } = req.body;

  const { profile_picture, valid_id } = req.files;

  if (age < 60) {
    return res.status(400).send({
      birth_date: "Birth date is not valid.",
      age: "Age must be 60 or above. ",
    });
  }

  const userss = await User.findByIdAndUpdate(
    id,
    {
      $unset: { health_id: "" },
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!first_name || first_name === "undefined") {
    return res.status(400).send({
      first_name: "Please enter your first_name",
    });
  }

  if (!middle_name || middle_name === "undefined") {
    return res.status(400).send({
      middle_name: "Please enter your middle_name",
    });
  }

  if (!last_name || last_name === "undefined") {
    return res.status(400).send({
      last_name: "Please enter your last_name",
    });
  }

  if (!birth_date || birth_date === "undefined") {
    return res.status(400).send({
      birth_date: "Please enter your birth_date",
    });
  }

  if (!age || age === "undefined") {
    return res.status(400).send({
      age: "Please enter your age",
    });
  }

  if (!gender || gender === "undefined") {
    return res.status(400).send({
      gender: "Please enter your gender",
    });
  }

  if (!house_purok_no || house_purok_no === "undefined") {
    return res.status(400).send({
      house_purok_no: "Please enter your house_purok_no",
    });
  }

  if (!street || street === "undefined") {
    return res.status(400).send({
      street: "Please enter your street",
    });
  }

  if (!barangay || barangay === "undefined") {
    return res.status(400).send({
      barangay: "Please enter your barangay",
    });
  }

  if (!barangay || barangay === "undefined") {
    return res.status(400).send({
      barangay: "Please enter your barangay",
    });
  }

  if (!profile_picture || profile_picture === "undefined") {
    return res.status(400).send({
      profile_picture: "Please upload your new profile picture",
    });
  }

  if (!valid_id || valid_id === "undefined") {
    return res.status(400).send({
      valid_id: "Please upload your valid id",
    });
  }

  if (confirm === "false") {
    return res.status(400).send({
      confirm: "Please check this box if you want to proceed",
    });
  }

  const newUserData = {
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,
    age: age,
    birth_date: birth_date,
    address: {
      house_purok_no: house_purok_no,
      street: street,
      barangay: barangay,
    },
    gender: gender,
    health_id: health_id,
    account_verified: "pending",
  };

  if (profile_picture !== "") {
    // const result = await cloudinary.v2.uploader.upload(profile_picture, {
    //     folder: 'profile_picture',
    // })

    // newUserData.profile_picture = {
    //     public_id: result.public_id,
    //     url: result.secure_url
    // }

    //============= upload newww LARGE FILE
    function bufferToStream(buffer) {
      var stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      return stream;
    }
    const response = await drive.files.create({
      requestBody: {
        parents: ["1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW"],
        name: profile_picture.name,
      },
      media: {
        body: bufferToStream(profile_picture.data),
      },
    });

    const fileId = response.data.id;

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    //============= upload newww BASE64

    // const uploadImg = profile_picture.split(/,(.+)/)[1];
    // const buf = new Buffer.from(uploadImg, "base64"); // Added
    // const bs = new stream.PassThrough(); // Added
    // bs.end(buf); // Added

    // const response = await drive.files.create({
    //   requestBody: {
    //     'parents':  ['1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW'],
    //   },
    //   media: {
    //     body: bs,
    //   },
    // });
    // const fileId = response.data.id;

    // await drive.permissions.create({
    //   fileId: fileId,
    //   requestBody: {
    //     role: 'reader',
    //     type: 'anyone',
    //   },
    // });
    // const result2 = await drive.files.get({
    //   fileId: fileId,
    //   fields: 'webViewLink, webContentLink',
    // });

    newUserData.profile_picture = {
      public_id: fileId,
      url: `https://drive.google.com/uc?export=view&id=${fileId}`,
    };
  }

  if (valid_id !== "") {
    // const result = await cloudinary.v2.uploader.upload(profile_picture, {
    //     folder: 'profile_picture',
    // })

    // newUserData.profile_picture = {
    //     public_id: result.public_id,
    //     url: result.secure_url
    // }

    //============= upload newww LARGE FILE
    function bufferToStream(buffer) {
      var stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      return stream;
    }
    const response = await drive.files.create({
      requestBody: {
        parents: ["1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW"],
        name: valid_id.name,
      },
      media: {
        body: bufferToStream(valid_id.data),
      },
    });

    const fileId = response.data.id;

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    //============= upload newww BASE64

    // const uploadImg = profile_picture.split(/,(.+)/)[1];
    // const buf = new Buffer.from(uploadImg, "base64"); // Added
    // const bs = new stream.PassThrough(); // Added
    // bs.end(buf); // Added

    // const response = await drive.files.create({
    //   requestBody: {
    //     'parents':  ['1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW'],
    //   },
    //   media: {
    //     body: bs,
    //   },
    // });
    // const fileId = response.data.id;

    // await drive.permissions.create({
    //   fileId: fileId,
    //   requestBody: {
    //     role: 'reader',
    //     type: 'anyone',
    //   },
    // });
    // const result2 = await drive.files.get({
    //   fileId: fileId,
    //   fields: 'webViewLink, webContentLink',
    // });

    newUserData.valid_id = {
      public_id: fileId,
      url: `https://drive.google.com/uc?export=view&id=${fileId}`,
    };
  }

  const user = await User.findByIdAndUpdate(id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  //  console.log(newUserData)

  const activitylogs = await ActivityLogs.create({
    user_id: user._id,
    description: "Updated the profile"
  });

  await Log.create({
    date: new Date(),
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: Date.now() - req._startTime,
    referrer: req.headers.referer || '',
    userAgent: req.headers['user-agent'] || '',
    platform:"web",
  });

  const notification = await Notification.create({
    user_id: user._id,
    type: "verification_process",
    description: "Hey! Thank you for completing the verification process for your account at Ealaga. We appreciate your cooperation. Please be patient and wait for our admin or personnel to verify your account. We understand the importance of ensuring the security of our users, and we are working diligently to process your verification as quickly as possible. Thank you for your understanding and continued support."
  });

  console.log(activitylogs)


  return res.status(200).json({
    success: true,
    message: "success",
  });
});

exports.profileUpdateSubmit = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const {
    first_name,
    middle_name,
    last_name,
    age,
    birth_date,
    house_purok_no,
    street,
    barangay,
    gender,
  } = req.body;

  const userRole = await User.findById(id);

  if (userRole.role == "admin") {
    if (!first_name || first_name === "undefined") {
      return res.status(400).send({
        first_name: "Please enter your first_name",
      });
    }
  
    if (!middle_name || middle_name === "undefined") {
      return res.status(400).send({
        middle_name: "Please enter your middle_name",
      });
    }
  
    if (!last_name || last_name === "undefined") {
      return res.status(400).send({
        last_name: "Please enter your last_name",
      });
    }

    const newUserData = {
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
    };

    const user = await User.findByIdAndUpdate(id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      message: "success",
    });

  }
  
  if (age < 60) {
    return res.status(400).send({
      birth_date: "Birth date is not valid.",
      age: "Age must be 60 or above. ",
    });
  }

  const profile_picture = req.files?.profile_picture;
  const valid_id = req.files?.valid_id;

  if (!first_name || first_name === "undefined") {
    return res.status(400).send({
      first_name: "Please enter your first_name",
    });
  }

  if (!middle_name || middle_name === "undefined") {
    return res.status(400).send({
      middle_name: "Please enter your middle_name",
    });
  }

  if (!last_name || last_name === "undefined") {
    return res.status(400).send({
      last_name: "Please enter your last_name",
    });
  }

  if (!birth_date || birth_date === "undefined") {
    return res.status(400).send({
      birth_date: "Please enter your birth_date",
    });
  }

  if (!age || age === "undefined") {
    return res.status(400).send({
      age: "Please enter your age",
    });
  }

  if (!gender || gender === "undefined") {
    return res.status(400).send({
      gender: "Please enter your gender",
    });
  }

  if (!house_purok_no || house_purok_no === "undefined") {
    return res.status(400).send({
      house_purok_no: "Please enter your house_purok_no",
    });
  }

  if (!street || street === "undefined") {
    return res.status(400).send({
      street: "Please enter your street",
    });
  }

  if (!barangay || barangay === "undefined") {
    return res.status(400).send({
      barangay: "Please enter your barangay",
    });
  }

  const newUserData = {
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,
    age: age,
    birth_date: birth_date,
    address: {
      house_purok_no: house_purok_no,
      street: street,
      barangay: barangay,
    },
    gender: gender,
  };

  if (profile_picture) {
    //delete last picture
    const user = await User.findById(id);
    const image_id = user.profile_picture.public_id;
    // const responsedelete = await drive.files.delete({
    //   fileId: image_id,
    // });

    //============= upload newww LARGE FILE
    function bufferToStream(buffer) {
      var stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      return stream;
    }
    const response = await drive.files.create({
      requestBody: {
        parents: ["1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW"],
        name: profile_picture.name,
      },
      media: {
        body: bufferToStream(profile_picture.data),
      },
    });
    // console.log(bufferToStream(profile_picture.data));
    const fileId = response.data.id;

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    //============= upload newww BASE64

    // const uploadImg = profile_picture.split(/,(.+)/)[1];
    // const buf = new Buffer.from(uploadImg, "base64"); // Added
    // const bs = new stream.PassThrough(); // Added
    // bs.end(buf); // Added

    // const response = await drive.files.create({
    //   requestBody: {
    //     'parents':  ['1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW'],
    //   },
    //   media: {
    //     body: bs,
    //   },
    // });
    // const fileId = response.data.id;

    // await drive.permissions.create({
    //   fileId: fileId,
    //   requestBody: {
    //     role: 'reader',
    //     type: 'anyone',
    //   },
    // });
    // const result2 = await drive.files.get({
    //   fileId: fileId,
    //   fields: 'webViewLink, webContentLink',
    // });

    // console.log(fileId);
    //================================================================

    // const user = await User.findById(id)

    // const image_id = user.profile_picture.public_id;

    // const res = await cloudinary.v2.uploader.destroy(image_id);

    // const result = await cloudinary.v2.uploader.upload(profile_picture, {
    //     folder: 'profile_picture',
    // })

    newUserData.profile_picture = {
      public_id: fileId,
      url: `https://drive.google.com/uc?export=view&id=${fileId}`,
    };
  }

  if (valid_id) {
    //delete last picture
    const user = await User.findById(id);
    const image_id = user.valid_id.public_id;
    // const responsedelete = await drive.files.delete({
    //   fileId: image_id,
    // });

    //============= upload newww LARGE FILE
    function bufferToStream(buffer) {
      var stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      return stream;
    }
    const response = await drive.files.create({
      requestBody: {
        parents: ["1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW"],
        name: valid_id.name,
      },
      media: {
        body: bufferToStream(valid_id.data),
      },
    });
    // console.log(bufferToStream(valid_id.data));
    const fileId = response.data.id;

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    //============= upload newww BASE64

    // const uploadImg = profile_picture.split(/,(.+)/)[1];
    // const buf = new Buffer.from(uploadImg, "base64"); // Added
    // const bs = new stream.PassThrough(); // Added
    // bs.end(buf); // Added

    // const response = await drive.files.create({
    //   requestBody: {
    //     'parents':  ['1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW'],
    //   },
    //   media: {
    //     body: bs,
    //   },
    // });
    // const fileId = response.data.id;

    // await drive.permissions.create({
    //   fileId: fileId,
    //   requestBody: {
    //     role: 'reader',
    //     type: 'anyone',
    //   },
    // });
    // const result2 = await drive.files.get({
    //   fileId: fileId,
    //   fields: 'webViewLink, webContentLink',
    // });

    // console.log(fileId);
    //================================================================

    // const user = await User.findById(id)

    // const image_id = user.profile_picture.public_id;

    // const res = await cloudinary.v2.uploader.destroy(image_id);

    // const result = await cloudinary.v2.uploader.upload(profile_picture, {
    //     folder: 'profile_picture',
    // })

    newUserData.valid_id = {
      public_id: fileId,
      url: `https://drive.google.com/uc?export=view&id=${fileId}`,
    };
  }

  const user = await User.findByIdAndUpdate(id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  const activitylogs = await ActivityLogs.create({
    user_id: user._id,
    description: "Updated the profile - personal information"
  });

  await Log.create({
    date: new Date(),
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: Date.now() - req._startTime,
    referrer: req.headers.referer || '',
    userAgent: req.headers['user-agent'] || '',
    platform:"web",
  });

  console.log(activitylogs)

  return res.status(200).json({
    success: true,
    message: "success",
  });
});

exports.profileupdateCredential = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { user_name, phone, email, oldPassword, newPassword, confirmPassword } =
    req.body;

  // console.log(id, user_name,phone,email,oldPassword, newPassword, confirmPassword)

  const user = await User.findById(id).select("+password");

  const emails = await User.find({ email: { $ne: user.email } }).exec();
  const usernames = await User.find({
    user_name: { $ne: user.user_name },
  }).exec();

  var userAllEmail = emails.map(function (emailsss) {
    return emailsss.email;
  });
  var userAllUsername = usernames.map(function (usernamessss) {
    return usernamessss.user_name;
  });

  if (user.email !== email) {
    if (email == userAllEmail) {
      return res.status(400).send({
        email: "Email is already in use.",
      });
    }
  }

  if (user.user_name !== user_name) {
    if (user_name == userAllUsername) {
      return res.status(400).send({
        user_name: "User_name is already in use.",
      });
    }
  }

  if (oldPassword !== "undefined") {
    const isMatched = await user.comparePassword(oldPassword);

    if (!isMatched) {
      return res.status(400).send({
        oldPassword: "Old password is incorrect",
      });
    } else if (newPassword == "undefined") {
      return res.status(400).send({
        newPassword: "Please enter new password",
      });
    } else if (confirmPassword == "undefined") {
      return res.status(400).send({
        confirmPassword: "Please enter confirmPassword",
      });
    } else if (newPassword != confirmPassword) {
      return res.status(400).send({
        confirmPassword: "Confirm password is not matched",
      });
    } else {
      user.password = newPassword;
      await user.save();

      const newUserDatass = {
        user_name: user_name,
        email: email,
        phone: phone,
      };

      await User.findByIdAndUpdate(id, newUserDatass, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    }
  }

  if (phone !== "undefined") {
    const newUserDatas = {
      user_name: user_name,
      email: email,
      phone: phone,
    };

    await User.findByIdAndUpdate(id, newUserDatas, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

  }

  const newUserData = {
    user_name: user_name,
    email: email,
  };

  await User.findByIdAndUpdate(id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  const activitylogs = await ActivityLogs.create({
    user_id: user._id,
    description: "Updated the profile - credential"
  });

  await Log.create({
    date: new Date(),
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: Date.now() - req._startTime,
    referrer: req.headers.referer || '',
    userAgent: req.headers['user-agent'] || '',
    platform:"web",
  });

  console.log(activitylogs)

  return res.status(200).json({
    success: true,
    message: "success",
  });
});

exports.profileUpdateHealth = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { confirm } = req.body;

  if (confirm === "false") {
    return res.status(400).send({
      confirm: "Please check this box if you want to proceed",
    });
  }

  if (!req.files) {
    const userss = await User.findByIdAndUpdate(
      id,
      {
        $unset: { health_id: "" },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    const user = await User.findByIdAndUpdate(
      id,
      {
        health_id: req.body.health_id,
        requirement_id: req.body.requirement_id,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    const activitylogs = await ActivityLogs.create({
      user_id: user._id,
      description: "Updated the profile - health information"
    });

    await Log.create({
      date: new Date(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: Date.now() - req._startTime,
      referrer: req.headers.referer || '',
      userAgent: req.headers['user-agent'] || '',
      platform:"web",
    });
  
    console.log(activitylogs)

    // console.log(req.body.health_id)
    return res.status(200).json({
      success: true,
      message: "success",
    });
  } else {
    const { medical_certificate } = req.files;

    console.log(medical_certificate);

    const userss = await User.findByIdAndUpdate(
      id,
      {
        $unset: { health_id: "" },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    const user = await User.findByIdAndUpdate(
      id,
      { health_id: req.body.health_id },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    //============= upload newww LARGE FILE
    function bufferToStream(buffer) {
      var stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      return stream;
    }
    const response = await drive.files.create({
      requestBody: {
        parents: ["1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW"],
        name: medical_certificate.name,
      },
      media: {
        body: bufferToStream(medical_certificate.data),
      },
    });

    const fileId = response.data.id;

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const userMedical_certificate = await User.findByIdAndUpdate(
      id,
      {
        medical_certificate: {
          public_id: fileId,
          url: `https://drive.google.com/uc?export=view&id=${fileId}`,
        },
      },
      {
        new: true,
        runValidators: true,
        useFindandModify: false,
      }
    );

    const activitylogs = await ActivityLogs.create({
      user_id: user._id,
      description: "Updated the profile - health information"
    });

    await Log.create({
      date: new Date(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: Date.now() - req._startTime,
      referrer: req.headers.referer || '',
      userAgent: req.headers['user-agent'] || '',
      platform:"web",
    });
  
    console.log(activitylogs)

    // console.log(req.body.health_id)
    return res.status(200).json({
      success: true,
      message: "success",
    });
  }
});

//////========================= Accept attendees

exports.readAttendees = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { processed_by } = req.body;
  const str = id.slice(1, -1);
  const mongoose = require("mongoose");

  if (mongoose.Types.ObjectId.isValid(str)) {
    const readUsers = await Schedule.findById(
      mongoose.Types.ObjectId(str)
    ).populate("user_id");
    // console.log(user)

    if (readUsers) {
      const nowss = moment().startOf("day");
      const attendeeDate = moment(readUsers.date_schedule);

      if (attendeeDate.isSame(moment(nowss).startOf("day"), "day")) {
        if (readUsers.status == "attended") {
          const readUser = await Schedule.findById(
            mongoose.Types.ObjectId(str)
          ).populate("user_id");
          return res.status(200).json({
            success: true,
            readUser,
            schedule_status: "attended",
          });
        } else {
          const readUser = await Schedule.findByIdAndUpdate(
            mongoose.Types.ObjectId(str),
            { status: "attended", processed_by: processed_by },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            }
          ).populate("user_id");

          const activitylogs = await ActivityLogs.create({
            user_id: processed_by,
            description: "Accepted the " + readUser.category + " service of " + readUser?.user_id?.user_name
          });

          await Log.create({
            date: new Date(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: Date.now() - req._startTime,
            referrer: req.headers.referer || '',
            userAgent: req.headers['user-agent'] || '',
            platform:"web",
          });
        
          console.log(activitylogs)

          return res.status(200).json({
            success: true,
            readUser,
          });
        }
      } else {
        const readUser = await Schedule.findById(
          mongoose.Types.ObjectId(str)
        ).populate("user_id");
        return res.status(200).json({
          success: true,
          readUser,
          today_schedule: "false",
        });
      }
    } else {
      return res.status(200).json({
        success: true,
        qr_code: "false",
      });
    }
  } else {
    return res.status(200).json({
      success: true,
      qr_code: "false",
    });
  }
});

exports.acceptAttendees = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { processed_by } = req.body;

  console.log(processed_by);

  const schedule = await Schedule.findByIdAndUpdate(
    id,
    { status: "attended", processed_by: processed_by},
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  ).populate("user_id");

  

  const activitylogs = await ActivityLogs.create({
    user_id: processed_by,
    description: "Accepted the " + schedule.category + " service of " + schedule?.user_id?.user_name
  });

  await Log.create({
    date: new Date(),
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: Date.now() - req._startTime,
    referrer: req.headers.referer || '',
    userAgent: req.headers['user-agent'] || '',
    platform:"web",
  });

  console.log(activitylogs)



  return res.status(200).json({
    success: true,
  });
});

exports.QRacceptAttendees = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const str = id.slice(1, -1);
  const mongoose = require("mongoose");

  const user = await Schedule.findById(mongoose.Types.ObjectId(str));
  console.log(user);

  if (user.status == "attended") {
    return res.status(400).send();
  }
  await Schedule.findByIdAndUpdate(
    mongoose.Types.ObjectId(str),
    { status: "attended" },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  return res.status(200).json({
    success: true,
  });
});

//=====================chat

exports.allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { first_name: { $regex: req.query.search, $options: "i" } }, //case insensitive
          { last_name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  // const users = await User.find(keyword);
  //not including the logged in user
  // console.log(users, 'matching search users');
  res.send(users);
});

//////========================= admin User CRUD

exports.read = catchAsyncErrors(async (req, res, next) => {

  console.log(req.user.role)
  
  if(req.user.role == "admin"){

    const user = await User.find();
  const health = await Health.find();

  //------------------------------- restrict all user who had a multiple not attended in booking
  const usersToRestrict = await User.find({
    status: { $in: ["active", "restricted"] },
  });

  const futureDate = moment().add(10, "days");
  // console.log(futureDate);

  for (const user of usersToRestrict) {
    // console.log(user);
    if (
      user.status === "restricted" &&
      user.restrictionExpiration <= new Date()
    ) {
      user.status = "active";
      user.restrictionExpiration = null;
      await user.save();
      console.log(`User ${user.first_name} has been activated.`);
    } else {
      let schedules;

      if (user.lastRestricted) {
        schedules = await Schedule.find({
          user_id: user._id,
          date_schedule: { $gte: user.lastRestricted },
        });
      } else {
        schedules = await Schedule.find({ user_id: user._id });
      }

      // const schedules = await Schedule.find({ user_id: user._id, date_schedule: { $gte: user.lastRestricted } });
      // console.log(schedules)
      let unattendedCount = 0;
      for (const schedule of schedules) {
        if (schedule.status === "not attended") {
          unattendedCount += 1;
          user.notAttendedCount += 1;
        }
      }
      if (unattendedCount >= 5) {
        user.status = "restricted";
        user.lastRestricted = new Date();
        user.restrictionExpiration = moment().add(7, "days");
        user.notAttendedCount = 0;
        await user.save();
        console.log(`User ${user.first_name} has been restricted.`);
      }
    }
  }

  const user_idss = req?.user._id

  const activitylogs = await ActivityLogs.create({
    user_id: user_idss,
    description: "View the list of User"
  });

  await Log.create({
    date: new Date(),
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: Date.now() - req._startTime,
    referrer: req.headers.referer || '',
    userAgent: req.headers['user-agent'] || '',
    platform:"web",
  });

  console.log(activitylogs)

 

  // console.log(user)

  res.json({ user, health });

    
  }else{
    const user = await User.find({ role: "client" });
  const health = await Health.find();

  //------------------------------- restrict all user who had a multiple not attended in booking
  const usersToRestrict = await User.find({
    status: { $in: ["active", "restricted"] },
  });

  const futureDate = moment().add(10, "days");
  // console.log(futureDate);

  for (const user of usersToRestrict) {
    // console.log(user);
    if (
      user.status === "restricted" &&
      user.restrictionExpiration <= new Date()
    ) {
      user.status = "active";
      user.restrictionExpiration = null;
      await user.save();
      console.log(`User ${user.first_name} has been activated.`);
    } else {
      let schedules;

      if (user.lastRestricted) {
        schedules = await Schedule.find({
          user_id: user._id,
          date_schedule: { $gte: user.lastRestricted },
        });
      } else {
        schedules = await Schedule.find({ user_id: user._id });
      }

      // const schedules = await Schedule.find({ user_id: user._id, date_schedule: { $gte: user.lastRestricted } });
      // console.log(schedules)
      let unattendedCount = 0;
      for (const schedule of schedules) {
        if (schedule.status === "not attended") {
          unattendedCount += 1;
          user.notAttendedCount += 1;
        }
      }
      if (unattendedCount >= 5) {
        user.status = "restricted";
        user.lastRestricted = new Date();
        user.restrictionExpiration = moment().add(7, "days");
        user.notAttendedCount = 0;
        await user.save();
        console.log(`User ${user.first_name} has been restricted.`);
      }
    }
  }

  const user_idss = req?.user._id

  const activitylogs = await ActivityLogs.create({
    user_id: user_idss,
    description: "View the list of User"
  });

  await Log.create({
    date: new Date(),
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: Date.now() - req._startTime,
    referrer: req.headers.referer || '',
    userAgent: req.headers['user-agent'] || '',
    platform:"web",
  });

  console.log(activitylogs)

 

  // console.log(user)

  res.json({ user, health });

  }
  
});

exports.add = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      age,
      birth_date,
      house_purok_no,
      street,
      barangay,
      gender,
      health_id,
      user_name,
      phone,
      email,
      password,
      confirmPassword,
      user_type,
    } = req.body;

    if (user_type == "client") {
      if (age < 60) {
        return res.status(400).send({
          birth_date: "Birth date is not valid.",
          age: "Age must be 60 or above. ",
        });
      }

      const profile_picture = req.files?.profile_picture;
      const valid_id = req.files?.valid_id;

      if (!first_name || first_name === "undefined") {
        return res.status(400).send({
          first_name: "Please enter your first_name",
        });
      }

      if (!middle_name || middle_name === "undefined") {
        return res.status(400).send({
          middle_name: "Please enter your middle_name",
        });
      }

      if (!last_name || last_name === "undefined") {
        return res.status(400).send({
          last_name: "Please enter your last_name",
        });
      }

      if (!birth_date || birth_date === "undefined") {
        return res.status(400).send({
          birth_date: "Please enter your birth_date",
        });
      }

      if (!age || age === "undefined") {
        return res.status(400).send({
          age: "Please enter your age",
        });
      }

      if (!gender || gender === "undefined") {
        return res.status(400).send({
          gender: "Please enter your gender",
        });
      }

      if (!house_purok_no || house_purok_no === "undefined") {
        return res.status(400).send({
          house_purok_no: "Please enter your house_purok_no",
        });
      }

      if (!street || street === "undefined") {
        return res.status(400).send({
          street: "Please enter your street",
        });
      }

      if (!barangay || barangay === "undefined") {
        return res.status(400).send({
          barangay: "Please enter your barangay",
        });
      }
      if (!profile_picture || profile_picture === "undefined") {
        return res.status(400).send({
          profile_picture: "Please upload profile_picture",
        });
      }
      if (!valid_id || valid_id === "undefined") {
        return res.status(400).send({
          valid_id: "Please upload valid_id",
        });
      }
      if (!email || email === "undefined") {
        return res.status(400).send({
          email: "Please enter your email",
        });
      }
      const existingUser = await User.findOne({ email }).exec();

      if (existingUser) {
        return res.status(400).send({
          email: "Email is already in use.",
        });
      }
      if (!user_name || user_name === "undefined") {
        return res.status(400).send({
          user_name: "Please enter your user_name",
        });
      }

      const existingUsername = await User.findOne({ user_name }).exec();
      if (existingUsername) {
        return res.status(400).send({
          user_name: "Username is already in use.",
        });
      }
      if (!phone || phone === "undefined") {
        return res.status(400).send({
          phone: "Please enter your Phone",
        });
      }
      if (phone.length !== 10) {
        return res.status(400).send({
          phone: "Invalid phone number. Phone number must be 10 digits long.",
        });
      }

      if (!password || password === "undefined") {
        return res.status(400).send({
          password: "Please enter your password",
        });
      }
      if (!confirmPassword || confirmPassword === "undefined") {
        return res.status(400).send({
          confirmPassword: "Please enter your confirmPassword",
        });
      }
      if (password != confirmPassword) {
        return res.status(400).send({
          confirmPassword: "Confirm password is not matched.",
        });
      }

      const newUserData = {
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        age: age,
        birth_date: birth_date,
        address: {
          house_purok_no: house_purok_no,
          street: street,
          barangay: barangay,
        },
        gender: gender,
        user_name: user_name,
        email: email,
        phone: phone,
        password: password,
        role: "client",
        status: "active",
        account_verified: "verified",
        email_verified: true,
      };

      if (health_id) {
        newUserData.health_id = health_id;
      }

      if (profile_picture) {
        //============= upload newww LARGE FILE
        function bufferToStream(buffer) {
          var stream = new Readable();
          stream.push(buffer);
          stream.push(null);

          return stream;
        }
        const response = await drive.files.create({
          requestBody: {
            parents: ["1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW"],
            name: profile_picture.name,
          },
          media: {
            body: bufferToStream(profile_picture.data),
          },
        });
        // console.log(bufferToStream(profile_picture.data));
        const fileId = response.data.id;

        await drive.permissions.create({
          fileId: fileId,
          requestBody: {
            role: "reader",
            type: "anyone",
          },
        });

        newUserData.profile_picture = {
          public_id: fileId,
          url: `https://drive.google.com/uc?export=view&id=${fileId}`,
        };
      }

      if (valid_id) {
        //============= upload newww LARGE FILE
        function bufferToStream(buffer) {
          var stream = new Readable();
          stream.push(buffer);
          stream.push(null);

          return stream;
        }
        const response = await drive.files.create({
          requestBody: {
            parents: ["1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW"],
            name: valid_id.name,
          },
          media: {
            body: bufferToStream(valid_id.data),
          },
        });
        // console.log(bufferToStream(valid_id.data));
        const fileId = response.data.id;

        await drive.permissions.create({
          fileId: fileId,
          requestBody: {
            role: "reader",
            type: "anyone",
          },
        });

        newUserData.valid_id = {
          public_id: fileId,
          url: `https://drive.google.com/uc?export=view&id=${fileId}`,
        };
      }

      const user = await User.create(newUserData);

      const user_idss = req?.user._id

          const activitylogs = await ActivityLogs.create({
            user_id: user_idss,
            description: "Created new user"
          });

          await Log.create({
            date: new Date(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: Date.now() - req._startTime,
            referrer: req.headers.referer || '',
            userAgent: req.headers['user-agent'] || '',
            platform:"web",
          });

          console.log(activitylogs)
          
      res.status(201).json({
        success: true,
        user,
      });

    } else if (user_type == "personnel") {
      const profile_picture = req.files?.profile_picture;
      const valid_id = req.files?.valid_id;

      if (!first_name || first_name === "undefined") {
        return res.status(400).send({
          first_name: "Please enter your first_name",
        });
      }

      if (!middle_name || middle_name === "undefined") {
        return res.status(400).send({
          middle_name: "Please enter your middle_name",
        });
      }

      if (!last_name || last_name === "undefined") {
        return res.status(400).send({
          last_name: "Please enter your last_name",
        });
      }

      if (!birth_date || birth_date === "undefined") {
        return res.status(400).send({
          birth_date: "Please enter your birth_date",
        });
      }
      if (age < 18) {
        return res.status(400).send({
          birth_date: "Birth date is not valid.",
          age: "Age must be 60 or above. ",
        });
      }

      if (!age || age === "undefined") {
        return res.status(400).send({
          age: "Please enter your age",
        });
      }

      if (!gender || gender === "undefined") {
        return res.status(400).send({
          gender: "Please enter your gender",
        });
      }

      if (!house_purok_no || house_purok_no === "undefined") {
        return res.status(400).send({
          house_purok_no: "Please enter your house_purok_no",
        });
      }

      if (!street || street === "undefined") {
        return res.status(400).send({
          street: "Please enter your street",
        });
      }

      if (!barangay || barangay === "undefined") {
        return res.status(400).send({
          barangay: "Please enter your barangay",
        });
      }
      if (!profile_picture || profile_picture === "undefined") {
        return res.status(400).send({
          profile_picture: "Please upload profile_picture",
        });
      }

      if (!email || email === "undefined") {
        return res.status(400).send({
          email: "Please enter your email",
        });
      }
      const existingUser = await User.findOne({ email }).exec();

      if (existingUser) {
        return res.status(400).send({
          email: "Email is already in use.",
        });
      }
      if (!user_name || user_name === "undefined") {
        return res.status(400).send({
          user_name: "Please enter your user_name",
        });
      }

      const existingUsername = await User.findOne({ user_name }).exec();
      if (existingUsername) {
        return res.status(400).send({
          user_name: "Username is already in use.",
        });
      }
      if (!phone || phone === "undefined") {
        return res.status(400).send({
          phone: "Please enter your Phone",
        });
      }
      if (phone.length !== 10) {
        return res.status(400).send({
          phone: "Invalid phone number. Phone number must be 10 digits long.",
        });
      }

      if (!password || password === "undefined") {
        return res.status(400).send({
          password: "Please enter your password",
        });
      }
      if (!confirmPassword || confirmPassword === "undefined") {
        return res.status(400).send({
          confirmPassword: "Please enter your confirmPassword",
        });
      }
      if (password != confirmPassword) {
        return res.status(400).send({
          confirmPassword: "Confirm password is not matched.",
        });
      }

      const newUserData = {
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        age: age,
        birth_date: birth_date,
        address: {
          house_purok_no: house_purok_no,
          street: street,
          barangay: barangay,
        },
        gender: gender,
        user_name: user_name,
        email: email,
        phone: phone,
        password: password,
        role: "personnel",
        status: "active",
        account_verified: "verified",
        email_verified: true,
      };

      if (profile_picture) {
        //============= upload newww LARGE FILE
        function bufferToStream(buffer) {
          var stream = new Readable();
          stream.push(buffer);
          stream.push(null);

          return stream;
        }
        const response = await drive.files.create({
          requestBody: {
            parents: ["1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW"],
            name: profile_picture.name,
          },
          media: {
            body: bufferToStream(profile_picture.data),
          },
        });
        // console.log(bufferToStream(profile_picture.data));
        const fileId = response.data.id;

        await drive.permissions.create({
          fileId: fileId,
          requestBody: {
            role: "reader",
            type: "anyone",
          },
        });

        newUserData.profile_picture = {
          public_id: fileId,
          url: `https://drive.google.com/uc?export=view&id=${fileId}`,
        };
      }

      const user = await User.create(newUserData);

      const user_idss = req?.user._id

          const activitylogs = await ActivityLogs.create({
            user_id: user_idss,
            description: "Created new user"
          });

          await Log.create({
            date: new Date(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: Date.now() - req._startTime,
            referrer: req.headers.referer || '',
            userAgent: req.headers['user-agent'] || '',
            platform:"web",
          });

          console.log(activitylogs)

      res.status(201).json({
        success: true,
        user,
      });
    } else {
      if (!first_name || first_name === "undefined") {
        return res.status(400).send({
          first_name: "Please enter your first_name",
        });
      }

      if (!middle_name || middle_name === "undefined") {
        return res.status(400).send({
          middle_name: "Please enter your middle_name",
        });
      }

      if (!last_name || last_name === "undefined") {
        return res.status(400).send({
          last_name: "Please enter your last_name",
        });
      }

      if (!email || email === "undefined") {
        return res.status(400).send({
          email: "Please enter your email",
        });
      }
      const existingUser = await User.findOne({ email }).exec();

      if (existingUser) {
        return res.status(400).send({
          email: "Email is already in use.",
        });
      }
      if (!user_name || user_name === "undefined") {
        return res.status(400).send({
          user_name: "Please enter your user_name",
        });
      }

      const existingUsername = await User.findOne({ user_name }).exec();
      if (existingUsername) {
        return res.status(400).send({
          user_name: "Username is already in use.",
        });
      }

      if (!password || password === "undefined") {
        return res.status(400).send({
          password: "Please enter your password",
        });
      }
      if (!confirmPassword || confirmPassword === "undefined") {
        return res.status(400).send({
          confirmPassword: "Please enter your confirmPassword",
        });
      }
      if (password != confirmPassword) {
        return res.status(400).send({
          confirmPassword: "Confirm password is not matched.",
        });
      }

      const newUserData = {
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,

        user_name: user_name,
        email: email,
        password: password,

        role: "admin",
        status: "active",
        account_verified: "verified",
        email_verified: true,
      };

      const user = await User.create(newUserData);

      const user_idss = req?.user._id

          const activitylogs = await ActivityLogs.create({
            user_id: user_idss,
            description: "Created new user"
          });

          await Log.create({
            date: new Date(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: Date.now() - req._startTime,
            referrer: req.headers.referer || '',
            userAgent: req.headers['user-agent'] || '',
            platform:"web",
          });

          console.log(activitylogs)

      res.status(201).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      // console.log(errors)

      return res.status(400).send(errors);
    }
    res.status(500).send("Something went wrong");
  }
});

exports.readUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.findById(id);
  const health = await Health.find();
  const health_user = await User.findById(id).populate("health_id");
  const checkhealth_user = health_user.health_id;
  const checkrequirement_user = user.requirement_id;

  const user_idss = req?.user._id

          const activitylogs = await ActivityLogs.create({
            user_id: user_idss,
            description: "View the specific user"
          });

          await Log.create({
            date: new Date(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: Date.now() - req._startTime,
            referrer: req.headers.referer || '',
            userAgent: req.headers['user-agent'] || '',
            platform:"web",
          });

          console.log(activitylogs)

  res.json({ user, health, checkhealth_user, checkrequirement_user });
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  try {
    const {
      first_name,
      middle_name,
      last_name,
      age,
      birth_date,
      house_purok_no,
      street,
      barangay,
      gender,
      health_id,
      requirement_id,
      phone,
      password,
      confirmPassword,
      status,
      account_verified,
    } = req.body;

    console.log(status, account_verified )

    var { user_name, email } = req.body;

    const user = await User.findById(id).select("+password");

    const verified_status = user.account_verified === account_verified;
    const account_statussss = user.status === status;

console.log("statysssssssssssssssssssssssss", account_statussss)

    const userss = await User.findByIdAndUpdate(
      id,
      {
        $unset: { health_id: "", requirement_id: ""},
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    const emails = await User.find({ email: { $ne: user.email } }).exec();
    const usernames = await User.find({
      user_name: { $ne: user.user_name },
    }).exec();

    var userAllEmail = emails.map(function (emailsss) {
      return emailsss.email;
    });
    var userAllUsername = usernames.map(function (usernamessss) {
      return usernamessss.user_name;
    });

    if (user.role == "client") {
      if (age < 60) {
        return res.status(400).send({
          birth_date: "Birth date is not valid.",
          age: "Age must be 60 or above. ",
        });
      }
      const profile_picture = req.files?.profile_picture;
      const valid_id = req.files?.valid_id;

      const newUserData = {
        ...(first_name !== "undefined" &&
          first_name !== undefined && { first_name: first_name }),
        ...(middle_name !== "undefined" &&
          middle_name !== undefined && { middle_name: middle_name }),
        ...(last_name !== "undefined" &&
          last_name !== undefined && { last_name: last_name }),
        ...(age !== "undefined" && age !== undefined && { age: age }),
        ...(birth_date !== "undefined" &&
          birth_date !== undefined && { birth_date: birth_date }),
        address: {
          ...(house_purok_no !== "undefined" &&
            house_purok_no !== undefined && { house_purok_no: house_purok_no }),
          ...(street !== "undefined" &&
            street !== undefined && { street: street }),
          ...(barangay !== "undefined" &&
            barangay !== undefined && { barangay: barangay }),
        },
        ...(gender !== "undefined" &&
          gender !== undefined && { gender: gender }),
        ...(user_name !== "undefined" &&
          user_name !== undefined && { user_name: user_name }),
        ...(email !== "undefined" && email !== undefined && { email: email }),
        ...(phone !== "undefined" && phone !== undefined && { phone: phone }),
        ...(health_id !== "undefined" &&
          health_id !== undefined && { health_id: health_id }),
          ...(requirement_id !== "undefined" &&
          requirement_id !== undefined && { requirement_id: requirement_id }),

          ...(typeof status !== "undefined" &&
          status == "restricted"
            ? {
                status: status, lastRestricted: moment() , restrictionExpiration: moment().add(7, "days"), notAttendedCount: 0,
              }
            : { status: status }),

        ...(account_verified !== "undefined" &&
          account_verified !== undefined && {
            account_verified: account_verified,
          }),
      };

      if (user.email !== email) {
        if (userAllEmail.includes(email)) {
          return res.status(400).send({
            email: "Email is already in use.",
          });
        }
      }

      if (user.user_name !== user_name) {
        if (userAllUsername.includes(user_name)) {
          return res.status(400).send({
            user_name: "User_name is already in use.",
          });
        }
      }

      if (password !== undefined && confirmPassword !== undefined) {
        if (!password) {
          return res.status(400).send({
            password: "Please enter your password",
          });
        }
        if (!confirmPassword) {
          return res.status(400).send({
            confirmPassword: "Please enter your confirmPassword",
          });
        }
        if (password != confirmPassword) {
          return res.status(400).send({
            confirmPassword: "Confirm password is not matched.",
          });
        }
      }

      if (profile_picture) {
        //============= upload newww LARGE FILE
        function bufferToStream(buffer) {
          var stream = new Readable();
          stream.push(buffer);
          stream.push(null);

          return stream;
        }
        const response = await drive.files.create({
          requestBody: {
            parents: ["1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW"],
            name: profile_picture.name,
          },
          media: {
            body: bufferToStream(profile_picture.data),
          },
        });
        // console.log(bufferToStream(profile_picture.data));
        const fileId = response.data.id;

        await drive.permissions.create({
          fileId: fileId,
          requestBody: {
            role: "reader",
            type: "anyone",
          },
        });

        newUserData.profile_picture = {
          public_id: fileId,
          url: `https://drive.google.com/uc?export=view&id=${fileId}`,
        };
      }

      if (valid_id) {
        //============= upload newww LARGE FILE
        function bufferToStream(buffer) {
          var stream = new Readable();
          stream.push(buffer);
          stream.push(null);

          return stream;
        }
        const response = await drive.files.create({
          requestBody: {
            parents: ["1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW"],
            name: valid_id.name,
          },
          media: {
            body: bufferToStream(valid_id.data),
          },
        });
        // console.log(bufferToStream(valid_id.data));
        const fileId = response.data.id;

        await drive.permissions.create({
          fileId: fileId,
          requestBody: {
            role: "reader",
            type: "anyone",
          },
        });

        newUserData.valid_id = {
          public_id: fileId,
          url: `https://drive.google.com/uc?export=view&id=${fileId}`,
        };
      }

      if (password && password !== "undefined" && password !== undefined) {
        newUserData.password = await bcrypt.hash(password, 10);
      }

      // console.log(newUserData);

      await User.findByIdAndUpdate(
        id,
        { $set: newUserData },
        { omitUndefined: true }
      );

      const user_idss = req?.user._id

          const activitylogs = await ActivityLogs.create({
            user_id: user_idss,
            description: "Updated the specific user"
          });

          await Log.create({
            date: new Date(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: Date.now() - req._startTime,
            referrer: req.headers.referer || '',
            userAgent: req.headers['user-agent'] || '',
            platform:"web",
          });

          if(verified_status === false){
            if(account_verified == "verified"){
              await Notification.create({
                user_id: user._id,
                type: "admin_verified",
                description: "We are pleased to inform you that your account has been successfully verified by our admin. You can now take advantage of the convenient booking feature on Alaga, our mobile and web application designed specifically for the elderly community in Taguig City. Whether you need to book a recreational activity, dialysis consultation, or reserve a multipurpose hall, our platform offers a seamless scheduling experience. Simply pick a service, choose a schedule, and confirm your appointment with ease. Thank you for choosing Alaga to help you easily access essential health care services."
              });
            }else if(account_verified == "not verified"){
              await Notification.create({
                user_id: user._id,
                type: "admin_notverified",
                description: "We regret to inform you that your account verification process was not successful. As a result, you are currently unable to book a schedule on Alaga, our mobile and web application designed for the elderly community in Taguig City. Account verification is an important step to ensure the security and reliability of our platform. We encourage you to kindly complete the verification process in order to fully access our services, including booking recreational activities, dialysis consultation, and multipurpose hall reservations with ease. Thank you for your understanding and cooperation in maintaining a safe and trusted environment for our users."
              });
            }else{
              await Notification.create({
                user_id: user._id,
                type: "admin_pending",
                description: "We regret to inform you that your Alaga account has been temporarily restricted for a period of 7 days. This action has been taken as you were unable to attend 5 scheduled appointments, which has resulted in the restriction of your account. Due to this restriction, you will not be able to book any new healthcare services during this time. As a platform designed to provide healthcare services to the elderly community in Taguig City, we prioritize the needs of our clients and strive to ensure efficient scheduling and booking processes. We understand the importance of timely attendance for the smooth operation of our services, and we hope to have your cooperation in adhering to the scheduled appointments in the future. Thank you for your understanding."
              });
            }
          }
         
            if(account_statussss === false){

              console.log("account_statussssaccount_statussssaccount_statussss", status)
              if(status == "restricted"){
                await Notification.create({
                  user_id: user._id,
                  type: "status_restricted",
                  description: "We regret to inform you that your Alaga account has been temporarily restricted for a period of 7 days. This action has been taken as you were unable to attend 5 scheduled appointments, which has resulted in the restriction of your account. Due to this restriction, you will not be able to book any new healthcare services during this time. As a platform designed to provide healthcare services to the elderly community in Taguig City, we prioritize the needs of our clients and strive to ensure efficient scheduling and booking processes. We understand the importance of timely attendance for the smooth operation of our services, and we hope to have your cooperation in adhering to the scheduled appointments in the future. Thank you for your understanding."
                });
              }else if(status == "inactive"){
                await Notification.create({
                  user_id: user._id,
                  type: "status_inactive",
                  description: "We regret to inform you that your Alaga account is currently inactive, and as a result, you are unable to book any new appointments. Alaga is a mobile and web application designed to provide healthcare services to the elderly community in Taguig City, and we strive to offer a seamless and convenient experience for our users. However, in order to maintain the effectiveness and efficiency of our platform, we require our users to keep their accounts active. We understand the importance of providing timely and reliable services to our clients, and we urge you to reactivate your account to resume booking appointments with ease. Thank you for your understanding."
                });
              }else{
                await Notification.create({
                  user_id: user._id,
                  type: "status_active",
                  description: "We are pleased to inform you that your Alaga account is now active! You can now resume booking appointments for health care services through our mobile and web application. Alaga is dedicated to serving the elderly community in Taguig City, and our platform is designed to prioritize the needs of our clients by offering a seamless and convenient booking process. With a wide range of services including recreational activities, dialysis, and a multipurpose hall, all at the touch of a button, you can easily pick a service, schedule, and confirm your appointments with ease. We apologize for any inconvenience caused during the inactive period and thank you for your continued support."
                });
              }
            }
  
    
        
          // console.log(activitylogs)


      res.status(201).json({
        success: true,
      });
    } else {
      const profile_picture = req.files?.profile_picture;
      const valid_id = req.files?.valid_id;

      const newUserData = {
        ...(first_name !== "undefined" &&
          first_name !== undefined && { first_name: first_name }),
        ...(middle_name !== "undefined" &&
          middle_name !== undefined && { middle_name: middle_name }),
        ...(last_name !== "undefined" &&
          last_name !== undefined && { last_name: last_name }),
        ...(age !== "undefined" && age !== undefined && { age: age }),
        ...(birth_date !== "undefined" &&
          birth_date !== undefined && { birth_date: birth_date }),
        address: {
          ...(house_purok_no !== "undefined" &&
            house_purok_no !== undefined && { house_purok_no: house_purok_no }),
          ...(street !== "undefined" &&
            street !== undefined && { street: street }),
          ...(barangay !== "undefined" &&
            barangay !== undefined && { barangay: barangay }),
        },
        ...(gender !== "undefined" &&
          gender !== undefined && { gender: gender }),
        ...(user_name !== "undefined" &&
          user_name !== undefined && { user_name: user_name }),
        ...(email !== "undefined" && email !== undefined && { email: email }),
        ...(phone !== "undefined" && phone !== undefined && { phone: phone }),
        ...(health_id !== "undefined" &&
          health_id !== undefined && { health_id: health_id }),
          ...(requirement_id !== "undefined" &&
          requirement_id !== undefined && { requirement_id: requirement_id }),
        ...(status !== "undefined" &&
          status !== undefined && { status: status }),
        ...(account_verified !== "undefined" &&
          account_verified !== undefined && {
            account_verified: account_verified,
          }),
        ...(password !== "undefined" &&
          password !== undefined && { password: password }),
      };

      if (user.email !== email) {
        if (userAllEmail.includes(email)) {
          return res.status(400).send({
            email: "Email is already in use.",
          });
        }
      }

      if (user.user_name !== user_name) {
        if (userAllUsername.includes(user_name)) {
          return res.status(400).send({
            user_name: "User_name is already in use.",
          });
        }
      }

      if (password !== undefined && confirmPassword !== undefined) {
        if (!password) {
          return res.status(400).send({
            password: "Please enter your password",
          });
        }
        if (!confirmPassword) {
          return res.status(400).send({
            confirmPassword: "Please enter your confirmPassword",
          });
        }
        if (password != confirmPassword) {
          return res.status(400).send({
            confirmPassword: "Confirm password is not matched.",
          });
        }
      }

      if (profile_picture) {
        //============= upload newww LARGE FILE
        function bufferToStream(buffer) {
          var stream = new Readable();
          stream.push(buffer);
          stream.push(null);

          return stream;
        }
        const response = await drive.files.create({
          requestBody: {
            parents: ["1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW"],
            name: profile_picture.name,
          },
          media: {
            body: bufferToStream(profile_picture.data),
          },
        });
        // console.log(bufferToStream(profile_picture.data));
        const fileId = response.data.id;

        await drive.permissions.create({
          fileId: fileId,
          requestBody: {
            role: "reader",
            type: "anyone",
          },
        });

        newUserData.profile_picture = {
          public_id: fileId,
          url: `https://drive.google.com/uc?export=view&id=${fileId}`,
        };
      }

      if (valid_id) {
        //============= upload newww LARGE FILE
        function bufferToStream(buffer) {
          var stream = new Readable();
          stream.push(buffer);
          stream.push(null);

          return stream;
        }
        const response = await drive.files.create({
          requestBody: {
            parents: ["1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW"],
            name: valid_id.name,
          },
          media: {
            body: bufferToStream(valid_id.data),
          },
        });
        // console.log(bufferToStream(valid_id.data));
        const fileId = response.data.id;

        await drive.permissions.create({
          fileId: fileId,
          requestBody: {
            role: "reader",
            type: "anyone",
          },
        });

        newUserData.valid_id = {
          public_id: fileId,
          url: `https://drive.google.com/uc?export=view&id=${fileId}`,
        };
      }

      if (password && password !== "undefined" && password !== undefined) {
        newUserData.password = await bcrypt.hash(password, 10);
      }

      console.log(newUserData);

      await User.findByIdAndUpdate(
        id,
        { $set: newUserData },
        { omitUndefined: true }
      );

      const user_idss = req?.user._id

          const activitylogs = await ActivityLogs.create({
            user_id: user_idss,
            description: "Updated the specific user"
          });

          await Log.create({
            date: new Date(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: Date.now() - req._startTime,
            referrer: req.headers.referer || '',
            userAgent: req.headers['user-agent'] || '',
            platform:"web",
          });

          console.log(activitylogs)

      res.status(201).json({
        success: true,
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      // console.log(errors)

      return res.status(400).send(errors);
    }
    res.status(500).send("Something went wrong");
  }
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id);
  try {
    const user = await User.findById(req.params.id);
    await Schedule.deleteMany({ user_id: req.params.id });
    await user.remove();

    const user_idss = req?.user._id

    const activitylogs = await ActivityLogs.create({
      user_id: user_idss,
      description: "Deleted the specific user"
    });

    await Log.create({
      date: new Date(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: Date.now() - req._startTime,
      referrer: req.headers.referer || '',
      userAgent: req.headers['user-agent'] || '',
      platform:"web",
    });

    console.log(activitylogs)

    res.status(200).json({
      success: true,
      message: "user is deleted.",
    });
  } catch (err) {
    res.status(400).json({
      message: "user not found",
    });
  }
});

const path = require("path");
const fs = require("fs");
const Report = require("fluentreports").Report;




// Define the path to the image file
const ealaga = path.join(__dirname, '..', 'data', 'logovector.png');
const osca = path.join(__dirname, '..', 'data', 'osca.png');

// console.log(imagePath)

exports.downloadPDF = catchAsyncErrors(async (req, res, next) => {
  const filteredUsers = req.body?.downloadPdf;

  const status = req.body?.status;
  const account = req.body?.account;
  const barangay = req.body?.barangay;

  // console.log(barangay)

  const user_idss = req?.user._id

  const activitylogs = await ActivityLogs.create({
    user_id: user_idss,
    description: "View the list of user into pdf"
  });

  await Log.create({
    date: new Date(),
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: Date.now() - req._startTime,
    referrer: req.headers.referer || '',
    userAgent: req.headers['user-agent'] || '',
    platform:"web",
  });

  // console.log(activitylogs)

  // console.log(filteredUsers);
  var data = [];

  filteredUsers.forEach((user) => {
    data.push({
      first_name: user.first_name,
      last_name: user.last_name,
      user_name: user.user_name,
      email: user.email,
      role: user.role,
      createdAt: moment(new Date(user.createdAt)).format("YYYY-MM-DD"),
      barangay: user.address?.barangay,
    });
  });

  

  const Current_Date = new Date().toDateString();
  const footer = function (rpt) {
    rpt.standardFooter([["user_name", 1, 3]]);
    rpt.print(`Total Users: ${filteredUsers.length}`, { align: "left" });
    // rpt.image(imagePath, {width: 50});
    rpt.newline();
    rpt.newline();
    rpt.print("Powered by eAlaga", { align: "right" });
  };
 
  var proposalHeader = function (x, r) {
    var fSize = 9;

    var data = [status?.status, account?.account, barangay?.barangay].filter(Boolean).join(", ");
    if (!data) {
      data = "none";
    }
    
    const result = { data, width: 800, fontSize: 12 };

    console.log(result)

    x.print("13, Ipil-Ipil Street, North Signal Village, Taguig City, 1630.", {
      x: 210,
      y: 90,
      fontsize: fSize,
    });
    x.print("Office of the Senior Citizens Affair", {
      x: 180,
      y: 50,
      color: "red",
      fontSize: fSize + 10,
      fontBold: true,
    });
    x.image(osca, {x: 80, y: 25, width: 80});
    x.print("(Center For the Elderly)", {
      x: 250,
      y: 70,
      fontsize: fSize + 4,
      fontBold: true,
    });
    x.print("User List", { y: 150, fontsize: fSize + 7, fontBold: true });
    x.band(
      [
        { data: "Filtered by:", width: 65 },
        result
      ],
      { y: 170 }
    );
    x.newline();
    // x.band([{data: 'Proposal #:', width: 100}, {data: "12345", width: 100, align: "left", fontSize: 9}], {x: 400, y: 60});
    x.band(
      [
        { data: "Date:", width: 40 },
        { data: moment().format("MMM DD YYYY - HH:mm a"), width: 200, fontSize: 12 },
      ],
      { x: 370, y: 150 }
    );

    x.band(
      [
        { data: "Processed by:", width: 80 },
        { data: req?.user.first_name + " " + req?.user.last_name, width: 200, fontSize: 12 },
      ],
      { x: 370, y: 170 }
    );

    // x.band([{data: 'Prepared By:', width: 100}, {data: "Jake Snow", width: 100, fontSize: 9}], {x: 400});
    // x.band([{data: 'Prepared For:', width: 100}], {x: 400});
    x.fontSize(9);

    x.fontSize(8);

    x.newline();
    x.newline();
    x.fontSize(11);
    x.newline();
    x.newline();
    x.newline();

    // Detail Header
    x.fontBold();
    x.band(
      [
        { data: "Username", width: 100 },
        { data: "Email", width: 175 },
        { data: "Role", width: 80 },
        { data: "Barangay", width: 150 },
        { data: "Date Created", width: 80 },
      ],
      { y: 220 }
    );
    x.fontNormal();
    x.bandLine();
    x.newline();
  };

  const detail = function (rpt, data) {
    // Detail Body
    rpt.band([
      { data: data.user_name, width: 100 },
      { data: data.email, width: 175, align: 5, marginTop: 5, marginBottom: 5 },
      { data: data.role, width: 80, marginTop: 15, marginBottom: 5, align: 5 },
      {
        data:
          !data.barangay || data.barangay == "none"
            ? "Not Verified"
            : data.barangay,
        width: 150,
        marginTop: 5,
        marginBottom: 5,
      },
      { data: data.createdAt, width: 80 },
      // {data: data.ninety, width: 65, align: 3},
      // {data: data.hundredtwenty, width: 60, align: 3},
      // {data: data.sale.balance_due, width: 60, align: 3}
    ]);
  };

  const rpt = new Report("USER.pdf")
    .margins(20)
    .pageHeader(proposalHeader)
    .sum("user_name")
    .data(data)
    .pageFooter(footer)
    .detail(detail)
    .render((err, buffer) => {
      res.download(buffer);
    });

  //  const rpt = new Report("USER.pdf")
  //     .margins(20)
  //     .pageHeader(proposalHeader )
  //     .sum('user_name')
  //     .data( data )
  //     .pageFooter(footer)
  //     .detail(detail)
  //     .render((err, buffer) => {
  //         if (err) {
  //           console.error(err);
  //         } else {
  //           fs.readFile('USER.pdf', async (err, data) => {
  //             if (err) {
  //               console.error(err);
  //             } else {

  //               try {
  //                 // Convert buffer to stream
  //                 function bufferToStream(buffer) {
  //                   var stream = new Readable();
  //                   stream.push(buffer);
  //                   stream.push(null);
  //                   return stream;
  //                 }

  //                 // Upload file to Google Drive
  //                 const response = await drive.files.create({
  //                   requestBody: {
  //                     parents: ['1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW'],
  //                     name: 'USER.pdf',
  //                   },
  //                   media: {
  //                     mimeType: 'application/pdf',
  //                     body: bufferToStream(data),
  //                   },
  //                 });

  //                 const fileId = response.data.id;

  //                 // Set permissions for the file
  //                 await drive.permissions.create({
  //                   fileId: fileId,
  //                   requestBody: {
  //                     role: 'reader',
  //                     type: 'anyone',
  //                   },
  //                 });

  //                 const fileUrl = `https://drive.google.com/uc?id=${fileId}`;

  //                 res.send({ fileUrl });
  //               } catch (error) {
  //                 console.log(error);
  //                 res.status(500).send('An error occurred while saving the file to Google Drive');
  //               }

  //             }
  //           });
  //         }
  //     });
});
