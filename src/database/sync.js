//const { tables } = require('./tables')
const sequelize = require('../database/conect');
//const { Employee, Schools ,Contract, Days, ABM, Article, Claim } = require('../database/tables');

const force = false;

(async ()=> {
    await sequelize.sync({force: force})

})().then(console.log('Sync Exitoso'))
.catch(err => {
    console.log(err);
});


