const { Employee } = require('../../database/tables');
const express = require('express');
const router = express.Router();

const getAddEmployee = router.get('/', (req, res) => {
    res.render('addemployee')
})

const createEmployee =   router.post('/', async (req, res)=> {

    try {
        await Employee.create(req.body);
        req.flash('successEmployee', 'Empleado creado con éxito')
        return res.status(200).redirect('/employees')
    } catch (error) {
        req.flash('failureEmployee', 'Hubo un error a la hora de crear el empleado')
        res.status(404).redirect('/employees/add');
    }
})

module.exports = {
    getAddEmployee,
    createEmployee
}