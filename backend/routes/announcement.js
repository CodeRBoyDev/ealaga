const express = require('express');
const router = express.Router();

const {newAnnouncement, getAnnouncement,editAnnouncement,deleteAnnouncement, getAnnouncementHome} = require('../controllers/announcementController');
const { protect } = require("../middlewares/authMiddleware");

router.route('/announcement/new').post(protect, newAnnouncement);
router.route('/announcement/read').get(protect, getAnnouncement);
router.route('/announcement/readHome').get(getAnnouncementHome);
router.route('/announcement/edit/:id').put(protect, editAnnouncement);
router.route('/announcement/delete/:id').delete(protect, deleteAnnouncement);
module.exports = router;