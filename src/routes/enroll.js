const express = require('express');
const router = express.Router();

const enrollEmployee = require('../controller/enroll/enrollEmployee');
const getEnroll = require('../controller/enroll/getEnrollEmployee');
const addSchool = require('../controller/enroll/addSchool/addSchool');
const getEmployeeSchool = require('../controller/enroll/addSchool/getEmployeeSchools')

router.use('/', enrollEmployee);
router.use('/dni', getEnroll);
router.use('/school', addSchool);
router.use('/schoolemployee', getEmployeeSchool)

module.exports = router