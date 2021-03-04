const express = require('express');
const router = express.Router();

const getClaims = require('../controller/claims/getClaims');
const createClaim = require('../controller/claims/createClaim');
const updateClaim = require('../controller/claims/updateClaim');
const updateType = require('../controller/claims/updateType')

//querys

const newClaimsFirst = require('../controller/claims/querys/newClaimsFirst');
const betweenClaim = require('../controller/claims/querys/betweenClaim');
const typeOfClaim = require('../controller/claims/querys/typeOfClaim')

router.use('/', getClaims)
router.use('/create', createClaim);
router.use('/update', updateClaim);
router.use('/update/type', updateType)
router.use('/q/new', newClaimsFirst)
router.use('/q/between', betweenClaim);
router.use('/q/type', typeOfClaim)

module.exports = router