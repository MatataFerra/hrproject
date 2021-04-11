const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const engine = require('ejs-mate')
const path = require('path')
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session')
const flash = require('connect-flash')

//Inicializations
require('./src/database/conect');
require('dotenv').config();
require('./src/database/sync');
require('./src/database/associations');
require('./src/services/local-auth')


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 6000
    }
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session())


//views
app.engine('ejs', engine)
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    app.locals.singupMessage =  req.flash('singupMessage');
    app.locals.singinMessage =  req.flash('singinMessage');
    app.locals.authMessage = req.flash('authMessage');
    app.locals.logoutMessage = req.flash('logoutMessage');
    app.locals.successEmployee = req.flash('successEmployee');
    app.locals.failureEmployee = req.flash('failureEmployee');
    app.locals.errorSchool = req.flash('errorSchool');
    app.locals.successSchool = req.flash('successSchool');
    app.locals.user = req.user
    next()
})

//Routes
const EmployeeRoute = require('./src/routes/employees');
const SchoolRoute = require('./src/routes/schools');
const ContractRoute = require('./src/routes/contract');
const EnrollRoute = require('./src/routes/enroll');
const ClaimRoute = require('./src/routes/claims');
const AbsenceRoute = require('./src/routes/absence');
const RolRoute = require('./src/routes/rol');
const UserRoute = require('./src/routes/user')
const Home = require('./src/routes/home')

app.use('/', Home)
app.use('/users', UserRoute)
app.use('/employees', EmployeeRoute);
app.use('/schools', SchoolRoute);
app.use('/contract', ContractRoute);
app.use('/enroll', EnrollRoute);
app.use('/claim', ClaimRoute);
app.use('/absence', AbsenceRoute);
app.use('/rol', RolRoute);
app.use('/home', Home)


app.use(express.static(__dirname + '/public/'))


app.listen(PORT, ()=> {
    console.log('Servidor escuchando');
})