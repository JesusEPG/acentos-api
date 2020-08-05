const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

function login (req, res, next) {
  const { email, password } = req.body;
  Controller.login(email, password)
    .then(token => {
      response.success(req, res, token, 200);
    })
    .catch(next);
}

function register (req, res, next) {
  Controller.register(req.body)
    .then(newUser => {
      response.success(req, res, newUser, 201);
    })
    .catch((next));
}

module.exports = router;