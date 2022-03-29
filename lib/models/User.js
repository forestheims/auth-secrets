const pool = require('../utils/pool');

module.exports = class User {
  id;

  constructor(row) {
    this.id = row.id;
  }
};
