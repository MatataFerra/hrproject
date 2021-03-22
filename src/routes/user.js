const express = require('express');
const router = express.Router();

const { loginGet } = require('../controller/users/login');
const { singUpGet } = require('../controller/users/singup');
const { logOut } = require('../controller/users/logout');
const { profile } = require('../controller/users/profile');

router.use('/login', loginGet);
router.use('/singup', singUpGet);


router.use((req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('authMessage', 'You don´t have permission. Please login first')
    res.redirect('/users/login')
})

router.use('/logout', logOut);
router.use('/profile', profile)


module.exports = router