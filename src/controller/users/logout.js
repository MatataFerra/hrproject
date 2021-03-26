const express = require('express');
const router = express.Router();


const logOut = router.get('/', (req, res, next)=> {
    req.session.destroy();
    req.logout();
    req.flash('logoutMessage', 'Session closed successfully')
    res.redirect('/home');
})



module.exports = {
    logOut
}