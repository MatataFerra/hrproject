const express = require('express');
const router = express.Router();

const allContracts = require('../controller/contracts/allContracts');
const createContract = require('../controller/contracts/createContract');
const updateContract = require('../controller/contracts/updateContract');

//Search

const findByCode = require('../controller/contracts/search/contractFindByCode');
const findByName = require('../controller/contracts/search/contractFindByName')

router.use('/', allContracts);
router.use('/create', createContract)
router.use('/update', updateContract);
router.use('/search', findByCode)
router.use('/search', findByName)


module.exports = router