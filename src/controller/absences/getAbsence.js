const express = require('express');
const router = express.Router();
const { Article, Absence, EmailEmployee, Employee } = require('../../database/tables');
const { checkRegExp } = require('../../services/checkFunctions');

module.exports = router.get('/', async (req, res) => {

    try {
        
        const { dni } = req.body

        const dniChecked = checkRegExp(dni, res);

        if(!dniChecked){
            return res.status(403).send({Message: 'Debe introducir un DNI válido'})
        }

        const employee = await Employee.findAll({
            where: {
                dni: dniChecked
            },

            include: [
                {
                    model: Absence,
                    include: [

                        {
                            model: Article
                        },

                        {
                            model: EmailEmployee
                        }
                    ]
                    
                }
            ]
        });

        return res.status(200).send({Absence: employee})


    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error});
    }

})