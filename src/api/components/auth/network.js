const express = require('express');
const multer = require('multer');
const path = require('path');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

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
  const upload = multer({ storage }).single('profile_picture');

  upload(req, res, async (err) => {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    
    if (req.fileValidationError) {
      return response.error(req, res, req.fileValidationError, 500);
    }
    else if (!req.file) {
      return response.error(req, res, 'Se debe adjuntar una imagen de perfil', 500);
    }
    else if (err instanceof multer.MulterError) {
      return response.error(req, res, 'Error cargando la imagen', 500);
    }
    else if (err) {
      return response.error(req, res, 'Error cargando la imagen', 500);
    }

    const dataToSave = {
      ...req.body,
      profile_picture:req.file.path
    };

    Controller.register(dataToSave)
    .then(newUser => {
      response.success(req, res, newUser, 201);
    })
    .catch((next));
    //En el catch se deberia eliminar la imagen que se creo
  });
}

module.exports = router;