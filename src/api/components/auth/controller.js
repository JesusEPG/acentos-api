const bcrypt = require('bcrypt');
const auth = require("../../../auth");
const CustomError = require('../../../utils/error');
const TABLE = 'student';

module.exports = function(injectedStore) {
  let store = injectedStore;
  
  if(!store) {
    store = require('../../../store/dummy');
  }

  async function login(userEmail, password) {

    let joinTable = 'auth';
    const query = {email: userEmail}

    const data = await store.query(TABLE, query, joinTable);

    if(data.length > 0) {
      const testPassword = await bcrypt.hash(data[0].password, 10);
      return bcrypt.compare(password, testPassword)
        .then(passwordIsCorrect => {
          if(passwordIsCorrect) {
            return auth.sign({id: data.id, username: data.username});
          } else {
            throw CustomError("Password invalida", 400);
          }
        });
    } else {
      throw  CutomError("Usuario no encontrado", 400);
    }  
  }

  async function register (data) {

    let joinTable = 'auth';
    const query = {email: data.email}

    try {
      const users = await store.query(TABLE, query, joinTable);
      if(users.length > 0) {
        throw new Error('Email ingresado ya esta asociado a otro usuario');
      } else {
        data.password = await bcrypt.hash(data.password, 10);
        const tableFields = Object.keys(data);
        const values = Object.values(data);
        const paramsVariables = values.map((item, idx) => '$' + (idx+1)); 
        const result = await store.insert('auth', tableFields, paramsVariables, values);

        const student = await store.insert(TABLE, ['fk_auth'], ['$1'], [result[0].id_auth]);

        return student;
      }
      
    } catch (error) {
      throw CustomError(error.message, 400);
    }
  }

  async function upsert(data) {
    const authData = {
      id: data.id
    }
    
    if(data.username) {
      authData.username = data.username
    }

    if(data.password) {
      authData.password = await bcrypt.hash(data.password, 10);
    }

    return store.upsert(TABLE, authData);
  }
  
  return {
    upsert,
    login,
    register
  }
}