const Dateslotlist = require('../models/dateslotlist')
const User = require('../models/user')
const Slot_recreational_am = require('../models/slot_recreational_am')
const Slot_recreational_pm = require('../models/slot_recreational_pm')

const CloseDateslot = require('../models/closedate')

const Slot_dialysis_am = require('../models/slot_dialysis_am')
const Slot_dialysis_pm = require('../models/slot_dialysis_pm')
const asyncHandler = require("express-async-handler");
const Slot_dialysis = require('../models/slot_dialysis')
const ActivityLogs = require("../models/activitylogs");
const Schedule = require('../models/schedule')
const qr = require('qrcode');
const cloudinary = require('cloudinary')
// const moment = require('moment')
const moment = require('moment-timezone');
const fs = require('fs');
// const recreational_am = require('../data/recreational_am.json');
const path = require('path');
const Log = require("../models/log");
const Notification = require("../models/notification");

moment.tz.setDefault('Asia/Singapore');
exports.schedule = async (req, res) => {

	try {

	const { id } = req.params

	const [ userActivity, userRecreational,  userMultipurpose,  userDialysis,  slot_recreational_am,  slot_recreational_pm,  slot_dialysis_am,  slot_dialysis_pm,  slot_dialysis,  slot_hall_am,  slot_hall_pm,  slot_hall_whole,  selectedDate,  selectedSlotDate,] = await Promise.all([
		
		User.find({ _id: id}),
		Schedule.find({ user_id: id, category: "Recreational Activity" }),
		Schedule.find({ user_id: id, category: "Multipurpose Hall" }),
		Schedule.find({ user_id: id, category: "Dialysis" }),
		Slot_recreational_am.find(),
		Slot_recreational_pm.find(),
		Slot_dialysis_am.find(),
		Slot_dialysis_pm.find(),
		Slot_dialysis.find(),
		Schedule.find({ time: "am", category: "Multipurpose Hall" }),
		Schedule.find({ time: "pm", category: "Multipurpose Hall" }),
		Schedule.find({ time: "whole_day", category: "Multipurpose Hall" }),
		Dateslotlist.find({ date: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString() }),
		Dateslotlist.find({ avaliableSlot: 0 }),
	  ]);
	  
	  if (selectedDate.length > 0) {
		await Dateslotlist.findByIdAndUpdate(selectedDate[0]._id, { avaliableSlot: 0, totalSlot: 0 }, { new: true, runValidators: true, useFindAndModify: false });
	  }
	 
	  const userRecreationalData = userActivity.flatMap((data) => data.requirement_id);
	const totaluserRequirements = userRecreationalData.length;

	const hasPresentOrFutureSchedule = userDialysis.some(dialysis => moment(dialysis.date_schedule).isSameOrAfter(moment()));

	  console.log(hasPresentOrFutureSchedule)
	  
	  const userRecreationalSched = userRecreational.map((dates) => dates.date_schedule);
	  const userMultipurposeSched = userMultipurpose.map((dates) => dates.date_schedule);
	  const userDialysisSched = userDialysis.map((dates) => dates.date_schedule);
	  
	  const userMultipurposeSchedAm = slot_hall_am.map((dates) => dates.date_schedule);
	  const userMultipurposeSchedPm = slot_hall_pm.map((dates) => dates.date_schedule);
	  const userMultipurposeSchedWhole = slot_hall_whole.map((dates) => dates.date_schedule);
	  
	  const disableDate = selectedSlotDate.map((dates) => dates.date);
	  
	  const DialysisbookingsThisMonth = await Schedule.countDocuments({
		user_id: id,
		category: "Dialysis",
		date_schedule: {
		  $gte: moment().startOf("month").toDate(),
		  $lte: moment().endOf("month").toDate(),
		},
	  });
	  
	  const DialysisfutureDates = [].concat(
		...userDialysisSched.map((date) => {
		  const currentDate = moment(date);
		  const range = [];
		  for (let i = 0; i < 3; i++) {
			range.push(currentDate.clone().add(i, "days").format("MM/DD/YYYY"));
		  }
		  for (let i = 0; i < 31; i++) {
			range.push(currentDate.clone().subtract(i + 1, "days").format("MM/DD/YYYY"));
		  }
		  return range;
		})
	  );
	// console.log()

	const closedate = await CloseDateslot.find({avaliableSlot : "closed"}); 

	const closedateSched = closedate.map((dates) => dates.date);

	// console.log(closedateSched);


	return res.status(200).json({
		success: true,
		slot_recreational_am,
		slot_recreational_pm,
		slot_dialysis_am,
		slot_dialysis_pm,
		userMultipurposeSchedAm,
		userMultipurposeSchedPm,
		userMultipurposeSchedWhole,
		disableDate,
		userRecreationalSched,
		userMultipurposeSched,
		slot_dialysis,
		userDialysisSched,
		DialysisbookingsThisMonth,
		DialysisfutureDates,
		totaluserRequirements,
		closedateSched,
		closedate,
		hasPresentOrFutureSchedule
	  })

	} catch (err) {
		// Handle errors
		console.error(err); // Log the error for debugging purposes
	
		// Send an error response
		return res.status(500).json({
		  success: false,
		  message: 'Internal server error',
		});
	  }
}



