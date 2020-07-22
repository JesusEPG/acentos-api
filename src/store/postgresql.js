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

function query(table, q) {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(q);
    const key = keys[0];
    console.log(`SELECT * from ${table} WHERE ${key} = ${q[key]}`);
    pool.query(`SELECT * from ${table} WHERE ${key} = '${q[key]}'`, (error, results) => {
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