const express = require('express');
const router = express.Router();

const employeeView = router.get('/', (req, res) => {
    res.render('employees')
})

module.exports = {
    employeeView
}