const express = require('express');
const router = express.Router();

const {signup, signin, verify,forgotPassword, resetPassword,profileEdit, profileUpdate,
    profileUpdateSubmit,profileupdateCredential, profileUpdateHealth,readAttendees, acceptAttendees, QRacceptAttendees
    ,read,allUsers,add, deleteUser, readUser, updateUser, downloadPDF } = require('../controllers/userController');
// const { isAuthenticatedUser } = require('../middlewares/auth');
const { protect } = require("../middlewares/authMiddleware");

router.route('/user/new').post(signup);
router.route('/signin').post(signin);
router.route('/verify/:token').get(verify);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/user/profile/edit/:id').get(protect, profileEdit)
router.route('/user/profile/update/:id').put(protect, profileUpdate)
router.route('/user/profile/updateSubmit/:id').put(protect, profileUpdateSubmit)
router.route('/user/profile/updateCredential/:id').put(protect, profileupdateCredential)
router.route('/user/profile/updateHealth/:id').put(protect, profileUpdateHealth)


//////========================= Accept attendees
router.route('/user/attendees/read/:id').put(readAttendees)
router.route('/user/attendees/:id').put(acceptAttendees)
router.route('/user/qr/attendees/:id').put(QRacceptAttendees)

// ====================user CHAT
router.route("/allUsers").get(protect, allUsers);

// ====================user CRUD
router.route('/user/read').get(protect, read);
router.route('/user/add').post(protect, add);
router.route('/user/edit/:id').get(protect, readUser);
router.route('/user/updateUser/:id').put(protect, updateUser)
router.route('/user/delete/:id').delete(protect, deleteUser);

router.route('/user/downloadPDF').post(protect, downloadPDF);


module.exports = router;