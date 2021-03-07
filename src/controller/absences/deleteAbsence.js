const express = require('express');
const router = express.Router();
const {  Absence } = require('../../database/tables');

module.exports = router.delete('/:id', async (req, res) => {

    try {
        const id = req.params.id
        const absence = await Absence.findOne({
            where: {
                _id: id
            }
        })

        await absence.destroy()

        return res.status(200).send({Message: 'El registro se ha eliminado satisfactoriamente'})

    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error});
    }


})