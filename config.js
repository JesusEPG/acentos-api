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
  }
}