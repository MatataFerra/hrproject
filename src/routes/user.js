const express = require('express');
const router = express.Router();

const { loginGet } = require('../controller/users/login');
const { singUpGet } = require('../controller/users/singup');
const { logOut } = require('../controller/users/logout');

const { isAuthenticate } = require('../middleware/isAuthenticate')

router.use('/login', loginGet);
router.use('/singup', singUpGet);

router.use((req, res, next) => {
    isAuthenticate(req, res, next, '/users/login');
    next()
})

router.use('/logout', logOut);


module.exports = router