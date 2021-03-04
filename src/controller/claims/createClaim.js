const express = require('express');
const router = express.Router();
const  { Claim, Employee, statusName, attendStatus, TypeClaim } = require('../../database/tables');
const { createDate }  = require('../../services/time');
const { checkObject, checkRegExp } = require('../../services/checkFunctions');


module.exports = router.post('/', async (req, res) => {

    try {
        
        const { dni, typeClaim, dayofclaim, content, tracing, linkemail, status, attend } = req.body

        const dniChecked = checkRegExp(dni, res);
        
        if(!dniChecked){
            return res.status(403).send({Message: 'Debe introducir un DNI válido'})
        }

        const employee = await Employee.findOne({
            where: {
                dni: dniChecked
            }
        });

        if(!employee) {
            return res.status(404).send({Message: 'No se encontró al empleado'})
        }

        let newClaim = null

        const typeOfClaim = await TypeClaim.findOne({
            where: {
                typeClaim: typeClaim
            }
        })

        if(!typeOfClaim){
            newClaim = await TypeClaim.create({
                typeClaim: typeClaim
            })
        } else {
            newClaim = typeOfClaim
        }

        let statusChecked = status
        let attendChecked = attend

        if(status) {
            statusChecked = checkObject(status, statusName, res)
        }

        if(attend) {
            attendChecked = checkObject(attend, attendStatus, res)
        }
        
        const date = createDate(dayofclaim)

        const claim = await Claim.create({
            dayofclaim: date,
            content,
            tracing,
            linkemail,
            status: statusChecked,
            attend: attendChecked
        })

        await newClaim.addClaim(claim)
        await employee.addClaim(claim)
        

        return res.status(200).send({Claims: claim})

    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error});
    }

})