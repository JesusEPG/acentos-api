const bcrypt = require('bcrypt');
const auth = require("../../../auth");
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
            throw new Error("Password invalida");
          }
        });
    } else {
      throw new Error("Usuario no encontrado");
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
    login
  }
}