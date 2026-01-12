const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword
} = require('../Controller/authController');

const {protect} = require('../middleware/authMiddleware');

router.post('/register',registerUser);
router.post('/login',loginUser);

router.post('/logout',protect,logoutUser);
router.post('/forget-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);

module.exports = router;