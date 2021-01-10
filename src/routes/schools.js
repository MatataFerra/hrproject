const express = require('express');
const router = express.Router();

const allSchools = require('../controller/school/allSchools');
const oneSchool = require('../controller/school/oneSchool');
const createSchool = require('../controller/school/createSchool');

router.use('/', allSchools);
router.use('/', oneSchool);
router.use('/create', createSchool);


module.exports = router