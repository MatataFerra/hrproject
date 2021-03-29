const {Employee} = require('../models/employee');
const { Schools } = require('../models/schools');
const { Contract } = require('../models/contract');
const { Days } = require('../models/days');
const { ABM } = require('../models/abm');
const { Article } = require('../models/absences/articles');
const { Absence } = require('../models/absences/absence');
const { EmailEmployee } = require('../models/absences/emailEmployee');
const { Claim } = require('../models/claims/claim');
const { Hours } = require('../models/hours');
const { TypeClaim } = require('../models/claims/TypeClaim');
const { Rol } = require('../models/rol')

// through Tables
const { EmployeeSchool } = require('../models/throughTables/EmployeeSchool');
const { EmployeeContract } = require('../models/throughTables/EmployeesContract');
const { ContractDays } = require('../models/throughTables/ContractDays');
const { ContractABM } = require('../models/throughTables/ContractABM');
const { SchoolsDays } = require('../models/throughTables/SchoolsDays');
const { ArticlesStartEnd } = require('../models/throughTables/ArticlesStartEnd');
const { AbsenceEmployee } = require('../models/throughTables/AbsenceEmployee')
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

Schools.belongsToMany(Days, {through: SchoolsDays})
Days.belongsToMany(Schools, {through: SchoolsDays})

Article.belongsToMany(Absence, {through: ArticlesStartEnd})
Absence.belongsToMany(Article, {through: ArticlesStartEnd})

EmailEmployee.hasOne(Absence)
Absence.belongsTo(EmailEmployee)

Employee.belongsToMany(Absence, {through: AbsenceEmployee});
Absence.belongsToMany(Employee, {through: AbsenceEmployee});

Employee.hasMany(Claim)
Claim.belongsTo(Employee)

TypeClaim.hasMany(Claim);
Claim.belongsTo(TypeClaim)

Rol.hasOne(Employee)
Employee.belongsTo(Rol) 
