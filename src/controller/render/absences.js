const express = require('express');
const router = express.Router();

const absenceView = router.get('/', (req, res) => {
    res.render('absences')
})

module.exports = {
    absenceView
}