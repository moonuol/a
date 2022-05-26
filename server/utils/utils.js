const axios = require('axios');
const { redirect } = require('express/lib/response');

exports.request = (endPoint, method, data) => {
	const URL_PADRAO = 'http://localhost:3000';
	const url = `${URL_PADRAO}${endPoint}`;

	return axios({
		url,
		method,
		data,
		validateStatus: false,
	});
};

exports.clearCookies = (cookies, res, redirect) => {
	Object.keys(cookies).forEach(cookie => res.clearCookie(cookie));
	redirect && res.redirect(redirect);
};

exports.setCookies = (dados, res) => {
	//percore todo o objeto e seta o cookie com a respectiva chave e valor;
	//Li que precisa utilizar algumas tags de segurança, mas não sei como fazer
	// Object.entries(dados).forEach(([key, value]) =>
	// 	res.cookie(key, value, { tagsDeSegurança })
	// );
	Object.entries(dados).forEach(([key, value]) => res.cookie(key, value));
};

exports.errHandling = fn => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(next);
