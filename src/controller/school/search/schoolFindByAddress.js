const { Schools } = require('../../../database/tables');
const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

module.exports = router.get('/address', async (req, res) => {
    
    try {
        const address = req.body.address
        const school = await Schools.findOne({
            where: {address: {
                [Op.like]: `%${address}%`
            }}
        })

        if(!school) {
            return res.status(404).send({Message: 'La escuela que busca no se encuentra'})
        }

        res.status(200).send({Escuelas: school});

    } catch (error) {
        console.log(error);
        res.send({Error: error})
    }


});