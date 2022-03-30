const { Router } = require('express');
const authorize = require('../middleware/authorize');
const UserService = require('../services/UserService');

module.exports = Router()
  // CREATE A USER
  .post('/', authorize, async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  })
  // LOGS IN A USER
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await UserService.signIn({ email, password });
      res
        .cookie('session', token, {
          httpOnly: true,
          maxAge: 24000 * 3600,
        })
        .json({ message: 'Sign In Succesful!' });
    } catch (error) {
      next(error);
    }
  })
  // LOG OUT USER
  .delete('/sessions', async (req, res, next) => {
    try {
      res
        .clearCookie('session')
        .json({ success: true, message: 'Log Out Successful!' });
    } catch (error) {
      next(error);
    }
  });
