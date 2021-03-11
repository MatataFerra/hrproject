const { User, role } = require('../models/users/User');


const authUserRole = async (req, res, next) => {
    
    try {

        const userId = req.userId
        const user = await User.findOne({ where: {_id: userId}})


        if(!user) {
            return res.status(403).send({message: 'Usuario no registrado'})
        }
    
        if (user.role == role.regular) {
            return res.status(401).send('No puede acceder a este sitio')
        }

        if (!req.body) {
            return res.status(400).send({
                Error: 'No ha proporcionado ningún dato'
            })
        }

        next()

    } catch (err) {
        res.json({message: err})
    }
}


module.exports = {
    authUserRole
}