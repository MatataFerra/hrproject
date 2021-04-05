const { Schools } = require('../../../database/tables');
const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

module.exports = router.get('/address/:address', async (req, res) => {
    
    try {
        const address = req.params.address
        const school = await Schools.findOne({
            where: {address: {
                [Op.like]: `%${address}%`
            }}
        })

        if(!school) {
            return res.send({Message: 'El domicilio de la escuela no está en la base de datos'})
        }

        return res.status(200).send({Escuelas: school});

    } catch (error) {
        console.log(error);
        return res.send({Error: error})
    }


});