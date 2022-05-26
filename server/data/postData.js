const dataBase = require('../config/database').pool;

exports.createPost = async dadosPost => {
	const { rows } = await dataBase.query(
		`
	INSERT INTO posts 
	(
		posts_titulo,
		posts_pais,
		posts_fotografo,
		posts_usuario,
		posts_privado
	) 
	VALUES 
	(
		'${dadosPost.titulo}',
		'${dadosPost.pais}',
		'${dadosPost.fotografo}',
		'${dadosPost.usuario}',
		'false'
		) 
		RETURNING posts_id
		`
	);

	return rows[0].posts_id;
};

exports.getPostById = async posts_id => {
	return await dataBase.query(
		`SELECT * FROM posts WHERE posts_id=${posts_id}`
	);
};

exports.getPostByFotografo = async posts_fotografo => {
	return await dataBase.query(
		`SELECT * FROM posts WHERE posts_fotografo like '%${posts_fotografo}%'`
	);
};

exports.getAllPost = async () => {
	return await dataBase.query(`SELECT * FROM posts`);
};

exports.updatePost = async (posts_id, dadosPost) => {
	return dataBase.query(`
	UPDATE posts SET 

		posts_titulo    = '${dadosPost.titulo}',
		posts_pais      = '${dadosPost.pais}',
		posts_fotografo = '${dadosPost.fotografo}',
		posts_privado   = '${dadosPost.privado}'

	WHERE 
		posts_id = ${posts_id}
	`);
};

exports.deletePost = async posts_id => {
	await dataBase.query(`DELETE FROM posts WHERE posts_id=${posts_id}`);
};
