const express = require('express');
const router = express.Router();
const  { Claim, statusName, Employee } = require('../../../database/tables');

module.exports = router.get('/status/:status', async (req, res) => {

    try {
        const { status } = req.params

        const downStatus = status.toLowerCase()
        
        const oneStatus = Object.getOwnPropertyNames(statusName).find(state => state === downStatus)

        if(oneStatus !== downStatus){
            return res.send({
                Message: 'El estado no es válido',
                Input: status,
                status: Object.keys(statusName)
            })
        }

        const claims = await Claim.findAll({
            where: {
                status: status
            },

            order: [['dayofclaim', 'ASC']],

            attributes: {
                exclude: ['EmployeeId', '_id']
            },
            
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


        return res.send({Claims: claims})

    } catch (error) {
        console.log('-----------');
        console.log(error);
        res.status(404).send({Error: error});
    }
    

})