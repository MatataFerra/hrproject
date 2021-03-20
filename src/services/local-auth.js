const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const { encryptPassword, comparePassword }  = require('../services/hash')
const { User } = require('../database/tables')

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    const user  = await User.findByPk(id)
    done(null, user)
})


passport.use('local-singup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const username  = req.body.username

    if(username === '' ){
        return done(null, false, req.flash('singupMessage', 'Todos los campos son obligatorios'))
    }


    const user = await User.findOne({where: {email: email}})

    if(user) {
        return done(null, false, req.flash('singupMessage', 'The email is already taken'))
    } else {
        const hashPass = encryptPassword(password)
        const newUser = await User.create({
            email, 
            password: hashPass,
            username
        });
        done(null, newUser)
    }

}))


passport.use('local-singin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if(!user) {
        return done(null, false, req.flash('singinMessage', 'User not found'))
    }

    if(!comparePassword(password, user.password)){
        return done(null, false, req.flash('singinMessage', 'Password incorrect'))

    }

    done(null, user)
}))