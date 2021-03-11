const express = require('express');
const router = express.Router();
const { User } = require('../../models/users/User');
const bcrypt = require('bcrypt');
const { createToken } = require('../../services/token');

module.exports = router.post('/', async (req, res) => {
    try {
        const user = await User.findOne(
            { where: {
                email: req.body.email
            } }
        )

        if(user) {
            const comparedPassword = bcrypt.compareSync(req.body.password, user.password);
            if(comparedPassword) {

                const token = createToken(user)
                req.headers.authorization = token

                res.json({
                    message: 'Loggeado correctamente',
                    token: token
                })
                return res.status(200)
            } else {
                return res.status(403).send({ message: 'Contraseña incorrecta'});
            }
        } else { 
            res.json({message: 'El usuario no existe o es incorrecto'})
        }

        return res.status(404)
    } catch (error) {
        
        console.log(error);
    }
});