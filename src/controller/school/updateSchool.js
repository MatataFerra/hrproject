const { Schools, level } = require('../../database/tables');
const express = require('express');
const router = express.Router();

const getEditSchool = router.get('/', (req, res) => {
    res.render('editSchool')
});

const updateSchool = router.put('/:_id', async (req, res)=> {
    try {

        const school = await Schools.findByPk(req.params._id)

        if(!school) {
            return res.send({Message: 'School not found'})
        }

        const educationlevel  = req.body.educationlevel.toLowerCase()

        const edLevel = Object.getOwnPropertyNames(level).find(lvl => lvl === educationlevel);

        if(educationlevel !== edLevel){
            return res.send({
                Error: 'El nivel educativo es incorrecto, debe seleccionar alguno de estos',
                EducationalLevel: Object.keys(level)
            })
        }

        await school.update(req.body);

        return res.status(200).send({
            Message: 'Escuela actualizado con éxito',
            update: req.body
        })

    } catch (error) {
        console.log(error);
        res.status(404).send({Error: error});
    }
});

module.exports = {
    getEditSchool,
    updateSchool,
}