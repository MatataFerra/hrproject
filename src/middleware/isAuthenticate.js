const isAuthenticate = (req, res, next, redirect) => {
    
    if(req.isAuthenticated()) {
        return next();
    }
    //req.flash('authMessage', 'You don´t have permission. Please login first')
    res.redirect(redirect)
}

module.exports = {
    isAuthenticate
}

