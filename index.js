const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

require('dotenv/config')

const db = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'cadastro',
    },
})

const dependecies = {
    db,
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => res.render('home'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const pessoas = require('./routes/pessoas')
app.use('/pessoas', pessoas(dependecies))

const address = 'http://localhost'
const port = process.env.APP_PORT || 3000

app.listen(port, () =>
    console.log('\nDatabase is connect.\n'.concat(`App listening on ${address}:${port}`))
)