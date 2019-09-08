module.exports = {
  username: process.env.DB_USER,
  database:process.env.DB_NAME,
  password:process.env.DB_PASS, 
  host: process.env.DB_HOST,
  port: 41890,
  dialect: 'mysql',
  jwtSecret: process.env.JWT_SECRET,
  jwtSession: {session: false},
}
