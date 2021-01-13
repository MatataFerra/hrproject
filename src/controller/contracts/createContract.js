const { Contract } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.post('/', async (req,res) => {

    try {
        await Contract.create(req.body);

        return res.status(200).send({Message: 'Contrato agregado con éxito'})

    } catch (error) {
        res.status(404).send({Error: error});
    }

})