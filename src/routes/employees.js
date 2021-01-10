const express = require('express');
const router = express.Router();

const allEmployees = require('../controller/employee/allEmployees');
const oneEmployee = require('../controller/employee/oneEmployee');
const createEmployee = require('../controller/employee/createEmployee');
const updateEmployee = require('../controller/employee/updateEmployee');
const deleteEmployee = require('../controller/employee/deleteEmployee');

//Searches

const employeeByDni = require('../controller/employee/search/employeefindByDni');
const employeeByLast = require('../controller/employee/search/employeefindByLastname');


router.use('/', allEmployees);
router.use('/id', oneEmployee);
router.use('/create', createEmployee);
router.use('/update', updateEmployee);
router.use('/delete', deleteEmployee);
router.use('/search', employeeByDni);
router.use('/search', employeeByLast);

module.exports = router