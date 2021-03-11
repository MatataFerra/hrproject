const { Employee } = require('../models/employee');
const { Schools, level } = require('../models/schools');
const { Contract } = require('../models/contract');
const { Days } = require('../models/days');
const { ABM } = require('../models/abm');
const { Hours } = require('../models/hours')
const { Article } = require('../models/absences/articles');
const { EmailEmployee } = require('../models/absences/emailEmployee');
const { Claim, statusName, attendStatus } = require('../models/claims/claim');
const { TypeClaim } = require('../models/claims/TypeClaim');
const { Absence } = require('../models/absences/absence');
const { Rol } = require('../models/rol')
const { EmployeeSchool } = require('../models/throughTables/EmployeeSchool');
const { EmployeeContract } = require('../models/throughTables/EmployeesContract');
const { ContractDays } = require('../models/throughTables/ContractDays');
const { ContractABM } = require('../models/throughTables/ContractABM');
const { EmployeesArticles } = require('../models/throughTables/EmployeesArticles');
const { ClaimsEmployees } = require('../models/throughTables/ClaimsEmployees');
const { SchoolsDays } = require('../models/throughTables/SchoolsDays');
const { ArticlesStartEnd } = require('../models/throughTables/ArticlesStartEnd');
const { ContractHours } = require('../models/throughTables/ContractHours');
const { AbsenceEmployee } = require('../models/throughTables/AbsenceEmployee');

//Others Tables

const { User }  = require('../models/users/User')



//DELETE HOURS AND ContractHours Tables


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
    statusName,
    attendStatus,
    TypeClaim,
    Absence,
    Rol,
    AbsenceEmployee,
    EmployeeSchool,
    EmployeeContract,
    ContractDays,
    ContractABM,
    EmployeesArticles,
    ClaimsEmployees,
    SchoolsDays,
    ArticlesStartEnd,
    ContractHours,
    Hours,
    User
}