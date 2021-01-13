const { Schools } = require('../../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/commune', async (req, res) => {
    
    try {
        const commune = req.body.commune
        const school = await Schools.findAll({
            where: {commune: commune}
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