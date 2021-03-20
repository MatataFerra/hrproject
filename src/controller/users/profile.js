const express = require('express');
const router = express.Router();

const profile = router.get('/', (req, res) => {
    res.render('profile')
})

module.exports = {
    profile
}