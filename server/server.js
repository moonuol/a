const constantes = require('./consts');
const express = require('express');
const app = express();
const path = require('path');
const connectionTest = require('./config/database').connectionTest;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', require('./routes/router'));
app.use('/', require('./routes/api/apiUserRouter'));
app.use('/', require('./routes/api/apiPostRouter'));
app.use('/', require('./test/mock/fakeRouter'));
app.use('/', require('./utils/utilRouter'));

//Config para acessar o arquivo CSS => C:\Users\bruno.heineck\Projetos\NodeJs SCD\api\server\views\styles\
app.use(express.static(__dirname + '/views'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
	console.log(`Sevidor Rodando na porta ${porta} => ${__dirname}`);
	connectionTest();
});

app.use((err, req, res, next) => {
	console.log('\nSOMETHING WENT WRONG\n');
	console.log(err);
	res.redirect('/');
});

// app.use((error, req, res, next) => {
// 	if (error.message === constantes.getMensagensErro[40]4)
// 		return res.status(404).send(constantes.getMensagensErro[404]);

// 	if (error.message === constantes.getMensagensErro[409])
// 		return res.status(409).send(constantes.getMensagensErro[409]);

// 	if (error.message === constantes.getMensagensErro[500])
// 		return res.status(500).send(constantes.getMensagensErro[500]);
// });
