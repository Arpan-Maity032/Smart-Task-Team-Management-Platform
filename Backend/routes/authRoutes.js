const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser
} = require('../Controller/authController');

