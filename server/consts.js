exports.getMensagensErro = {
	404: 'Post not found',
	409: 'Post alredy exists',
	500: 'Internal Server Error',
};

exports.endpoints = {
	login: '/login',
	renderLogout: '/logout',
	signup: '/signup',
	paginaInicial: '/',
	loginerr: '/login?loginerr',
	loginerrusernaoencontrado: '/login?loginerr?usernotfound',
	signupEmailerr: '/signup?signup?emailerr',
	signupUsernameerr: '/signup?signup?usernameerr',
	createPost: '/createpost',

	logout: '/?logout',

	apiLogin: '/api/login',
	apiSignup: '/api/signup',
	apiCreatePost: '/api/createpost',
};

exports.rootPath = __dirname;
