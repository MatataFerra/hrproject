const express = require('express');
const router = express.Router();
const { Rol } = require('../../database/tables');
const { checkCharSetRegExp } = require('../../services/checkFunctions')

module.exports = router.put('/:id', async (req, res) => {

    try {

        const id = req.params.id

        const { position } = req.body

        const checkChar = checkCharSetRegExp(position)

        if(!checkChar) {
            return res.status(400).send({Error: 'El rol no puede contener números ni caracteres especiales'})
        }

        const rol = await Rol.findByPk(id)
        
        await rol.update({
            position: checkChar
        })

        return res.status(201).send({rol})

    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error})
    }
    

})