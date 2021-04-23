const express = require('express');
const router = express.Router();

const constractsView = router.get('/', (req, res) => {
    res.render('contracts')
})

module.exports = {
    constractsView
}