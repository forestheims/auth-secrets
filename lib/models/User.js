const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
  id;
  email;
  firstName;
  lastName;
  #passwordHashValue;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.#passwordHashValue = row.password_hash_value;
  }

  static async insert({ email, firstName, lastName, passwordHashValue }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
          users (email, first_name, last_name, password_hash_value)
      VALUES
          ($1, $2, $3, $4)
      RETURNING
          *;
    `,
      [email, firstName, lastName, passwordHashValue]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        email=$1;
    `,
      [email]
    );
    if (!rows[0]) throw new Error('email is not registered');
    return new User(rows[0]);
  }

  get passwordHashValue() {
    return this.#passwordHashValue;
  }

  authToken() {
    return jwt.sign({ ...this }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
  }
};
