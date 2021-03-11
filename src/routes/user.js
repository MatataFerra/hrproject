const express = require('express');
const router = express.Router();

const login = require('../controller/users/login');
const singUp = require('../controller/users/singup');

router.use('/login', login);
router.use('/singup', singUp)

module.exports = router