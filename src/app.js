import express from 'express'
import bodyParser from 'body-parser'
import compression from "compression"
import helmet from 'helmet'

const app = express()

app.db = require('./config/db')()

// Middlewares
    app.use(helmet())
    app.use(compression())
    //Body-parse settings
    app.use(bodyParser.json())
    // Converts the body of a request in json format
    app.use(bodyParser.urlencoded({extended : true}))
//

// Routes
app.use(require('./routes'))

module.exports = app