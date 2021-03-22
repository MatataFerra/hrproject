const express = require('express');
const router = express.Router();

const home = router.get('/', (req, res) => {
    res.render('home')
})

module.exports = {
    home
}