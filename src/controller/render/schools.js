const express = require('express');
const router = express.Router();

const schoolView = router.get('/', (req, res) => {
    res.render('schools')
})

module.exports = {
    schoolView
}