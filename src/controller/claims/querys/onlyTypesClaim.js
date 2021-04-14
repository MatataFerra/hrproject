const express = require('express');
const router = express.Router();
const  { TypeClaim } = require('../../../database/tables');

module.exports = router.get('/', async (req, res)=> {

    try {
        const types = await TypeClaim.findAll();

        if(!types || types.length === 0) {
            return res.send({Message: 'No se encontraron resultados'})
        }
        
        return res.send({Types: types})
    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error})
    }
})  