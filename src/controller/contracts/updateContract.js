const { Contract } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.put('/', async (req,res) => {

    try {
        await Contract.update(req.body);

        return res.status(200).send({Message: 'Contrato actualizado con éxito'})

    } catch (error) {
        res.status(404).send({Error: error});
    }

})