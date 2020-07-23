const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/login', login);

function login (req, res, next) {
  const { email, password } = req.body;
  Controller.login(email, password)
    .then(token => {
      response.success(req, res, token, 200);
    })
    .catch(next);
}

module.exports = router;