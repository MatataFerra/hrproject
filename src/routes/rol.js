const express = require('express');
const router = express.Router();

const createRol = require('../controller/rol/createRol')
const updateRol = require('../controller/rol/updateRol')
const addRol = require('../controller/rol/addRol/addRol')


router.use('/create', createRol)
router.use('/update', updateRol)
router.use('/add', addRol)

module.exports = router