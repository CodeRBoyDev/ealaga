const express = require('express');
const router = express.Router();

const {schedule, add, activity, viewActivity, history,addReview, cancelActivity, attendeesList, downloadPDF, homeClient, allUsers, AddCloseDate, AddOpenDate} = require('../controllers/scheduleController');
const { protect } = require("../middlewares/authMiddleware");



router.route('/homeClient/:id').get(protect, homeClient);
router.route('/schedule/:id').get(protect, schedule);
router.route('/activity/:id').get(protect, activity);
router.route('/activity/view/:id').get(protect, viewActivity);
router.route('/activity/cancel/:id').get(protect, cancelActivity);
router.route('/history/:id').get(protect, history);
router.route('/review/:id').put(protect, addReview);
router.route('/schedule/add').post(protect, add);

//admin--------------
router.route('/attendees').get(protect, attendeesList);
router.route("/attendees/allUsers").get(protect, allUsers);
router.route('/attendees/AddCloseDate').post(protect, AddCloseDate);
router.route('/attendees/AddOpenDate').post(protect, AddOpenDate);
router.route('/attendees/downloadPDF').post(protect, downloadPDF);

module.exports = router;