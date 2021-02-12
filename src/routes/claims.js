const express = require('express');
const router = express.Router();

const getClaims = require('../controller/claims/getClaims');
const createClaim = require('../controller/claims/createClaim');
const updateClaim = require('../controller/claims/updateClaim');

//querys

const newClaimsFirst = require('../controller/claims/querys/newClaimsFirst');
const betweenClaim = require('../controller/claims/querys/betweenClaim')

router.use('/', getClaims)
router.use('/create', createClaim);
router.use('/update', updateClaim);
router.use('/q/new', newClaimsFirst)
router.use('/q/between', betweenClaim)

module.exports = router