const { Schools, level } = require('../../database/tables');
const express = require('express');
const router = express.Router();

const getAddSchool = router.get('/', (req, res) => {
    res.render('addschool')
})

const createSchool = router.post('/', async (req, res)=> {

    try {
        const educationlevel  = req.body.educationlevel.toLowerCase();

        const edLevel = Object.getOwnPropertyNames(level).find(lvl => lvl === educationlevel);

        const messageSchool = {
            EducationalLevel: Object.keys(level),
            Error: `El nivel educativo es incorrecto, debe seleccionar alguno de estos ${Object.keys(level)}`,
            success: 'Escuela creada con éxito'
        }

        if(educationlevel !== edLevel){
            req.flash('errorSchool', messageSchool.Error)
            return res.redirect('/schools/add')
        }

        await Schools.create(req.body);

        req.flash('successSchool', messageSchool.success)
        return res.redirect('/schools/add')

    } catch (error) {
        res.status(404).send({Error: error});
    }
});


module.exports = {
    getAddSchool,
    createSchool
}