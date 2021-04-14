const express = require('express');
const router = express.Router();
const  { Claim, Employee } = require('../../database/tables');


const getAllClaims = router.get('/', async (req, res) => {
    try {
        const claims = await Claim.findAll({
            include: [
                {
                    model: Employee
                }
            ]
        });
    
        return res.send({Claims: claims})
    } catch (error) {
        console.log(error);
        return res.send({Error: error})
    }
})

const getClaim = router.get('/:dni', async (req, res) => {

    try {
        
        const { dni } = req.params

        const employee = await Employee.findOne({
            where: {
                dni: dni
            },

            include: [
                {
                    model: Claim,
                    
                }
            ]
        });

        return res.status(200).send({Claims: employee})



    } catch (error) {
        console.log(error);
        res.status(404).send({Error: error});
    }

});

module.exports = {
    getAllClaims,
    getClaim,
}