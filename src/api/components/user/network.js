const express = require('express');

const response = require('../../../network/response');

const router = express.Router();

router.get('/', getUser);

function getUser(req, res, next) {
  response.success(req, res, "Todo bien con userGet");
}

module.exports = router;