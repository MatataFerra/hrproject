const express = require('express');
const router = express.Router();

const allContracts = require('../controller/contracts/allContracts');
const createContract = require('../controller/contracts/createContract');
const updateContract = require('../controller/contracts/updateContract');

//View
const { constractsView } = require('../controller/render/contracts')

//Search
const findByCode = require('../controller/contracts/search/contractFindByCode');
const findByName = require('../controller/contracts/search/contractFindByName');

// Middleware

router.use((req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('authMessage', 'You don´t have permission. Please login first')
    res.redirect('/users/login')
})

router.use('/', constractsView)

router.use('/all', allContracts);
router.use('/create', createContract)
router.use('/update', updateContract);
router.use('/search', findByCode)
router.use('/search', findByName)


module.exports = router