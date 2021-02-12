const express = require('express');
const router = express.Router();
const  { Claim } = require('../../database/tables');
const { createDate }  = require('../../services/time');

module.exports = router.put('/:id', async (req, res) => {

    try {

        const { type, dayofclaim, content, tracing, status, linkemail } = req.body
        

        if(!dayofclaim) {
            const claim = await Claim.findByPk(req.params.id);
            await claim.update(req.body)

            return res.status(200).send({Claim: claim})
        }
        
        const formatedDate = createDate(dayofclaim)

        const claim = await Claim.findByPk(req.params.id);

        await claim.update({
            type,
            dayofclaim: formatedDate,
            content,
            tracing,
            status,
            linkemail
        })

        return res.status(200).send({Claim: claim})

    } catch (error) {
        console.log('-----------');
        console.log(error);
        return res.status(404).send({Error: error});
    }


})