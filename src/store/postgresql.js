const { Pool } = require('pg');

const { postgresql } = require('../../config');

const pool = new Pool(postgresql);

function list(table) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * from ${table}`, (error, results) => {
      if(error) {
        return reject(error);
      }
      resolve(results);
    })
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * from ${table} WHERE id_${table} = ${id}`, (error, results) => {
      if(error) {
        return reject(error);
      }

      resolve(results);
    });
  });
}

function query(table, q, joinTable) {
  return new Promise((resolve, reject) => {
    const key = Object.keys(q)[0];
    let joinQuery = '';

    if(joinTable) {
      joinQuery = `INNER JOIN ${joinTable} ON ${table}.fk_${joinTable} = ${joinTable}.id_${joinTable}`;
    }
    
    pool.query(`SELECT * from ${table} ${joinQuery} WHERE ${joinTable}.${key} = '${q[key]}'`, (error, results) => {
      if(error) {
        return reject(error);
      }

      resolve(results.rows);
    });
  });
}

module.exports = {
  list,
  get,
  query
}