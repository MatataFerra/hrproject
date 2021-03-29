const { Rol } = require('../../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/:id', async (req, res)=> {

    try {
        const id = req.params.id
        const getRole = await Rol.findByPk(id)

        if(!getRole){
            return res.send({Error: 'El rol no se encuentra'})
        }

        return res.status(200).send({Rol: getRole})

    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error})
    }
    

})