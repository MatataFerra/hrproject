const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 3000;

require('./src/database/conect');
require('dotenv').config();
require('./src/database/sync');
require('./src/database/associations')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//Routes
const EmployeeRoute = require('./src/routes/employees');
const SchoolRoute = require('./src/routes/schools');
const ContractRoute = require('./src/routes/contract');
const EnrollRoute = require('./src/routes/enroll');
const ClaimRoute = require('./src/routes/claims');
const AbsenceRoute = require('./src/routes/absence');
const RolRoute = require('./src/routes/rol');
const UserRoute = require('./src/routes/user')

//Solo para test
const testRoute = require('./src/test');

app.use('/employees', EmployeeRoute);
app.use('/schools', SchoolRoute);
app.use('/contract', ContractRoute);
app.use('/enroll', EnrollRoute);
app.use('/test', testRoute)
app.use('/claim', ClaimRoute);
app.use('/absence', AbsenceRoute);
app.use('/rol', RolRoute);
app.use('/users', UserRoute)



app.listen(PORT, ()=> {
    console.log('Servidor escuchando');
})