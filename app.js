import express from 'express';
import bodyParser from 'body-parser';
// import debugLogger from 'debug-logger';

import api from './api';
import database from './configs/database';
import cors from './configs/cors';
import server from './configs/server';

// const log = debugLogger('app');
const app = express();

database(); // configure database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

cors(app); // configure cors

api(app); // add api

app.get('/', (req, res) => {
	res.status(404).send('Sorry, I am under constructions!');
});

server(app); // start server
