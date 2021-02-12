const {Employee} = require('../models/employee');
const { Schools } = require('../models/schools');
const { Contract } = require('../models/contract');
const { Days } = require('../models/days');
const { ABM } = require('../models/abm');
const { Article } = require('../models/absences/articles');
const { EmailEmployee } = require('../models/absences/emailEmployee');
const { Claim } = require('../models/claims/claim');
const { Hours } = require('../models/hours')

// through Tables
const { EmployeeSchool } = require('../models/throughTables/EmployeeSchool');
const { EmployeeContract } = require('../models/throughTables/EmployeesContract');
const { ContractDays } = require('../models/throughTables/ContractDays');
const { ContractABM } = require('../models/throughTables/ContractABM');
const { EmployeesArticles } = require('../models/throughTables/EmployeesArticles');
const { ClaimsEmployees } = require('../models/throughTables/ClaimsEmployees');
const { SchoolsDays } = require('../models/throughTables/SchoolsDays');
const { ArticlesDays } = require('../models/throughTables/ArtclesDays');
const { ContractHours } = require('../models/throughTables/ContractHours');

// Relations

Employee.belongsToMany(Schools, {through: EmployeeSchool})
Schools.belongsToMany(Employee, {through: EmployeeSchool})

Employee.belongsToMany(Contract, {through: EmployeeContract});
Contract.belongsToMany(Employee, {through: EmployeeContract});

Contract.belongsToMany(Days, {through: ContractDays});
Days.belongsToMany(Contract, {through: ContractDays});

Contract.belongsToMany(Hours, {through: ContractHours});
Hours.belongsToMany(Contract, {through: ContractHours});

Contract.belongsToMany(ABM, {through: ContractABM});
ABM.belongsToMany(Contract, {through: ContractABM});

Employee.belongsToMany(Article, {through: EmployeesArticles})
Article.belongsToMany(Employee, {through: EmployeesArticles})

Schools.belongsToMany(Days, {through: SchoolsDays})
Days.belongsToMany(Schools, {through: SchoolsDays})

Article.belongsToMany(Days, {through: ArticlesDays})
Days.belongsToMany(Article, {through: ArticlesDays})

EmailEmployee.hasOne(Article)
Article.belongsTo(EmailEmployee)

Employee.hasMany(Claim)
Claim.belongsTo(Employee)
