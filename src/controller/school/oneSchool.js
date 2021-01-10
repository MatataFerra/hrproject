const { Schools } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/:_id', async (req, res) => {
    
    try {
        const id = req.params._id
        const school = await Schools.findByPk(id);

        if(!school) {
            return res.status(404).send({Message: 'El establecimiento que busca no se encuentra'})
        }

        res.status(200).send({Escuela: school});

    } catch (error) {
        console.log(error);
        res.send({Error: error})
    }


});