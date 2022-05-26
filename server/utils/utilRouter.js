const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { rootPath } = require('../consts');
const { getAllPost, getPostById } = require('../service/postService');
const { deleteUser } = require('../service/userService');
const {
	getUserByUsername,
	getAllUsers,
	getPostByTitulo,
} = require('../service/utilService');
const { errHandling } = require('./utils');
router.use(cookieParser());

router.get(
	'/getCookies',
	errHandling(async (req, res, next) => {
		const cookies = req.cookies;

		res.json(cookies);
	})
);

router.get(
	'/aux/getuseridbyusername',
	errHandling(async (req, res) => {
		const { rows } = await getUserByUsername(req.query.username);
		const id = rows[0].usr_id;
		res.json({ id });
	})
);

router.get(
	'/aux/getpostidbytitulo',
	errHandling(async (req, res) => {
		const { rows } = await getPostByTitulo(req.query.titulo);
		const id = rows[0].posts_id;
		res.json({ id });
	})
);

router.delete(
	'/aux/deleteuserbyid',
	errHandling(async (req, res) => {
		await deleteUser(req.query.id);
		res.end();
	})
);

router.get(
	'/aux/getUsersRowsCount',
	errHandling(async (req, res) => {
		const { rowCount } = await getAllUsers();
		res.json({ rowCount });
	})
);

router.get(
	'/aux/getPostsRowsCount',
	errHandling(async (req, res) => {
		const { rowCount } = await getAllPost();
		res.json({ rowCount });
	})
);

router.get('/aux/getPathCookies', async (req, res) => {
	res.sendFile(__dirname + '/utils.js');
});

router.get('/aux/getPathUserData', async (req, res) => {
	res.sendFile(rootPath + '/data/userData.js');
});
router.get('/aux/getPathPostData', async (req, res) => {
	res.sendFile(rootPath + '/data/postData.js');
});
router.get('/aux/getPathUtilData', async (req, res) => {
	res.sendFile(rootPath + '/data/utilData.js');
});

module.exports = router;
