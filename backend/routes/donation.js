const express = require('express');
const router = express.Router();

const {allUsers, addDonation, getDonation, deleteDonation, editDonation, updateDonation, clientDonation, clientDonationRead, downloadPDF} = require('../controllers/donationController');
const { protect } = require("../middlewares/authMiddleware");

router.route("/donation/allUsers").get(protect, allUsers);
router.route('/donation/new').post(protect, addDonation);
router.route('/donation/getDonation').get(protect, getDonation);
router.route('/donation/edit/:id').get(protect, editDonation);
router.route('/donation/update/:id').put(protect, updateDonation);

router.route('/donation/delete/:id').delete(protect, deleteDonation);


router.route('/donation/downloadPDF').post(protect, downloadPDF);


//client donation fetch

router.route('/client/donation/:id').get(protect, clientDonation);
router.route('/client/clientDonationRead/:id').get(protect, clientDonationRead);




module.exports = router;