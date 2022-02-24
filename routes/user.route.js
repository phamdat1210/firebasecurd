const User = require('../controllers/user.controller')
const express = require('express');
const router = express.Router();

router.post("/", User.save_user);

module.exports = router;