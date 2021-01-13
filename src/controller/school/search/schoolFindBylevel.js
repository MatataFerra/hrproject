const { Schools, level } = require('../../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/level', async (req, res) => {
    
    try {
        
        const { educationlevel } = req.body

        const edLevel = Object.getOwnPropertyNames(level).find(lvl => lvl === educationlevel);
        

        if(educationlevel !== edLevel){
            return res.status(403).send({
                Error: 'El nivel educativo es incorrecto, debe seleccionar alguno de estos',
                EducationalLevel: Object.keys(level)
            })
        }


        const school = await Schools.findAll({
            where: {
                educationlevel: educationlevel
            }
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