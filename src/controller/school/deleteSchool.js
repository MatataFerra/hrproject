const { Schools } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.delete('/:_id', async (req, res)=> {
    try {

        const school = await Schools.findByPk(req.params._id)

        if(!school) {
            return res.status(404).send({Message: 'School not found'})
        }

        await school.destroy();

        return res.status(200).send({
            Message: 'Escuela borrada con éxito'
        })

    } catch (error) {
        res.status(404).send({Error: error});
    }
})