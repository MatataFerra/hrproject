const express = require('express');
const router = express.Router();
const  { Claim, Employee } = require('../../database/tables');
const { createDate }  = require('../../services/time')

module.exports = router.post('/', async (req, res) => {

    try {
        
        const { dni, type, dayofclaim, content, tracing, linkemail } = req.body

        const employee = await Employee.findOne({
            where: {
                dni: dni
            }
        });

        const date = createDate(dayofclaim)

        const claim = await Claim.create({
            type,
            dayofclaim: date,
            content,
            tracing,
            linkemail
        })

        await employee.addClaim(claim)

        return res.status(200).send({Claims: claim})



    } catch (error) {
        console.log(error);
        res.status(404).send({Error: error});
    }

})