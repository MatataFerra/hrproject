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

module.exports = {
    checkObject
}