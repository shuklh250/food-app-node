
const express = require('express');
const { getUserController } = require('../controllers/userController');
const authMIddleware = require('../middlewares/authMIddleware');
const router = express.Router();

// get user || GET

router.get('/getUser', authMIddleware, getUserController )

module.exports = router