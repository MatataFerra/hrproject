const express = require('express');
const router = express.Router();

const allEmployees = require('../controller/employee/allEmployees');
const oneEmployee = require('../controller/employee/oneEmployee');
const { getAddEmployee, createEmployee } = require('../controller/employee/createEmployee');
const updateEmployee = require('../controller/employee/updateEmployee');
const deleteEmployee = require('../controller/employee/deleteEmployee');

//Searches

const employeeByDni = require('../controller/employee/search/employeefindByDni');
const employeeByLast = require('../controller/employee/search/employeefindByLastname');
const employeeByEmail = require('../controller/employee/search/employeefindByEmail');
const employeeByPhone = require('../controller/employee/search/employeefindByPhone');

//View

const { employeeView } = require('../controller/render/employees');



router.use('/', employeeView)
router.use('/add', getAddEmployee);

router.use('/all', allEmployees);
router.use('/id', oneEmployee);
router.use('/create', createEmployee);
router.use('/update', updateEmployee);
router.use('/delete', deleteEmployee);
router.use('/search', employeeByDni);
router.use('/search', employeeByLast);
router.use('/search', employeeByEmail);
router.use('/search', employeeByPhone);

module.exports = router