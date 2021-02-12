const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const  { Claim, Employee } = require('../../../database/tables');
const { createDate } = require('../../../services/time')

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
                }
            })
        
            if(claims.length === 0) {
                return res.send({
                    Message: 'No existen resultados'
                })
            }
        } else {
        
            claims = await Claim.findAll({
                where: {
                    dayofclaim: {
                        [Op.between]: [startDate, endDate]
                    }
                },

                order: [['dayofclaim', 'ASC']],
            })
        
            if(claims.length === 0) {
                return res.send({
                    Message: 'No existen resultados'
                })
            }
        }

        return res.status(200).send({Query: claims})

    } catch (error) {
        console.log('-----------');
        console.log(error);
        res.status(404).send({Error: error});
    }

})