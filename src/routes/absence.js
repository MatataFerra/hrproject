const express = require('express');
const router = express.Router();

const createAbsence = require('../controller/absences/createAbsence');
const getAbsence = require('../controller/absences/getAbsence');
const updateAbsence = require('../controller/absences/updateAbsence');

router.use('/create', createAbsence)
router.use('/get', getAbsence);
router.use('/update', updateAbsence)

module.exports = router