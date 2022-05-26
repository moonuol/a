const { request } = require('../utils/utils');
const { fakeUser, fakePost } = require('./mock/fake');
const dataBase = require('../config/database').pool;
const {
	clearAllPosts,
	clearAllUsers,
	getUserById,
} = require('../service/utilService');
const { createUser, login } = require('../service/userService');
const { createPost, getAllPost } = require('../service/postService');

require('dotenv/config');

beforeAll(async () => {
	await dataBase.query(
		`SET search_path TO '${process.env.SCHEMA_TESTE_VUL}'`
	);
});

afterAll(async () => {
	await dataBase.end();
});

afterEach(async () => {
	await clearAllPosts();
	await clearAllUsers();
});

describe('Jenkins | Quality Gate', () => {
	describe('Vuln: Method attribute', () => {
		//Deve existir um rota para /api/signup utilizando o método POST
		test(
			'Deve existir um rota para /api/signup utilizando o método POST' +
				'\n\tpath: routes/api/apiUserRouter' +
				'\n\tAlterar a rota de GET para POST',
			async () => {
				const userDados = fakeUser();
				const { data: dataBeforeCreate } = await request(
					'/aux/getUsersRowsCount',
					'get',
					''
				);

				await request('/api/signup', 'post', userDados);

				const { data: dataAfterCreate } = await request(
					'/aux/getUsersRowsCount',
					'get',
					''
				);

				const { data } = await request(
					`/aux/getuseridbyusername?username=${userDados.username}`,
					'get',
					''
				);
				const { id } = data;

				expect(dataAfterCreate.rowCount).toBe(
					dataBeforeCreate.rowCount + 1
				);
				if (id)
					await request(`/aux/deleteuserbyid?id=${id}`, 'delete', '');
			}
		);
		//Deve existir um rota para /signup utilizando o método POST
		test(
			'Deve existir um rota para /signup utilizando o método POST' +
				'\n\tpath: routes/router' +
				'\n\tCriar um nova rota POST',
			async () => {
				const userDados = fakeUser();

				const { data: dataBeforeCreate } = await request(
					'/aux/getUsersRowsCount',
					'get',
					''
				);

				await request('/signup', 'post', userDados);

				const { data: dataAfterCreate } = await request(
					'/aux/getUsersRowsCount',
					'get',
					''
				);

				const { data } = await request(
					`/aux/getuseridbyusername?username=${userDados.username}`,
					'get',
					''
				);
				const { id } = data;

				expect(dataAfterCreate.rowCount).toBe(
					dataBeforeCreate.rowCount + 1
				);
				if (id)
					await request(`/aux/deleteuserbyid?id=${id}`, 'delete', '');
			}
		);
		//Deve existir um rota para /api/login utilizando o método POST
		test(
			'Deve existir um rota para /api/login utilizando o método POST' +
				'\n\tpath: routes/api/apiUserRouter' +
				'\n\tAlterar a rota de GET para POST',
			async () => {
				const userDados = fakeUser();

				await request('/signup', 'post', userDados);

				const { data: login } = await request(
					'/api/login',
					'post',
					userDados
				);

				const { data } = await request(
					`/aux/getuseridbyusername?username=${userDados.username}`,
					'get',
					''
				);

				const { userInfo } = login;
				const { id } = data;

				expect(userInfo.usr_nome).toBe(userDados.nome);
				if (id)
					await request(`/aux/deleteuserbyid?id=${id}`, 'delete', '');
			}
		);
		//Deve existir um rota para /login utilizando o método POST
		test(
			'Deve existir um rota para /login utilizando o método POST' +
				'\n\tpath: routes/router' +
				'\n\tCriar um nova rota POST',
			async () => {
				const userDados = fakeUser();

				await request('/signup', 'post', userDados);

				const { data: login } = await request(
					'/login',
					'post',
					userDados
				);

				const { data } = await request(
					`/aux/getuseridbyusername?username=${userDados.username}`,
					'get',
					''
				);
				const { id } = data;

				expect(login).toContain('<!-- Initial Page -->');
				if (id)
					await request(`/aux/deleteuserbyid?id=${id}`, 'delete', '');
			}
		);
		//Deve existir um rota para /api/createpost utilizando o método POST
		test(
			'Deve existir um rota para /api/createpost utilizando o método POST' +
				'\n\tpath: routes/api/apiPostRouter' +
				'\n\tAlterar a rota de GET para POST',
			async () => {
				const userDados = fakeUser();
				const postDados = fakePost();

				await request('/signup', 'post', userDados);
				const { data: userData } = await request(
					`/aux/getuseridbyusername?username=${userDados.username}`,
					'get',
					''
				);
				const { id: user_id } = userData;

				const { data: dataBeforeCreate } = await request(
					'/aux/getPostsRowsCount',
					'get',
					''
				);

				postDados.usuario = user_id;
				await request('/api/createpost', 'post', postDados);

				const { data: dataAfterCreate } = await request(
					'/aux/getPostsRowsCount',
					'get',
					''
				);

				expect(dataAfterCreate.rowCount).toBe(
					dataBeforeCreate.rowCount + 1
				);

				if (user_id) {
					await request(
						`/aux/deleteuserbyid?id=${user_id}`,
						'delete',
						''
					);
				}
			}
		);
		//Deve existir um rota para /createpost utilizando o método POST
		test(
			'Deve existir um rota para /createpost utilizando o método POST' +
				'\n\tpath: routes/router' +
				'\n\tCriar um nova rota POST para /createpost',
			async () => {
				const userDados = fakeUser();
				const postDados = fakePost();

				await request('/signup', 'post', userDados);
				const { data: userData } = await request(
					`/aux/getuseridbyusername?username=${userDados.username}`,
					'get',
					''
				);
				const { id: user_id } = userData;

				const { data: dataBeforeCreate } = await request(
					'/aux/getPostsRowsCount',
					'get',
					''
				);

				postDados.usuario = user_id;
				await request('/createpost', 'post', postDados);

				const { data: dataAfterCreate } = await request(
					'/aux/getPostsRowsCount',
					'get',
					''
				);

				expect(dataAfterCreate.rowCount).toBe(
					dataBeforeCreate.rowCount + 1
				);

				if (user_id) {
					await request(
						`/aux/deleteuserbyid?id=${user_id}`,
						'delete',
						''
					);
				}
			}
		);
	});

	describe('Vuln: SQL Injection', () => {
		//Deve sanitizar os dados de login antes de executar a query
		test(
			'Deve sanitizar os dados de login antes de executar a query' +
				'\n\tpath: data/userData' +
				'\n\tpath: data/utilData => getUserByEmail && getUserByUsername && getUserByUsernameOrEmail' +
				'\n\tRemover a concateção de strings na query SQL e substituir por uma consulta parametrizada ' +
				'\n\tExemplo de consulta parametrizada pode ser encontrada no README',
			async () => {
				const dados = fakeUser();

				await createUser(dados);

				const email = "' or true or 'a' = 'a";
				const senha = "' OR TRUE --";

				const { userNotFound, rowCount: sucessoLoginComSQLi } =
					await login(email, senha);

				expect(Boolean(sucessoLoginComSQLi)).toBe(false);

				if (!sucessoLoginComSQLi) expect(userNotFound).toBe(true);
			}
		);
		//Deve sanitizar os dados antes de executar qualquer query em userData
		test(
			'Deve sanitizar os dados antes de executar qualquer query em userData' +
				'\n\tpath: data/userData' +
				'\n\tRemover a concateção de strings na query SQL e substituir por uma consulta parametrizada ' +
				'\n\tExemplo de consulta parametrizada pode ser encontrada no README',
			async () => {
				const { data } = await request(
					'/aux/getPathUserData',
					'get',
					''
				);
				const regex = /\$\s?\{.*\w\}/gi;
				expect(regex.test(data)).toBe(false);
			}
		);
		//Deve sanitizar os dados antes de executar qualquer query em postData
		test(
			'Deve sanitizar os dados antes de executar qualquer query em postData' +
				'\n\tpath: data/postData' +
				'\n\tRemover a concateção de strings na query SQL e substituir por uma consulta parametrizada ' +
				'\n\tExemplo de consulta parametrizada pode ser encontrada no README',
			async () => {
				const { data } = await request(
					'/aux/getPathPostData',
					'get',
					''
				);
				const regex = /\$\s?\{.*\w\}/gi;
				expect(regex.test(data)).toBe(false);
			}
		);
		//Deve sanitizar os dados antes de executar qualquer query em utilData
		test(
			'Deve sanitizar os dados antes de executar qualquer query em utilData' +
				'\n\tpath: data/utilData' +
				'\n\tRemover a concateção de strings na query SQL e substituir por uma consulta parametrizada ' +
				'\n\tExemplo de consulta parametrizada pode ser encontrada no README',
			async () => {
				const { data } = await request(
					'/aux/getPathUtilData',
					'get',
					''
				);
				const regex = /\$\s?\{.*\w\}/gi;
				expect(regex.test(data)).toBe(false);
			}
		);
	});

	describe('Vuln: Cross-site Scripting (XSS)', () => {
		//Deve sanitizar os dados ao criar um novo POST
		test(
			'Deve sanitizar os dados ao criar um novo POST' +
				'\n\tpath: service/postService' +
				'\n\tCriat uma função para sanitizar os dados antes de salva-los no banco de dados' +
				'\n\tA função pode ser criada no mesmo arquivo ou em utils/utils' +
				'\n\tExemplo de sanitização pode ser encontrado no README',
			async () => {
				const userDados = fakeUser();

				const idUser = await createUser(userDados);

				const postDados = fakePost();
				postDados.usuario = idUser;
				postDados.titulo = '<script>console.log("XSS")</script>';
				postDados.pais = '<script>console.log("XSS")</script>';
				postDados.fotografo = '<script>console.log("XSS")</script>';

				await createPost(postDados);

				const { rows } = await getAllPost();

				expect(rows[0].posts_titulo).toContain(
					'&#60;script&#62;console.log(&#34;XSS&#34;)&#60;/script&#62;'
				);
				expect(rows[0].posts_titulo).not.toContain(
					'<script>console.log("XSS")</script>'
				);

				expect(rows[0].posts_pais).toContain(
					'&#60;script&#62;console.log(&#34;XSS&#34;)&#60;/script&#62;'
				);
				expect(rows[0].posts_pais).not.toContain(
					'<script>console.log("XSS")</script>'
				);

				expect(rows[0].posts_fotografo).toContain(
					'&#60;script&#62;console.log(&#34;XSS&#34;)&#60;/script&#62;'
				);
				expect(rows[0].posts_fotografo).not.toContain(
					'<script>console.log("XSS")</script>'
				);
			}
		);
	});

	describe('Vuln: Senha salva em texto limpo', () => {
		//Deve usar hash e salt para salvar a senha no banco de dados
		test(
			'Deve usar hash e salt para salvar a senha no banco de dados' +
				'\n\tpath: service/userService => createUser && login' +
				'\n\tSubstituir a senha por um hash com salt antes de salver no banco de dados' +
				'\n\tLembrar de usar o bcrypt para comparar quando for realizar o login' +
				'\n\tUtilizar biblioteca bcrypt (já instalada)' +
				'\n\tExemplo de uso do bcrypt pode ser encontrado no README',
			async () => {
				const dados = fakeUser();
				const { senha } = dados;
				const usr_id = await createUser(dados);

				const { rows } = await getUserById(usr_id);

				expect(rows[0].usr_senha).not.toBe(senha);
			}
		);
	});
	describe('Vuln: Insecure Cookies', () => {
		//Deve usar as tags secure, httpOnly, sameSite='strict' para setar um cookie
		test(
			"Deve usar as tags secure, httpOnly, sameSite='strict' para setar um cookie" +
				'\n\tpath: utils/utils => setCookies' +
				'\n\tAo setar um cookie, incluir as tags de de seguraça para cookies' +
				'\n\tExemplo de como setar uma tag no cookie pode ser encontrado no README',

			async () => {
				const { data } = await request(
					'/aux/getPathCookies',
					'get',
					''
				);

				const regexSecure = /secure:\s?true/gi;
				const regexHttpOnly = /httpOnly:\s?true/gi;
				const regexSameSite = /sameSite:\s?['"]strict['"]/gi;
				const regexClearCookie =
					/Object.keys\(cookies\).forEach\(cookie => res.clearCookie\(cookie\)\)/gi;

				expect(regexSecure.test(data)).toBe(true);
				expect(regexHttpOnly.test(data)).toBe(true);
				expect(regexSameSite.test(data)).toBe(true);
				expect(regexClearCookie.test(data)).toBe(true);
			}
		);
	});
});
