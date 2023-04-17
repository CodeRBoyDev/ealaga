const express = require('express');
const router = express.Router();

const {allDialysis, viewApplicant, acceptApplicant, deniedApplicant} = require('../controllers/dialysisController');
const { protect } = require("../middlewares/authMiddleware");

router.route('/dialysis/allDialysis').get(protect, allDialysis);
router.route('/dialysis/view/:id').get(protect, viewApplicant);
router.route('/dialysis/accept/:id').put(protect, acceptApplicant);
router.route('/dialysis/denied/:id').put(protect, deniedApplicant);

module.exports = router;