const findAll = async (db) => {
    return await db('pessoas').select('*')
}

const findById = async (db, id) => {
    return new Promise((resolve, reject) => {
        db('pessoas').where({ id: id }).limit(1).then((results) => {
            if (results.length > 0) {
                resolve(results[0]);
            } else {
                resolve({});
            }
        }).catch((err) => {
            reject(err);
        })
    });
};

const deleteOne = async (db, id) => {
    await db('pessoas').where({ id: id }).del().limit(1)
}

const create = async (db, data) => {
    await db('pessoas').insert({
        nome: data.nome,
        nascimento: data.nascimento,
        cargo: data.cargo,
    })
}

const update = async (db, id, data) => {
    await db('pessoas').where({ id: id }).update({
        nome: data.nome,
        nascimento: data.nascimento,
        cargo: data.cargo,
    })
}

module.exports = {
    findAll,
    findById,
    deleteOne,
    create,
    update,
}