exports.homeClient = async (req, res) => {

	try {

	const { id } = req.params

	const users = await Schedule.find({'user_id' : id});

	var date = users.map(function(dates){return dates.date_schedule;});

	const nowss = moment().format('YYYY-MM-DD')

	const filter = users.filter(user => moment(user.date_schedule).format('YYYY-MM-DD') < nowss);

	
	 //----------------- update all reserved in past date to not attended
	 const filters = {
        user_id: id,
        date_schedule: { $lt: nowss },
        status: 'reserved'
        };
        
        const update = { $set: { status: 'not attended' } };
        
        await Schedule.updateMany(filters, update);


    //------------------------------- restrict all user who had a multiple not attended in booking
	const usersToRestrict = await User.find({ status: { $in: ['active', 'restricted'] } });

	
	const futureDate = moment().add(10, 'days');
	// console.log(futureDate);
  
	for (const user of usersToRestrict) {
	  console.log(user)
	  if (user.status === 'restricted' && user.restrictionExpiration <= moment()) {
		user.status = 'active';
		user.restrictionExpiration = null;
		await user.save();
		console.log(`User ${user.first_name} has been activated.`);
	  } else {
		let schedules;

		if (user.lastRestricted) {
		schedules = await Schedule.find({ user_id: user._id, date_schedule: { $gte: user.lastRestricted } });
		} else {
		schedules = await Schedule.find({ user_id: user._id });
		}

		// const schedules = await Schedule.find({ user_id: user._id, date_schedule: { $gte: user.lastRestricted } });
		// console.log(schedules)
		let unattendedCount = 0;
		for (const schedule of schedules) {
		  if (schedule.status === 'not attended') {
			unattendedCount += 1;
			user.notAttendedCount += 1;
		  }
		}
		if (unattendedCount >= 5) {
		  user.status = 'restricted';
		  user.lastRestricted = moment();
		  user.restrictionExpiration = moment().add(7, 'days');
		  user.notAttendedCount = 0;
		  await user.save();

		  await Notification.create({
			user_id: user._id,
			type: "status_restricted",
			description: "We regret to inform you that your Alaga account has been temporarily restricted for a period of 7 days. This action has been taken as you were unable to attend 5 scheduled appointments, which has resulted in the restriction of your account. Due to this restriction, you will not be able to book any new healthcare services during this time. As a platform designed to provide healthcare services to the elderly community in Taguig City, we prioritize the needs of our clients and strive to ensure efficient scheduling and booking processes. We understand the importance of timely attendance for the smooth operation of our services, and we hope to have your cooperation in adhering to the scheduled appointments in the future. Thank you for your understanding."
		  });
		  console.log(`User ${user.first_name} has been restricted.`);
		}
	  }
	}


	return res.status(200).json({
		success: true,
		filter
	  })


	} catch (err) {
		// Handle errors
		console.error(err); // Log the error for debugging purposes
	
		// Send an error response
		return res.status(500).json({
		  success: false,
		  message: 'Internal server error',
		});
	  }
	  
}

