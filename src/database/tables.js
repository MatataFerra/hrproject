const { Employee } = require('../models/employee');
const { Schools, level } = require('../models/schools');
const { Contract } = require('../models/contract');
const { Days } = require('../models/days');
const { ABM } = require('../models/abm');
const { Article } = require('../models/absences/articles');
const { EmailEmployee } = require('../models/absences/emailEmplaoyee');
const { Claim } = require('../models/claims/claim');
const { EmployeeSchool } = require('../models/throughTables/EmployeeSchool');
const { EmployeeContract } = require('../models/throughTables/EmployeesContract');
const { ContractDays } = require('../models/throughTables/ContractDays');
const { ContractABM } = require('../models/throughTables/ContractABM');
const { EmployeesArticles } = require('../models/throughTables/EmployeesArticles');
const { ClaimsEmployees } = require('../models/throughTables/ClaimsEmployees');
const { ContractQuantity } = require('../models/throughTables/ContractQuantity');
const { SchoolsDays } = require('../models/throughTables/SchoolsDays');
const { ArticlesDays } = require('../models/throughTables/ArtclesDays');


module.exports = {
    Employee,
    Schools,
    level,
    Contract,
    Days,
    ABM,
    Article,
    EmailEmployee,
    Claim,
    EmployeeSchool,
    EmployeeContract,
    ContractDays,
    ContractABM,
    ContractQuantity,
    EmployeesArticles,
    ClaimsEmployees,
    SchoolsDays,
    ArticlesDays
}