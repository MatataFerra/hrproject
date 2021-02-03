const { Schools, Employee, Days } = require('../../../database/tables');
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');


module.exports = router.post('/', async (req, res) => {
    
    try {
        const { fullname, dni, days } = req.body
    
        const oneEmployee = await Employee.findOne({
            where: {
                dni: dni
            }
        })
    
        const oneSchool = await Schools.findOne({
            where: {
                fullname: {
                    [Op.like]: `%${fullname}%`
                }
            }
        })
    
        if(!oneEmployee || !oneSchool) {
            return res.status(404).send({Error: 'Empleado o escuela no existente'})
        }
    
        await oneEmployee.addSchool(oneSchool)
    
        days.forEach( async day => {
            
            const oneDay = await Days.findOne({
                where: {
                    days: day
                }
            });
    
            await oneSchool.addDay(oneDay)
        })
        
    
    
        return res.send({Result: 'Escuela agregada a empleado con éxito'})

    } catch (error) {
        console.log(error);
        return res.send({Error: error})
    }
})