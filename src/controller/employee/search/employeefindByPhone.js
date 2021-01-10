const { Employee } = require('../../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/phone', async (req, res) => {
    
    try {
        const phone = req.body.phone
        const employee = await Employee.findOne({
            where: {phone: phone}
        })

        if(!employee) {
            return res.status(404).send({Message: 'El empleado que busca no se encuentra'})
        }

        if(!employee.dataValues.isactive) {
            return res.status(404).send({Message: 'El empleado que busca no se encuentra'})
        }

        res.status(200).send({Empleados: employee});

    } catch (error) {
        console.log(error);
        res.send({Error: error})
    }


});