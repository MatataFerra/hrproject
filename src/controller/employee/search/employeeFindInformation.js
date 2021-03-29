const { Employee, Schools, Contract, Days, Hours, Claim, Absence, Article } = require('../../../database/tables');
const express = require('express');
const router = express.Router();

const allEmployeeInfo = router.get('/info/:dni' , async (req, res)=> {

    try {
        const dni = req.params.dni

        const employee = await Employee.findOne({
            where: {
                dni: dni,
                isactive: true
            },

            include: [
                {
                    model: Schools,
                    include: [
                        {
                            model: Days
                        }
                    ]
                },

                {
                    model: Contract,
                    include: [
                        {
                            model: Days
                        },

                        {
                            model: Hours
                        }
                    ]
                },

                {
                    model: Claim
                },

                {
                    model: Absence,
                    include: [
                        {
                            model: Article
                        }
                    ]
                }
            ]
        });

        if(!employee){
            return res.send({Error: 'Error al encontrar empleado'})
        }

        return res.send({Employee: employee})

    } catch (error) {
        console.log(error);
        return res.send({Error: error})
    }

})

module.exports = {

    allEmployeeInfo
}