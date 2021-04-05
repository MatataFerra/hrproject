const { Schools } = require('../../../database/tables');
const express = require('express');
const router = express.Router();
const { checkRegExp }  = require('../../../services/checkFunctions')

module.exports = router.get('/district/:district', async (req, res) => {
    
    try {
        const district = req.params.district

        const districtChecked = checkRegExp(district, res);
        
        if(!districtChecked){
            return res.send({Message: 'Debe introducir un número válido'})
        }

        const school = await Schools.findAll({
            where: {district: districtChecked}
        })

        if(!school || school.length == 0) {
            return res.send({Message: 'La escuela que busca no se encuentra'})
        }

        return res.status(200).send({Escuelas: school});

    } catch (error) {
        console.log(error);
        return res.send({Error: error})
    }


});