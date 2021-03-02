const express = require('express');
const router = express.Router();
const  { Claim } = require('../../../database/tables');
const { Op } = require('sequelize');

module.exports = router.get('/', async (req, res) => {
    try {

        const { type } = req.body

        if(!type) {
            return res.status(404).send({Message: 'Debe ingresar un tipo para iniciar la búsqueda'})
        }

        const typeOfClaim = await Claim.findAll({
            where: {type: {
                [Op.like]: `%${type}%`
            }},

            order: [
                ['dayofclaim', 'ASC']
            ],
        })

        if(typeOfClaim.length == 0) {
            return res.status(404).send({Message: 'No se encontraron reclamos con este tipo'})
        }

        return res.status(200).send({Query: typeOfClaim })

        
    } catch (error) {
        console.log('-----------');
        console.log(error);
        res.status(404).send({Error: error});
    }


})