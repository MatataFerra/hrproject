const { Employee } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.put('/:_id', async (req, res)=> {
    try {

        const employee = await Employee.findByPk(req.params._id)

        if(!employee) {
            return res.status(404).send({Message: 'Employee not found'})
        }

        await employee.update(req.body);

        return res.status(200).send({success: 'Empleado actualizado con éxito'})

    } catch (error) {
        res.status(404).send({Error: error});
    }
})