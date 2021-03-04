const express = require('express');
const router = express.Router();
const { Article, Absence, EmailEmployee, Employee, AbsenceEmployee, ArticlesStartEnd } = require('../../database/tables');
const { checkRegExp } = require('../../services/checkFunctions');
const { createDate, nowTime } = require('../../services/time');
const moment = require('moment');

module.exports = router.post('/', async (req, res) => {

    try {

        const { dni, article, link, start, end } = req.body

        let createStart = null
        let createEnd = null


        if(!start) {
            createStart = nowTime.nowDate
        } else {
            createStart = createDate(start);
        }

        if(!end) {
            createEnd = nowTime.nowDate
        } else {
            createEnd = createDate(end)
        }

        const dniChecked = checkRegExp(dni, res);

        let sumDays = moment(createEnd).diff(createStart, 'days')

        if(moment(createEnd).isSame(createStart)){
            sumDays = 1
        } else{
            sumDays = sumDays + 1
        }

        
        if(!dniChecked){
            return res.status(403).send({Message: 'Debe introducir un DNI válido'})
        }

        if(createEnd < createStart) {
            return res.status(400).send({Message: 'La fecha de fin no puede ser menor a la de inicio'})
        }

        const employee = await Employee.findOne({
            where: {
                dni: dniChecked
            }
        });

        if(!employee) {
            return res.status(404).send({Message: 'No se encontró al empleado'})
        }

        const oneArticle = await Article.findOne({
            where: {
                article: article
            }
        });

        if(!oneArticle){
            return res.status(404).send({Message: 'Debe crear el artículo primero'})
        }


        let allAbseceArray = []
        let total = sumDays
        let remaning = oneArticle.dataValues.maxquantity - sumDays
        let possiblesErrors = 'No se detectaron conflictos a la hora de crear la licencia'
        
        

        const findAllArticles = await ArticlesStartEnd.findAll({
            where: {
                ArticleId: oneArticle.dataValues._id
            }
        })

        for (let i = 0; i < findAllArticles.length; i++) {
            const element = findAllArticles[i];
            const absence = await Absence.findOne({
                where: {
                    _id: element.dataValues.AbsenceId
                }
            })
            allAbseceArray.push(absence)
            
        }


        for (let i = 0; i < allAbseceArray.length; i++) {
            const element = allAbseceArray[i];

            total = element.dataValues.sumdays + total + 1
    
            const max = oneArticle.dataValues.maxquantity
            const sum = element.dataValues.sumdays
    
            remaning = max - total
    
            if(remaning <= 0) {
                remaning = 0
                possiblesErrors = 
                `La cantidad de días excede a la permitida para la licencia ${oneArticle.dataValues.number} ${oneArticle.dataValues.article}: ${oneArticle.dataValues.description}. La Cantidad máxima es de: ${max}. Hasta el ${moment(nowTime.nowDate).format('DD-MM-YYYY')} se han contado: ${total}`
                possiblesErrors = possiblesErrors.trim()
            } else {
                possiblesErrors = 'No se detectaron conflictos a la hora de crear la licencia'
            }
    
            console.log({max, sum, remaning, total});

            
        }
       

        const newAbsence = await Absence.create({
            start: createStart,
            end: createEnd,
            sumdays: sumDays,
            remaningdays: remaning,
            totaldays: total
        })

        const linkAbsence = await EmailEmployee.create({
            link: link
        });

        await employee.addAbsence(newAbsence);
        await oneArticle.addAbsence(newAbsence)
        await linkAbsence.setAbsence(newAbsence);
        
        

        return res.status(200).send({
            Absence: newAbsence,
            Possibles_Errors: possiblesErrors
        
        })

    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error});
    }



})