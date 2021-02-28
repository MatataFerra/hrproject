const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('../../../database/conect');
const router = express.Router();
const  { Claim, Employee } = require('../../../database/tables');
const { createDate } = require('../../../services/time');
const { QueryTypes } = require('sequelize');

module.exports = router.get('/', async (req, res) => {
    try {

        const { dni, start, end } = req.body

        const startDate = createDate(start);
        const endDate = createDate(end);
        let claims = null

        if(dni) {

            const employee = await Employee.findOne({
                where: {
                    dni: dni
                }
            });

            

            claims = await Claim.findAll({
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
        } else {
            
            return res.status(404).send({Message: 'No se encontraron reclamos en el periodo seleccionado'})
        
            // claims = await sequelize.query(`
            //     SELECT '_id', 'type', 'dayofclaim', 'content', 'tracing', 'status', 'linkemail', 'EmployeeId' 
            //     FROM 'hrdatabase'.'claims' AS 'Claim'
            //     WHERE 'Claim'.'EmployeeId' = 4 
            //     AND 'Claim'.'dayofclaim' BETWEEN '2021-03-10' AND '2021-03-13'
            //     ORDER BY FIELD('status', 'Nuevo', 'Leído', 'Contestado', 'Resuelto')`, 
            //     {
            //         type: QueryTypes.SELECT,
            //         nest: true
                
            //     }
            // )
        
            
        }

        return res.status(200).send({Query: claims})

    } catch (error) {
        console.log('-----------');
        console.log(error);
        res.status(404).send({Error: error});
    }

})