const { faker } = require('@faker-js/faker');

exports.fakeUser = () => {
	faker.setLocale('pt_BR');
	const nome = faker.name.firstName();
	const sobrenome = faker.name.lastName();
	const username = faker.internet.userName(nome, sobrenome);
	const email = faker.internet.email(nome, sobrenome, 'compasso.com.br');
	const senha = faker.internet.password(12);
	const telefone = faker.phone.phoneNumber('+55###########');

	const userDados = {
		nome: nome,
		sobrenome: sobrenome,
		username: username,
		email: email,
		senha: senha,
		telefone: telefone,
	};

	return userDados;
};

exports.fakePost = () => {
	faker.setLocale('pt_BR');
	const titulo = faker.lorem.sentence(
		faker.datatype.number({ min: 1, max: 5 })
	);
	const pais = faker.address.country();
	const fotografo = faker.name.findName();

	const postDados = {
		titulo: titulo,
		pais: pais,
		fotografo: fotografo,
		privado: false,
	};

	return postDados;
};
