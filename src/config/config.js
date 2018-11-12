module.exports = {
    username:'root',
    database:'aslave_db',
    password:'', 
    params:{
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
      operatorsAliases: false
    },
    jwtSecret: "NTE2MjM5MDIyfQSflKxwRJSMeCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFt",
    jwtSession: {session: false},
  }