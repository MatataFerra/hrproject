const { Schools } = require('../../../database/tables');
const express = require('express');
const router = express.Router();
const { checkRegExp }  = require('../../../services/checkFunctions')

module.exports = router.get('/commune/:commune', async (req, res) => {
    
    try {
        
        const commune = req.params.commune

        const communeChecked = checkRegExp(commune, res);
        
        if(!communeChecked){
            return res.send({Message: 'Debe introducir un número válido'})
        }

        const school = await Schools.findAll({
            where: {commune: communeChecked}
        })

        if(!school || school.length == 0) {
            return res.send({Message: 'La escuela que busca no se encuentra'})
        }

        res.status(200).send({Escuelas: school});

    } catch (error) {
        console.log(error);
        res.send({Error: error})
    }


});