const express = require('express');
const router = express.Router();

const createAbsence = require('../controller/absences/createAbsence');

router.use('/create', createAbsence)

module.exports = router