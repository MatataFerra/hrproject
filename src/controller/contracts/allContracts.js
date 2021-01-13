const { Contract } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/', async (req, res) => {
    
    try {
        const contracts = await Contract.findAll();

        res.status(200).send({Empleados: contracts});

    } catch (error) {
        console.log(error);
        res.send({Error: error})
    }


});