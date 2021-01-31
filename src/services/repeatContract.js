//This code is not used
const arrayContracts = []
let repeatContract = {};
let contractSign = []

if(contract.length == 1) {
    contractSign.push(contract)
} else {
    contract.forEach(elem => {
        contractSign.push(elem)
    })

}

contractSign.forEach(function(i){
    repeatContract[i] = (repeatContract[i] || 0) + 1;
});


const AllContractsId = contractSign.reduce((accumulator, current) => {
    if (!accumulator) return [current];

    const sigleContract = accumulator.find(d => d === current);
    if (!sigleContract) {
        accumulator.push(current);
        return accumulator;
    } else {
        return accumulator;
    }
}, undefined);



for(let i = 0; i < AllContractsId.length; i++){
    const contract = await Contract.findOne({
        where: {code: AllContractsId[i]}
    });
    const oneCotnract = contract.dataValues.code;

    const quantity = repeatContract[oneCotnract];

    contract.EmployeeContract = {
        quantity
    };

    arrayContracts.push(oneContract);
}