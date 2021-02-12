const { Employee, Contract, Hours, EmployeeContract, ContractHours, ABM } = require('../../database/tables');
const { createDate } = require('../../services/time')
const express = require('express');
const moment = require('moment');
const router = express.Router();

module.exports = router.post('/', async (req, res)=> {

    try {

        const { contract, hours, type, dni, up, down } = req.body

        const uptype = type.toUpperCase()

        if(!hours || !type) {
            res.status(404).send({Error: 'debe agregar cantidad de horas o tipo'})
        }

        const oneContract = await Contract.findOne({
            where: {code: contract}
        });

        if (!oneContract) {
            return res.status(404).send({Message: 'El contrato no está creado'})
        }

        const newEmployee = await Employee.findOne({
            where: {dni: dni}})
            .catch((err)=>{
                console.log('----------------');
                console.log(err);
                console.log('----------------');
            })

        if (!newEmployee) {
            return res.status(404).send({Message: 'El empleado que busca no está registrado'})
        }

        await newEmployee.addContract(oneContract)

        // const t = moment(up, 'DD-MM-YYYY').format('YYYY-MM-DD')
        // const l = moment(down, 'DD-MM-YYYY').format('YYYY-MM-DD')

        const now = createDate(up)
        const leave = createDate(down)

        const abm = await ABM.create({
            enrolled: now,
            leave: leave
        })

        const hour = await Hours.create({
            hours: hours,
            type: uptype
        })

        const findSome = await EmployeeContract.findOne({
            where: { ContractId: oneContract.dataValues._id }
        });

        let sum = await ContractHours.findAndCountAll({
            where: { ContractId: oneContract.dataValues._id }
        })

        sum.count++

        findSome.update({
            quantity: sum.count
        })

        await oneContract.addHours(hour)
        await oneContract.addABM(abm)

        
        return res.send({Message: 'Creado con éxito'})



    } catch (error) {
        console.log('-----------');
        console.log(error);
        res.status(404).send({Error: error});
    }
})