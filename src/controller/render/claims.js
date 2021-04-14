const express = require('express');
const router = express.Router();

const claimView = router.get('/', (req, res) => {
    res.render('claims')
})

module.exports = {
    claimView
}