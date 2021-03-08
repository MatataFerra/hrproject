const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('../../../database/conect');
const router = express.Router();
const  { Claim, Employee } = require('../../../database/tables');
const { createDate } = require('../../../services/time');

module.exports = router.get('/', async (req, res) => {
    try {

        const { dni, start, end } = req.body

        const startDate = createDate(start);
        const endDate = createDate(end);
        const reg = new RegExp('^[0-9]*$')
        const dniNumber = parseInt(dni)
        

        if(reg.test(dniNumber) == false){
            return res.send({Message: 'Debe ingresar un DNI válido'})
        }

        const employee = await Employee.findOne({
            where: {
                dni: dni
            }
        });

        if(employee) {

            const claims = await Claim.findAll({
                where: {
                    EmployeeId: employee.dataValues._id,
                    dayofclaim: {
                        [Op.between]: [startDate, endDate]
                    }
                },

                order: [
                    [sequelize.fn('FIELD', sequelize.col('status'), 'Nuevo', 'Leído', 'Contestado', 'Resuelto')],
                    ['dayofclaim', 'ASC']
                ],

            })
        
            if(claims.length === 0) {
                return res.send({
                    Message: 'No existen resultados'
                })
            }

            return res.status(200).send({Query: claims})

        } else {          
            return res.status(404).send({Message: 'No existe el empleado que busca'})
        }

    } catch (error) {
        console.log('-----------');
        console.log(error);
        return res.status(404).send({Error: error});
    }

})