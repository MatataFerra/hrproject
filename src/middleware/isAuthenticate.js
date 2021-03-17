const isAuthenticate = (req, res, next, redirect) => {
    
    if(req.isAuthenticated()) {
        return next();
    }
    
    res.redirect(redirect)
}

module.exports = {
    isAuthenticate
}

