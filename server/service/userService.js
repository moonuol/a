const data = require('../data/userData');
const utilService = require('../service/utilService');

// {
// 	"dadosUser": {
// 			"nome": "nome",
// 			"sobrenome": "sobrenome",
// 			"telefone": "telefone",
// 			"username": "username",
// 			"email": "email",
// 			"senha": "senha"
// }

exports.createUser = async dadosUser => {
	const {
		emailEncontrado: emailJaUtilizado,
		usernameEncontrado: usernameJaUtilizado,
	} = await validaEmailUsername(dadosUser.email, dadosUser.username);

	const userJaCadastrado = Boolean(emailJaUtilizado || usernameJaUtilizado);

	return userJaCadastrado
		? { usernameJaUtilizado, emailJaUtilizado }
		: await data.createUser(dadosUser);
};

exports.updateUser = async (usr_id, dadosUser) => {
	return await data.updateUser(usr_id, dadosUser);
};

exports.deleteUser = async usr_id => {
	await data.deleteUser(usr_id);
};

exports.login = async (email, senha) => {
	const { emailEncontrado, usernameEncontrado } = await validaEmailUsername(
		email
	);
	const userEncontrado = Boolean(emailEncontrado || usernameEncontrado);

	return userEncontrado
		? ({ rows, rowCount } = await data.login(email, senha))
		: { userNotFound: true };
};

async function validaEmailUsername(email, username = email) {
	const { rowCount: emailEncontrado } = await utilService.getUserByEmail(
		email
	);

	const { rowCount: usernameEncontrado } =
		await utilService.getUserByUsername(username);

	return { emailEncontrado, usernameEncontrado };
}
