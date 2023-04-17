const Health = require('../models/health')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/user')
const Schedule = require('../models/schedule')
const Donation = require('../models/donation')
const moment = require('moment')
const Applicant = require('../models/applicant')
const ActivityLogs = require("../models/activitylogs");
const Log = require("../models/log");

exports.barangayInfo = async (req, res) => {

    const barangay = ['Bagumbayan', 'Bambang', 'Calzada', 'Central Bicutan', 
    'Central Signal Village', 'Fort Bonifacio', 'Hagonoy', 'Ibayo-tipas', 
    'Lower Bicutan', 'Maharlika Village', 'Napindan', 'New Lower Bicutan', 
    'North Daang Hari', 'North Signal Village', 'Palingon', 'Pinagsama', 'San Miguel', 
    'Santa Ana', 'South Daang Hari', 'South Signal Village', 'Tanyag', 'Tuktukan', 
    'Upper Bicutan', 'Ususan', 'Wawa', 'Western Bicutan'];


        const result = [];
      
        // iterate through each barangay
        for (const b of barangay) {
          const users = await User.find({ 'address.barangay': b }).select('_id name status');
      
          const activeUsers = users.filter(u => u.status === 'active');
          const inactiveUsers = users.filter(u => u.status === 'inactive');
          const restrictedUsers = users.filter(u => u.status === 'restricted');
      
          result.push({
            barangay: b,
            activeUsers: activeUsers.length,
            inactiveUsers: inactiveUsers.length,
            restrictedUsers: restrictedUsers.length,
            totalUsers: users.length
          });
        }
        // console.table(result);
        res.json({result});

  
}


exports.userInfo = async (req, res) => {

  console.log("hi")

    const result = await User.aggregate([
      {
        $match: {
          role: "client"
        }
      },
        {
          $lookup: {
            from: 'donations',
            localField: '_id',
            foreignField: 'user_id',
            as: 'donationList'
          }
        },
        {
          $lookup: {
            from: 'schedules',
            localField: '_id',
            foreignField: 'user_id',
            as: 'scheduleList'
          }
        },
        {
          $project: {
            name: { $concat: ['$first_name', ' ', '$last_name'] },
            status: 1,
            donationCount: { $size: '$donationList' },
            scheduleCount: { $size: '$scheduleList' },
          }
        }
      ]);
    
      res.json({result});

}


exports.donationInfo = async (req, res) => {

    const result = await Donation.aggregate([
        // Match donations with categories in the category array
        { $match: { category: { $in: ["Clothing", "Personal Hygiene Items", "Bed Linens", "Books and Entertainment", "Food", "Furniture", "Medical Supplies", "Electronics", "Home Decor", "Other"] } } },
        // Replace null values in user_id with "non-existent"
        {
          $project: {
            donator_name: 1,
            category: 1,
            quantity: 1,
            user_id: { $ifNull: ["$user_id", "non-existent"] },
          },
        },
        // Group donations by category and user_id
        {
          $group: {
            _id: { category: "$category", user_id: "$user_id" },
            total_quantity: { $sum: "$quantity" }, // Sum the quantity of each donation
          },
        },
        // Group by category to calculate totals
        {
          $group: {
            _id: "$_id.category",
            total_users: { $addToSet: "$_id.user_id" }, // Add unique user_ids to set
            total_quantity: { $sum: "$total_quantity" }, // Sum the quantity of each donation
            existing_users: { $sum: { $cond: { if: { $ne: ["$_id.user_id", "non-existent"] }, then: 1, else: 0 } } }, // Sum the number of donations with non-null user_id
            non_existing_users: { $sum: { $cond: { if: { $eq: ["$_id.user_id", "non-existent"] }, then: 1, else: 0 } } } // Sum the number of donations with null user_id
          }
        },
        // Project the required fields and rename the _id field to category
        {
          $project: {
            _id: 0,
            category: "$_id",
            total_users: { $size: "$total_users" },
            total_quantity: 1,
            existing_users: 1,
            non_existing_users: 1,
            category_order: {
              $indexOfArray: [["Clothing", "Personal Hygiene Items", "Bed Linens", "Books and Entertainment", "Food", "Furniture", "Medical Supplies", "Electronics", "Home Decor", "Other"], "$_id"]
            }
          }
        },
        // Sort by category_order
        {
          $sort: { category_order: 1 }
        }
      ])
      
      

    //   console.table(result)
      res.json({result});
}

const path = require("path");
const fs = require("fs");
const Report = require("fluentreports").Report;




// Define the path to the image file
const ealaga = path.join(__dirname, '..', 'data', 'logovector.png');
const osca = path.join(__dirname, '..', 'data', 'osca.png');

