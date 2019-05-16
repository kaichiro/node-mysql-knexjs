const express = require('express')
const app = express()
const mysql = require('mysql')
const path = require('path')
const bodyParser = require('body-parser')

require('dotenv/config')

const {
    HOST,
    PORT,
    USER,
    PASSWORD,
    DATABASE,
} = require('./config-db.json')

const connection = mysql.createConnection({
    host: HOST,
    port: parseInt(PORT),
    user: USER,
    password: PASSWORD,
    database: DATABASE,
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