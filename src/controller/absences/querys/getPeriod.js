const express = require('express');
const router = express.Router();
const { Article, Absence, Employee } = require('../../../database/tables');
const { checkRegExp } = require('../../../services/checkFunctions');
const { createDate }  = require('../../../services/time')
const { Op }  = require('sequelize')


module.exports = router.get('/period/dni/:dni/start/:start/end/:end', async (req, res) => {

    try {
        const { dni, start, end } = req.params

        const dniChecked = checkRegExp(dni, res);

        if(!dniChecked){
            return res.status(403).send({Message: 'Debe introducir un DNI válido'})
        }

        // const createStart = createDate(start)
        // const createEnd = createDate(end)

        if(end < start) {
            return res.send({Message: 'La fecha de fin no puede ser menor a la de inicio'})
        }

        const absences = await Absence.findAll({

            where: {
                start: {
                    [Op.between]: [start, end]
                }
            },

            include: [
                {
                    model: Article
                },

                {
                    model: Employee,
                    where: {
                        dni: dniChecked
                    }
                }
            ]

        })

        return res.send({Absences: absences})

    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error});
    }
        

})