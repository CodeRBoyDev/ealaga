const Health = require('../models/health')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/user')
const Schedule = require('../models/schedule')
const Donation = require('../models/donation')
const moment = require('moment')
const Applicant = require('../models/applicant')
const ActivityLogs = require("../models/activitylogs");
const Log = require("../models/log");

exports.getTotal = async (req, res) => {
  const nowss = moment().format('YYYY-MM-DD');
  const todate = new Date(nowss).toISOString();

  const [
      totalallAttendees,
      allServices,
      allAttendees,
      allReviews,
      allApplicant,
      allClient,
      alluser,
      allDonation
  ] = await Promise.all([
      Schedule.find({ 'date_schedule': todate }).populate('user_id'),
      Schedule.find(),
      Schedule.find().populate('user_id'),
      Schedule.find({ review: { $exists: true } }).populate('user_id'),
      Applicant.find(),
      User.find({ role: "client" }),
      User.find(),
      Donation.find()
  ]);

  const totalAttendees = totalallAttendees.length;
  const totalApplicant = allApplicant.length;
  const totalUser = alluser.length;
  const totalClient = allClient.length;
  const totalReviews = allReviews.length;

  const user_id = req?.user?._id;

  await ActivityLogs.create({
      user_id: user_id,
      description: "View the dashboard"
  });

  await Log.create({
      date: new Date(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime: Date.now() - req._startTime,
      referrer: req.headers.referer || '',
      userAgent: req.headers['user-agent'] || '',
      platform: "web",
  });

  return res.status(200).json({
      success: true,
      totalAttendees,
      totalApplicant,
      totalUser,
      totalClient,
      totalReviews,
      allAttendees,
      allReviews,
      alluser,
      allServices,
      allDonation
  });
}