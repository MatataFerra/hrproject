const { Employee } = require('../../database/tables');
const express = require('express');
const router = express.Router();

const getAddEmployee = router.get('/', (req, res) => {
    res.render('addemployee')
})

const createEmployee =   router.post('/', async (req, res)=> {

    try {
        await Employee.create(req.body);
        return res.status(200).send({Message: 'Empleado creado con éxito'})

    } catch (error) {
        res.status(404).send({Error: error});
    }
})

module.exports = {
    getAddEmployee,
    createEmployee
}