// console.log(imagePath)

exports.downloadBarangayPDF = catchAsyncErrors(async (req, res, next) => {

    // console.log("downloadBarangayPDF")
  
    const filteredBarangay = req.body?.downloadPdf;

    // console.log(filteredBarangay)

    const user_idss = req?.user._id

    const activitylogs = await ActivityLogs.create({
      user_id: user_idss,
      description: "View the barangay information into pdf"
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

  filteredBarangay.forEach((barangayss) => {
      data.push({
        barangay: barangayss.barangay,
        activeUsers: barangayss.activeUsers,
        inactiveUsers: barangayss.inactiveUsers,
        restrictedUsers: barangayss.restrictedUsers,
        totalUsers: barangayss.totalUsers,
      });
    });

    // console.log(data)


    const totalActiveUsers = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.activeUsers;
      }, 0);
     
      const totalinactiveUsers = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.inactiveUsers;
      }, 0);
      const totalrestrictedUsers = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.restrictedUsers;
      }, 0);
      const totalUsers = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.totalUsers;
      }, 0);



    const Current_Date = new Date().toDateString();

    const footer = function (rpt) {
      rpt.standardFooter([["barangay", 1, 3]]);
      rpt.band(
        [
          { data: `Total Barangay: ${filteredBarangay.length}`, width: 160 },
          { data: `Active User: ${totalActiveUsers}`, width: 110 },
          { data: `Not Active User: ${totalinactiveUsers}`, width: 110 },
          { data: `Restricted User: ${totalrestrictedUsers}`, width: 110 },
          { data: `Total User: ${totalUsers}`, width: 110 },
        ]
      );
      // rpt.image(imagePath, {width: 50});
      rpt.newline();
      rpt.newline();
      rpt.print("Powered by eAlaga", { align: "right" });
    };
   
    var proposalHeader = function (x, r) {
      var fSize = 9;
  
    //   var data = [category].filter(Boolean).join(", ");
    //   if (!data) {
    //     data = "none";
    //   }
      
    //   const result = { data, width: 800, fontSize: 12 };
  
    //   console.log(result)
  
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
      x.print("Barangay Information", { y: 150, fontsize: fSize + 7, fontBold: true });
    //   x.band(
    //     [
    //       { data: "Filtered by:", width: 65 },
    //       result
    //     ],
    //     { y: 170 }
    //   );
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
          { data: "Barangay", width: 160 },
          { data: "Active User", width: 110 },
          { data: "Not Active User", width: 110 },
          { data: "Restricted Users", width: 110 },
          { data: "Total Users", width: 110 },
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
        { data: data.barangay, width: 160 },
        { data: data.activeUsers, width: 110, align: 5, marginTop: 5, marginBottom: 5 },
        { data: data.inactiveUsers, width: 110, marginTop: 15, marginBottom: 5, align: 5 },
        { data: data.restrictedUsers, width: 110, marginTop: 15, marginBottom: 5, align: 5  },
        { data: data.totalUsers, width: 110, marginTop: 15, marginBottom: 5, align: 5  },
      ]);
    };
  
    const rpt = new Report("BarangayInformation.pdf")
      .margins(20)
      .pageHeader(proposalHeader)
      .sum("barangay")
      .data(data)
      .pageFooter(footer)
      .detail(detail)
      .render((err, buffer) => {
        res.download(buffer);
      });



});
  

