const express = require('express');
const router = require('./router');
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express')

const app = express();

app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Para idwall, AML Solution",
            version: '0.0.1',
            description: "Api Designada para consulta dos criminosos mais procurados com crimes relacionados a AML( Anti money Laundering), incentivo a praticas terroristas, compra de titulos e manipulação de mercado. Utilizando como base de dados e informações o site do FBI e Interpool realizando o consumo de suas API`s.",
            contact: { 
                name: "Matheus Gomes",
                url: "github.com/mgsMatheus",
                email: "mgs.matheus.py@gmail.com",
            },
        },
        servers: [
            {
                url: "https://localhost:3333",
            },
        ],
    },
    apis: [__dirname + '/router.js'],
};

const specs = swaggerjsdoc(options)
app.use(
    "/api-docs",
    swaggerui.serve,
    swaggerui.setup(specs)
)
app.use(express.json());
app.use(router);

module.exports = app;