const express = require('express');
const router = express.Router();
const passport = require('passport');

const singUpGet = router.get('/', (req, res) => {
    return res.render('singup')
})

const singUpPost = router.post('/', passport.authenticate('local-singup', {
        successRedirect: '/users/login',
        failureRedirect: '/users/singup',
        passReqToCallback: true
}));

module.exports = {
    singUpGet,
    singUpPost
}