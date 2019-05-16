const fields_ = (data) => `nome = '${data.nome}', nascimento = '${data.nascimento}', cargo = '${data.cargo}'`

const findAll = (connection) => {
    return new Promise((resolve, reject) => {
        const sqlSelectAll = 'select * from pessoas'
        connection.query(sqlSelectAll, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

const findById = (connection, id) => {
    return new Promise((resolve, reject) => {
        const sqlSelectById = `select * from pessoas where id = ${id} limit 1`
        connection.query(sqlSelectById, (err, results) => {
            if (err) {
                reject(err)
            } else {
                if (results.length > 0) {
                    resolve(results[0])
                } else {
                    resolve({})
                }
            }
        })
    })
}

const deleteOne = (connection, id) => {
    return new Promise((resolve, reject) => {
        const sqlDelete = `delete from pessoas where id = ${id} limit 1`
        connection.query(sqlDelete, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

const create = (connection, data) => {
    return new Promise((resolve, reject) => {
        // const sqlInsert = `insert into pessoas (nome, nascimento, cargo) values ('${data.nome}', '${data.nascimento}', '${data.cargo}')`
        const sqlInsert = `insert into pessoas set ${fields_(data)}`
        connection.query(sqlInsert, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

const update = (connection, id, data) => {
    return new Promise((resolve, reject) => {
        // const sqlUpdate = `update pessoas set nome = '${data.nome}', nascimento = '${data.nascimento}', cargo = '${data.cargo}' where id = ${id}`
        const sqlUpdate = `update pessoas set ${fields_(data)} where id = ${id}`
        connection.query(sqlUpdate, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

module.exports = {
    findAll,
    findById,
    deleteOne,
    create,
    update,
}