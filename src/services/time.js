
const moment = require('moment')


const createDate = (input) => {
    moment.locale('es')
    
    const date = moment(input).format('YYYY-MM-DD')
    return date

}

const createTime = (input) => {

    return time = {
        time: moment(input, 'HHmm').format('HH:mm')
    }

}

const getDate = (input) => {
    const date = moment(input, 'YYYY-MM-DD').format('DD/MM/YYYY');
    return date
}


module.exports = {

    createDate,
    createTime,
    getDate

}