const { Employee } = require('../../../database/tables');
const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

module.exports = router.get('/lastname/:lastname', async (req, res) => {
    
    try {

        const lastname = req.params.lastname
        
        
        const employee = await Employee.findAll({
            where: {
                lastname: {
                    [Op.like]: `%${lastname}%`
                },

                isactive: true

            }
        })
        
        
        if(!employee) {
            return res.status(404).send({Message: 'El empleado que busca no se encuentra'})
        }

        if(employee.isactive === 0 || employee.isactive === false) {
            return res.status(404).send({Message: 'El empleado que busca está inactivo'})
        }


        return res.status(200).send({Empleados: employee});

    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error})
    }


});