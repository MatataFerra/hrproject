
const moment = require('moment')


const createDate = (input) => {
    moment.locale('es')
    const unformatDate = moment(input, 'DD-MM-YYYY').format('YYYY-MM-DD')
    const date = moment(unformatDate).format('YYYY-MM-DD')
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

const nowTime = {
    nowHour: moment().format('HH:mm:ss'),
    nowDate: moment().format('YYYY-MM-DD')
}


module.exports = {

    createDate,
    createTime,
    getDate,
    nowTime

}