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

router.post('/register',registerUser);  //done
router.post('/login',loginUser);  //done

router.post('/logout',protect,logoutUser);
router.post('/forget-password',forgotPassword); //workin on API testing done
router.post('/reset-password/:token',resetPassword);

module.exports = router;