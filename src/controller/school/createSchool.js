const { Schools, level } = require('../../database/tables');
const express = require('express');
const router = express.Router();

const getAddSchool = router.get('/', (req, res) => {
    res.render('addschool')
})

const createSchool = router.post('/', async (req, res)=> {

    try {
        
        const { educationlevel } = req.body

        const edLevel = Object.getOwnPropertyNames(level).find(lvl => lvl === educationlevel);

        if(educationlevel !== edLevel){
            return res.status(403).send({
                Error: 'El nivel educativo es incorrecto, debe seleccionar alguno de estos',
                EducationalLevel: Object.keys(level)
            })
        }

        await Schools.create(req.body);

        return res.status(200).send({Message: 'Escuela agregada con éxito'})

    } catch (error) {
        res.status(404).send({Error: error});
    }
});


module.exports = {
    getAddSchool,
    createSchool
}