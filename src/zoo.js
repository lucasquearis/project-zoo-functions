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

function getEmployeeByName(employeeName) {
  // seu código aqui
  const userDisplay = typeof employeeName === 'undefined' ? {} : employeeName;
  const acharPrimeiroNome = data.employees.find((nome) => nome.firstName === employeeName);
  const acharSegundoNome = data.employees.find((nome) => nome.lastName === employeeName);
  return acharPrimeiroNome || acharSegundoNome || userDisplay;
}
console.log(getEmployeeByName());

function createEmployee() {
  // seu código aqui personalInfo, associatedWith
}

function isManager() {
  // seu código aqui id
}

function addEmployee() {
  // seu código aqui id, firstName, lastName, managers, responsibleFor
}

function countAnimals() {
  // seu código aqui species
}

function calculateEntry() {
  // seu código aqui entrants
}

function getAnimalMap() {
  // seu código aqui options
}

function getSchedule() {
  // seu código aqui dayName
}

function getOldestFromFirstSpecies() {
  // seu código aqui id
}

function increasePrices() {
  // seu código aqui percentage
}

function getEmployeeCoverage() {
  // seu código aqui idOrName
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
