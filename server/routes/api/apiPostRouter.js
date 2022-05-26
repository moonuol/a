const router = require('express').Router();
const { endpoints } = require('../../consts');
const postService = require('../../service/postService');
const { errHandling } = require('../../utils/utils');

// {
// 	"req.query": {
// 		"titulo": "titulo",
// 		"pais": "pais",
// 		"usuario": "usuario",
// 		"fotografo": "fotografo"
// 	}
// }

router.get(
	'/api/createpost',
	errHandling(async (req, res) => {
		await postService.createPost(req.query);
		res.json({ redirect: '/' });
	})
);

router.get(
	'/api/postsbyfotografo',
	errHandling(async (req, res) => {
		const { fotografo } = req.query;
		const { rows } = await postService.getPostByFotografo(fotografo);
		res.json(rows);
	})
);

module.exports = router;
