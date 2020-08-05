const TABLE = 'student';

module.exports = function (injectedStore) {
  const store = injectedStore;

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  function insert(data) {
    return store.insert(TABLE, data);
  }
  function update(data) {
    return store.update(TABLE, data);
  }

  return {
    list,
    get,
    insert,
    update
  }
}