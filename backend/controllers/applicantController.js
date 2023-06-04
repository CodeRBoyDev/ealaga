const Applicant = require('../models/applicant')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { google } = require('googleapis');
const CLIENT_ID = '674288789276-saaoh7tq48leiibdd223hb8ep3frqf5t.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const stream = require("stream");
const REFRESH_TOKEN = '1//04vtOReQoNI68CgYIARAAGAQSNwF-L9IrxqKFjSjYDxrumrKir2lBPInj3e_uqVSdeg5UKoRI3-Rd1reXf3ARX9Zmi2z9HfSO16s';
const Readable = require('stream').Readable; 
const nodemailer = require('nodemailer');
const ActivityLogs = require("../models/activitylogs");
const Log = require("../models/log");
const moment = require('moment')
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


const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  
  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });

exports.newApplicant = catchAsyncErrors(async(req,res,next) => {
	
    try {
        const { first_name, middle_name, last_name, email, 
            contact_number,position} = req.body;
            const { document} = req.files;

            const newApplicantData = {
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                email: email,
                contact_number: contact_number,
                position: position,
              }


  //============= upload newww LARGE FILE
            if (document !== '') {
                function bufferToStream(buffer) { 
                    var stream = new Readable();
                    stream.push(buffer);
                    stream.push(null);
                
                    return stream;
                }
                    const response = await drive.files.create({
                    requestBody: {
                        'parents':  ['1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW'],
                        name: document.name,
                    },
                    media: {
                        body: bufferToStream(document.data),
                    },
                    
                    });

                    console.log(response)

                    const fileId = response.data.id;
                
                        await drive.permissions.create({
                            fileId: fileId,
                            requestBody: {
                            role: 'reader',
                            type: 'anyone',
                            },
                        });

                        
                newApplicantData.document = {
                            public_id: fileId,
                            url: `https://drive.google.com/uc?export=view&id=${fileId}`,
                        }

                    }
               
          transporter.sendMail({
                      from: 'eAlaga <ealaga.taguig@gmail.com>',
                      to: email,
                      subject: 'Application',
                      html: `<p>Thanks for applying wait for the admin to accept your application</p>`
                
                    })

          const applicant = await Applicant.create(newApplicantData)

         
	
          return res.status(200).json({
            success: true,
            message:"success"
          })

}  catch (error) {
        if (error.name === "ValidationError") {
          let errors = {};
    
          Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
          });
          
          console.log(errors)
    
          return res.status(400).send(errors);
        }
        res.status(500).send("Something went wrong");
      }
})


