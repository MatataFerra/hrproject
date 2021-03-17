const bcrypt = require('bcrypt');

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

const comparePassword = (password, userPass) => {
    return bcrypt.compareSync(password, userPass);
}

module.exports = {
    encryptPassword,
    comparePassword
}