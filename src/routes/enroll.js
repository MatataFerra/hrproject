const express = require('express');
const router = express.Router();

const enrollEmployee = require('../controller/enroll/enrollEmployee');
const getEnroll = require('../controller/enroll/getEnrollEmployee')

router.use('/', enrollEmployee);
router.use('/dni', getEnroll);

module.exports = router