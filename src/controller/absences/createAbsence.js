const express = require('express');
const router = express.Router();
const { Article, Absence, EmailEmployee, Employee, ArticlesStartEnd, AbsenceEmployee } = require('../../database/tables');
const { checkRegExp } = require('../../services/checkFunctions');
const { createDate, nowTime } = require('../../services/time');
const moment = require('moment');

module.exports = router.post('/', async (req, res) => {

    try {

        //Buscar las ausencias pedidas por el empleado en AbsenceEmployees
        //Una vez encontrado, que busque las ausencias asociadas a ese ID
        //Cuando encuentre esos ID ya puede buscar todas los artículos específicos pedidos por ese ID

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

        const absenceEmployee = await AbsenceEmployee.findAll({
            where: {
                EmployeeId: employee.dataValues._id
            }
        });

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
        let remaning = oneArticle.dataValues.maxquantity - total
        const max = oneArticle.dataValues.maxquantity
        let possiblesErrors = 'No se detectaron conflictos a la hora de crear la licencia'

        if(total > oneArticle.dataValues.maxquantity) {
            possiblesErrors = 
                `La cantidad de días excede a la permitida para la licencia ${oneArticle.dataValues.number} ${oneArticle.dataValues.article}: ${oneArticle.dataValues.description}. La Cantidad máxima es de: ${max} días. En el día de la fecha: ${moment(nowTime.nowDate).format('DD-MM-YYYY')} ha solicitado: ${total} días. La licencia debe ser autorizada por Recursos Humanos`
                possiblesErrors = possiblesErrors.trim()
            return res.status(400).send({
                Message: 'Ha habido un error a la hora de crear la licencia',
                Possibles_Errors: possiblesErrors
            })
        }
        
        for (let i = 0; i < absenceEmployee.length; i++) {
            const element = absenceEmployee[i].dataValues.AbsenceId;

            const absence = await Absence.findOne({
                where: {
                    _id: element
                },
    
                include: [
                    {
                        model: Article
                    },
    
                ]
            });


            const article = absence.dataValues
            const data = article.Articles
            const articleFound = await data.map(element => {
                const value = element.dataValues.article
                return value
            })
            

            const oneArticle = await Article.findOne({
                where: {
                    article: articleFound[0]
                }
            });

            if(!oneArticle){
                return res.status(404).send({Message: 'Debe crear el artículo primero'})
            }


            const findAllArticles = await ArticlesStartEnd.findAll({
                where: {
                    ArticleId: oneArticle.dataValues._id
                }
            })

            const oneAbsence = await Absence.findOne({
                where: {
                    _id: findAllArticles[i].dataValues.AbsenceId
                }
            })

            allAbseceArray.push(oneAbsence)

            const absenceElement = allAbseceArray[i];
            total = absenceElement.dataValues.sumdays + total
            const max = oneArticle.dataValues.maxquantity
            remaning = max - total
            
            
    
            if(remaning <= 0) {
                remaning = 0
                possiblesErrors = 
                `La cantidad de días excede a la permitida para la licencia ${oneArticle.dataValues.number} ${oneArticle.dataValues.article}: ${oneArticle.dataValues.description}. La Cantidad máxima es de: ${max} días. En el día de la fecha: ${moment(nowTime.nowDate).format('DD-MM-YYYY')} ha solicitado: ${total} días. La licencia debe ser autorizada por Recursos Humanos`
                possiblesErrors = possiblesErrors.trim()

                return res.status(403).send({Message: possiblesErrors})
            } else {
                possiblesErrors = 'No se detectaron conflictos a la hora de crear la licencia'
            }


        }

        const newAbsence = await Absence.create({
            start: createStart,
            end: createEnd,
            sumdays: sumDays
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