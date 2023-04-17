const express = require('express');
const router = express.Router();

const {allActivityLogs, activitylogs, apilogs} = require('../controllers/activitylogsController');
const { protect } = require("../middlewares/authMiddleware");

router.route('/allActivityLogs').get(protect, allActivityLogs);
router.route('/activitylogs/delete').delete(activitylogs);
router.route('/apilogs/delete').delete(apilogs);
module.exports = router;