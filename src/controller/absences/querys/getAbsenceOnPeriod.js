const express = require('express');
const router = express.Router();
const { Article, Absence, Employee } = require('../../../database/tables');
const { createDate }  = require('../../../services/time')
const { Op }  = require('sequelize')


module.exports = router.get('/', async (req, res) => {

    try {
        const { start, end } = req.body

        const createStart = createDate(start)
        const createEnd = createDate(end)

        if(createEnd < createStart) {
            return res.status(400).send({Message: 'La fecha de fin no puede ser menor a la de inicio'})
        }

        const absences = await Absence.findAll({

            where: {
                start: {
                    [Op.between]: [createStart, createEnd]
                }
            },

            include: [
                {
                    model: Article
                },

                {
                    model: Employee
                }
            ]

        })

        return res.status(200).send({Absences: absences})

    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error});
    }
        

})