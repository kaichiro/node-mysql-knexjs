const express = require('express')
const app = express()
const mysql = require('mysql')
const path = require('path')
const bodyParser = require('body-parser')

require('dotenv/config')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})
const dependecies = { connection }

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

const pessoas = require('./routes/pessoas')
app.use('/pessoas', pessoas(dependecies))

const port = process.env.APP_PORT || 3000
const address = 'http://localhost'

app.listen(port, () => {
    console.log('\nDatabase is connect.\n'.concat(`App listening on ${address}:${port}`))
})

connection.connect(() => {
    app.get('/', (req, res) => res.render('home'))
})