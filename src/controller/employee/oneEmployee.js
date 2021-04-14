const { Employee } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/:_id', async (req, res) => {
    
    try {
        const id = req.params._id
        const employee = await Employee.findByPk(id);

        if(!employee.isactive) {
            return res.status(404).send({Message: 'El empleado que busca no se encuentra'})
        }

        res.status(200).send({Empleados: employee});

    } catch (error) {
        console.log(error);
        res.send({Error: error})
    }


});