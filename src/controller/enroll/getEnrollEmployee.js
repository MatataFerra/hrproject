const { Employee, Contract, Hours } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/:dni', async (req, res) => {

    try {

        const  dni  = req.params.dni;
    
        const enroll = await Employee.findOne({
            where: {
                dni: dni
            },
    
            include: [
                {
                    model: Contract,
                    include: [
                        {
                            model: Hours
                        }
                    ]
                }
            ]
        })

        return res.status(200).send({Employee: enroll})
    } 

    catch ( error ) {
        console.log(error);
        res.status(404).send({Error: error});
    }

    
})