import express from 'express';
import bodyParser from 'body-parser';
// import debugLogger from 'debug-logger';

import api from './api';
import database from '../configs/database';
import cors from '../configs/cors';
import server from '../configs/server';

// const log = debugLogger('app');
const app = express();

database(); // configure database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('src/static'));

cors(app); // configure cors

api(app); // add api

app.get('/', (req, res) => {
	res.send(`
		<!DOCTYPE html>
		<html>
			<head>
				<!-- Hey, Dasar KEPO! -->
				<title>Express API Kit</title>
				<link rel="icon" href="/favicons/16.ico" sizes="16x16" />

				<link rel="stylesheet" type="text/css" href="/others/semantic-ui/semantic.min.css" />
			</head>
			<body>
				<div style="padding: 10px;">
					<div class="ui relaxed divided list">
						<div class="item">
							<div class="content">
								<a class="header" href="/api/quote">/api/quote</a>
								<div class="description" style="font-size: 11px;">( GET | POST | PUT | DELETE )</div>
							</div>
						</div>
						<div class="item">
							<div class="content">
								<a class="header">sensitive information</a>
								<div class="description" style="font-size: 11px;">...</div>
							</div>
						</div>
						<div class="item">
							<div class="content">
								<a class="header">sensitive information</a>
								<div class="description" style="font-size: 11px;">...</div>
							</div>
						</div>
					</div>
				</div>

				<script src="/others/jquery/jquery-3.3.1.min.js"></script>
				<script src="/others/semantic-ui/semantic.min.js"></script>
			</body>
		</html>
	`);
});

server(app); // start server
