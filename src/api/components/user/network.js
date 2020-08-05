const express = require('express');

const Controller = require('./index');
const response = require('../../../network/response');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', insert);
router.put('/', update);

function list(req, res, next) {
  Controller.list()
    .then((userList) => {
      response.success(req, res, userList, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function insert(req, res, next) {
  Controller.insert(req.body)
    .then((insertedUser) => {
      response.success(req, res, insertedUser, 201);
    })
    .catch(next);
}

function update(req, res, next) {
  Controller.update(req.body)
    .then((updatedUser) => {
      response.success(req, res, updatedUser, 201);
    })
    .catch(next);
}

module.exports = router;