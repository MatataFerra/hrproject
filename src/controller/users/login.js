const express = require('express');
const router = express.Router();
const passport = require('passport');


const loginGet = router.get('/', (req, res)=> {
    return res.render('singin');
})

const loginPost = router.post('/',  passport.authenticate('local-singin', {
    successRedirect: '/schools',
    failureRedirect: '/users/login',
    passReqToCallback: true
}));
    

        // OLD CODE
        // const user = await User.findOne(
        //     { where: {
        //         email: req.body.email
        //     } }
        // )
        
        // console.log('fuera del if');
        // if(user === null){
        //     console.log('aca');
        //     console.log(req.headers);
        //     return res.redirect('/users/singup/')
        // } 

        // if(user) {
        //     console.log('if user');
        //     const comparedPassword = bcrypt.compareSync(req.body.password, user.password);
        //     if(comparedPassword) {
        //         const token = createToken(user)
        //         const myHeader = new Headers()
        //         myHeader.append('authorization', `Bearer ${token}`)
                
        //         return res.redirect('/users/singup')
        //     } else {
        //         return res.status(403).send({ message: 'Contraseña incorrecta'})
        //     }
        // } else if(!user) {
        //     console.log('else if user');
        //     return res.redirect('/users/singup')
        // }
        // END OLD CODE

 

module.exports = {
    loginGet,
    loginPost
}