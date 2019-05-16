const express = require('express')
const {
    createForm,
    createProcess,
    deleteOne,
    index,
    updateForm,
    updateProcess,
} = require('../controllers/pessoas')

const pessoasRouter = ({ connection }) => {
    const router = express.Router()

    router.get('/', index.bind(null, connection))

    router.get('/delete/:id', deleteOne.bind(null, connection))

    router.get('/create', createForm)
    router.post('/create', createProcess.bind(null, connection))

    router.get('/update/:id', updateForm.bind(null, connection))
    router.post('/update/:id', updateProcess.bind(null, connection))

    return router
}

module.exports = pessoasRouter