exports.downloadUserPDF = catchAsyncErrors(async (req, res, next) => {

    // console.log("downloadUserPDF")
  
    const filteredUserss = req.body?.downloadPdf;

    // console.log(filteredBarangay)

    const user_idss = req?.user._id

    const activitylogs = await ActivityLogs.create({
      user_id: user_idss,
      description: "View the user information report into pdf"
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

  filteredUserss.forEach((userss) => {
      data.push({
        name: userss.name,
        donationCount: userss.donationCount,
        scheduleCount: userss.scheduleCount,
        status: userss.status,
      });
    });

    // console.log(data)


    const totaldonationCount = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.donationCount;
      }, 0);
     
      const totalscheduleCount = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.scheduleCount;
      }, 0);
   

    const Current_Date = new Date().toDateString();

    const footer = function (rpt) {
      rpt.standardFooter([["name", 1, 3]]);
      rpt.band(
        [
          { data: `Total User: ${filteredUserss.length}`, width: 175 },
          { data: `Total Donations: ${totaldonationCount}`, width: 140 },
          { data: `Total Booked Services: ${totalscheduleCount}`, width: 160 },
        ]
      );
      // rpt.image(imagePath, {width: 50});
      rpt.newline();
      rpt.newline();
      rpt.print("Powered by eAlaga", { align: "right" });
    };
   
    var proposalHeader = function (x, r) {
      var fSize = 9;
  
    //   var data = [category].filter(Boolean).join(", ");
    //   if (!data) {
    //     data = "none";
    //   }
      
    //   const result = { data, width: 800, fontSize: 12 };
  
    //   console.log(result)
  
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
      x.print("User Information", { y: 150, fontsize: fSize + 7, fontBold: true });
    //   x.band(
    //     [
    //       { data: "Filtered by:", width: 65 },
    //       result
    //     ],
    //     { y: 170 }
    //   );
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
          { data: "User", width: 175 },
          { data: "No. of Donations", width: 140 },
          { data: "No. of Booked Services", width: 140 },
          { data: "Status", width: 120 },
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
        { data: data.name, width: 175 },
        { data: data.donationCount, width: 140, align: 5, marginTop: 5, marginBottom: 5 },
        { data: data.scheduleCount, width: 140, marginTop: 15, marginBottom: 5, align: 5 },
        { data: data.status, width: 120, marginTop: 15, marginBottom: 5, align: 5  },
      ]);
    };
  
    const rpt = new Report("UserInformation.pdf")
      .margins(20)
      .pageHeader(proposalHeader)
      .sum("name")
      .data(data)
      .pageFooter(footer)
      .detail(detail)
      .render((err, buffer) => {
        res.download(buffer);
      });


  });

exports.downloadDonationPDF = catchAsyncErrors(async (req, res, next) => {

    // console.log("downloadDonationPDF")


    const filteredDonationss = req.body?.downloadPdf;

    // console.log(filteredBarangay)

    const user_idss = req?.user._id

    const activitylogs = await ActivityLogs.create({
      user_id: user_idss,
      description: "View the donation report into pdf"
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

  filteredDonationss.forEach((donationsss) => {
      data.push({
        category: donationsss.category,
        total_users: donationsss.total_users,
        total_quantity: donationsss.total_quantity,
        existing_users: donationsss.existing_users,
        non_existing_users: donationsss.non_existing_users,
      });
    });

    // console.log(data)


    const total_users= data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.total_users;
      }, 0);
     
      const total_quantity = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.total_quantity;
      }, 0);

      const totalexisting_users = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.existing_users;
      }, 0);

      const totalnon_existing_users = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.non_existing_users;
      }, 0);
   

    const Current_Date = new Date().toDateString();

    const footer = function (rpt) {
      rpt.standardFooter([["category", 1, 3]]);
      rpt.band(
        [
          { data: `Total Category: ${filteredDonationss.length}`, width: 150 },
          { data: `User Donor: ${total_users}`, width: 120 },
          { data: `Quantity: ${total_quantity}`, width: 100 },
          { data: `Existing: ${totalexisting_users}`, width: 100 },
          { data: `Non Existing: ${totalnon_existing_users}`, width: 100 },
        ]
      );
      // rpt.image(imagePath, {width: 50});
      rpt.newline();
      rpt.newline();
      rpt.print("Powered by eAlaga", { align: "right" });
    };
   
    var proposalHeader = function (x, r) {
      var fSize = 9;
  
    //   var data = [category].filter(Boolean).join(", ");
    //   if (!data) {
    //     data = "none";
    //   }
      
    //   const result = { data, width: 800, fontSize: 12 };
  
    //   console.log(result)
  
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
      x.print("Donation Information", { y: 150, fontsize: fSize + 7, fontBold: true });
    //   x.band(
    //     [
    //       { data: "Filtered by:", width: 65 },
    //       result
    //     ],
    //     { y: 170 }
    //   );
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
          { data: "Category", width: 150 },
          { data: "No. of User Donor", width: 120 },
          { data: "Quantities", width: 100 },
          { data: "Existing User", width: 100 },
          { data: "Non Existing User", width: 100 },
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
        { data: data.category, width: 150 },
        { data: data.total_users, width: 120, align: 5, marginTop: 5, marginBottom: 5 },
        { data: data.total_quantity, width: 100, marginTop: 15, marginBottom: 5, align: 5 },
        { data: data.existing_users, width: 100, marginTop: 15, marginBottom: 5, align: 5  },
        { data: data.non_existing_users, width: 100, marginTop: 15, marginBottom: 5, align: 5  },
      ]);
    };
  
    const rpt = new Report("DonationInformation.pdf")
      .margins(20)
      .pageHeader(proposalHeader)
      .sum("category")
      .data(data)
      .pageFooter(footer)
      .detail(detail)
      .render((err, buffer) => {
        res.download(buffer);
      });
  
   
  });