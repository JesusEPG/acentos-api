const db = {
  'user': [
    { id: '1', name: "Jesus"}
  ],
  'auth': [
    {id: '1', username: "Jesus", password: "123"}
  ]
};

async function list(table) {
  return db[table] || [];
}

async function get(table, id) {
  let col = await list(table);
  return col.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {
  if(!db[table]){
    db[table] = [];
  }

  db[table].push(data);

  return data;
}

async function insert(table, data) {
  if(!db[table]){
    db[table] = [];
  }

  db[table].push(data);

  return data;
}

async function update(table, data) {
  const indexToUpdate = db[table].findIndex(item => item.id === data.id);
  
  if(indexToUpdate === -1 ){
    throw new Error("No se encontro el usuario");
  }

  console.log("indexToUpdate ", indexToUpdate)
  db[table][indexToUpdate] = data;

  return data;
}

async function remove(table, id) {
  const indexToDelete = db[table].findIndex(item => item.id === id);
  
  if(indexToDelete === -1 ){
    throw new Error("No se encontro el usuario");
  }

  db[table].splice(indexToDelete, 1);

  return id;
}

async function query(table, q) {
  let col = await list(table);
  let keys = Object.keys(q);
  const key = keys[0];
  
  return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  insert,
  update,
  remove,
  query
};