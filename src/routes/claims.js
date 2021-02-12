const express = require('express');
const router = express.Router();

const getClaims = require('../controller/claims/getClaims');
const createClaim = require('../controller/claims/createClaim');
const updateClaim = require('../controller/claims/updateClaim');

//querys

const newClaimsFirst = require('../controller/claims/querys/newClaimsFirst')

router.use('/', getClaims)
router.use('/create', createClaim);
router.use('/update', updateClaim);
router.use('/q/new', newClaimsFirst)

module.exports = router