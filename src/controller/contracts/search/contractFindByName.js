const { Contract } = require('../../../database/tables');
const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

module.exports = router.get('/name', async (req, res) => {
    
    try {
        const name = req.body.name
        const contract = await Contract.findOne({
            where: {name: {
                [Op.like]: `%${name}%`
            }}
        })

        if(!contract) {
            return res.status(404).send({Message: 'El contrato que busca no se encuentra'})
        }

        res.status(200).send({Contrato: contract});

    } catch (error) {
        console.log(error);
        res.send({Error: error})
    }


});