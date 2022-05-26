const dataBase = require('../config/database').pool;

exports.clearAllUsers = async () => {
	await dataBase.query('DELETE FROM users');
};

exports.getUserById = async id => {
	return await dataBase.query(`SELECT * FROM users WHERE usr_id=${id}`);
};

exports.getAllUsers = async () => {
	return await dataBase.query('SELECT * FROM users');
};

exports.getPostByTitulo = async post_titulo => {
	return await dataBase.query(
		`SELECT * FROM posts WHERE posts_titulo='${post_titulo}'`
	);
};

exports.clearAllPosts = async () => {
	await dataBase.query('DELETE FROM posts');
};

exports.getUserByEmail = async email => {
	return await dataBase.query(
		`SELECT * FROM users WHERE usr_email='${email}'`
	);
};

exports.getUserByUsername = async username => {
	return await dataBase.query(
		`SELECT * FROM users WHERE usr_username='${username}'`
	);
};

exports.getUserByUsernameOrEmail = async usernameEmail => {
	return await dataBase.query(
		`SELECT * FROM users WHERE usr_username='${usernameEmail}' OR usr_email='${usernameEmail}'`
	);
};
