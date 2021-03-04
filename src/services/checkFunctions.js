const checkObject = (inputBody, object, res) => {
    const downField = inputBody.toLowerCase()
    const oneObject = Object.getOwnPropertyNames(object).find(singleKey => singleKey === downField)
    if(oneObject !== downField){
        return res.send({
            Error: 'El parámetro ingresado no es válido',
            User_Input: inputBody,
            Approved_Fields: Object.keys(object)
        })
    }

    return downField
}

const checkRegExp = (dni, res) => {
    try {
        const reg = new RegExp('^[0-9]*$')
        const dniNumber = parseInt(dni)

        if(reg.test(dniNumber) == false){
            console.log({Invalid_type_Input: dniNumber});
            return false
        }

        return dni
    } catch (err) {
        console.log(err);
        return res.status(404).send({Error: err});
    }
    
}

module.exports = {
    checkObject,
    checkRegExp
}