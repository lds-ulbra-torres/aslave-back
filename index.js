require('babel-register')({ ignore: /\/(build|node_modules)\// })
require('babel-polyfill')
require('dotenv').config()

const app = require('./src/app')

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})