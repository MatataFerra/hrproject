const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('../../../database/conect');
const router = express.Router();
const  { Claim, Employee } = require('../../../database/tables');
const { createDate } = require('../../../services/time');

module.exports = router.get('/between/dni/:dni/start/:start/end/:end', async (req, res) => {
    try {
        console.log('aca');
        const { dni, start, end } = req.params

        const startDate = createDate(start);
        const endDate = createDate(end);

        if(!start || !end || (!start && !end)){
            return res.send({Message: 'Falta ingresar fechas'})
        }
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

            if(!start || !end){
                return res.send({Message: 'Falta ingresar fechas'})
            }

            const claims = await Claim.findAll({
                where: {
                    EmployeeId: employee._id,
                    dayofclaim: {
                        [Op.between]: [start, end]
                    }
                },

                order: [
                    [sequelize.fn('FIELD', sequelize.col('status'), 'Nuevo', 'Leído', 'Contestado', 'Resuelto')],
                    ['dayofclaim', 'ASC']
                ],

                include: [
                    {
                        model: Employee
                    }
                ]

            })
        
            if(claims.length === 0) {
                return res.send({
                    Message: 'No existen resultados'
                })
            }

            return res.status(200).send({Claims: claims})

        } else {          
            return res.send({Message: 'No existe el empleado que busca'})
        }

    } catch (error) {
        console.log('-----------');
        console.log(error);
        return res.status(404).send({Error: error});
    }

})