const checkObject = (inputBody, object) => {
    const downField = inputBody.toLowerCase()
    const oneObject = Object.getOwnPropertyNames(object).find(singleKey => singleKey === downField)
    if(oneObject !== downField){
        return false
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

const checkCharSetRegExp = (input) => {
    try {
        const reg = new RegExp('^[a-zA-Z\\s]+$')
        const charset = input

        if(reg.test(charset) == false){
            console.log({Invalid_type_Input: charset});
            return false
        }

        return charset
    } catch (err) {
        console.log(err);
        return err
    }
    
}



module.exports = {
    checkObject,
    checkRegExp,
    checkCharSetRegExp
}