const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ email, firstName, lastName, password }) {
    const passwordHashValue = bcryptjs.hashSync(
      password,
      Number(process.env.NA_DISK)
    );
    return User.insert({ email, firstName, lastName, passwordHashValue });
  }

  static async signIn({ email, password = '' }) {
    try {
      const user = await User.findByEmail(email);
      if (!bcryptjs.compareSync(password, user.passwordHashValue))
        throw new Error('Incorrect password');
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
