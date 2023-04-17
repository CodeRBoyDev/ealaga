const express = require('express');
const router = express.Router();

const {newApplicant, getApplicant, viewApplicant, acceptApplicant, deniedApplicant, downloadPDF} = require('../controllers/applicantController');
const { protect } = require("../middlewares/authMiddleware");

router.route('/applicant/new').post(newApplicant);
router.route('/applicant/get').get(protect, getApplicant);
router.route('/applicant/view/:id').get(protect, viewApplicant);
router.route('/applicant/accept/:id').put(protect, acceptApplicant);
router.route('/applicant/denied/:id').put(protect, deniedApplicant);

router.route('/applicant/downloadPDF').post(protect, downloadPDF);

// router.route('/health/delete/:id').delete(deleteHealth);

module.exports = router;