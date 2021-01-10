const { Employee } = require('../../../database/tables');
const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

module.exports = router.get('/lastname', async (req, res) => {
    
    try {
        const lastname = req.body.lastname
        const employee = await Employee.findOne({
            where: {lastname: {
                [Op.like]: `%${lastname}%`
            }}
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