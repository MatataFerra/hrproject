const { Schools, Employee, Days } = require('../../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/', async (req, res) => {

    try {

        const { dni } = req.body

        const employeeSchool = await Employee.findOne({
            where: {
                dni: dni
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
        
    }

})