exports.getApplicant = catchAsyncErrors(async (req, res, next) => {
  const applicant = await Applicant.find();

  const user_id = req?.user._id

  const activitylogs = await ActivityLogs.create({
    user_id: user_id,
    description: "View the list of applicant"
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
  res.json({applicant});

})

exports.viewApplicant = catchAsyncErrors(async (req, res, next) => {

  const { id } = req.params
  const applicant = await Applicant.findById({'_id':id});

  const user_id = req?.user._id

  const activitylogs = await ActivityLogs.create({
    user_id: user_id,
    description: "View the specific applicant"
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

  res.json({applicant});

})

exports.acceptApplicant = catchAsyncErrors(async (req, res, next) => {

  const { id } = req.params

  const applicant = await Applicant.findByIdAndUpdate(id, {status: "accepted"}, {
    new: true,
    runValidators: true,
    useFindAndModify: false
    })

    transporter.sendMail({
      from: 'eAlaga <ealaga.taguig@gmail.com>',
      to: applicant.email,
      subject: 'Application Accepted',
      html: `<p>Your application is accepted by admin</p>`

    })
    
    const user_id = req?.user._id

    const activitylogs = await ActivityLogs.create({
      user_id: user_id,
      description: "Accepted the application of " + applicant.first_name + " " + applicant.last_name
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

  res.json({applicant});

})

exports.deniedApplicant = catchAsyncErrors(async (req, res, next) => {

  const { id } = req.params

  const applicant = await Applicant.findByIdAndUpdate(id, {status: "denied"}, {
    new: true,
    runValidators: true,
    useFindAndModify: false
    })

    transporter.sendMail({
      from: 'eAlaga <ealaga.taguig@gmail.com>',
      to: applicant.email,
      subject: 'Application Denied',
      html: `<p>Your application is denied by admin</p>`

    })

    const user_id = req?.user._id

    const activitylogs = await ActivityLogs.create({
      user_id: user_id,
      description: "Denied the application of " + applicant.first_name + " " + applicant.last_name
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
  

  res.json({applicant});

})



const path = require("path");
const fs = require("fs");
const Report = require("fluentreports").Report;




// Define the path to the image file
const ealaga = path.join(__dirname, '..', 'data', 'logovector.png');
const osca = path.join(__dirname, '..', 'data', 'osca.png');

// console.log(imagePath)


exports.downloadPDF = catchAsyncErrors(async (req, res, next) => {

        console.log("Hi")
        const filteredAllApplicant = req.body?.downloadPdf;
      
        const status = req.body?.status;
        const position = req.body?.position;
        
        const user_idss = req?.user._id

            const activitylogs = await ActivityLogs.create({
              user_id: user_idss,
              description: "View the list of donation into pdf"
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

          var data = [];

          filteredAllApplicant.forEach((applicant) => {
              data.push({
                first_name: applicant.first_name,
                last_name: applicant.last_name,
                email: applicant.email,
                contact_number: applicant.contact_number,
                position: applicant.position,
                status: applicant.status,
                createdAt: moment(new Date(applicant.createdAt)).format("YYYY-MM-DD"),
              });
            });

            // console.log(data)



            const Current_Date = new Date().toDateString();

            const footer = function (rpt) {
              rpt.standardFooter([["first_name", 1, 3]]);
              rpt.print(`Total Applicant: ${filteredAllApplicant.length}`, { align: "left" });
              // rpt.image(imagePath, {width: 50});
              rpt.newline();
              rpt.newline();
              rpt.print("Powered by eAlaga", { align: "right" });
            };
           
            var proposalHeader = function (x, r) {
              var fSize = 9;
          
              var data = [status, position].filter(Boolean).join(", ");
              if (!data) {
                data = "none";
              }
              
              const result = { data, width: 800, fontSize: 12 };
          
              console.log(result)
          
              x.print("Center for elderly, Ipil-Ipil, Taguig, 1630", {
                x: 245,
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
              x.print("Donation List", { y: 150, fontsize: fSize + 7, fontBold: true });
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
                  { data: "Last Name", width: 80 },
                  { data: "First Name", width: 80 },
                  { data: "Email", width: 170 },
                  { data: "Position", width: 80 },
                  { data: "Status", width: 80 },
                  { data: "Date", width: 80 },
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
                { data: data.last_name, width: 80 },
                { data: data.first_name, width: 80, align: 5, marginTop: 5, marginBottom: 10 },
                { data: data.email, width: 170, marginTop: 15, marginBottom: 5, align: 10 },
                { data: data.position, width: 80, align: 5, marginTop: 15, marginBottom: 10 },
                { data: data.status, width: 80, align: 5, marginTop: 15, marginBottom: 10 },
                { data: data.createdAt, width: 80, align: 5, marginTop: 15, marginBottom: 10 },
                // {data: data.ninety, width: 65, align: 3},
                // {data: data.hundredtwenty, width: 60, align: 3},
                // {data: data.sale.balance_due, width: 60, align: 3}
              ]);
            };
          
            const rpt = new Report("Applicant.pdf")
              .margins(20)
              .pageHeader(proposalHeader)
              .sum("first_name")
              .data(data)
              .pageFooter(footer)
              .detail(detail)
              .render((err, buffer) => {
                res.download(buffer);
              });
            
      
       
      });