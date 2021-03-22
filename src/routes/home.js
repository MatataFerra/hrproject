const express = require('express');
const router = express.Router();

const { home } = require('../controller/home/home')

router.use('/', home)

module.exports = router