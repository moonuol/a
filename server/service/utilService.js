const data = require('../data/utilData');

exports.clearAllUsers = async () => {
	await data.clearAllUsers();
};
exports.clearAllPosts = async () => {
	await data.clearAllPosts();
};

exports.getUserById = async id => {
	return await data.getUserById(id);
};

exports.getAllUsers = async () => {
	return await data.getAllUsers();
};

exports.getPostByTitulo = async post_titulo => {
	return await data.getPostByTitulo(post_titulo);
};

exports.getUserByEmail = async email => {
	return await data.getUserByEmail(email);
};

exports.getUserByUsername = async username => {
	return await data.getUserByUsername(username);
};

exports.getUserByUsernameOrEmail = async usernameEmail => {
	return await data.getUserByUsernameOrEmail(usernameEmail);
};
