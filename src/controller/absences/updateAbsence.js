const express = require('express');
const router = express.Router();
const {  Absence, Article, ArticlesStartEnd, Employee, AbsenceEmployee } = require('../../database/tables');
const { createDate } = require('../../services/time');
const moment = require('moment');

module.exports = router.put('/:id', async (req, res) => {

    try {

        //Buscar las ausencias pedidas por el empleado en AbsenceEmployees
        //Una vez encontrado, que busque las ausencias asociadas a ese ID
        //Cuando encuentre esos ID ya puede buscar todas los artículos específicos pedidos por ese ID
        
        const id = req.params.id
        const { dni, start, end } = req.body
        

        const createStart = createDate(start)
        const createEnd = createDate(end)

        if(createEnd < createStart) {
            return res.status(400).send({Message: 'La fecha de fin no puede ser menor a la de inicio'})
        }

        let sumDays = moment(createEnd).diff(createStart, 'days')

        if(moment(createEnd).isSame(createStart)){
            sumDays = 1
        } else{
            sumDays = sumDays + 1
        }

        const employee = await Employee.findOne({
            where: {
                dni: dni
            }
        })

        const absenceEmployee = await AbsenceEmployee.findAll({
            where: {
                EmployeeId: employee.dataValues._id
            }
        });

        const absence = await Absence.findOne({
            where: {
                _id: id
            },

            include: [
                {
                    model: Article
                }
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
        

        let allAbseceArray = []
        let total = 0
        let remaning = oneArticle.dataValues.maxquantity
        let possiblesErrors = 'No se detectaron conflictos a la hora de crear la licencia'

        console.log({sumDays, total, remaning});
        
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
                `La cantidad de días excede a la permitida para la licencia ${oneArticle.dataValues.number} ${oneArticle.dataValues.article}: ${oneArticle.dataValues.description}. La Cantidad máxima es de: ${max}. Hasta el ${moment(nowTime.nowDate).format('DD-MM-YYYY')} se han contado: ${total}`
                possiblesErrors = possiblesErrors.trim()
            } else {
                possiblesErrors = 'No se detectaron conflictos a la hora de crear la licencia'
            }
            console.log(`vuelta n° ${i}`);
            console.log({total, remaning, max, sumDays});

        }
        
        await absence.update({
            start: createStart,
            end: createEnd,
            sumdays: sumDays,
            remaningdays: remaning,
            totaldays: total

        })
        

        return res.status(200).send({
            Absence: absence,
            Possibles_Errors: possiblesErrors
        })


    } catch (error) {
        console.log(error);
        return res.status(404).send({Error: error});
    }

})