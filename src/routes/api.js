
const express = require('express');
const router = express.Router();
const UsersController = require('../controller/UsersController');

const AuthVerificationMiddleware = require('../middleware/AuthVerificationMiddleware');

router.post('/registration', UsersController.Registration);
router.post('/login', UsersController.Login);
router.post('/profile-update', AuthVerificationMiddleware, UsersController.profileUpdate);
router.get('/profile-details', AuthVerificationMiddleware, UsersController.profileDetails);
router.get('/recover-verify-email/:email',  UsersController.recoverVerifyEmail);
router.get('/verify-otp/:email/:otp',  UsersController.verifyOtp);
router.post('/reset-password',  UsersController.ResetPassword);








// todo end
module.exports = router;





 




