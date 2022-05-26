const { fakeUser, fakePost } = require('./mock/fake');
const { request } = require('../utils/utils');
const { endpoints } = require('../consts');
const {
	getAllUsers,
	clearAllUsers,
	getUserById,
	getUserByEmail,
	getUserByUsername,
	clearAllPosts,
} = require('../service/utilService');
const {
	createUser,
	updateUser,
	login,
	deleteUser,
} = require('../service/userService');
const {
	createPost,
	getAllPost,
	getPostById,
	getPostByFotografo,
	updatePost,
	deletePost,
} = require('../service/postService');

const dataBase = require('../config/database').pool;
require('dotenv/config');

beforeAll(async () => {
	await dataBase.query(`SET search_path TO '${process.env.SCHEMA_TEST}'`);
});

afterAll(async () => {
	await dataBase.end();
});

afterEach(async () => {
	await clearAllPosts();
	await clearAllUsers();
});

describe('Test Driven Development', () => {
	describe('USERS', () => {
		describe('CREATE', () => {
			test('Deve criar um novo usuário.', async () => {
				const dados = fakeUser();

				const id = await createUser(dados);

				const { rowCount } = await getAllUsers();
				const { rows } = await getUserById(id);

				expect(rowCount).toBe(1);
				expect(rows[0].usr_nome).toBe(dados.nome);
				expect(rows[0].usr_sobrenome).toBe(dados.sobrenome);
				expect(rows[0].usr_telefone).toBe(dados.telefone);
				expect(rows[0].usr_username).toBe(dados.username);
				expect(rows[0].usr_email).toBe(dados.email);
				expect(rows[0].usr_senha).toBe(dados.senha);
			});
			test('Não deve criar um novo usuário com email e/ou username já cadastrado.', async () => {
				const dadosEmail = fakeUser();
				const dadosUsername = fakeUser();

				await createUser(dadosEmail);
				const { rowCount: quantidadePorEmail } = await getAllUsers();

				expect(quantidadePorEmail).toBe(1);

				await createUser(dadosEmail);
				const { rowCount: quantidadePorEmailSecond } =
					await getAllUsers();

				expect(quantidadePorEmailSecond).toBe(1);

				await clearAllUsers();

				await createUser(dadosUsername);
				const { rowCount: quantidadeProUsername } = await getAllUsers();

				expect(quantidadeProUsername).toBe(1);

				await createUser(dadosUsername);
				const { rowCount: quantidadeProUsernameSecond } =
					await getAllUsers();

				expect(quantidadeProUsernameSecond).toBe(1);
			});
		});
		describe('READ', () => {
			test('Deve retornar todos os usuários.', async () => {
				const dados0 = fakeUser();
				const dados1 = fakeUser();
				const dados2 = fakeUser();

				await createUser(dados0);
				await createUser(dados1);
				await createUser(dados2);

				const { rowCount, rows } = await getAllUsers();

				expect(rowCount).toBe(3);
				expect(rows[0].usr_nome).toBe(dados0.nome);
				expect(rows[0].usr_sobrenome).toBe(dados0.sobrenome);
				expect(rows[0].usr_telefone).toBe(dados0.telefone);
				expect(rows[0].usr_username).toBe(dados0.username);
				expect(rows[0].usr_email).toBe(dados0.email);
				expect(rows[0].usr_senha).toBe(dados0.senha);

				expect(rows[1].usr_nome).toBe(dados1.nome);
				expect(rows[1].usr_sobrenome).toBe(dados1.sobrenome);
				expect(rows[1].usr_telefone).toBe(dados1.telefone);
				expect(rows[1].usr_username).toBe(dados1.username);
				expect(rows[1].usr_email).toBe(dados1.email);
				expect(rows[1].usr_senha).toBe(dados1.senha);

				expect(rows[2].usr_nome).toBe(dados2.nome);
				expect(rows[2].usr_sobrenome).toBe(dados2.sobrenome);
				expect(rows[2].usr_telefone).toBe(dados2.telefone);
				expect(rows[2].usr_username).toBe(dados2.username);
				expect(rows[2].usr_email).toBe(dados2.email);
				expect(rows[2].usr_senha).toBe(dados2.senha);
			});
			test('Deve retornar o usuário pelo id', async () => {
				const dados = fakeUser();
				const id = await createUser(dados);
				const { rows } = await getUserById(id);

				expect(rows[0].usr_nome).toBe(dados.nome);
				expect(rows[0].usr_sobrenome).toBe(dados.sobrenome);
				expect(rows[0].usr_username).toBe(dados.username);
				expect(rows[0].usr_email).toBe(dados.email);
				expect(rows[0].usr_senha).toBe(dados.senha);
			});
			test('Deve retornar o usuário pelo e-mail ou username', async () => {
				const dadosEmail = fakeUser();
				const dadosUsername = fakeUser();

				const { email } = dadosEmail;
				const { username } = dadosUsername;

				await createUser(dadosEmail);
				await createUser(dadosUsername);

				const { rows: rowsEmail } = await getUserByEmail(email);
				const { rows: rowsUsername } = await getUserByUsername(
					username
				);

				expect(rowsEmail[0].usr_nome).toBe(dadosEmail.nome);
				expect(rowsEmail[0].usr_sobrenome).toBe(dadosEmail.sobrenome);
				expect(rowsEmail[0].usr_username).toBe(dadosEmail.username);
				expect(rowsEmail[0].usr_email).toBe(dadosEmail.email);
				expect(rowsEmail[0].usr_senha).toBe(dadosEmail.senha);

				expect(rowsUsername[0].usr_nome).toBe(dadosUsername.nome);
				expect(rowsUsername[0].usr_sobrenome).toBe(
					dadosUsername.sobrenome
				);
				expect(rowsUsername[0].usr_username).toBe(
					dadosUsername.username
				);
				expect(rowsUsername[0].usr_email).toBe(dadosUsername.email);
				expect(rowsUsername[0].usr_senha).toBe(dadosUsername.senha);
			});
		});
		describe('UPDATE', () => {
			test('Deve atualizar os dados do usuário.', async () => {
				const dados = fakeUser();

				const dadosAtualizados = fakeUser();

				const id = await createUser(dados);
				await updateUser(id, dadosAtualizados);

				const { rows } = await getUserById(id);

				expect(rows[0].usr_nome).toBe(dadosAtualizados.nome);
				expect(rows[0].usr_sobrenome).toBe(dadosAtualizados.sobrenome);
				expect(rows[0].usr_username).toBe(dadosAtualizados.username);
				expect(rows[0].usr_email).toBe(dadosAtualizados.email);
				//Atualizará a senha por outro service exclusivo para troca de senha
				// expect(rows[0].usr_senha).toBe(dadosAtualizados.senha);
			});
		});
		describe('DELETE', () => {
			test('Deve exluir um usuário pelo id.', async () => {
				const dados = fakeUser();

				const id = await createUser(dados);
				await deleteUser(id);
				const { rowCount } = await getUserById(id);
				expect(rowCount).toBe(0);
			});
		});
	});

	describe('POSTS', () => {
		describe('CREATE', () => {
			test('Deve criar um novo post.', async () => {
				const userDados = fakeUser();

				const idUser = await createUser(userDados);

				const postDados = fakePost();
				postDados.usuario = idUser;

				const idPost = await createPost(postDados);

				const { rowCount } = await getAllPost();
				const { rows } = await getPostById(idPost);

				expect(rowCount).toBe(1);
				expect(rows[0].posts_titulo).toBe(postDados.titulo);
				expect(rows[0].posts_pais).toBe(postDados.pais);
				expect(rows[0].posts_fotografo).toBe(postDados.fotografo);
				expect(rows[0].posts_usuario).toBe(postDados.usuario);
				expect(rows[0].posts_privado).toBe(postDados.privado);
			});
		});
		describe('READ', () => {
			test('Deve retornar todos os posts.', async () => {
				const userDados0 = fakeUser();
				const userDados1 = fakeUser();
				const userDados2 = fakeUser();

				const idUser0 = await createUser(userDados0);
				const idUser1 = await createUser(userDados1);
				const idUser2 = await createUser(userDados2);

				const postDados0 = fakePost();
				postDados0.usuario = idUser0;
				const postDados1 = fakePost();
				postDados1.usuario = idUser1;
				const postDados2 = fakePost();
				postDados2.usuario = idUser2;

				await createPost(postDados0);
				await createPost(postDados1);
				await createPost(postDados2);

				const { rowCount, rows } = await getAllPost();

				expect(rowCount).toBe(3);
				expect(rows[0].posts_titulo).toBe(postDados0.titulo);
				expect(rows[0].posts_pais).toBe(postDados0.pais);
				expect(rows[0].posts_fotografo).toBe(postDados0.fotografo);
				expect(rows[0].posts_usuario).toBe(postDados0.usuario);
				expect(rows[0].posts_privado).toBe(postDados0.privado);

				expect(rows[1].posts_titulo).toBe(postDados1.titulo);
				expect(rows[1].posts_pais).toBe(postDados1.pais);
				expect(rows[1].posts_fotografo).toBe(postDados1.fotografo);
				expect(rows[1].posts_usuario).toBe(postDados1.usuario);
				expect(rows[1].posts_privado).toBe(postDados1.privado);

				expect(rows[2].posts_titulo).toBe(postDados2.titulo);
				expect(rows[2].posts_pais).toBe(postDados2.pais);
				expect(rows[2].posts_fotografo).toBe(postDados2.fotografo);
				expect(rows[2].posts_usuario).toBe(postDados2.usuario);
				expect(rows[2].posts_privado).toBe(postDados2.privado);
			});
			test('Deve retornar o post pelo nome do fotografo', async () => {
				const userDados0 = fakeUser();
				const userDados2 = fakeUser();

				const idUser0 = await createUser(userDados0);
				const idUser2 = await createUser(userDados2);

				const postDados0 = fakePost();
				postDados0.usuario = idUser0;
				const postDados1 = fakePost();
				postDados1.usuario = idUser0;
				postDados1.fotografo = postDados0.fotografo;

				const postDados2 = fakePost();
				postDados2.usuario = idUser2;

				await createPost(postDados0);
				await createPost(postDados1);
				await createPost(postDados2);

				const { rowCount, rows } = await getPostByFotografo(
					postDados0.fotografo
				);

				expect(rowCount).toBe(2);
				expect(rows[0].posts_titulo).toBe(postDados0.titulo);
				expect(rows[0].posts_pais).toBe(postDados0.pais);
				expect(rows[0].posts_fotografo).toBe(postDados0.fotografo);
				expect(rows[0].posts_usuario).toBe(postDados0.usuario);
				expect(rows[0].posts_privado).toBe(postDados0.privado);

				expect(rows[1].posts_titulo).toBe(postDados1.titulo);
				expect(rows[1].posts_pais).toBe(postDados1.pais);
				expect(rows[1].posts_fotografo).toBe(postDados1.fotografo);
				expect(rows[1].posts_usuario).toBe(postDados1.usuario);
				expect(rows[1].posts_privado).toBe(postDados1.privado);
			});
		});
		describe('UPDATE', () => {
			test('Deve atualizar os dados do post.', async () => {
				const userDados = fakeUser();
				const usr_id = await createUser(userDados);

				const postDados = fakePost();
				postDados.usuario = usr_id;

				const postDadosUpdate = fakePost();

				const post_id = await createPost(postDados);
				postDadosUpdate.privado = false;

				await updatePost(post_id, postDadosUpdate);

				const { rows } = await getPostById(post_id);

				expect(rows[0].posts_titulo).toBe(postDadosUpdate.titulo);
				expect(rows[0].posts_pais).toBe(postDadosUpdate.pais);
				expect(rows[0].posts_fotografo).toBe(postDadosUpdate.fotografo);
				expect(rows[0].posts_usuario).toBe(postDados.usuario);
				expect(rows[0].posts_privado).toBe(postDadosUpdate.privado);
			});
		});
		describe('DELETE', () => {
			test('Deve exluir um post pelo id.', async () => {
				const userDados = fakeUser();
				const usr_id = await createUser(userDados);

				const postDados = fakePost();
				postDados.usuario = usr_id;

				const post_id = await createPost(postDados);

				await deletePost(post_id);

				const { rowCount } = await getAllPost();

				expect(rowCount).toBe(0);
			});
		});
	});

	describe('LOGIN', () => {
		test('Deve realizar o login.', async () => {
			const dados = fakeUser();
			const { email, senha } = dados;
			const usr_id = await createUser(dados);

			const { rows } = await login(email, senha);

			expect(rows[0].usr_id).toBe(usr_id);
			expect(rows[0].usr_nome).toBe(dados.nome);
			expect(rows[0].usr_sobrenome).toBe(dados.sobrenome);
			expect(rows[0].usr_telefone).toBe(dados.telefone);
			expect(rows[0].usr_username).toBe(dados.username);
			expect(rows[0].usr_email).toBe(dados.email);
		});
		test('Não deve realizar o login com credenciais inválidas', async () => {
			const dados = fakeUser();
			await createUser(dados);

			const { email, senha } = dados;

			const { rowCount: loginSucessoSenhaIncorreta } = await login(
				email,
				'senha incorreta'
			);

			const { rowCount: loginSucessoEmailIncorreto } = await login(
				'email incorreto',
				senha
			);

			expect(Boolean(loginSucessoSenhaIncorreta)).toBe(false);
			expect(Boolean(loginSucessoEmailIncorreto)).toBe(false);
		});
	});

	describe('RENDER', () => {
		test('Deve renderizar na tela "Login Inválido" ao tentar login e senha estiver incorreta.', async () => {
			const response = await request(endpoints.loginerr);

			expect(response.data).toContain('Senha incorreta');
		});

		test('Deve renderizar na tela "Usuário não encontrado" ao tentar login e usuário não existir.', async () => {
			const response = await request(endpoints.loginerrusernaoencontrado);

			expect(response.data).toContain('Usuário não encontrado');
		});

		// test('Deve renderizar na tela "E-mail já cadastrado" ao tentar cadastrar um E-mail já cadastrado.', async () => {
		// 	const dados = fakeUser();

		// 	await createUser(dados);
		// 	const { data } = await createUser(dados);

		// 	expect(data).toContain('E-mail já cadastrado');
		// });
	});
});
