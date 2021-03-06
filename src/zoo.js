/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

const especies = data.species;
const funcionarios = data.employees;
const precos = data.prices;
const horarios = data.hours;
// const localizarNe = especies
//   .filter((especie) => especie.location === 'NE').map((nome) => nome.name);
// const localizarNw = especies
//   .filter((especie) => especie.location === 'NW').map((nome) => nome.name);
// const localizarSe = especies
//   .filter((especie) => especie.location === 'SE').map((nome) => nome.name);
// const localizarSw = especies
//   .filter((especie) => especie.location === 'SW').map((nome) => nome.name);

function getSpeciesByIds(...ids) {
  const acessSpecies = especies;
  // seu código aqui
  const resposta = [];
  if (ids.length === 0) {
    return resposta;
  }
  ids.forEach((id) => resposta.push(acessSpecies.find((animal) => animal.id === id)));
  return resposta;
}

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const acharAnimal = especies.filter((item) => item.name === animal);
  const acharResidents = acharAnimal.find((resident) => resident.residents);
  return acharResidents.residents.every((idade) => idade.age >= age);
}

function getEmployeeByName(employeeName = {}) {
  // seu código aqui
  const acharPrimeiroNome = data.employees.find((nome) => nome.firstName === employeeName);
  const acharSegundoNome = data.employees.find((nome) => nome.lastName === employeeName);
  return acharPrimeiroNome || acharSegundoNome || employeeName;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const resposta = {
    ...personalInfo,
    ...associatedWith,
  };
  return resposta;
}

function isManager(id) {
  // seu código aqui
  const gerentes = funcionarios.map((gerente) => gerente.managers);
  return gerentes.some((pessoa, index) => (pessoa[index] === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const resposta = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  funcionarios.push(resposta);
  // return funcionarios;
}

function countAnimals(species) {
  // seu código aqui
  const nomesEspecies = especies.map((especie) => especie.name);
  const numerosEspecies = especies.map((animal) => animal.residents.length);
  if (nomesEspecies.some((animal) => animal === species)) {
    const animalParam = especies.find((animal) => animal.name === species);
    return animalParam.residents.length;
  }
  const resposta = nomesEspecies.reduce((accumulator, currentValue, index) => {
    accumulator[currentValue] = numerosEspecies[index];
    return accumulator;
  }, {});
  return resposta;
}

function calculateEntry(entrants) {
  // seu código aqui
  if (!entrants) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return Adult * precos.Adult + Child * precos.Child + Senior * precos.Senior;
}

// const getDefault = () => {
//   const resultado = {
//     NE: localizarNe,
//     NW: localizarNw,
//     SE: localizarSe,
//     SW: localizarSw,
//   };
//   return resultado;
// };

function getAnimalMap() {
  // seu código aqui
  // if (options.includeNames = true) {
  //   console.log(getDefault().NE.map((animal) => animal));
  // }
  // return getDefault();
}
const getScheduleDefault = () => {
  const resultado = {
    Tuesday: `Open from ${horarios.Tuesday.open}am until ${horarios.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${horarios.Wednesday.open}am until ${horarios.Wednesday.close - 12}pm`,
    Thursday: `Open from ${horarios.Thursday.open}am until ${horarios.Thursday.close - 12}pm`,
    Friday: `Open from ${horarios.Friday.open}am until ${horarios.Friday.close - 12}pm`,
    Saturday: `Open from ${horarios.Saturday.open}am until ${horarios.Saturday.close - 12}pm`,
    Sunday: `Open from ${horarios.Sunday.open}am until ${horarios.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  return resultado;
};

function getSchedule(dayName) {
  // seu código aqui
  if (!dayName) {
    return getScheduleDefault();
  }
  if (dayName === 'Monday') {
    const closed = {
      [dayName]: 'CLOSED',
    };
    return closed;
  }
  const resposta = {
    [dayName]: `Open from ${horarios[dayName].open}am until ${horarios[dayName].close - 12}pm`,
  };
  return resposta;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const acharFuncionarioResponsavel = funcionarios
    .find((funcionario) => funcionario.id === id).responsibleFor[0];
  const acharEspecies = especies
    .find((animal) => animal.id === acharFuncionarioResponsavel).residents
    .sort((a, b) => b.age - a.age)[0];
  const { name, sex, age } = acharEspecies;
  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
  const precoAdulto = precos.Adult + (precos.Adult * (percentage / 100));
  const precoSenior = precos.Senior + (precos.Senior * (percentage / 100));
  const precoChild = precos.Child + (precos.Child * (percentage / 100));
  precos.Adult = Math.round(precoAdulto * 100) / 100;
  precos.Senior = Math.round(precoSenior * 100) / 100;
  precos.Child = Math.round(precoChild * 100) / 100;
  return precos;
}

const defaultGetEmployeeCoverage = () => {
  const objVazio = {};
  funcionarios.forEach((funcionario) => {
    const nome = `${funcionario.firstName} ${funcionario.lastName}`;
    objVazio[nome] = funcionario.responsibleFor.map((id) => especies.find((especie) =>
      especie.id === id).name);
  });
  return objVazio;
};

function getEmployeeCoverage(idOrNames) {
  // seu código aqui
  if (!idOrNames) {
    return defaultGetEmployeeCoverage();
  }
  const funcionarioSelected = funcionarios.find((funcionario) =>
    funcionario.firstName === idOrNames || funcionario
      .lastName === idOrNames || funcionario.id === idOrNames);
  const nomes = `${funcionarioSelected.firstName} ${funcionarioSelected.lastName}`;
  return { [nomes]: defaultGetEmployeeCoverage()[nomes] };
}
module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
