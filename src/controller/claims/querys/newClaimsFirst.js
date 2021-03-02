const express = require('express');
const router = express.Router();
const  { Claim, Employee, statusName } = require('../../../database/tables');

module.exports = router.get('/', async (req, res) => {

    try {
        const { dni, status } = req.body

        const employee = await Employee.findOne({
            where: {
                dni: dni
            }
        })

        const downStatus = status.toLowerCase()
        
        // const statusName = {
        //     nuevo: 'nuevo',
        //     leido: 'leido',
        //     constestado: 'contestado',
        //     resuelto: 'resuelto'
        // }
        

        const oneStatus = Object.getOwnPropertyNames(statusName).find(state => state === downStatus)

        if(oneStatus !== downStatus){
            return res.send({
                Error: 'El estado no es válido',
                Input: status,
                status: Object.keys(statusName)
            })
        }

        const claims = await Claim.findAll({
            where: {
                EmployeeId: employee.dataValues._id,
                status: status
            },

            order: [['dayofclaim', 'ASC']],

            attributes: {
                exclude: ['linkemail', 'EmployeeId', '_id']
            }
        })

        if(claims.length === 0) {
            return res.send({
                Message: 'No existen resultados'
            })
        }


        return res.status(200).send({Query: claims})

    } catch (error) {
        console.log('-----------');
        console.log(error);
        res.status(404).send({Error: error});
    }
    

})