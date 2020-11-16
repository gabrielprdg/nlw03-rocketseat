import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';

import errorHandler from './errors/handler';

import './database/connection';

const app = express();

//Fazendo com que o express entenda JSON 
app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..','uploads')))
app.use(errorHandler)

//Rota = conjunto
//Recurso = usuario

//Métodos HTTP = GET,POST,PUT,DELETE
//Parametros

//GET = Buscar uma informação (Lista,itens)
//POST = Criando uma informação

//PUT = Editando uma informação
//DELETE = Deletando uma publicação

//Query Params: http://localhost:3333/users?search=diego
//Route Params: http://localhost:3333/users/1 (Indentificar um recurso)
//Body : http://localhost:3333/users/1 (Indetificar um recurso)


app.listen(3333);