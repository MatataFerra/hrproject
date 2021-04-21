const express = require('express');
const router = express.Router();
const  { Claim, Employee, statusName, attendStatus, TypeClaim } = require('../../database/tables');
//const { createDate }  = require('../../services/time');
const { checkObject, checkRegExp } = require('../../services/checkFunctions');


const getcreateClaim = router.get('/', (req, res) => {
    res.render('addclaim')
})

const createClaim = router.post('/', async (req, res) => {

    try {
        
        const { dni, typeClaim, dayofclaim, content, tracing, linkemail, status, attend } = req.body

        const dniChecked = checkRegExp(dni, res);
        
        if(!dniChecked){
            return res.send({Message: 'Debe introducir un DNI válido'})
        }

        const employee = await Employee.findOne({
            where: {
                dni: dniChecked
            }
        });

        if(!employee) {
            return res.send({Message: 'No se encontró al empleado'})
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
        
        

        const claim = await Claim.create({
            dayofclaim,
            content,
            tracing,
            linkemail,
            status: statusChecked,
            attend: attendChecked
        })

        await newClaim.addClaim(claim)
        await employee.addClaim(claim)
        
        req.flash('successClaim', `Reclamo registrado con éxito para el empleado ${employee.name} ${employee.lastname}`)
        return res.redirect('/claims/add')

    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error});
    }

})


module.exports = {
    createClaim,
    getcreateClaim
}