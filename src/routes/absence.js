const express = require('express');
const router = express.Router();

const createAbsence = require('../controller/absences/createAbsence');
const getAbsence = require('../controller/absences/getAbsence');
const updateAbsence = require('../controller/absences/updateAbsence');
const deleteAbsence = require('../controller/absences/deleteAbsence')

router.use('/create', createAbsence)
router.use('/get', getAbsence);
router.use('/update', updateAbsence);
router.use('/delete', deleteAbsence)

module.exports = router