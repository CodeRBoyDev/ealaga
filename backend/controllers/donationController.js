const Donation = require('../models/donation')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/user')
const asyncHandler = require("express-async-handler");
const { google } = require('googleapis');
const CLIENT_ID = '245985647212-17ekq9p43o5e2u9iei49tmlhqaqqdouh.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const stream = require("stream");
const REFRESH_TOKEN = '1//04sTDhftwMYhLCgYIARAAGAQSNwF-L9Ir2gMbL1h39Mxidzg7hCQCbSAKJ84BVCNX9sGai1j8ojVbIsrfpi2jVjjmf1FqAp8g1Ds';
const Readable = require('stream').Readable; 
const moment = require('moment')
const ActivityLogs = require("../models/activitylogs");
const Log = require("../models/log");

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

exports.allUsers = asyncHandler(async (req, res) => {
    // const keyword = req.query.search
    //   ? {
    //       $or: [
    //         { first_name: { $regex: req.query.search, $options: "i" } }, //case insensitive
    //         { last_name: { $regex: req.query.search, $options: "i" } },
    //         { email: { $regex: req.query.search, $options: "i" } },
    //       ],
    //     }
    //   : {};
  
    const users = await User.find(); 


    res.send(users);
  });


  exports.addDonation = catchAsyncErrors(async(req,res,next) => {
	
    const { user_id, donator_name, category, quantity} = req.body;
    const image = req.files?.image;

    const newDonationData = {
        // user_id: user_id,
        donator_name: donator_name,
        category: category,
        quantity: quantity,
        processed_by: "63c99bc9950e77d056a5d672", 
      }

      if(user_id){
        newDonationData.user_id = (user_id);
      }


    if(image){
                        //============= upload newww LARGE FILE
                        function bufferToStream(buffer) { 
                            var stream = new Readable();
                            stream.push(buffer);
                            stream.push(null);
                        
                            return stream;
                        }
                            const response = await drive.files.create({
                            requestBody: {
                                'parents':  ['1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW'],
                                name: image.name,
                            },
                            media: {
                                body: bufferToStream(image.data),
                            },
                            
                            });
                        // console.log(bufferToStream(profile_picture.data));
                            const fileId = response.data.id;
                        
                        await drive.permissions.create({
                            fileId: fileId,
                            requestBody: {
                            role: 'reader',
                            type: 'anyone',
                            },
                        });



                        newDonationData.image = {
                            public_id: fileId,
                            url: `https://drive.google.com/uc?export=view&id=${fileId}`,
                        }
    }
    
    // console.log(image);

    // console.log(user_id, donator_name, category, quantity);
    try {
	const donation = await Donation.create(newDonationData);

  const user_id = req?.user._id

    const activitylogs = await ActivityLogs.create({
      user_id: user_id,
      description: "Created a new donation"
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
		success:true,
		donation 
	})}  catch (error) {
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


exports.getDonation= catchAsyncErrors(async (req, res, next) => {
    const donation = await Donation.find().populate('user_id');
  
    const user_id = req?.user._id

    const activitylogs = await ActivityLogs.create({
      user_id: user_id,
      description: "View the list of donation"
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
    res.json({donation});
  
  })

exports.editDonation= catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const donation = await Donation.findById(id);
  // const user = await User.find({'health_id': id});
  // const totalUser = user.length;

  const user_id = req?.user._id

  const activitylogs = await ActivityLogs.create({
    user_id: user_id,
    description: "View the specific donation"
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

  res.json({donation});
  
  
  })

  exports.updateDonation = catchAsyncErrors(async(req,res,next) => {
	console.log("hi")
  try{
  const { user_id, donator_name, category, quantity} = req.body;
  const image = req.files?.image;

  const newDonationData = {
      user_id: user_id,
      donator_name: donator_name,
      category: category,
      quantity: quantity,
      processed_by: "63c99bc9950e77d056a5d672", 
    }
    console.log(image)

          if(image){
            //============= upload newww LARGE FILE
            function bufferToStream(buffer) { 
                var stream = new Readable();
                stream.push(buffer);
                stream.push(null);
            
                return stream;
            }
                const response = await drive.files.create({
                requestBody: {
                    'parents':  ['1FWxuky02TRwp1wwUXUNMD8j8w-XbWzRW'],
                    name: image.name,
                },
                media: {
                    body: bufferToStream(image.data),
                },
                
                });
            // console.log(bufferToStream(profile_picture.data));
                const fileId = response.data.id;
            
            await drive.permissions.create({
                fileId: fileId,
                requestBody: {
                role: 'reader',
                type: 'anyone',
                },
            });



            newDonationData.image = {
                public_id: fileId,
                url: `https://drive.google.com/uc?export=view&id=${fileId}`,
            }
      }

  
        const donation = await Donation.findByIdAndUpdate(req.params.id,newDonationData,{
            new: true,
            runValidators:true,
            useFindandModify:false
        })

        const user_idss = req?.user._id

          const activitylogs = await ActivityLogs.create({
            user_id: user_idss,
            description: "Updated the specific donation"
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
            success:true,
            donation
        })
    }catch(err){
        res.status(400).json({
            message: "Donation not found"
        })
    }    
  })

  

  exports.deleteDonation = catchAsyncErrors(async (req, res, next) => {
    console.log(req.params.id)
    try{
    const donation = await Donation.findById(req.params.id);
  
    const user_idss = req?.user._id

          const activitylogs = await ActivityLogs.create({
            user_id: user_idss,
            description: "Deleted the specific donation"
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

    await donation.remove();
  
    res.status(200).json({
        success: true,
        donation: 'donation is deleted.'
    })
    }catch(err){
        res.status(400).json({
            donation: "donation not found"
        })
    }
  
  })


  /// client Donation


  exports.clientDonation= catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const donation = await Donation.find({user_id: id});

    console.log(donation)

    const activitylogs = await ActivityLogs.create({
      user_id: id,
      description: "View the donation"
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
    // const user = await User.find({'health_id': id});
    // const totalUser = user.length;
    res.json({donation});
    
    
    })


exports.clientDonationRead= catchAsyncErrors(async (req, res, next) => {
      const { id } = req.params;
      const donation = await Donation.findById(id);
  
      const user_idss = req?.user._id

          const activitylogs = await ActivityLogs.create({
            user_id: user_idss,
            description: "View the specific donation"
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


      res.json({donation});
      
      
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
        const filteredCategory = req.body?.downloadPdf;
      
        const category = req.body?.category;
      
        // console.log(filteredCategory)
        // console.log(category)
       
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

          filteredCategory.forEach((categorysss) => {
              data.push({
                donator_name: categorysss.donator_name,
                category: categorysss.category,
                quantity: categorysss.quantity,
                donatedAt: moment(new Date(categorysss.donatedAt)).format("YYYY-MM-DD"),
              });
            });

            console.log(data)



            const Current_Date = new Date().toDateString();

            const footer = function (rpt) {
              rpt.standardFooter([["donator_name", 1, 3]]);
              rpt.print(`Total Donation: ${filteredCategory.length}`, { align: "left" });
              // rpt.image(imagePath, {width: 50});
              rpt.newline();
              rpt.newline();
              rpt.print("Powered by eAlaga", { align: "right" });
            };
           
            var proposalHeader = function (x, r) {
              var fSize = 9;
          
              var data = [category].filter(Boolean).join(", ");
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
                  { data: "Donor Name", width: 175 },
                  { data: "Category", width: 175 },
                  { data: "Quantity", width: 140 },
                  { data: "Date Created", width: 100 },
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
                { data: data.donator_name, width: 175 },
                { data: data.category, width: 175, align: 5, marginTop: 5, marginBottom: 5 },
                { data: data.quantity, width: 140, marginTop: 15, marginBottom: 5, align: 5 },
                { data: data.donatedAt, width: 100 },
                // {data: data.ninety, width: 65, align: 3},
                // {data: data.hundredtwenty, width: 60, align: 3},
                // {data: data.sale.balance_due, width: 60, align: 3}
              ]);
            };
          
            const rpt = new Report("Donation.pdf")
              .margins(20)
              .pageHeader(proposalHeader)
              .sum("donator_name")
              .data(data)
              .pageFooter(footer)
              .detail(detail)
              .render((err, buffer) => {
                res.download(buffer);
              });
      
       
      });
