const sequelize = require('../database/conect');

const force = false;

(async ()=> {
    await sequelize.sync({force: force})

})().then(console.log('Sync Exitoso'))
.catch(err => {
    console.log(err);
});


