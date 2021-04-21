const express = require('express');
const router = express.Router();
const  { Claim, statusName, attendStatus} = require('../../database/tables');
const { createDate }  = require('../../services/time');
const { checkObject } = require('../../services/checkFunctions')

module.exports = router.put('/:id', async (req, res) => {

    try {

        const { dayofclaim, content, tracing, status, linkemail, attend } = req.body
        
        let statusChecked = status
        let attendChecked = attend

        if(!dayofclaim) {
            if(status){
                statusChecked = checkObject(status, statusName)
                if(!statusChecked ) {
                    return res.status(404).send({Message: 'Error al ingresar estado'})
                }
            }
            
            if(attend) {
                attendChecked = checkObject(attend, attendStatus)
                if(!attendChecked ) {
                    return res.status(404).send({Message: 'Error al ingresar attend'})
                }
            }
    

            const claim = await Claim.findByPk(req.params.id);
            await claim.update(req.body)

            return res.status(200).send({Claim: claim})
        }
        
        const formatedDate = createDate(dayofclaim)

        if(status) {
            statusChecked = checkObject(status, statusName, res)
        }

        if(attend) {
            attendChecked = checkObject(attend, attendStatus, res)
        }

        const claim = await Claim.findByPk(req.params.id);

        await claim.update({
            type,
            dayofclaim: formatedDate,
            content,
            tracing,
            status: statusChecked,
            linkemail,
            attend: attendChecked
        })

        return res.status(200).send({Claim: claim})

    } catch (error) {
        console.log('-----------');
        console.log(error);
        return res.status(404).send({Error: error});
    }


})