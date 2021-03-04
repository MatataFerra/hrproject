const express = require('express');
const router = express.Router();
const  { TypeClaim } = require('../../database/tables');

module.exports = router.put('/:id', async (req, res) => {
    try {
        const { typeClaim } = req.body

        const oneClaim = await TypeClaim.findByPk(req.params.id)
        await oneClaim.update(typeClaim);

        return res.status(200).send({TypeOfClaim: oneClaim})

    } catch (error) {
        console.log('-----------');
        console.log(error);
        return res.status(404).send({Error: error});
    }
})