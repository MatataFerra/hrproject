const jwt = require('jsonwebtoken');
const moment = require('moment');


//Crear token
function createToken (user) {
    const payload = {
        sub: user._id,  //Debe crearse un usuario
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.sign(payload, process.env.SECRET_KEY)
}

//comprobar si el token es válido
function checkToken (token) {
    const tokenValidation = new Promise((resolve, reject) => {
        try {
            if(token) {
                jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                    if (err) {
                        reject({
                            status: 401,
                            message: 'El token es inválido'
                        });
                    } else {
                        resolve(
                            {
                                status: 200,
                                message: 'El token es válido, puede acceder',
                                decoded: decoded
                            },
                        );
                    }
                });
            }
        } catch (error) {
            reject({
                status: 403,
                message: 'Acceso prohibido',
                error: error
            })
        }
    })
        
    return tokenValidation;
}

module.exports = {
    createToken,
    checkToken
}