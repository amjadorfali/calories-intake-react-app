const fs = require('fs');
const path = require('path');

module.exports.fetchFoods = fs.readFileSync(path.join(__dirname, 'fetchFoods.gql'), 'utf8');
module.exports.getCurrentAuthenticatedUser = fs.readFileSync(path.join(__dirname, 'getCurrentAuthenticatedUser.gql'), 'utf8');
module.exports.getUsers = fs.readFileSync(path.join(__dirname, 'getUsers.gql'), 'utf8');
