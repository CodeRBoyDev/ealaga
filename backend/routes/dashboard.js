const express = require('express');
const router = express.Router();

const {getTotal} = require('../controllers/dashboardController');

const { protect } = require("../middlewares/authMiddleware");

router.route('/dashboard/total').get(protect, getTotal);

module.exports = router;