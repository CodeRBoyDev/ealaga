const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ActivityLogs = require("../models/activitylogs");
const Log = require("../models/log");

exports.allActivityLogs = catchAsyncErrors(async (req, res, next) => {

  // Fetch allActivityLogs and allAPILogs concurrently using Promise.all
  const [allActivityLogs, allAPILogs] = await Promise.all([
    ActivityLogs.find().populate("user_id"),
    Log.find()
  ]);

  res.json({ allActivityLogs, allAPILogs });

});


exports.activitylogs = catchAsyncErrors(async(req,res,next) => {

  // console.log(req.user._id)
  const allActivityLogs = await ActivityLogs.deleteMany();

  res.status(200).json({
    success: true,
    message: 'ActivityLogs is deleted.'
})

})

exports.apilogs = catchAsyncErrors(async(req,res,next) => {

  // console.log(req.user._id)
  const allLogs = await Log.deleteMany();

  res.status(200).json({
    success: true,
    message: 'apiLogs is deleted.'
})

})

