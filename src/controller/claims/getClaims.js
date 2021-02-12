const express = require('express');
const router = express.Router();
const  { Claim, Employee } = require('../../database/tables');

module.exports = router.get('/', async (req, res) => {

    try {
        
        const { dni } = req.body

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

})