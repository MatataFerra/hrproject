const express = require('express');
const router = express.Router();
const { Article, Absence, Employee } = require('../../../database/tables');
const { checkRegExp } = require('../../../services/checkFunctions');
const { createDate }  = require('../../../services/time')
const { Op }  = require('sequelize')


module.exports = router.get('/', async (req, res) => {

    try {
        const { dni, start, end } = req.body

        const dniChecked = checkRegExp(dni, res);

        if(!dniChecked){
            return res.status(403).send({Message: 'Debe introducir un DNI válido'})
        }

        const createStart = createDate(start)
        const createEnd = createDate(end)

        if(createEnd < createStart) {
            return res.status(400).send({Message: 'La fecha de fin no puede ser menor a la de inicio'})
        }

        

        const employee = await Employee.findAll({

            where: {
                dni: dniChecked
            },

            include: [
                {
                    model: Absence,
                    where: {
                        start: {
                            [Op.between]: [createStart, createEnd]
                        }
                    },

                    include: [
                        {
                            model: Article
                        }
                    ]
                }

                
            ]

        })

        return res.status(200).send({Employee: employee})

    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error});
    }
        

})