const { Schools, Employee, Days } = require('../../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/:dni', async (req, res) => {

    try {

        const  dni  = req.params.dni

        const employeeSchool = await Employee.findOne({
            where: {
                dni: dni,
                isactive: true,
            },

            include: [
                {
                    model: Schools,
                    include: [
                        {
                            model: Days
                        }
                    ]
                }
            ]
        })

        return res.send({Employee: employeeSchool})

    } catch (error) {
        return res.status(404).send({Error: error})
    }

})