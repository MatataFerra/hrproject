const { Schools } = require('../../../database/tables');
const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

module.exports = router.get('/fullname/:fullname', async (req, res) => {
    
    try {
        const fullname = req.params.fullname
        const school = await Schools.findOne({
            where: {fullname: {
                [Op.like]: `%${fullname}%`
            }}
        })

        if(!school) {
            return res.send({Message: 'La escuela que busca no se encuentra'})
        }

        res.status(200).send({Escuelas: school});

    } catch (error) {
        console.log(error);
        res.send({Error: error})
    }


});