exports.history = async (req, res) => {


	try {

	const { id } = req.params

	const users = await Schedule.find({'user_id' : id});

	var date = users.map(function(dates){return dates.date_schedule;});

	const nowss = moment().format('YYYY-MM-DD')

	const filter = users.filter(user => moment(user.date_schedule).format('YYYY-MM-DD') < nowss);

	
	 //----------------- update all reserved in past date to not attended
	 const filters = {
        user_id: id,
        date_schedule: { $lt: nowss },
        status: 'reserved'
        };
        
        const update = { $set: { status: 'not attended' } };
        
        await Schedule.updateMany(filters, update);


    //------------------------------- restrict all user who had a multiple not attended in booking
	const usersToRestrict = await User.find({ status: { $in: ['active', 'restricted'] } });

	
	const futureDate = moment().add(10, 'days');
	// console.log(futureDate);
  
	for (const user of usersToRestrict) {
	  console.log(user)
	  if (user.status === 'restricted' && user.restrictionExpiration <= moment()) {
		user.status = 'active';
		user.restrictionExpiration = null;
		await user.save();
		console.log(`User ${user.first_name} has been activated.`);
	  } else {
		let schedules;

		if (user.lastRestricted) {
		schedules = await Schedule.find({ user_id: user._id, date_schedule: { $gte: user.lastRestricted } });
		} else {
		schedules = await Schedule.find({ user_id: user._id });
		}

		// const schedules = await Schedule.find({ user_id: user._id, date_schedule: { $gte: user.lastRestricted } });
		// console.log(schedules)
		let unattendedCount = 0;
		for (const schedule of schedules) {
		  if (schedule.status === 'not attended') {
			unattendedCount += 1;
			user.notAttendedCount += 1;
		  }
		}
		if (unattendedCount >= 5) {
		  user.status = 'restricted';
		  user.lastRestricted = moment();
		  user.restrictionExpiration = moment().add(7, 'days');
		  user.notAttendedCount = 0;
		  await user.save();
		  console.log(`User ${user.first_name} has been restricted.`);
		}
	  }
	}

	const activitylogs = await ActivityLogs.create({
		user_id: id,
		description: "View the history schedule"
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

	  
	// console.log(filter)
	return res.status(200).json({
		success: true,
		filter
	  })

	} catch (err) {
		// Handle errors
		console.error(err); // Log the error for debugging purposes
	
		// Send an error response
		return res.status(500).json({
		  success: false,
		  message: 'Internal server error',
		});
	  }
}

exports.activity = async (req, res) => {

	try {


	const { id } = req.params

	const user = await Schedule.find({'user_id' : id});

	var date = user.map(function(dates){return dates.date_schedule;});

	var now = new Date();

	const nowss = moment().format('YYYY-MM-DD')

	// var todate = new Date(nowss).toISOString() 

	// console.log(nowss);
	
	const filter = user.filter(user => moment(user.date_schedule).format('YYYY-MM-DD') >= nowss);

	const activitylogs = await ActivityLogs.create({
		user_id: id,
		description: "View the present schedule"
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

	// console.log(filter)
	// console.log(filter)
	return res.status(200).json({
		success: true,
		filter
	  })

	} catch (err) {
		// Handle errors
		console.error(err); // Log the error for debugging purposes
	
		// Send an error response
		return res.status(500).json({
		  success: false,
		  message: 'Internal server error',
		});
	  }

}

exports.viewActivity = async (req, res) => {

	try {

	const { id } = req.params

	const schedData = await Schedule.find({'_id' : id});
	var schedDataQr = schedData.map(function(schedDatas){return schedDatas.qr_code});
	// var date = schedDataQr.map(function(schedDataQrss){return schedDataQrss.qr_code;});

	// var now = new Date();

	// const filter = schedDataQr.filter();

	// console.log(filter)
	
	const user_idss = req?.user._id

          const activitylogs = await ActivityLogs.create({
            user_id: user_idss,
            description: "View the specific schedule"
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
		schedData,schedDataQr
	  })

	} catch (err) {
		// Handle errors
		console.error(err); // Log the error for debugging purposes
	
		// Send an error response
		return res.status(500).json({
		  success: false,
		  message: 'Internal server error',
		});
	  }

}

exports.addReview = async (req, res) => {

	try {

	const { id } = req.params
	const {rate, comment} = req.body;
// console.log(rate,comment);
	const schedulesqr = await Schedule.findByIdAndUpdate(id,{review: {
		rate: rate,
		comment: comment
	}}, 
	{
		new: true,
		runValidators:true,
		useFindandModify:false
	})

	const user_idss = req?.user._id

          const activitylogs = await ActivityLogs.create({
            user_id: user_idss,
            description: "Added a new review"
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

	// const schedData = await Schedule.find({'_id' : id});
	// var schedDataQr = schedData.map(function(schedDatas){return schedDatas.qr_code});
	// var date = schedDataQr.map(function(schedDataQrss){return schedDataQrss.qr_code;});

	// var now = new Date();

	// const filter = schedDataQr.filter();

	// console.log(id)
	return res.status(200).json({
		success: true,
	  })

	} catch (err) {
		// Handle errors
		console.error(err); // Log the error for debugging purposes
	
		// Send an error response
		return res.status(500).json({
		  success: false,
		  message: 'Internal server error',
		});
	  }

}

exports.cancelActivity = async (req, res) => {

	try {


	const { id } = req.params

	const schedData = await Schedule.findById({'_id':id});

	if(schedData.category == "Recreational Activity"){
		if(schedData.time == "am"){
					const date = schedData.date_schedule;
					var yesterdate=new Date(date.setDate(date.getDate()));
					const dateUpdate = yesterdate.toLocaleDateString();
					
					const selectedDate = await Slot_recreational_am.find({'date' : dateUpdate});

					const updateSlot = selectedDate[0].avaliableSlot + 1;

					const updatedSlot = await Slot_recreational_am.findByIdAndUpdate(selectedDate[0]._id, {
						$set: { 'avaliableSlot': updateSlot}
								}, 
							{
								new: true,
								runValidators: true,
								useFindAndModify: false
							})


					// console.log(updateSlot);
					await schedData.remove();

					const user_idss = req?.user._id

							const activitylogs = await ActivityLogs.create({
								user_id: user_idss,
								description: "Cancel the morning recreational activity schedule"
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
					})

		}else{
			const date = schedData.date_schedule;
			var yesterdate=new Date(date.setDate(date.getDate()));
			const dateUpdate = yesterdate.toLocaleDateString();
			
			const selectedDate = await Slot_recreational_pm.find({'date' : dateUpdate});

			const updateSlot = selectedDate[0].avaliableSlot + 1;

			const updatedSlot = await Slot_recreational_pm.findByIdAndUpdate(selectedDate[0]._id, {
				$set: { 'avaliableSlot': updateSlot}
						}, 
					{
						new: true,
						runValidators: true,
						useFindAndModify: false
					})


			// console.log(updateSlot);
			await schedData.remove();

			const user_idss = req?.user._id

							const activitylogs = await ActivityLogs.create({
								user_id: user_idss,
								description: "Cancel the afternoon recreational activity schedule"
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
			})
		}
			}else if(schedData.category == "Multipurpose Hall"){

				await schedData.remove();
				const user_idss = req?.user._id

				const activitylogs = await ActivityLogs.create({
					user_id: user_idss,
					description: "Cancel the multipurpose schedule"
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
				})

	} else if(schedData.category == "Dialysis"){

			if(schedData.time == "am"){
					const date = schedData.date_schedule;
					var yesterdate=new Date(date.setDate(date.getDate()));
					const dateUpdate = yesterdate.toLocaleDateString();
					
					const selectedDate = await Slot_dialysis_am.find({'date' : dateUpdate});

					const updateSlot = selectedDate[0].avaliableSlot + 1;

					const updatedSlot = await Slot_dialysis_am.findByIdAndUpdate(selectedDate[0]._id, {
						$set: { 'avaliableSlot': updateSlot}
								}, 
							{
								new: true,
								runValidators: true,
								useFindAndModify: false
							})


					// console.log(updateSlot);
					await schedData.remove();

					const user_idss = req?.user._id

					const activitylogs = await ActivityLogs.create({
						user_id: user_idss,
						description: "Cancel the morning dialysis schedule"
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
					})

		}else{
			const date = schedData.date_schedule;
			var yesterdate=new Date(date.setDate(date.getDate()));
			const dateUpdate = yesterdate.toLocaleDateString();
			
			const selectedDate = await Slot_dialysis_pm.find({'date' : dateUpdate});

			const updateSlot = selectedDate[0].avaliableSlot + 1;

			const updatedSlot = await Slot_dialysis_pm.findByIdAndUpdate(selectedDate[0]._id, {
				$set: { 'avaliableSlot': updateSlot}
						}, 
					{
						new: true,
						runValidators: true,
						useFindAndModify: false
					})


			// console.log(updateSlot);
			await schedData.remove();

			const user_idss = req?.user._id

					const activitylogs = await ActivityLogs.create({
						user_id: user_idss,
						description: "Cancel the afternoon dialysis schedule"
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
			})
		}

	
	}

} catch (err) {
    // Handle errors
    console.error(err); // Log the error for debugging purposes

    // Send an error response
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

exports.add = async (req, res) => {
    
	try {


	const {date, user_id, category, status, recreational_services2, purpose, attendees_number} = req.body;

	console.log(recreational_services2)

	if(category == "recreational_am"){
					/////////////////slot
					const selectedDate = await Slot_recreational_am.find({'date' : date});
					const updateSlot = selectedDate[0].avaliableSlot - 1;

					const updatedSlot = await Slot_recreational_am.findByIdAndUpdate(selectedDate[0]._id, {
					'avaliableSlot': updateSlot
								}, 
							{
								new: true,
								runValidators: true,
								useFindAndModify: false
							})
					////////////////////////////////////////////////////


					// const tomorrow = new Date(date)

					// var todates= new Date(tomorrow.setDate(tomorrow.getDate()+1)).toISOString() ;
					const nowss = moment(new Date(date)).format('YYYY-MM-DD')

					var todate = new Date(nowss).toISOString() 

					// console.log(nowss);

					const schedule = await Schedule.create({
						user_id: user_id, 
						date_schedule: todate, 
						category: 'Recreational Activity',
						time: 'am',
						status: status,
						recreational_services: recreational_services2,
					})

					const activitylogs = await ActivityLogs.create({
						user_id: user_id,
						description: "Book a Morning of " + schedule.category + " services"
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


					const latest_data = await Schedule.find({}).sort({_id:-1}).limit(1);
					const latest_data_id = latest_data[0]._id;
					let id_stringdata = JSON.stringify(latest_data_id)

					const qrOption = { 
						margin : 2,
						width : 175
					};

					const bufferImage = await qr.toDataURL(id_stringdata,qrOption);

					const result = await cloudinary.v2.uploader.upload(bufferImage, {
						folder: 'qrcode',
					})

					const schedulesqr = await Schedule.findByIdAndUpdate(latest_data_id,{$push: {qr_code: {
						public_id: result.public_id,
						url: result.secure_url
					}}}, 
					{
						new: true,
						validateBeforeSave: false
					})

					//   console.log(bufferImage);

					return res.status(200).json({
						success: true,
						message:"success",
						schedule
					})

	}else if(category == "recreational_pm"){
			/////////////////slot
			const selectedDate = await Slot_recreational_pm.find({'date' : date});
			const updateSlot = selectedDate[0].avaliableSlot - 1;

			const updatedSlot = await Slot_recreational_pm.findByIdAndUpdate(selectedDate[0]._id, {
			'avaliableSlot': updateSlot
						}, 
					{
						new: true,
						runValidators: true,
						useFindAndModify: false
					})
			////////////////////////////////////////////////////


			// const tomorrow = new Date(date)

			// var todates= new Date(tomorrow.setDate(tomorrow.getDate()+1)).toISOString() ;
			const nowss = moment(new Date(date)).format('YYYY-MM-DD')

			var todate = new Date(nowss).toISOString() 

			// console.log(nowss);

			const schedule = await Schedule.create({
				user_id: user_id, 
				date_schedule: todate, 
				category: 'Recreational Activity',
				time: 'pm',
				status: status,
				recreational_services: recreational_services2,
			})

			const activitylogs = await ActivityLogs.create({
				user_id: user_id,
				description: "Book a Afternoon of " + schedule.category + " services"
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

			const latest_data = await Schedule.find({}).sort({_id:-1}).limit(1);
			const latest_data_id = latest_data[0]._id;
			let id_stringdata = JSON.stringify(latest_data_id)

			const qrOption = { 
				margin : 2,
				width : 175
			};

			const bufferImage = await qr.toDataURL(id_stringdata,qrOption);

			const result = await cloudinary.v2.uploader.upload(bufferImage, {
				folder: 'qrcode',
			})

			const schedulesqr = await Schedule.findByIdAndUpdate(latest_data_id,{$push: {qr_code: {
				public_id: result.public_id,
				url: result.secure_url
			}}}, 
			{
				new: true,
				validateBeforeSave: false
			})

			//   console.log(bufferImage);

			return res.status(200).json({
				success: true,
				message:"success",
				schedule
			})


			}else if(category == "multipurpose_am"){
				/////////////////slot
				// const selectedDate = await Slot_hall_am.find({'date' : date});
				// const updateSlot = selectedDate[0].avaliableSlot - 1;

				// const updatedSlot = await Slot_hall_am.findByIdAndUpdate(selectedDate[0]._id, {
				// 'avaliableSlot': updateSlot
				// 			}, 
				// 		{
				// 			new: true,
				// 			runValidators: true,
				// 			useFindAndModify: false
				// 		})
				////////////////////////////////////////////////////


				// const tomorrow = new Date(date)

				// var todates= new Date(tomorrow.setDate(tomorrow.getDate()+1)).toISOString() ;
				const nowss = moment(new Date(date)).format('YYYY-MM-DD')

				var todate = new Date(nowss).toISOString() 

				// console.log(nowss);

				const schedule = await Schedule.create({
					user_id: user_id, 
					date_schedule: todate, 
					category: 'Multipurpose Hall',
					time: 'am',
					status: status,
					purpose: purpose,
					attendees_number: attendees_number,
				})

				const activitylogs = await ActivityLogs.create({
					user_id: user_id,
					description: "Book a Morning of " + schedule.category + " services"
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

				const latest_data = await Schedule.find({}).sort({_id:-1}).limit(1);
				const latest_data_id = latest_data[0]._id;
				let id_stringdata = JSON.stringify(latest_data_id)

				const qrOption = { 
					margin : 2,
					width : 175
				};

				const bufferImage = await qr.toDataURL(id_stringdata,qrOption);

				const result = await cloudinary.v2.uploader.upload(bufferImage, {
					folder: 'qrcode',
				})

				const schedulesqr = await Schedule.findByIdAndUpdate(latest_data_id,{$push: {qr_code: {
					public_id: result.public_id,
					url: result.secure_url
				}}}, 
				{
					new: true,
					validateBeforeSave: false
				})

				//   console.log(bufferImage);

				return res.status(200).json({
					success: true,
					message:"success",
					schedule
				})

				}else if(category == "multipurpose_pm"){
					
					const nowss = moment(new Date(date)).format('YYYY-MM-DD')

					var todate = new Date(nowss).toISOString() 

					// console.log(nowss);

					const schedule = await Schedule.create({
						user_id: user_id, 
						date_schedule: todate, 
						category: 'Multipurpose Hall',
						time: 'pm',
						status: status,
						purpose: purpose,
						attendees_number: attendees_number,
					})

					const activitylogs = await ActivityLogs.create({
						user_id: user_id,
						description: "Book a Afternoon of " + schedule.category + " services"
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

					const latest_data = await Schedule.find({}).sort({_id:-1}).limit(1);
					const latest_data_id = latest_data[0]._id;
					let id_stringdata = JSON.stringify(latest_data_id)

					const qrOption = { 
						margin : 2,
						width : 175
					};

					const bufferImage = await qr.toDataURL(id_stringdata,qrOption);

					const result = await cloudinary.v2.uploader.upload(bufferImage, {
						folder: 'qrcode',
					})

					const schedulesqr = await Schedule.findByIdAndUpdate(latest_data_id,{$push: {qr_code: {
						public_id: result.public_id,
						url: result.secure_url
					}}}, 
					{
						new: true,
						validateBeforeSave: false
					})

					//   console.log(bufferImage);

					return res.status(200).json({
						success: true,
						message:"success",
						schedule
					})


				}else if(category == "multipurpose_wholeday"){
					
					const nowss = moment(new Date(date)).format('YYYY-MM-DD')
		
					var todate = new Date(nowss).toISOString() 
		
					// console.log(nowss);
		
					const schedule = await Schedule.create({
						user_id: user_id, 
						date_schedule: todate, 
						category: 'Multipurpose Hall',
						time: 'whole_day',
						status: status,
						purpose: purpose,
						attendees_number: attendees_number,
					})

					const activitylogs = await ActivityLogs.create({
						user_id: user_id,
						description: "Book a Wholeday of " + schedule.category + " services"
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
		
					const latest_data = await Schedule.find({}).sort({_id:-1}).limit(1);
					const latest_data_id = latest_data[0]._id;
					let id_stringdata = JSON.stringify(latest_data_id)
		
					const qrOption = { 
						margin : 2,
						width : 175
					};
		
					const bufferImage = await qr.toDataURL(id_stringdata,qrOption);
		
					const result = await cloudinary.v2.uploader.upload(bufferImage, {
						folder: 'qrcode',
					})
		
					const schedulesqr = await Schedule.findByIdAndUpdate(latest_data_id,{$push: {qr_code: {
						public_id: result.public_id,
						url: result.secure_url
					}}}, 
					{
						new: true,
						validateBeforeSave: false
					})
		
					//   console.log(bufferImage);
		
					return res.status(200).json({
						success: true,
						message:"success",
						schedule
					})


			} 
			else if(category == "dialysis_am"){
				/////////////////slot
				const selectedDate = await Slot_dialysis_am.find({'date' : date});
				const updateSlot = selectedDate[0].avaliableSlot - 1;

				const updatedSlot = await Slot_dialysis_am.findByIdAndUpdate(selectedDate[0]._id, {
				'avaliableSlot': updateSlot
							}, 
						{
							new: true,
							runValidators: true,
							useFindAndModify: false
						})
				////////////////////////////////////////////////////


				// const tomorrow = new Date(date)

				// var todates= new Date(tomorrow.setDate(tomorrow.getDate()+1)).toISOString() ;
				const nowss = moment(new Date(date)).format('YYYY-MM-DD')

				var todate = new Date(nowss).toISOString() 

				// console.log(nowss);

				const schedule = await Schedule.create({
					user_id: user_id, 
					date_schedule: todate, 
					category: 'Dialysis',
					time: 'am',
					status: status,
				})

				const activitylogs = await ActivityLogs.create({
					user_id: user_id,
					description: "Book a Morning of " + schedule.category + " services"
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

				const latest_data = await Schedule.find({}).sort({_id:-1}).limit(1);
				const latest_data_id = latest_data[0]._id;
				let id_stringdata = JSON.stringify(latest_data_id)

				const qrOption = { 
					margin : 2,
					width : 175
				};

				const bufferImage = await qr.toDataURL(id_stringdata,qrOption);

				const result = await cloudinary.v2.uploader.upload(bufferImage, {
					folder: 'qrcode',
				})

				const schedulesqr = await Schedule.findByIdAndUpdate(latest_data_id,{$push: {qr_code: {
					public_id: result.public_id,
					url: result.secure_url
				}}}, 
				{
					new: true,
					validateBeforeSave: false
				})

				//   console.log(bufferImage);

				return res.status(200).json({
					success: true,
					message:"success",
					schedule
				})



				}else if(category == "dialysis_pm"){
				/////////////////slot
				const selectedDate = await Slot_dialysis_pm.find({'date' : date});
				const updateSlot = selectedDate[0].avaliableSlot - 1;

				const updatedSlot = await Slot_dialysis_pm.findByIdAndUpdate(selectedDate[0]._id, {
				'avaliableSlot': updateSlot
							}, 
						{
							new: true,
							runValidators: true,
							useFindAndModify: false
						})
				////////////////////////////////////////////////////


				// const tomorrow = new Date(date)

				// var todates= new Date(tomorrow.setDate(tomorrow.getDate()+1)).toISOString() ;
				const nowss = moment(new Date(date)).format('YYYY-MM-DD')

				var todate = new Date(nowss).toISOString() 

				// console.log(nowss);

				const schedule = await Schedule.create({
					user_id: user_id, 
					date_schedule: todate, 
					category: 'Dialysis',
					time: 'pm',
					status: status,
				})

				const activitylogs = await ActivityLogs.create({
					user_id: user_id,
					description: "Book a Morning of " + schedule.category + " services"
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

				const latest_data = await Schedule.find({}).sort({_id:-1}).limit(1);
				const latest_data_id = latest_data[0]._id;
				let id_stringdata = JSON.stringify(latest_data_id)

				const qrOption = { 
					margin : 2,
					width : 175
				};

				const bufferImage = await qr.toDataURL(id_stringdata,qrOption);

				const result = await cloudinary.v2.uploader.upload(bufferImage, {
					folder: 'qrcode',
				})

				const schedulesqr = await Schedule.findByIdAndUpdate(latest_data_id,{$push: {qr_code: {
					public_id: result.public_id,
					url: result.secure_url
				}}}, 
				{
					new: true,
					validateBeforeSave: false
				})

				//   console.log(bufferImage);

				return res.status(200).json({
					success: true,
					message:"success",
					schedule
				})
			}
		} catch (err) {
			// Handle errors
			console.error(err); // Log the error for debugging purposes
		
			// Send an error response
			return res.status(500).json({
			  success: false,
			  message: 'Internal server error',
			});
		  }
	
}


///================================ attendee

exports.attendeesList = async (req, res) => {

	try {

	const nowss = moment(new Date()).format('YYYY-MM-DD')

	var todate = new Date(nowss).toISOString() 


	// const allAttendees = await Schedule.find({'date_schedule' : todate}).populate('user_id');
	const allAttendees = await Schedule.find().populate('user_id');

	const dateCloseSlot = await CloseDateslot.find();

	const user_idss = req?.user._id

					const activitylogs = await ActivityLogs.create({
						user_id: user_idss,
						description: "View attendees"
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
		length: allAttendees.length,
		success: true,
		allAttendees,
		dateCloseSlot
	  })

	} catch (err) {
		// Handle errors
		console.error(err); // Log the error for debugging purposes
	
		// Send an error response
		return res.status(500).json({
		  success: false,
		  message: 'Internal server error',
		});
	  }


}





const Report = require("fluentreports").Report;




// Define the path to the image file
const ealaga = path.join(__dirname, '..', 'data', 'logovector.png');
const osca = path.join(__dirname, '..', 'data', 'osca.png');

// console.log(imagePath)

exports.downloadPDF = async (req, res, next) => {

	try {

	const filteredUsers = req.body?.downloadPdf;
	const start_date = req.body?.start_date;

	const status = req.body?.status;
	const time = req.body?.time;
	const barangay = req.body?.barangay;
	const category = req.body?.category;

	
	
	const user_idss = req?.user._id

					const activitylogs = await ActivityLogs.create({
						user_id: user_idss,
						description: "View pdf of attendees list"
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

	const end_date = req.body?.end_date;

	// console.log(start_date, end_date);

	

	
	var data = [];

					filteredUsers.forEach(user => {
					data.push({
						last_name: user?.user_id?.last_name,
						first_name: user?.user_id?.first_name,
						category: user?.category,
						gender: user?.user_id?.gender,
						phone: user?.user_id?.phone,
						date_schedule: user.date_schedule,
						// email: user.email, 
						// role: user.role, 
						// createdAt: moment(new Date(user.createdAt)).format('YYYY-MM-DD'),
						barangay: user?.user_id?.address?.barangay
					});
					});
					
					data.sort(function(a, b) {
					var dateA = new Date(a.date_schedule);
					var dateB = new Date(b.date_schedule);
					return dateA - dateB;
					});
  
			const Current_Date = new Date().toDateString();
			const Starting_Date = new Date(start_date).toLocaleDateString();
			const Ending_Date = new Date(end_date).toLocaleDateString();

			const footer = function (rpt) {
  
			  rpt.standardFooter([
				  ['user_name', 1, 3],
			  ]);
			  rpt.print(`Total Users: ${filteredUsers.length}`, {align: 'left'});
			  rpt.newline();
			  rpt.newline();
			  rpt.print('Powered by eAlaga', {align: 'right'});
		  };
  
			var proposalHeader = function(x, r) {
				var fSize = 9;
  
				var data = [status, time, barangay, category].filter(Boolean).join(", ");
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
				  x.print("Attendees List", { y: 170, fontsize: fSize + 7, fontBold: true });

				  x.band(
					[
					  { data: "Filtered by:", width: 65 },
					  result
					],
					{ y: 190 }
				  );
				  if(start_date && !end_date){
					x.band(
						[
						  { data: "Filtered Date: " + moment(Starting_Date).format("MMMM DD, YYYY"), width: 200 },
						],
						{ y: 205 }
					  );
				  }else{
					x.band(
						[
						  { data: "Filtered Date: " + moment(Starting_Date).format("MMMM DD, YYYY") + " to " + moment(Ending_Date).format("MMMM DD, YYYY"), width: 300 },
						],
						{ y: 205 }
					  );
				  }
				
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
			  x.band([
				  {data: 'Full Name', width: 130},
				  {data: 'Category', width: 110},
				  {data: 'Barangay', width: 100},
				  {data: 'Gender', width: 60},
				  {data: 'Date', width: 60},
				  {data: 'Contact', width: 80},
			  ], {y: 240});
			  x.fontNormal();
			  x.bandLine();
			  x.newline();
		  };
  
  
		  const detail = function (rpt, data) {
			// Detail Body
			rpt.band([
			  {data: data.last_name + ", " + data.first_name, width: 130},
			  {data: data.category, width: 110, marginTop: 5, marginBottom: 5},
			  {data: !data.barangay || data.barangay == "none" ? "Not Verified" : data.barangay, width: 100, marginTop: 5, marginBottom: 5}, 
			  {data: data.gender, width: 60, marginTop: 15, marginBottom: 5},
			  {data: moment(data.date_schedule).format("DD/MM/YYYY"), width: 60, marginTop: 15, marginBottom: 5},
			  {data: data.phone, width: 80, marginTop: 15, marginBottom: 5},
			  // {data: data.ninety, width: 65, align: 3},
			  // {data: data.hundredtwenty, width: 60, align: 3},
			  // {data: data.sale.balance_due, width: 60, align: 3}
			]);
			
		};
  
	const rpt = new Report("Attendees.pdf")
	.margins(20)
	.pageHeader(proposalHeader )
	.sum('user_name')
	.data( data )
	.pageFooter(footer)
	.detail(detail)
	.render((err, buffer) => {
		res.download(buffer);
	});


	 } catch (err) {
    // Handle errors
    console.error(err); // Log the error for debugging purposes

    // Send an error response
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }

  };


  exports.allUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({role : "client"}); 

    res.send(users);
} catch (err) {
    // Handle errors
    console.error(err); // Log the error for debugging purposes

    // Send an error response
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }

  });

exports.AddCloseDate = asyncHandler(async (req, res) => {
	try {

	const {
		date,
		type,
		description
	  } = req.body;

	  const newCloseDateData = {
		date: date,
		type: type,
		description: description,
	  };

  const closedate = await CloseDateslot.find({date : date}); 

  const updatedSlot = await CloseDateslot.findOneAndUpdate(
	{ date: date }, // Filter for the document to update
	{ 
	  avaliableSlot: "closed", // Update the availableSlot field
	  totalSlot: "closed", // Add the new field 1 with its value
	  type: type,  // Add the new field 2 with its value
	  description: description  // Add the new field 2 with its value
	},
	{ new: true, runValidators: true, useFindAndModify: false } // Options for the update operation
  );


  const users = await User.find({ role: "client" });

  // Loop through each user and create a notification
  for (const user of users) {
	await Notification.create({
		user_id: user._id,
		type: type,
		description: description + `\nClosing Date: ${moment(date).format("MMMM DD, YYYY ")}.`, // Add \n for a new line before the string
	  });
  }

    res.send(updatedSlot);

} catch (err) {
    // Handle errors
    console.error(err); // Log the error for debugging purposes

    // Send an error response
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }


  });


exports.AddOpenDate = asyncHandler(async (req, res) => {

	try {
		
	const {
		date
	  } = req.body;

	  const newOpenDateData = {
		date: date,
	  };

	  console.log(newOpenDateData)

  const closedate = await CloseDateslot.find({date : date}); 

  const updatedSlot = await CloseDateslot.findOneAndUpdate(
	{ date: date }, // Filter for the document to update
	{ 
	  avaliableSlot: "open", // Update the availableSlot field
	  totalSlot: "open", // Add the new field 1 with its value
	  $unset: { // Use $unset to remove fields
	    type: "", // Remove the type field
	    description: "" // Remove the description field
	  }
	},
	{ new: true, runValidators: true, useFindAndModify: false } // Options for the update operation
);


  const users = await User.find({ role: "client" });

  // Loop through each user and create a notification
  for (const user of users) {
	await Notification.create({
		user_id: user._id,
		type: "Center Now Open",
		description: `We apologize for any confusion caused by our previous message regarding the closure of our center on ${moment(date).format("MMMM DD, YYYY ")}. Due to an administrative error, the decision to close on that specific date was incorrect. We acknowledge the mistake and want to inform you that our center will be open and operational on ${moment(date).format("MMMM DD, YYYY ")}. We deeply regret any inconvenience this may have caused and appreciate your continued support. Thank you for your understanding.`, 
	  });
  }

    res.send(updatedSlot);

} catch (err) {
    // Handle errors
    console.error(err); // Log the error for debugging purposes

    // Send an error response
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
  
  });
  
  
