const express = require('express');
const router = express.Router();

const {barangayInfo, userInfo, donationInfo, downloadBarangayPDF, downloadUserPDF, downloadDonationPDF} = require('../controllers/reportController');

const { protect } = require("../middlewares/authMiddleware");

router.route('/report/barangay').get(protect, barangayInfo);
router.route('/report/user').get(protect, userInfo);
router.route('/report/donation').get(protect, donationInfo);


router.route('/report/downloadBarangayPDF').post(protect, downloadBarangayPDF);
router.route('/report/downloadUserPDF').post(protect, downloadUserPDF);
router.route('/report/downloadDonationPDF').post(protect, downloadDonationPDF);



module.exports = router;