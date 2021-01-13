const { Schools } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.put('/:_id', async (req, res)=> {
    try {

        const school = await Schools.findByPk(req.params._id)

        if(!school) {
            return res.status(404).send({Message: 'School not found'})
        }

        const { educationlevel } = req.body

        const edLevel = Object.getOwnPropertyNames(level).find(lvl => lvl === educationlevel);
        

        if(educationlevel !== edLevel){
            return res.status(403).send({
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
        res.status(404).send({Error: error});
    }
})