const dataBase = require('../config/database').pool;

exports.createUser = async dadosUser => {
	const { rows } = await dataBase.query(
		`
	INSERT INTO users 
	(
		usr_nome,
		usr_sobrenome,
		usr_telefone,
		usr_username,
		usr_email,
		usr_senha
	) 
	VALUES 
	(
		'${dadosUser.nome}',
		'${dadosUser.sobrenome}',
		'${dadosUser.telefone}',
		'${dadosUser.username}',
		'${dadosUser.email}',
		'${dadosUser.senha}'
	) 
	RETURNING usr_id
	`
	);

	return rows[0].usr_id;
};

exports.updateUser = async (usr_id, dadosUser) => {
	return dataBase.query(
		`
	UPDATE users SET 
		usr_nome      = '${dadosUser.nome}',
		usr_sobrenome = '${dadosUser.sobrenome}',
		usr_telefone  = '${dadosUser.telefone}',
		usr_username  = '${dadosUser.username}',
		usr_email     = '${dadosUser.email}'
	WHERE 
		usr_id = ${usr_id}
	`
	);
};

exports.deleteUser = async usr_id => {
	await dataBase.query(`DELETE FROM users WHERE usr_id=${usr_id}`);
};

exports.login = (login, senha) => {
	return dataBase.query(
		`SELECT * FROM users WHERE (usr_email='${login}' OR usr_username='${login}') AND usr_senha='${senha}'`
	);
};
