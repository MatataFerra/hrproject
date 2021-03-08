const { Employee, Rol } = require('../../../database/tables');
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');


module.exports = router.post('/', async (req, res) => {
    
    try {
        const { dni, position } = req.body
    
        const oneEmployee = await Employee.findOne({
            where: {
                dni: dni
            }
        })
    
        const oneRol = await Rol.findOne({
            where: {
                position: {
                    [Op.like]: `%${position}%`
                }
            }
        })

        
    
        if(!oneEmployee || !oneRol) {
            return res.status(404).send({Error: 'Empleado o Rol no existente'})
        }
    
        const RolEmployee = await oneEmployee.setRol(oneRol)

        return res.send({
            Result: 'Rol agregado a empleado con éxito',
            Employee: RolEmployee
        })

    } catch (error) {
        console.log(error);
        return res.send({Error: error})
    }
})