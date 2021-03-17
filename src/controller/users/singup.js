const express = require('express');
const router = express.Router();
const passport = require('passport');

const singUpGet = router.get('/', (req, res) => {
    return res.render('singup')
})

const singUpPost = router.post('/', passport.authenticate('local-singup', {
        successRedirect: '/users/login',
        failureRedirect: '/users/singup',
        passReqToCallback: true
}));



        // OLD CODE
        // const {username, password } = req.body
        
        // if(username == undefined || password == undefined ) {
        //     return res.status(403).send({message: `Falta completar campos obligatorios`})
        // }

        // req.body.password = bcrypt.hashSync(req.body.password, 10);
        // const user = await User.create(req.body);
        // createToken(user) 

        // return res.status(200).send({Message: 'Usuario creado con éxito'});
        // END OLD CODE



module.exports = {
    singUpGet,
    singUpPost
}