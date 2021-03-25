const { Employee } = require('../../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/dni/:dni', async (req, res) => {
    
    try {
        const dni = req.params.dni
        const employee = await Employee.findOne({
            where: {dni: dni}
        })

        if(!employee) {
            return res.status(404).send({Message: 'El empleado que busca no se encuentra'})
        }

        if(employee.isactive === 0 || employee.isactive === false) {
            return res.status(404).send({Message: 'El empleado que busca está inactivo'})
        }

        res.status(200).send({Empleados: employee});

    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error})
    }


});