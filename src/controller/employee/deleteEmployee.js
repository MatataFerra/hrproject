const { Employee } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.put('/:_id', async (req, res)=> {
    try {
        const { isactive } = req.body
        const employee = await Employee.findByPk(req.params._id)

        if(!isactive) {
            return res.status(404).send({Message: 'You cant change this field '})
        }

        await employee.update(req.body);
        return res.status(200).send({
            Message: 'Empleado actualizado con éxito',
            update: req.body
        })

    } catch (error) {
        res.status(404).send({Error: error});
    }
})