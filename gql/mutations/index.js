const fs = require('fs');
const path = require('path');

module.exports.addFood = fs.readFileSync(path.join(__dirname, 'addFood.gql'), 'utf8');
module.exports.adminCreateFood = fs.readFileSync(path.join(__dirname, 'adminCreateFood.gql'), 'utf8');
module.exports.removeFood = fs.readFileSync(path.join(__dirname, 'removeFood.gql'), 'utf8');
module.exports.signIn = fs.readFileSync(path.join(__dirname, 'signIn.gql'), 'utf8');
module.exports.signUp = fs.readFileSync(path.join(__dirname, 'signUp.gql'), 'utf8');
module.exports.updateDailyLimit = fs.readFileSync(path.join(__dirname, 'updateDailyLimit.gql'), 'utf8');
module.exports.updateFood = fs.readFileSync(path.join(__dirname, 'updateFood.gql'), 'utf8');
