const express = require('express');
const router = express.Router();
const { Rol } = require('../../database/tables');
const { checkCharSetRegExp } = require('../../services/checkFunctions')

module.exports = router.post('/', async (req, res) => {

    try {
        const { position } = req.body

        const checkChar = checkCharSetRegExp(position)

        if(!checkChar) {
            return res.status(400).send({Error: 'El rol no puede contener números ni caracteres especiales'})
        }
        
        const newRol = await Rol.create({
            position: checkChar
        })

        return res.send({newRol})

    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error})
    }
    

})
