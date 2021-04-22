const express = require('express');
const router = express.Router();

const createAbsence = require('../controller/absences/createAbsence');
const getAbsence = require('../controller/absences/getAbsence');
const updateAbsence = require('../controller/absences/updateAbsence');
const deleteAbsence = require('../controller/absences/deleteAbsence');

//Views

const { absenceView } = require('../controller/render/absences')


//Querys

const getPeriod = require('../controller/absences/querys/getPeriod');
const getAbsencesOnPerior = require('../controller/absences/querys/getAbsenceOnPeriod');

router.use('/', absenceView)

router.use('/create', createAbsence)
router.use('/get', getAbsence);
router.use('/update', updateAbsence);
router.use('/delete', deleteAbsence)
router.use('/search', getPeriod);
router.use('/search', getAbsencesOnPerior)

module.exports = router