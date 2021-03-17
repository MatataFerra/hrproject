const express = require('express');
const router = express.Router();
const { isAuthenticate } = require('../../middleware/isAuthenticate')


router.use((req, res, next) => {
    isAuthenticate(req, res, next, '/users/login');
    next()
})

const logOut = router.get('/', (req, res, next)=> {
    req.logout();
    res.redirect('/users/login');
})



module.exports = {
    logOut
}