const express = require('express')
const { testUserController } = require('../controllers/testController.js').default

// router object
const router = express.Router();

// export

router.get("/test-user",testUserController)

module.exports = router