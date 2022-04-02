const { Router } = require('express');
const Secret = require('../models/Secret');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  // CREATE A SECRET
  .post('/', authenticate, async (req, res, next) => {
    try {
      const secret = await Secret.insert(req.body);
      res.json(secret);
    } catch (error) {
      next(error);
    }
  })
  // GET ALL SECRETS
  .get('/', authenticate, async (req, res, next) => {
    try {
      const secrets = await Secret.getAll();
      res.json(secrets);
    } catch (error) {
      next(error);
    }
  });
