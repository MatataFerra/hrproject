const { Employee, Schools, level ,Contract, Days, ABM, Article, Claim } = require('../database/tables');
const { createDate, createTime } = require('../services/time')


async function init () {

    await Employee.bulkCreate([
        {
            _id: 1,
            name: 'Carlos',
            lastname: 'Pininfarina',
            dni: 34567896,
            cuil: '20-34567896-6',
            address: 'Av. Corrientes',
            streetnumber: 4214,
            postalcode: 1731,
            phone: 1534567895,
            email: 'carlos@gmail.com'
        },

        {
            _id: 2,
            name: 'Alfredo',
            lastname: 'Canguro',
            dni: 45456123,
            cuil: '20-45456123-6',
            address: 'Sarmiento',
            streetnumber: 1278,
            postalcode: 1612,
            phone: 1536789564,
            email: 'Alfredo@gmail.com'
        },

        {
            _id: 3,
            name: 'Miryam',
            lastname: 'Stragnaro',
            dni: 12457781,
            cuil: '27-12457781-3',
            address: 'Bauness',
            streetnumber: 1034,
            postalcode: 1438,
            phone: 1597856432,
            email: 'miryam@gmail.com'
        }
    ])

    await Schools.bulkCreate([
        {
            _id: 1,
            fullname: 'Escuela De Jornada Simple Nº 12 DE 05 "Horacio Quiroga"',
            educationlevel: level.inicial,
            numschool: 12,
            district: 5,
            commune: 19,
            address: 'Iriarte Y Montesquieu S/N'
        },

        {
            _id: 2,
            fullname: 'Escuela De Jornada Completa Nº 23 DE 12 "Saturnino Segurola"',
            educationlevel: level.primaria,
            numschool: 23,
            district: 12,
            commune: 8,
            address: 'Gral. Venancio Flores 3869'
        }
    ]);

    await Contract.bulkCreate([
        {
            _id: 1,
            name: 'Docente Especializado',
            code: 258,
            mount: 19503,
        },

        {
            _id: 2,
            name: 'Hora Cátedra',
            code: 897,
            mount: 1782
        }
    ]);

    await Days.bulkCreate([
        {
            _id: 1,
            days: ['lunes'],
            open: createTime('0900').time,
            close: createTime('1630').time
        },

        {
            _id: 2,
            days: ['martes'],
            open: createTime('0900').time,
            close: createTime('1630').time
        },
        {
            _id: 3,
            days: ['miercoles'],
            open: createTime('0900').time,
            close: createTime('1630').time
        },
        {
            _id: 4,
            days: ['jueves'],
            open: createTime('0900').time,
            close: createTime('1630').time
        },
        {
            _id: 5,
            days: ['viernes'],
            open: createTime('0900').time,
            close: createTime('1630').time
        },
        {
            _id: 6,
            days: ['sabado'],
            open: createTime('0900').time,
            close: createTime('1630').time
        }
    ]);
    // format of date input YYYY-MM-DD
    await ABM.bulkCreate([
        {
            _id: 1,
            enrolled: createDate('2020-01-21'),
            leave: createDate('2020-12-31')
        },

        {
            _id: 2,
            enrolled: createDate('2020-01-02'),
            leave: createDate('2020-07-31')
        },

        {
            _id: 3,
            enrolled: createDate('2020-04-15'),
            leave: createDate('2020-11-10')
        }
    ]);

    await Article.bulkCreate([
        {
            _id: 1,
            number: 70,
            article: 'A',
            description: 'Licencia por enfermedad',
            maxquantity: 45

        },

        {
            _id: 2,
            number: 70,
            article: 'K',
            description: 'Licencia por estudio',
            maxquantity: 10

        },

        {
            _id: 3,
            number: 70,
            article: 'E',
            description: 'Licencia por familiar enfermo',
            maxquantity: 45

        }
    ]);

    
    await Claim.bulkCreate([
        {
            _id: 1,
            type: 'Reclamo Salarial',
            dayofclaim: createDate('2021-03-01'),
            content: 'No cobré el aguinaldo',
            tracing: 'Recibimos su consulta y estamos trabajando en eso',
            linkemail: 'http://linkdelemail.com/id?Fjk'
        },

        {
            _id: 2,
            type: 'Licencia por maternidad',
            dayofclaim: createDate('2021-07-01'),
            content: '¿Cuando comienza mi licencia?',
            tracing: 'Recibimos su consulta y estamos trabajando en eso',
            linkemail: 'http://linkdelemail.com/id?H7q'
        },

        {
            _id: 3,
            type: 'Cambio de sede',
            dayofclaim: createDate('2021-06-01'),
            content: 'Necesito una reubicación, la sede de origen me queda muy lejos',
            tracing: 'Recibimos su consulta y estamos trabajando en eso',
            linkemail: 'http://linkdelemail.com/id?7pQ89'
        }
    ])

    console.log('Data masiva creada con éxito');
}

module.exports = {
    init
}