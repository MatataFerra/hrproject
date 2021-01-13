const { Contract } = require('../../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/code', async (req, res) => {
    
    try {
        const code = req.body.code
        const contract = await Contract.findOne({
            where: {code: code}
        })

        if(!contract) {
            return res.status(404).send({Message: 'La escuela que busca no se encuentra'})
        }

        res.status(200).send({Contratos: contract});

    } catch (error) {
        console.log(error);
        res.send({Error: error})
    }


});