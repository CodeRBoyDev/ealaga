const express = require('express');
const router = express.Router();

const {newHealth,getHealth,readHealth,updateHealth, deleteHealth } = require('../controllers/healthController');
const { protect } = require("../middlewares/authMiddleware");

router.route('/health/new').post(protect, newHealth);
router.route('/health/read').get(protect, getHealth);
router.route('/health/edit/:id').get(protect, readHealth);
router.route('/health/update/:id').put(protect, updateHealth);

router.route('/health/delete/:id').delete(protect, deleteHealth);

module.exports = router;