const express = require('express');
const router = express.Router();
const  { Claim, TypeClaim } = require('../../../database/tables');
const { Op } = require('sequelize');

module.exports = router.get('/:typeClaim', async (req, res) => {
    try {

        const { typeClaim } = req.params

        if(!typeClaim) {
            return res.status(404).send({Message: 'Debe ingresar un tipo para iniciar la búsqueda'})
        }

        const typeClaimInModel = await TypeClaim.findOne({

            where: {typeClaim: {
                [Op.like]: `%${typeClaim}%`
            }},
            
        })

        const typeOfClaim = await Claim.findAll({
            where: {
                TypeClaimId: typeClaimInModel.dataValues._id
            },

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