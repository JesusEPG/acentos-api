const ctrl = require("./controller");
// const store = require('../../../store/dummy');
const store = require('../../../store/postgresql');

module.exports = ctrl(store);