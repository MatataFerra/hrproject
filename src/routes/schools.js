const express = require('express');
const router = express.Router();

const allSchools = require('../controller/school/allSchools');
const oneSchool = require('../controller/school/oneSchool');
const { getAddSchool, createSchool } = require('../controller/school/createSchool');
const { getEditSchool, updateSchool } = require('../controller/school/updateSchool');
const deleteSchool = require('../controller/school/deleteSchool');

//Search

const schoolByDE = require('../controller/school/search/schoolFindByDE');
const schoolByCM = require('../controller/school/search/schoolFindByCM');
const schoolByAddress = require('../controller/school/search/schoolFindByAddress');
const schoolByLevel = require('../controller/school/search/schoolFindBylevel');
const schoolByFullname = require ('../controller/school/search/schoolFindByFullname')

// View

const { schoolView } = require('../controller/render/schools')

// Middleware - now turn off

// router.use((req, res, next) => {
//     if(req.isAuthenticated()) {
//         return next();
//     }
//     req.flash('authMessage', 'You don´t have permission. Please login first')
//     res.redirect('/users/login')
// })

router.use('/', schoolView);
router.use('/add', getAddSchool);
router.use('/edit', getEditSchool)


router.use('/all', allSchools);
router.use('/', oneSchool);
router.use('/create', createSchool);
router.use('/update', updateSchool);
router.use('/delete', deleteSchool);
router.use('/search', schoolByDE);
router.use('/search', schoolByCM);
router.use('/search', schoolByAddress);
router.use('/search', schoolByLevel);
router.use('/search', schoolByFullname)


module.exports = router