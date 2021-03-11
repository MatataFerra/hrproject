const express = require('express');
const router = express.Router();
const { User } = require('../../database/tables');
const bcrypt = require('bcrypt');
const { createToken } = require('../../services/token');


module.exports = router.post('/', async (req, res) => {
    try {
        const {username, password } = req.body
        
        if(username == undefined || password == undefined ) {
            return res.status(403).send({message: `Falta completar campos obligatorios`})
        }

        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const user = await User.create(req.body);
        createToken(user) 

        return res.status(200).send({Message: 'Usuario creado con éxito'});
        
    } catch (error) {
        console.log({message: error.message});
        return res.status(404).send({Error: error.message})

    }
});