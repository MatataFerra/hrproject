const { Employee } = require('../../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/lastname/:lastname', async (req, res) => {
    
    try {
        const lastname = req.params.lastname
        const employee = await Employee.findOne({
            where: {lastname: lastname}
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