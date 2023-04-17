const Announcement = require('../models/announcement')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ActivityLogs = require("../models/activitylogs");
const Log = require("../models/log");

exports.newAnnouncement = catchAsyncErrors(async(req,res,next) => {
	// console.log(req.body);
    try {
	const announcement = await Announcement.create(req.body);

  const user_id = req?.user._id

    const activitylogs = await ActivityLogs.create({
      user_id: user_id,
      description: "Created new announcement"
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
		announcement 
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

exports.getAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const announcement = await Announcement.find();
  
    const user_id = req?.user._id

    const activitylogs = await ActivityLogs.create({
      user_id: user_id,
      description: "View the list of announcement"
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

    res.json({announcement});
  
  })

exports.getAnnouncementHome = catchAsyncErrors(async (req, res, next) => {
    const announcement = await Announcement.find();

    res.json({announcement});
  
  })

exports.editAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const announcement = await Announcement.findOneAndUpdate({'status' : "set"},
    {$set:{'status' : "not set"}},{
        new: true,
        runValidators: true,
        useFindAndModify: false
        }
    );

    await Announcement.findByIdAndUpdate(id, {$set:{'status' : "set"}}, {
        new: true,
        runValidators: true,
        useFindAndModify: false
        })

        const user_id = req?.user._id

    const activitylogs = await ActivityLogs.create({
      user_id: user_id,
      description: "Set the " + announcement.title + " announcement"
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


    // console.log(announcement)
    res.json({announcement});
  
  })

  exports.deleteAnnouncement= catchAsyncErrors(async (req, res, next) => {
    console.log(req.params.id)
    try{
    const announcement = await Announcement.findById(req.params.id);

    const user_id = req?.user._id

    const activitylogs = await ActivityLogs.create({
      user_id: user_id,
      description: "Deleted the " + announcement.title + " announcement"
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


    await announcement.remove();

    res.status(200).json({
        success: true,
        message: 'Announcement is deleted.'
    })
    }catch(err){
        res.status(400).json({
            message: "Disease not found"
        })
    }

})