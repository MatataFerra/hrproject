const express = require('express');
const router = express.Router();

const {getClaim, getAllClaims} = require('../controller/claims/getClaims');
const { createClaim, getcreateClaim } = require('../controller/claims/createClaim');
const updateClaim = require('../controller/claims/updateClaim');
const updateType = require('../controller/claims/updateType')

//querys

const newClaimsFirst = require('../controller/claims/querys/newClaimsFirst');
const betweenClaim = require('../controller/claims/querys/betweenClaim');
const typeOfClaim = require('../controller/claims/querys/typeOfClaim');
const onlyTypesClaim = require('../controller/claims/querys/onlyTypesClaim')
const onlyNewClaims = require('../controller/claims/querys/onlyNewClaimsFirst')

const { claimView } = require('../controller/render/claims');

// Middleware

router.use((req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('authMessage', 'You don´t have permission. Please login first')
    res.redirect('/users/login')
})


router.use('/', claimView)
router.use('/add', getcreateClaim)

router.use('/all', getAllClaims)
router.use('/', getClaim)
router.use('/create', createClaim);
router.use('/update', updateClaim);
router.use('/update/type', updateType)
router.use('/search', newClaimsFirst)
router.use('/search', onlyNewClaims);
router.use('/search', betweenClaim);
router.use('/search', typeOfClaim);
router.use('/search/typesclaim', onlyTypesClaim);

module.exports = router