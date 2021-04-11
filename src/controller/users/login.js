const express = require('express');
const router = express.Router();
const passport = require('passport');


const loginGet = router.get('/', (req, res)=> {
    if(req.user) {
        return res.render('profile')
    }
    return res.render('singin');
})

const loginPost = router.post('/',  passport.authenticate('local-singin', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    passReqToCallback: true
}));
    

module.exports = {
    loginGet,
    loginPost
}