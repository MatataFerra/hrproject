const { Employee } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/', async (req, res) => {
    
    try {
        const activeEmployee = []
        const employees = await Employee.findAll();

        employees.forEach(empl => {
            const active = empl.dataValues.isactive 
            if(active) {
                activeEmployee.push(empl)
            }
        })
        res.status(200).send({Empleados: activeEmployee});

    } catch (error) {
        console.log(error);
        res.send({Error: error})
    }


});
