## Estrutura do código

#### SERVER > ROUTES > VIEW

#### SERVER > ROUTES > SERVICE > DATA

#### SERVER => AS CONFIGURAÇÕES DO SERVIDOR

#### ROUTES => MAPEADOS TODOS OS ENDPOINTS

#### ROUTES/ROUTER.JS => TODOS OS ENDPOINTS RESPONSAVEIS POR RENDERIZAR A VIEW

#### ROUTES/API => TODOS OS ENDPOINTS QUE SERÃO CHAMADOS PELO ROUTER.JS E DEVOLVEM AS INFORMAÇÕES SOLICITADAS

#### VIEW => ARQUIVOS EJS PARA VISUALIZAÇÃO DAS PAGES

#### SERVICE => TODA A REGRA DE NÉGOCIO DA APLICAÇÃO, VALIDAÇÕES DEVEM FICAR AQUI

#### DATA => EXECUTA A QUERY NO BANCO DE DADOS

#### UTIL => PASTA DE FUNÇÕES UTEIS NO PROJETO

#### UTIL/UTILROUTER.JS => ENDPOINTS QUE NÃO ESTÃO EM PRODUCÃO MAS AUXILIAM NOS TESTES

#### TEST => ARQUIVOS DE TESTES

#### TEST/MOCK/FAKE => FUNCÃO QUE REALIZA O MOCK DOS DADOS

#### TEST/MOCK/FAKEROUTER.JS => ENDPOINTS QUE NÃO ESTÃO EM PRODUCÃO MAS AUXILIAM NOS TESTES COM DADOS MOCK

#### TEST/JENKINS.TEST.JS => SIMULA A ESTEIRA DO JENKINS, QUALITYGATE

#### TEST/TDD.TEST.JS => TEST DRIVEN DEVELOPMENT

#### CONFIG => CONFIGURAÇÕES DO BANCO DE DADOS

# ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

## Considerações importantes

Toda a vez que o código for salvo o server será recarregado automaticamente.  
Caso precise recarregar o server manualmente, digitar '**rs**' no terminal e apertar '**Enter**'

## Para rodar os testes utilizaremos os seguintes comandos:

### Testes de Vulnerabilidade

`npm test jenkins`

### Test Driven Development - Desenvolvimento Orientado a Testes - Testes unitários.

`npm test tdd`

Os testes em questão irão simular uma esterira de deploy do Jenkins, onde caso uma vulnerabilidade seja encontrada a esteira irá quebrar e não será realizado o deploy da aplicação.

## Entendendo o retorno dos testes:

### Cada um dos testes possui:

-   **O nome da vulnerabilidade**
-   **O que deve ser feito para corrigir a vulnerabilidade**
-   **O path que deve ser alterado para corrigir a vulnerabilidade**
-   **Como deve ser feita a correção**

### Exemplos que podem ser econtrados nos arquivos de teste

`expect(foo).toBe(bar)`  
`esperado(foo).deveSer(bar)`  
`esperado que FOO e BAR sejam iguais`

`expect(foo).not.toBe(bar)`  
`esperado(foo).nao.deveSer(bar)`  
`esperado que FOO e BAR não sejam iguais`

`expect(foo).toContain(bar)`  
`esperado(foo).deveConter(bar)`  
`esperado que FOO esteja contido na variavel BAR`

### **O arquivo server\test\jenkins.test.js não deve ser editado.**

### **Caso queira seguir no modelo TDD, o arquivo server\test\tdd.test.js pode ser editado.**

### **Procure realizar a correção e entender as vulnerabilidades sem acessar o arquivo server\test\jenkins.test.js**

#

# ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

> ## PARA PEGAR DADOS DO METODO GET

`req.query`

> ## PARA PEGAR DADOS DO METODO POST

`req.body`

> ## Consulta Parametrizada

### node-postgres | Documentation | Queries

### **Exemplo1:**

    const sqlSanitized = SELECT _ FROM table WHERE column1=$1 AND column2=$2;

    dataBase.query(sqlSanitized, [value1, value2]);

### **Exemplo2:**

    dataBase.query(SELECT _ FROM table WHERE column1=$1 AND column2=$2, [value1, value2]);

> ## Função para **sanitizar** os Dados

    const regexChar = /[<>`'"&]/g;
    let arrayChar;
    let escapedString = unescapedString;

    while ((arrayChar = regexChar.exec(unescapedString)) !== null) {
        let foundChar = arrayChar[0];
        let charCode = foundChar.charCodeAt(0);

        if (foundChar === '&') foundChar = /&(?!#)/g;

        escapedString = escapedString.replace(foundChar, `&#${charCode};`);
    }

> ## Exemplo de uso bcrypt

    const bcrypt = require('bcrypt');

    //Store hash in your password DB.
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

    //Load hash from your password DB.
    bcrypt.compareSync(myPlaintextPassword, hash); // true
    bcrypt.compareSync(someOtherPlaintextPassword, hash); // false

> ## Secure cookies

> ### Passar as tags como um objeto para o 3ro params de res.cookie

    {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });

> ## Modelo do Banco de Dados

    users (
        usr_id SERIAL PRIMARY KEY,
        usr_nome VARCHAR(100),
        usr_sobrenome VARCHAR(100),
        usr_telefone VARCHAR(14),
        usr_username VARCHAR(50),
        usr_email VARCHAR(100),
        usr_senha VARCHAR,
        usr_admin BOOLEAN,
    );

    posts (
        posts_id SERIAL,
        posts_titulo VARCHAR(100),
        posts_pais VARCHAR(50),
        posts_fotografo VARCHAR(50),
        posts_usuario INTEGER,
        posts_privado BOOLEAN,
    );
