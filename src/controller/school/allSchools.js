const { Schools } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/', async (req, res) => {
    
    try {
        const schools = await Schools.findAll();

        res.status(200).send({Empleados: schools});

    } catch (error) {
        console.log(error);
        res.send({Error: error})
    }


});