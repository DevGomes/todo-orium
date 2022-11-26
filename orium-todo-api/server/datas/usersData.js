const database = require('../infra/database');

exports.saveUser = (user) => {
    return database.one('insert into todo.users (email, password) values ($1, $2) returning *', [user.email, user.password]);
}

exports.getUsersById = (userId) => {
    return database.oneOrNone('select * from todo.users where id = $1', [userId]);
};

exports.getAuthenticateUser = (email, password) => {
    return database.query(`select * from todo.users where email like $1 and password like $2`, [email, password]);
}

exports.deleteUserById = (userId) => {
    return database.none('delete from todo.users where id=$1', [userId]);
}