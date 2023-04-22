const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ActivityLogs = require("../models/activitylogs");
const Log = require("../models/log");
const Schedule = require('../models/schedule')
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Singapore');
const Notification = require("../models/notification");

exports.allDialysis = catchAsyncErrors(async (req, res, next) => {

  const allDialysis = await Schedule.find(
    { date_schedule: moment().format('YYYY-MM-DD'), status:"attended", category: "Dialysis" }
  ).populate('user_id');

  const allDialysisPatient = await Schedule.find(
    { dialysis_status:"accepted", status:"attended", category: "Dialysis" }
  ).populate('user_id');

  // console.log("listtttt", allDialysisPatient);

  return res.status(200).json({
		success: true,
		allDialysis,
    allDialysisPatient
	  })

});

exports.viewApplicant = catchAsyncErrors(async (req, res, next) => {

  const { id } = req.params

  const allDialysis = await Schedule.findOne(
    { _id: id }
  ).populate('user_id');;

  const PatientallDialysis = await Schedule.find(
    { user_id: allDialysis.user_id, dialysis_status:"accepted", category: "Dialysis" }
  );


  // console.log(PatientallDialysis.length)

  return res.status(200).json({
		success: true,
		allDialysis,
    PatientallDialysis
	  })
  
})

exports.acceptApplicant = catchAsyncErrors(async (req, res, next) => {

  const { id } = req.params
  const {
		batch
	  } = req.body;

   
    const allDialysis = await Schedule.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          batch: batch,
          dialysis_status: "accepted"
        }
      },
      { new: true }
    );

  // console.log(allDialysis)
  return res.status(200).json({
		success: true
	  })
  
})

exports.deniedApplicant = catchAsyncErrors(async (req, res, next) => {

  const { id } = req.params
  const {
		message
	  } = req.body;

    const user_id = await Schedule.findOne({_id: id})

    // console.log(user_id.user_id);
    const allDialysis = await Schedule.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          dialysis_status: "denied"
        }
      },
      { new: true }
    );

    await Notification.create({
      user_id: user_id.user_id,
      type: "Dialysis Denied",
      description: message,
      });

  console.log("dwadwadwadwadawdwa", message, id)
  return res.status(200).json({
		success: true
	  })
  
})




