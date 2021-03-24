const Sequelize = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   logging: false,
// });



  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: process.env.DB_PORT || 3306,
      logging: false,
  
    }
  );




(async()=>{
  try {
      await sequelize.authenticate();
      console.log('Conexión exitosa a la DB');

        if (process.argv.includes('--initData')) {
          const {init} = require('./init')
          init()
              .then(init => console.log("Data creada con éxito"))
              .catch(error => console.log("Population couldn't be done", error));
      }
  } catch (error) {
    console.log('No se pudo conectar a la DB:');
    console.log(error);
  }
})();


module.exports = sequelize;