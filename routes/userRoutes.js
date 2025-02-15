
const express = require('express');
const { getUserController,updateUserController , updatepassword} = require('../controllers/userController');
const authMIddleware = require('../middlewares/authMIddleware');
const router = express.Router();

// get user || GET

router.get('/getUser', authMIddleware, getUserController )
// update user
router.put('/updateuser',authMIddleware,updateUserController)

// forage password user route 
router.post('/updatepassword',authMIddleware,updatepassword)

module.exports = router