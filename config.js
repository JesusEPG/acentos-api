module.exports = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secreto'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || 'P5vnRqlmpR',
    password: process.env.MYSQL_PASS || 'pAaSPttikG',
    database: process.env.MYSQL_DB || 'P5vnRqlmpR'
  },
  postgresql: {
    user: process.env.PSQL_USER || 'postgres',
    host: process.env.PSQL_HOST || '127.0.0.1',
    port: process.env.PSQL_PORT || 5432,
    database: process.env.PSQL_DB || 'acentos_api',
    password: process.env.PSQL_PASS || 'postgres'
  }
}