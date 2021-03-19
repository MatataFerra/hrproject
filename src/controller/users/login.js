const express = require('express');
const router = express.Router();
const passport = require('passport');


const loginGet = router.get('/', (req, res)=> {
    return res.render('singin');
})

const loginPost = router.post('/',  passport.authenticate('local-singin', {
    successRedirect: '/schools',
    failureRedirect: '/users/login',
    passReqToCallback: true
}));
    

module.exports = {
    loginGet,
    loginPost
}