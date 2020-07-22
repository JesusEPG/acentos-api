const jwt = require('jsonwebtoken');

const config = require("../../config");
const error = require("../utils/error");

const secret = config.jwt.secret;

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);

    //Comprobar si es no propio
    if(decoded.id !== owner) {
      throw error('No puedes hacer esto', 401);
    }
  },
  logged: function (req) {
    decodeHeader(req);
  }
}

function decodeHeader(req) {
  const authorizationHeader = req.headers.authorization || '';
  const token = getToken(authorizationHeader);
  const decoded = verifyToken(token);
  req.user = decoded;

  return decoded;
}

function getToken(headersToken) {
  //Bearer kklkl
  if(!headersToken) {
    throw new Error("No viene token");
  }

  if(headersToken.indexOf("Bearer ") === -1) {
    throw new Error("Formato invalido");
  }

  let token = headersToken.replace("Bearer ", "");
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, secret)
}

function sign(data) {
  return jwt.sign(data, secret);
}


module.exports = {
    sign,
    check
}