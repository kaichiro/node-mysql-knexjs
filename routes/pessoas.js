const express = require('express')
const {
    createForm,
    createProcess,
    deleteOne,
    index,
    updateForm,
    updateProcess,
} = require('../controllers/pessoas')

const pessoasRouter = ({ db }) => {
    const router = express.Router()

    router.get('/', index.bind(null, db))

    router.get('/delete/:id', deleteOne.bind(null, db))

    router.get('/create', createForm)
    router.post('/create', createProcess.bind(null, db))

    router.get('/update/:id', updateForm.bind(null, db))
    router.post('/update/:id', updateProcess.bind(null, db))

    return router
}

module.exports = pessoasRouter