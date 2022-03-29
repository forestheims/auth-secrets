const bcryptjs = require('bcryptjs');
const User = require('../models/User');

// * Hash a user password before saving it to the database via a `User` model
module.exports = class UserService {
  static async create({ email, firstName, lastName, password }) {
    const passwordHashValue = bcryptjs.hashSync(
      password,
      Number(process.env.NA_DISK)
    );
    return User.insert({ email, firstName, lastName, passwordHashValue });
  }
};
